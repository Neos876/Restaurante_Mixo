'use server';

import { revalidatePath } from 'next/cache';
import { completeBooking, deleteBooking } from '@/lib/bookings';

function isValidId(id: unknown): id is string {
  return typeof id === 'string' && /^[\w-]{1,64}$/.test(id);
}

export async function markBookingCompleted(id: string) {
  if (!isValidId(id)) return { ok: false };
  const ok = await completeBooking(id);
  revalidatePath('/reservas');
  return { ok };
}

export async function removeBooking(id: string) {
  if (!isValidId(id)) return { ok: false };
  const ok = await deleteBooking(id);
  revalidatePath('/reservas');
  return { ok };
}
