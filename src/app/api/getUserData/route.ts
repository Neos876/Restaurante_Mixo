import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    // Leer el archivo JSON existente
    const filePath = path.join(process.cwd(), 'public', 'bookings.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);

    // Supongamos que solo hay un registro de usuario en el JSON
    const userData = data[0];

    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los datos del usuario' }, { status: 500 });
  }
}
