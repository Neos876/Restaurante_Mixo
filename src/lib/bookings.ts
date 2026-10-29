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

export async function getBookings(): Promise<Booking[]> {
  const filePath = path.join(process.cwd(), 'public', 'bookings.json');
  const fileData = await fs.readFile(filePath, 'utf-8');
  const bookings: Booking[] = JSON.parse(fileData);

  return bookings
    .filter((b) => b && b.id && b.date && b.name)
    .sort((a, b) =>
    `${a.date} ${a.time ?? ''}`.localeCompare(`${b.date} ${b.time ?? ''}`),
  );
}
