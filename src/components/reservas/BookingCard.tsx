'use client';

import { useTransition } from 'react';
import type { Booking } from '@/lib/bookings';
import { markBookingCompleted, removeBooking } from '@/app/reservas/actions';

type BookingCardProps = {
  booking: Booking;
  isPast: boolean;
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export default function BookingCard({ booking, isPast }: BookingCardProps) {
  const [isPending, startTransition] = useTransition();
  const initials = `${booking.name.charAt(0)}${booking.surname.charAt(0)}`.toUpperCase();
  const fullName = `${booking.name} ${booking.surname}`;

  const handleComplete = () => {
    startTransition(async () => {
      const { ok } = await markBookingCompleted(booking.id);
      if (!ok) alert('No se pudo marcar la reserva como realizada.');
    });
  };

  const handleDelete = () => {
    if (!confirm(`¿Eliminar la reserva de ${fullName}?`)) return;
    startTransition(async () => {
      const { ok } = await removeBooking(booking.id);
      if (!ok) alert('No se pudo eliminar la reserva.');
    });
  };

  return (
    <article
      aria-busy={isPending}
      className={`flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-all hover:border-amber-500/60 ${
        isPast ? 'opacity-70' : ''
      } ${isPending ? 'pointer-events-none scale-[0.98] opacity-40' : ''}`}
    >
      <header className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-sm font-semibold text-amber-400"
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold capitalize text-zinc-100">{fullName}</h3>
          <p className="truncate text-xs text-zinc-500">
            #{booking.id.slice(0, 8)} · {isPast ? 'Pasada' : 'Próxima'}
          </p>
        </div>
        <div className="flex shrink-0 gap-1.5">
          <button
            type="button"
            onClick={handleComplete}
            disabled={isPending}
            title="Marcar como realizada"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-colors hover:bg-emerald-500 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
          >
            <CheckIcon />
            <span className="sr-only">Marcar como realizada la reserva de {fullName}</span>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            title="Eliminar reserva"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 transition-colors hover:bg-red-500 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
          >
            <CrossIcon />
            <span className="sr-only">Eliminar la reserva de {fullName}</span>
          </button>
        </div>
      </header>

      <dl className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-zinc-950/60 px-3 py-2">
          <dt className="text-xs text-zinc-500">Hora</dt>
          <dd className="text-lg font-semibold text-zinc-100">{booking.time ?? 'Sin hora'}</dd>
        </div>
        <div className="rounded-lg bg-zinc-950/60 px-3 py-2">
          <dt className="text-xs text-zinc-500">Personas</dt>
          <dd className="text-lg font-semibold text-zinc-100">{booking.amount}</dd>
        </div>
      </dl>

      <dl className="flex flex-col gap-2 border-t border-zinc-800 pt-4 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-zinc-500">Email</dt>
          <dd className="truncate">
            <a href={`mailto:${booking.email}`} className="text-zinc-300 hover:text-amber-400">
              {booking.email}
            </a>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-zinc-500">Teléfono</dt>
          <dd>
            <a href={`tel:${booking.telf}`} className="text-zinc-300 hover:text-amber-400">
              {booking.telf}
            </a>
          </dd>
        </div>
      </dl>
    </article>
  );
}
