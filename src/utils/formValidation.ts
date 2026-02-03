/**
 * Form validation utilities for contact form
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ContactFormData {
  nome: string;
  email: string;
  messaggio: string;
  website?: string; // Honeypot field
}

/**
 * Validate nome field
 */
export function validateNome(nome: string): string | null {
  const trimmed = nome?.trim() || '';

  if (!trimmed) {
    return 'Il nome è obbligatorio';
  }

  if (trimmed.length < 2) {
    return 'Il nome deve avere almeno 2 caratteri';
  }

  if (trimmed.length > 100) {
    return 'Il nome non può superare 100 caratteri';
  }

  // Check for suspicious patterns (optional spam prevention)
  if (/[<>{}[\]\\]/.test(trimmed)) {
    return 'Il nome contiene caratteri non validi';
  }

  return null;
}

/**
 * Validate email field
 */
export function validateEmail(email: string): string | null {
  const trimmed = email?.trim() || '';

  if (!trimmed) {
    return "L'email è obbligatoria";
  }

  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmed)) {
    return 'Inserisci un indirizzo email valido';
  }

  if (trimmed.length > 255) {
    return 'Email troppo lunga';
  }

  return null;
}

/**
 * Validate messaggio field
 */
export function validateMessaggio(messaggio: string): string | null {
  const trimmed = messaggio?.trim() || '';

  if (!trimmed) {
    return 'Il messaggio è obbligatorio';
  }

  if (trimmed.length < 10) {
    return 'Il messaggio deve avere almeno 10 caratteri';
  }

  if (trimmed.length > 5000) {
    return 'Il messaggio non può superare 5000 caratteri';
  }

  return null;
}

/**
 * Validate entire form
 */
export function validateForm(formData: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  const nomeError = validateNome(formData.nome);
  if (nomeError) {
    errors.push({ field: 'nome', message: nomeError });
  }

  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.push({ field: 'email', message: emailError });
  }

  const messaggioError = validateMessaggio(formData.messaggio);
  if (messaggioError) {
    errors.push({ field: 'messaggio', message: messaggioError });
  }

  return errors;
}

/**
 * Check if honeypot field is filled (spam indicator)
 */
export function isSpam(formData: ContactFormData): boolean {
  return !!(formData.website && formData.website.length > 0);
}

/**
 * Convert validation errors array to error map
 */
export function errorsToMap(errors: ValidationError[]): Record<string, string> {
  return errors.reduce(
    (acc, err) => ({
      ...acc,
      [err.field]: err.message,
    }),
    {} as Record<string, string>
  );
}

/**
 * Sanitize string input (basic XSS prevention)
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * Get character count info for textarea
 */
export function getCharacterCountInfo(
  text: string,
  maxLength: number = 5000
): {
  count: number;
  remaining: number;
  isNearLimit: boolean;
  isOverLimit: boolean;
} {
  const count = text?.length || 0;
  const remaining = maxLength - count;

  return {
    count,
    remaining,
    isNearLimit: remaining <= 500 && remaining > 0,
    isOverLimit: remaining < 0,
  };
}
