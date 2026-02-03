import { NextRequest, NextResponse } from 'next/server';
import {
  validateNome,
  validateEmail,
  validateMessaggio,
  sanitizeInput,
  type ContactFormData,
} from '@/utils/formValidation';

// Web3Forms API endpoint
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Get API key from environment variable
const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || '';

// Rate limiting: simple in-memory store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // Max 5 requests per minute per IP

interface ContactRequestBody extends ContactFormData {
  oggetto?: string;
}

/**
 * Check rate limit for IP
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    // New window or first request
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  // Increment count
  record.count += 1;
  rateLimitStore.set(ip, record);
  return true;
}

/**
 * Clean up old rate limit entries periodically
 */
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now - record.timestamp > RATE_LIMIT_WINDOW * 2) {
      rateLimitStore.delete(ip);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}

/**
 * Map subject value to readable label
 */
function getSubjectLabel(oggetto?: string): string {
  const labels: Record<string, string> = {
    info: 'Informazioni generali',
    evento: 'Richiesta per evento',
    collaborazione: 'Collaborazione',
    altro: 'Altro',
  };
  return labels[oggetto || ''] || oggetto || 'Contatto dal sito';
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Troppe richieste. Riprova tra un minuto.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body: ContactRequestBody = await request.json();

    // Check honeypot (spam check)
    if (body.website && body.website.length > 0) {
      // Silently "succeed" for bots - they won't know it failed
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    const nomeError = validateNome(body.nome);
    if (nomeError) {
      return NextResponse.json(
        { error: nomeError, field: 'nome' },
        { status: 400 }
      );
    }

    const emailError = validateEmail(body.email);
    if (emailError) {
      return NextResponse.json(
        { error: emailError, field: 'email' },
        { status: 400 }
      );
    }

    const messaggioError = validateMessaggio(body.messaggio);
    if (messaggioError) {
      return NextResponse.json(
        { error: messaggioError, field: 'messaggio' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      nome: sanitizeInput(body.nome),
      email: sanitizeInput(body.email),
      oggetto: getSubjectLabel(body.oggetto),
      messaggio: sanitizeInput(body.messaggio),
    };

    // Check if Web3Forms API key is configured
    if (!WEB3FORMS_ACCESS_KEY) {
      console.error('WEB3FORMS_ACCESS_KEY is not configured');

      // In development, log the message instead of failing
      if (process.env.NODE_ENV === 'development') {
        console.log('=== Contact Form Submission (DEV) ===');
        console.log('Nome:', sanitizedData.nome);
        console.log('Email:', sanitizedData.email);
        console.log('Oggetto:', sanitizedData.oggetto);
        console.log('Messaggio:', sanitizedData.messaggio);
        console.log('=====================================');

        return NextResponse.json({
          success: true,
          message: 'Messaggio ricevuto (modalità sviluppo)',
        });
      }

      return NextResponse.json(
        { error: 'Servizio email non configurato. Contattaci direttamente via email.' },
        { status: 503 }
      );
    }

    // Send to Web3Forms
    const web3Response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: sanitizedData.nome,
        email: sanitizedData.email,
        subject: `${sanitizedData.oggetto} - Sito Web Debora Grataroli`,
        message: sanitizedData.messaggio,
        from_name: 'Sito Web Debora Grataroli',
        // Additional Web3Forms options
        botcheck: false, // We handle spam ourselves with honeypot
        replyto: sanitizedData.email,
      }),
    });

    const web3Data = await web3Response.json();

    if (!web3Response.ok || !web3Data.success) {
      console.error('Web3Forms error:', web3Data);
      return NextResponse.json(
        { error: 'Errore durante l\'invio del messaggio. Riprova più tardi.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Messaggio inviato con successo!',
    });
  } catch (error) {
    console.error('Contact form error:', error);

    // Check for JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Richiesta non valida' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Si è verificato un errore. Riprova più tardi.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
