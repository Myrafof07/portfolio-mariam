import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import api from '../api/apiClient';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';

/**
 * Formulaire de contact moderne et accessible
 */
export default function FormContact() {
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const { values, errors, touched, isLoading, handleChange, handleBlur, handleSubmit, resetForm, setFieldError } =
    useForm(
      {
        name: '',
        email: '',
        message: '',
        consent: false,
      },
      onFormSubmit
    );

  async function onFormSubmit(formData) {
    // Reset status
    setSubmitStatus(null);

    // Validation côté client
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide';
    }

    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    if (!formData.consent) {
      newErrors.consent = 'Vous devez accepter la politique de confidentialité';
    }

    // Afficher erreurs si présentes
    if (Object.keys(newErrors).length > 0) {
      Object.entries(newErrors).forEach(([field, msg]) => {
        setFieldError(field, msg);
      });
      return;
    }

    try {
      // Appel API
      const response = await api.postContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        consent: formData.consent,
      });

      if (response.ok) {
        setSubmitStatus('success');
        resetForm();

        // Masquer le message après 5s
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      {/* Message de succès */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-600/20 border border-green-500 rounded-lg flex gap-3 items-start">
          <FiCheck className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-green-100">Message envoyé avec succès !</p>
            <p className="text-sm text-green-200/80">Merci, je vous répondrai bientôt.</p>
          </div>
        </div>
      )}

      {/* Message d'erreur */}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-600/20 border border-red-500 rounded-lg flex gap-3 items-start">
          <FiAlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-red-100">Erreur lors de l'envoi</p>
            <p className="text-sm text-red-200/80">Veuillez réessayer plus tard.</p>
          </div>
        </div>
      )}

      {/* Champ Nom */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-2 text-white">
          Nom <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          placeholder="Votre nom"
          className={`w-full px-4 py-2 rounded-lg bg-white/10 border transition text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
            touched.name && errors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-white/20 focus:ring-purple-500'
          }`}
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
        />
        {touched.name && errors.name && (
          <p id="name-error" className="text-red-400 text-sm mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Champ Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2 text-white">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          placeholder="votre.email@example.com"
          className={`w-full px-4 py-2 rounded-lg bg-white/10 border transition text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
            touched.email && errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-white/20 focus:ring-purple-500'
          }`}
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
        />
        {touched.email && errors.email && (
          <p id="email-error" className="text-red-400 text-sm mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Champ Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-2 text-white">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          placeholder="Votre message..."
          rows={5}
          className={`w-full px-4 py-2 rounded-lg bg-white/10 border transition text-white placeholder-white/50 focus:outline-none focus:ring-2 resize-none ${
            touched.message && errors.message
              ? 'border-red-500 focus:ring-red-500'
              : 'border-white/20 focus:ring-purple-500'
          }`}
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
        />
        {touched.message && errors.message && (
          <p id="message-error" className="text-red-400 text-sm mt-1">
            {errors.message}
          </p>
        )}
      </div>

      {/* Checkbox Consentement */}
      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          checked={values.consent}
          onChange={handleChange}
          disabled={isLoading}
          className="mt-1 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
          aria-invalid={touched.consent && !!errors.consent}
          aria-describedby={touched.consent && errors.consent ? 'consent-error' : undefined}
        />
        <label htmlFor="consent" className="text-sm text-white/80 cursor-pointer">
          J'accepte la{' '}
          <a href="/legal" className="text-purple-400 hover:text-purple-300 underline">
            politique de confidentialité
          </a>{' '}
          et le traitement de mes données <span className="text-red-400">*</span>
        </label>
      </div>
      {touched.consent && errors.consent && (
        <p id="consent-error" className="text-red-400 text-sm">
          {errors.consent}
        </p>
      )}

      {/* Bouton Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
      >
        <FiSend size={18} />
        {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>

      <p className="text-xs text-white/50 text-center">
        Les champs marqués d'un <span className="text-red-400">*</span> sont obligatoires
      </p>
    </form>
  );
}
