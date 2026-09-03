'use client';

type Status = 'idle' | 'checking' | 'valid' | 'invalid';

interface CardPreviewProps {
  groupedDigits: string;
  status: Status;
}

export default function CardPreview({ groupedDigits, status }: CardPreviewProps) {
  const placeholder = '•••• •••• •••• ••••';
  const display = groupedDigits.length > 0 ? groupedDigits : placeholder;

  return (
    <div className="relative">
      <div
        className={`card-face relative aspect-[1.586/1] w-full max-w-sm rounded-card p-6 sm:p-7 transition-transform duration-300 ${
          status === 'checking' ? 'scale-[0.98]' : ''
        }`}
      >
        {/* chip */}
        <div className="chip h-8 w-11 rounded-md" />

        {/* mag stripe hint on the back edge, purely decorative */}
        <div className="magstripe absolute right-0 top-0 h-full w-3 rounded-r-card opacity-70" />

        {/* card number */}
        <div className="mt-8 sm:mt-10">
          <p
            className={`emboss font-mono text-xl sm:text-2xl tracking-wider transition-colors duration-300 ${
              groupedDigits.length > 0 ? 'text-ink' : 'text-ink-faint'
            }`}
          >
            {display}
          </p>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink-muted">Cardholder</p>
            <p className="emboss mt-1 font-mono text-sm text-ink-muted">Not verified</p>
          </div>
          <p className="font-display text-sm font-medium text-ink-muted">card check</p>
        </div>

        {/* stamp overlay */}
        {status === 'valid' && (
          <div
            key="valid"
            className="animate-stamp pointer-events-none absolute right-6 top-6 rotate-[-12deg] rounded-md border-2 border-mint px-3 py-1"
          >
            <span className="font-display text-sm font-bold tracking-wide text-mint">
              VALID
            </span>
          </div>
        )}
        {status === 'invalid' && (
          <div
            key="invalid"
            className="animate-stamp pointer-events-none absolute right-6 top-6 rotate-[-12deg] rounded-md border-2 border-crimson px-3 py-1"
          >
            <span className="font-display text-sm font-bold tracking-wide text-crimson">
              DECLINED
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
