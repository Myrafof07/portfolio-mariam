import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ from, to, subject, text, html }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('ℹ RESEND_API_KEY non défini. Email simulé (aucun envoi).');
    console.info('--- EMAIL SIMULÉ ---');
    console.info('To:', to);
    console.info('Subject:', subject);
    console.info('Text:', text);
    console.info('--------------------');
    return { simulated: true };
  }

  try {
    const info = await resend.emails.send({
      from: 'Portfolio Mariam <onboarding@resend.dev>',
      to: to || process.env.MAIL_TO,
      subject,
      text,
      html
    });

    console.info('✅ Email envoyé via Resend, id:', info.data?.id);
    return { messageId: info.data?.id };

  } catch (error) {
    console.warn('⚠️ Erreur Resend (email non envoyé):', error.message);
    return { simulated: true, error: error.message };
  }
}