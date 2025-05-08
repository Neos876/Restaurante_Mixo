import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const attributeString = searchParams.get('attributeString');

  if (!attributeString) {
    return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
  }

  try {
    const attributes = JSON.parse(attributeString);

    // Enviar los datos a la API existente para guardar la reserva
    await axios.get('http://localhost:3000/api/users', {
      params: { attributeString }
    });

    // Elaborar el contenido del correo con los datos recibidos del attributeString
    const emailContent = `
      Hola ${attributes.name} ${attributes.surname},

      Gracias por tu reserva. Aquí están los detalles de tu reserva:
      
      Fecha: ${attributes.date}
      Cantidad: ${attributes.amount}
      Hora: 21:00
      Teléfono: ${attributes.telf}

      Saludos,
      Restaurante mixo
    `;

    console.log(emailContent)

    // Enviar el correo con los datos recibidos del attributeString
    await sendEmail(attributes.email, 'Confirmación de Reserva', emailContent);

    return NextResponse.json({ message: 'Reserva creada y correo enviado' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al procesar la reserva' }, { status: 500 });
  }
}


// Función para enviar correos
async function sendEmail(to: string, subject: string, text: string) {
  const nodemailer = require('nodemailer');

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Cambiar por tu servidor SMTP
    port: 465,
    secure: true, // true para 465, false para otros puertos
    auth: {
      user: 'alex786587@gmail.com', // tu usuario de correo
      pass: 'bwju uixm hdfq vdhv' // tu contraseña de correo
    }
  });

  let info = await transporter.sendMail({
    from: '"Alex Diaz" <alex786587@gmail.com>', // Remitente
    to: to, // Destinatario
    subject: subject, // Asunto
    text: text, // Contenido del correo
  });

  console.log('Correo enviado: %s', info.messageId);
}
