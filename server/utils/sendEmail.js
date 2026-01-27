
import nodemailer from 'nodemailer';

export async function sendEmail({ from, to, subject, text, html }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  // Si SMTP non configuré, simule seulement
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn('ℹ SMTP non configuré. Email simulé (aucun envoi).');
    console.info('--- EMAIL SIMULÉ ---');
    console.info('To:', to);
    console.info('Subject:', subject);
    console.info('Text:', text);
    console.info('HTML:', html);
    console.info('--------------------');
    return { simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const info = await transporter.sendMail({
      from: from || process.env.MAIL_FROM || 'no-reply@example.com',
      to: to || process.env.MAIL_TO,
      subject,
      text,
      html
    });

    return { messageId: info.messageId };
  } catch (error) {
    // En cas d'erreur SMTP, log et continue (simule)
    console.warn('⚠️ Erreur SMTP (email non envoyé, mail simulé):', error.message);
    return { simulated: true, error: error.message };
  }
}