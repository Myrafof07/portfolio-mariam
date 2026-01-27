
import mongoose from 'mongoose';
import Contact from '../models/Contact.js';
import { sendEmail } from '../utils/sendEmail.js';

export async function handleContact(req, res, next) {
  try {
    const { name, email, message, consent } = req.body;

    // 1) Envoi email (ou simulation si SMTP non configuré)
    const subject = `Nouveau message de contact – ${name}`;
    const text = `De: ${name} <${email}>\n\n${message}`;
    const html = `
      <p><strong>De:</strong> ${name} &lt;${email}&gt;</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replaceAll('\n', '<br/>')}</p>
    `.trim();

    await sendEmail({
      subject,
      text,
      html
    });

    // 2) Sauvegarde DB (si connecté)
    const dbReady = mongoose.connection?.readyState === 1;
    if (dbReady) {
      await Contact.create({ name, email, message, consent: !!consent });
    }

    return res.status(200).json({
      ok: true,
      saved: dbReady,
      message: dbReady
        ? 'Message envoyé et sauvegardé. Merci !'
        : 'Message envoyé (non sauvegardé car DB non configurée). Merci !'
    });
  } catch (err) {
    return next(err);
  }
}

// Petit helper anti-XSS pour l'HTML d'email
function escapeHtml(str = '') {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
