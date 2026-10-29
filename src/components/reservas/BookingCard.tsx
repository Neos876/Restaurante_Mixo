import type { Booking } from '@/lib/bookings';

type BookingCardProps = {
  booking: Booking;
  isPast: boolean;
};

export default function BookingCard({ booking, isPast }: BookingCardProps) {
  const initials = `${booking.name.charAt(0)}${booking.surname.charAt(0)}`.toUpperCase();

  return (
    <article
      className={`flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-amber-500/60 ${
        isPast ? 'opacity-60' : ''
      }`}
    >
      <header className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-sm font-semibold text-amber-400"
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold capitalize text-zinc-100">
            {booking.name} {booking.surname}
          </h3>
          <p className="truncate text-xs text-zinc-500">#{booking.id.slice(0, 8)}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isPast ? 'bg-zinc-800 text-zinc-400' : 'bg-emerald-500/15 text-emerald-400'
          }`}
        >
          {isPast ? 'Pasada' : 'Próxima'}
        </span>
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
