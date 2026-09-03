'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import CardPreview from '@/components/CardPreview';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://card-validation-assessment.onrender.com';

type Status = 'idle' | 'checking' | 'valid' | 'invalid';

interface ApiSuccess {
  cardNumber: string;
  valid: boolean;
}

interface ApiError {
  message: string[] | string;
  error: string;
  statusCode: number;
}

function groupDigits(raw: string): string {
  return raw.replace(/(.{4})/g, '$1 ').trim();
}

export default function Home() {
  const [rawDigits, setRawDigits] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState<string[]>([]);
  const [isFirstRequest, setIsFirstRequest] = useState(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 19);
    setRawDigits(digitsOnly);
    if (status !== 'checking') {
      setStatus('idle');
      setFeedback([]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rawDigits.length === 0) {
      toast.error('Enter a card number first');
      return;
    }

    setStatus('checking');
    setFeedback([]);

    if (isFirstRequest) {
      toast.message('Waking up the server', {
        description: 'First request to a free-tier server can take up to a minute.',
      });
    }

    try {
      const res = await fetch(`${API_URL}/card/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardNumber: rawDigits }),
      });

      setIsFirstRequest(false);

      if (res.ok) {
        const data: ApiSuccess = await res.json();
        if (data.valid) {
          setStatus('valid');
          toast.success('Card number is valid', {
            description: 'It passes the Luhn checksum.',
          });
        } else {
          setStatus('invalid');
          setFeedback(['This number does not pass the Luhn checksum.']);
          toast.error('Card number is invalid', {
            description: 'It fails the Luhn checksum.',
          });
        }
        return;
      }

      const errorData: ApiError = await res.json();
      const messages = Array.isArray(errorData.message)
        ? errorData.message
        : [errorData.message];

      setStatus('invalid');
      setFeedback(messages);
      toast.error(messages[0] ?? 'Request was rejected', {
        description: messages.length > 1 ? `+${messages.length - 1} more issue(s)` : undefined,
      });
    } catch (err) {
      setIsFirstRequest(false);
      setStatus('invalid');
      setFeedback(['Could not reach the server. It may still be waking up — try again in a moment.']);
      toast.error('Could not reach the server', {
        description: 'It may still be waking up on the free tier — try again shortly.',
      });
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          Is this a real card number?
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Checked instantly against the Luhn checksum. Nothing is stored.
        </p>
      </div>

      <CardPreview groupedDigits={groupDigits(rawDigits)} status={status} />

      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-sm">
        <label htmlFor="cardNumber" className="mb-2 block text-xs text-ink-muted">
          Card number
        </label>
        <input
          id="cardNumber"
          inputMode="numeric"
          autoComplete="off"
          placeholder="4532 0151 1283 0366"
          value={groupDigits(rawDigits)}
          onChange={handleChange}
          className="focus-ring w-full rounded-lg border border-surface-card bg-surface px-4 py-3 font-mono text-sm tracking-wide text-ink placeholder:text-ink-faint"
        />

        <button
          type="submit"
          disabled={status === 'checking'}
          className="mt-4 w-full rounded-lg bg-brass px-4 py-3 font-display text-sm font-medium text-void transition-colors hover:bg-brass-dim disabled:opacity-60"
        >
          {status === 'checking' ? 'Checking…' : 'Check card'}
        </button>

        {feedback.length > 0 && (
          <ul className="animate-rise mt-4 space-y-1 rounded-lg border border-crimson/30 bg-crimson/5 px-4 py-3">
            {feedback.map((msg) => (
              <li key={msg} className="text-xs text-crimson">
                {msg}
              </li>
            ))}
          </ul>
        )}
      </form>

      <p className="mt-10 text-center text-xs text-ink-faint">
        Backend runs on a free-tier instance — the first check after inactivity
        can take up to a minute to respond.
      </p>
    </main>
  );
}
