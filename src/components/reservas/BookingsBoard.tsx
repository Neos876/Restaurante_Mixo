'use client';

import { useMemo, useState } from 'react';
import type { Booking } from '@/lib/bookings';
import BookingCard from './BookingCard';
import StatsBar from './StatsBar';

type Filter = 'upcoming' | 'past' | 'all';

const filters: { value: Filter; label: string }[] = [
  { value: 'upcoming', label: 'Próximas' },
  { value: 'past', label: 'Pasadas' },
  { value: 'all', label: 'Todas' },
];

function formatDate(date: string) {
  const label = new Date(`${date}T00:00:00`).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function BookingsBoard({ bookings, today }: { bookings: Booking[]; today: string }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const upcoming = bookings.filter((b) => b.date >= today);

  const groups = useMemo(() => {
    const search = query.trim().toLowerCase();
    const visible = bookings.filter((b) => {
      if (filter === 'upcoming' && b.date < today) return false;
      if (filter === 'past' && b.date >= today) return false;
      if (!search) return true;
      return [b.name, b.surname, b.email, b.telf].some((v) => v.toLowerCase().includes(search));
    });
    if (filter === 'past') visible.reverse();

    const byDate = new Map<string, Booking[]>();
    visible.forEach((b) => byDate.set(b.date, [...(byDate.get(b.date) ?? []), b]));
    return [...byDate.entries()];
  }, [bookings, filter, query, today]);

  return (
    <div className="flex flex-col gap-8">
      <StatsBar
        total={bookings.length}
        upcoming={upcoming.length}
        today={bookings.filter((b) => b.date === today).length}
        guests={upcoming.reduce((sum, b) => sum + Number(b.amount || 0), 0)}
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Filtrar reservas" className="flex gap-1 rounded-lg bg-zinc-900 p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.value ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="w-full md:w-80">
          <span className="sr-only">Buscar reserva</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, email o teléfono"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none"
          />
        </label>
      </div>

      {groups.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-800 p-10 text-center text-zinc-500">
          No hay reservas que coincidan.
        </p>
      ) : (
        groups.map(([date, items]) => (
          <section key={date} className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between border-b border-zinc-800 pb-2">
              <h2 className="text-lg font-semibold text-zinc-100">{formatDate(date)}</h2>
              <p className="text-sm text-zinc-500">
                {items.length} {items.length === 1 ? 'reserva' : 'reservas'} ·{' '}
                {items.reduce((sum, b) => sum + Number(b.amount || 0), 0)} personas
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((b) => (
                <BookingCard key={b.id} booking={b} isPast={b.date < today} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
