import { promises as fs } from 'fs';
import path from 'path';

export type Booking = {
  id: string;
  date: string;
  time?: string;
  name: string;
  surname: string;
  email: string;
  telf: string;
  amount: string;
};

export type CompletedBooking = Booking & { completedAt: string };
export type DeletedBooking = Booking & { deletedAt: string };

export type BookingHistory = {
  completed: CompletedBooking[];
  deleted: DeletedBooking[];
};

const bookingsPath = path.join(process.cwd(), 'public', 'bookings.json');
const historyPath = path.join(process.cwd(), 'data', 'bookings-history.json');

async function readBookingsFile(): Promise<Booking[]> {
  const fileData = await fs.readFile(bookingsPath, 'utf-8');
  return JSON.parse(fileData);
}

export async function getBookings(): Promise<Booking[]> {
  const bookings = await readBookingsFile();
  return bookings
    .filter((b) => b && b.id && b.date && b.name)
    .sort((a, b) => `${a.date} ${a.time ?? ''}`.localeCompare(`${b.date} ${b.time ?? ''}`));
}

export async function getHistory(): Promise<BookingHistory> {
  try {
    const fileData = await fs.readFile(historyPath, 'utf-8');
    const history = JSON.parse(fileData);
    return { completed: history.completed ?? [], deleted: history.deleted ?? [] };
  } catch {
    return { completed: [], deleted: [] };
  }
}

async function saveHistory(history: BookingHistory) {
  await fs.mkdir(path.dirname(historyPath), { recursive: true });
  await fs.writeFile(historyPath, JSON.stringify(history, null, 2));
}

async function removeBooking(id: string): Promise<Booking | null> {
  const bookings = await readBookingsFile();
  const booking = bookings.find((b) => b?.id === id);
  if (!booking) return null;

  const remaining = bookings.filter((b) => b && b.id && b.id !== id);
  await fs.writeFile(bookingsPath, JSON.stringify(remaining, null, 2));
  return booking;
}

export async function completeBooking(id: string) {
  const booking = await removeBooking(id);
  if (!booking) return false;

  const history = await getHistory();
  history.completed.push({ ...booking, completedAt: new Date().toISOString() });
  await saveHistory(history);
  return true;
}

export async function deleteBooking(id: string) {
  const booking = await removeBooking(id);
  if (!booking) return false;

  const history = await getHistory();
  history.deleted.push({ ...booking, deletedAt: new Date().toISOString() });
  await saveHistory(history);
  return true;
}
