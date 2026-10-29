import { NextResponse } from 'next/server';
import { GET as saveBooking } from '../users/route';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const attributeString = searchParams.get('attributeString');

  if (!attributeString) {
    return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
  }

  try {
    const attributes = JSON.parse(attributeString);

    // Enviar los datos a la API existente para guardar la reserva
    const saved = await saveBooking(request);
    if (!saved.ok) return saved;
    const { id } = await saved.json();

    // Elaborar el contenido del correo con los datos recibidos del attributeString
    const emailContent = `
      Hola ${attributes.name} ${attributes.surname},

      Gracias por tu reserva. Aquí están los detalles de tu reserva:
      
      Fecha: ${attributes.date}
      Cantidad: ${attributes.amount}
      Hora: ${attributes.time || 'No indicada'}
      Teléfono: ${attributes.telf}

      Saludos,
      Restaurante mixo
    `;

    try {
      await sendEmail(attributes.email, 'Confirmación de Reserva', emailContent);
      return NextResponse.json({ id, bookingCreated: true, emailSent: true });
    } catch (error) {
      const code = (error as { code?: string }).code || 'EMAIL_FAILED';
      console.error('No se pudo enviar la confirmación de reserva:', code);
      return NextResponse.json({
        id,
        bookingCreated: true,
        emailSent: false,
        message: 'Reserva registrada, pero no se pudo enviar el correo. No repitas la reserva.',
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al procesar la reserva' }, { status: 500 });
  }
}


// Función para enviar correos
async function sendEmail(to: string, subject: string, text: string) {
  const nodemailer = require('nodemailer');

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw Object.assign(new Error('Correo no configurado'), { code: 'EMAIL_NOT_CONFIGURED' });

  const transporter = nodemailer.createTransport({
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    host: 'smtp.gmail.com', // Cambiar por tu servidor SMTP
    port: 465,
    secure: true, // true para 465, false para otros puertos
    auth: {
      user,
      pass,
    }
  });

  await transporter.sendMail({
    from: { name: 'Restaurante Mixo', address: user },
    to: to, // Destinatario
    subject: subject, // Asunto
    text: text, // Contenido del correo
  });


}
