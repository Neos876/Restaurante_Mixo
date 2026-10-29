import '../globals.css';
import BookingsBoard from '@/components/reservas/BookingsBoard';
import { getBookings } from '@/lib/bookings';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Reservas | Restaurante Mixo',
  description: 'Panel de reservas del Restaurante Mixo',
};

export default async function ReservasPage() {
  const bookings = await getBookings();
  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });

  return (
    <main className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:px-8">
        <header className="flex flex-col gap-1">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-400">Restaurante Mixo</p>
          <h1 className="text-balance text-3xl font-semibold md:text-4xl">Panel de reservas</h1>
          <p className="text-zinc-400">Todas las reservas recibidas desde el formulario, ordenadas por fecha.</p>
        </header>
        <BookingsBoard bookings={bookings} today={today} />
      </div>
    </main>
  );
}
