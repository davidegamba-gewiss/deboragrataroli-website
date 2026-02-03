'use client';

import { useState, useCallback, useRef } from 'react';
import type { ChangeEvent, FormEvent, FocusEvent } from 'react';
import {
  validateNome,
  validateEmail,
  validateMessaggio,
  isSpam,
  sanitizeInput,
  getCharacterCountInfo,
  type ContactFormData,
} from '@/utils/formValidation';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactFormProps {
  /** Subject options for dropdown */
  subjectOptions?: { value: string; label: string }[];
  /** Maximum message length */
  maxMessageLength?: number;
  /** Callback on successful submission */
  onSuccess?: () => void;
  /** Additional CSS classes */
  className?: string;
}

const defaultSubjectOptions = [
  { value: 'info', label: 'Informazioni generali' },
  { value: 'evento', label: 'Richiesta per evento' },
  { value: 'collaborazione', label: 'Collaborazione' },
  { value: 'altro', label: 'Altro' },
];

export default function ContactForm({
  subjectOptions = defaultSubjectOptions,
  maxMessageLength = 5000,
  onSuccess,
  className = '',
}: ContactFormProps) {
  // Form data state
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    oggetto: subjectOptions[0]?.value || 'info',
    messaggio: '',
    website: '', // Honeypot field
  });

  // Validation errors (field -> error message)
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fields that have been touched (for showing errors)
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Form submission status
  const [status, setStatus] = useState<FormStatus>('idle');

  // Error message for failed submissions
  const [submitError, setSubmitError] = useState<string>('');

  // Ref to prevent double submission
  const isSubmitting = useRef(false);

  // Handle input changes with real-time validation
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing (only if field was touched)
      if (touched[name] && errors[name]) {
        // Validate in real-time for touched fields
        let error: string | null = null;

        if (name === 'nome') {
          error = validateNome(value);
        } else if (name === 'email') {
          error = validateEmail(value);
        } else if (name === 'messaggio') {
          error = validateMessaggio(value);
        }

        setErrors((prev) => {
          if (error) {
            return { ...prev, [name]: error };
          }
          const { [name]: _, ...rest } = prev;
          return rest;
        });
      }
    },
    [touched, errors]
  );

  // Handle field blur for validation
  const handleBlur = useCallback((e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Mark field as touched
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate field
    let error: string | null = null;

    if (name === 'nome') {
      error = validateNome(value);
    } else if (name === 'email') {
      error = validateEmail(value);
    } else if (name === 'messaggio') {
      error = validateMessaggio(value);
    }

    setErrors((prev) => {
      if (error) {
        return { ...prev, [name]: error };
      }
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Prevent double submission
      if (isSubmitting.current || status === 'submitting') {
        return;
      }

      // Check for spam (honeypot)
      const contactData: ContactFormData = {
        nome: formData.nome,
        email: formData.email,
        messaggio: formData.messaggio,
        website: formData.website,
      };

      if (isSpam(contactData)) {
        // Silently "succeed" for bots
        setStatus('success');
        return;
      }

      // Validate all fields
      const nomeError = validateNome(formData.nome);
      const emailError = validateEmail(formData.email);
      const messaggioError = validateMessaggio(formData.messaggio);

      const newErrors: Record<string, string> = {};
      if (nomeError) newErrors.nome = nomeError;
      if (emailError) newErrors.email = emailError;
      if (messaggioError) newErrors.messaggio = messaggioError;

      // Mark all fields as touched
      setTouched({ nome: true, email: true, messaggio: true });
      setErrors(newErrors);

      // If there are errors, don't submit
      if (Object.keys(newErrors).length > 0) {
        // Focus first error field
        const firstErrorField = Object.keys(newErrors)[0] ?? '';
        if (firstErrorField) {
          const element = document.getElementById(firstErrorField);
          element?.focus();
        }
        return;
      }

      // Start submission
      isSubmitting.current = true;
      setStatus('submitting');
      setSubmitError('');

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: sanitizeInput(formData.nome),
            email: sanitizeInput(formData.email),
            oggetto: formData.oggetto,
            messaggio: sanitizeInput(formData.messaggio),
            website: formData.website, // Include honeypot for server-side check
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Errore durante l\'invio del messaggio');
        }

        setStatus('success');
        onSuccess?.();

        // Reset form data
        setFormData({
          nome: '',
          email: '',
          oggetto: subjectOptions[0]?.value || 'info',
          messaggio: '',
          website: '',
        });
        setTouched({});
        setErrors({});
      } catch (error) {
        setStatus('error');
        setSubmitError(
          error instanceof Error
            ? error.message
            : 'Si è verificato un errore. Riprova più tardi.'
        );
      } finally {
        isSubmitting.current = false;
      }
    },
    [formData, status, subjectOptions, onSuccess]
  );

  // Reset form to try again
  const handleReset = useCallback(() => {
    setStatus('idle');
    setSubmitError('');
  }, []);

  // Character count info for message
  const charInfo = getCharacterCountInfo(formData.messaggio, maxMessageLength);

  // Success state
  if (status === 'success') {
    return (
      <div
        className={`p-6 bg-green-50 border border-green-200 rounded-lg ${className}`}
        role="alert"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-green-700 font-semibold">
              Messaggio inviato con successo!
            </p>
            <p className="text-green-600 text-sm mt-1">
              Grazie per avermi contattato. Ti risponderò il prima possibile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      noValidate
      aria-label="Form di contatto"
    >
      {/* Error alert for submission failures */}
      {status === 'error' && submitError && (
        <div
          className="p-4 bg-red-50 border border-red-200 rounded-lg"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-red-700 font-medium">{submitError}</p>
              <button
                type="button"
                onClick={handleReset}
                className="text-red-600 text-sm underline hover:text-red-800 mt-1"
              >
                Riprova
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nome field */}
      <div>
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nome <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(obbligatorio)</span>
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoComplete="name"
          aria-required="true"
          aria-invalid={touched.nome && !!errors.nome}
          aria-describedby={errors.nome ? 'nome-error' : undefined}
          className={`
            w-full px-4 py-3 border rounded-lg transition-colors
            text-base
            focus:ring-2 focus:ring-purple-medium focus:border-transparent
            ${
              touched.nome && errors.nome
                ? 'border-red-400 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            }
          `}
          placeholder="Il tuo nome"
        />
        {touched.nome && errors.nome && (
          <p
            id="nome-error"
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
            role="alert"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.nome}
          </p>
        )}
      </div>

      {/* Email field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email <span className="text-red-500" aria-hidden="true">*</span>
          <span className="sr-only">(obbligatorio)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoComplete="email"
          aria-required="true"
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`
            w-full px-4 py-3 border rounded-lg transition-colors
            text-base
            focus:ring-2 focus:ring-purple-medium focus:border-transparent
            ${
              touched.email && errors.email
                ? 'border-red-400 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            }
          `}
          placeholder="la.tua@email.com"
        />
        {touched.email && errors.email && (
          <p
            id="email-error"
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
            role="alert"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.email}
          </p>
        )}
      </div>

      {/* Oggetto (subject) field */}
      <div>
        <label
          htmlFor="oggetto"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Oggetto
        </label>
        <select
          id="oggetto"
          name="oggetto"
          value={formData.oggetto}
          onChange={handleChange}
          className="
            w-full px-4 py-3 border border-gray-300 rounded-lg
            text-base
            hover:border-gray-400 transition-colors
            focus:ring-2 focus:ring-purple-medium focus:border-transparent
            bg-white
          "
        >
          {subjectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Messaggio field */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor="messaggio"
            className="block text-sm font-medium text-gray-700"
          >
            Messaggio <span className="text-red-500" aria-hidden="true">*</span>
            <span className="sr-only">(obbligatorio)</span>
          </label>
          <span
            className={`text-xs ${
              charInfo.isOverLimit
                ? 'text-red-600 font-medium'
                : charInfo.isNearLimit
                ? 'text-amber-600'
                : 'text-gray-500'
            }`}
            aria-live="polite"
          >
            {charInfo.count}/{maxMessageLength}
          </span>
        </div>
        <textarea
          id="messaggio"
          name="messaggio"
          value={formData.messaggio}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          rows={5}
          aria-required="true"
          aria-invalid={touched.messaggio && !!errors.messaggio}
          aria-describedby={
            errors.messaggio ? 'messaggio-error messaggio-hint' : 'messaggio-hint'
          }
          className={`
            w-full px-4 py-3 border rounded-lg transition-colors resize-none
            text-base
            focus:ring-2 focus:ring-purple-medium focus:border-transparent
            ${
              touched.messaggio && errors.messaggio
                ? 'border-red-400 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            }
          `}
          placeholder="Scrivi qui il tuo messaggio..."
        />
        {touched.messaggio && errors.messaggio && (
          <p
            id="messaggio-error"
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
            role="alert"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.messaggio}
          </p>
        )}
        <p id="messaggio-hint" className="sr-only">
          Il messaggio deve avere almeno 10 caratteri e massimo {maxMessageLength} caratteri.
        </p>
      </div>

      {/* Honeypot field - hidden from users but visible to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">
          Lascia vuoto questo campo
        </label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="
          btn-primary btn-lg w-full
          disabled:opacity-60 disabled:cursor-not-allowed
          relative
        "
        aria-busy={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <span className="opacity-0">Invia messaggio</span>
            <span className="absolute inset-0 flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Invio in corso...
            </span>
          </>
        ) : (
          'Invia messaggio'
        )}
      </button>

      {/* Privacy note */}
      <p className="text-xs text-gray-500 text-center">
        Inviando questo form accetti che i tuoi dati vengano utilizzati per rispondere alla tua richiesta.
      </p>
    </form>
  );
}
