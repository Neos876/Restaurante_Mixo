  import { NextResponse } from 'next/server';
  import { promises as fs } from 'fs';
  import path from 'path';
  import { v4 as uuidv4 } from 'uuid';  // Importar la función para generar UUIDs
  
  export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const attributeString = searchParams.get('attributeString');
  
    console.log('Received attributeString:', attributeString);
  
    if (!attributeString) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }
  
    // Decodificar la cadena de atributos
    const attributes = JSON.parse(decodeURIComponent(attributeString));
  
    // Generar un ID único y agregarlo a los atributos
    attributes.id = uuidv4();
  
    // Leer el archivo JSON existente
    const filePath = path.join(process.cwd(), 'public', 'bookings.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);
  
    // Agregar los nuevos datos al JSON existente
    data.push(attributes);
  
    // Escribir los nuevos datos de vuelta al archivo
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  
    return NextResponse.json({ message: 'Datos recibidos y guardados', id: attributes.id });
  }
