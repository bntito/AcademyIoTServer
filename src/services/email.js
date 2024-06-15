const nodemailer = require('nodemailer');

// Función para enviar un correo electrónico
exports.sendMail = async (options) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT_TLS,
      secure: false,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    // Configura las opciones del correo
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: options.email,
      subject: options.subject,
      text: 'Envio de correos',
      attachDataUrls: true,
      html: `<h2>${options.message}</h2>`
    }
    const info = await transporter.sendMail(mailOptions);
    console.log('Se envío el correo electrónico correctamente', info.response);
    return info.response;
  } catch (error) {
    console.log('Error al enviar correo electrónico', error);
    return error;
  }
};