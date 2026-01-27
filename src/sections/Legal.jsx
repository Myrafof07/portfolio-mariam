import { useState } from 'react';

/**
 * Page Legal : Mentions légales, Politique de confidentialité, Cookies
 */
export default function Legal() {
  const [activeTab, setActiveTab] = useState('legal'); // 'legal', 'privacy', 'cookies'

  return (
    <section id="legal" className="min-h-screen bg-gray-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Titres et tabs */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Mentions légales</h1>

        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('legal')}
            className={`px-4 py-3 font-semibold transition border-b-2 ${
              activeTab === 'legal'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Mentions légales
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-3 font-semibold transition border-b-2 ${
              activeTab === 'privacy'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Politique de confidentialité
          </button>
          <button
            onClick={() => setActiveTab('cookies')}
            className={`px-4 py-3 font-semibold transition border-b-2 ${
              activeTab === 'cookies'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Cookies
          </button>
        </div>

        {/* Mentions légales */}
        {activeTab === 'legal' && (
          <div className="prose prose-invert max-w-none space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Éditeur du site</h2>
              <p>
                <strong>Nom :</strong> Mariam Fofana<br />
                <strong>Email :</strong> mf8013006@gmail.com<br />
                <strong>Adresse :</strong> Paris, France
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Hébergeur</h2>
              <p>
                Le site est hébergé par :<br />
                <strong>Vercel Inc.</strong><br />
                <a href="https://vercel.com" className="text-purple-400 hover:text-purple-300 underline">
                  https://vercel.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Propriété intellectuelle</h2>
              <p>
                Tous les contenus du site (textes, images, logos, vidéos) sont protégés par les droits d'auteur.
                Toute reproduction ou utilisation sans autorisation est interdite.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Limitation de responsabilité</h2>
              <p>
                L'auteur du site s'efforce de maintenir à jour les informations présentes. Cependant, il ne peut pas
                être tenu responsable des imprécisions, omissions ou erreurs qui pourraient s'y trouver.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Loi applicable</h2>
              <p>
                Ce site est régi par la loi française. Tout litige sera soumis à la juridiction des tribunaux
                compétents.
              </p>
            </div>
          </div>
        )}

        {/* Politique de confidentialité */}
        {activeTab === 'privacy' && (
          <div className="prose prose-invert max-w-none space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Données personnelles collectées</h2>
              <p>
                Lors de l'utilisation du formulaire de contact, nous collectons :
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Votre nom</li>
                <li>Votre adresse email</li>
                <li>Votre message</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Finalité du traitement</h2>
              <p>
                Vos données sont collectées uniquement pour :
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Vous répondre via email</li>
                <li>Traiter votre demande</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Durée de conservation</h2>
              <p>
                Vos données sont conservées pendant 1 an à compter de la date de réception. Après cette période,
                elles sont supprimées définitivement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Vos droits (RGPD)</h2>
              <p>
                Conformément au RGPD (Règlement Général sur la Protection des Données), vous disposez des droits
                suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li><strong>Droit d'accès :</strong> Consultez vos données</li>
                <li><strong>Droit de rectification :</strong> Corrigez vos données</li>
                <li><strong>Droit à l'effacement :</strong> Demandez la suppression</li>
                <li><strong>Droit à la portabilité :</strong> Récupérez vos données</li>
                <li><strong>Droit d'opposition :</strong> Refusez le traitement</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Pour exercer vos droits</h2>
              <p>
                Contactez-moi via le formulaire de contact ou à l'adresse email :
                <strong> mf8013006@gmail.com</strong>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Sécurité</h2>
              <p>
                Vos données sont protégées par :
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>HTTPS (chiffrement)</li>
                <li>Validation des données</li>
                <li>Protection contre les injections</li>
              </ul>
            </div>
          </div>
        )}

        {/* Cookies */}
        {activeTab === 'cookies' && (
          <div className="prose prose-invert max-w-none space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte stocké sur votre appareil lors de la visite d'un site web.
                Il permet de mémoriser vos préférences et votre historique.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Cookies utilisés sur ce site</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">🔐 Cookies essentiels</h3>
                  <p className="text-white/80">
                    Permettent le fonctionnement du site. Obligatoires.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🔑 Cookies d'authentification</h3>
                  <p className="text-white/80">
                    Sauvegardent votre session admin. Utilisés uniquement pour l'accès sécurisé.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Gérer vos cookies</h2>
              <p>
                Vous pouvez configurer votre navigateur pour :
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80">
                <li>Accepter ou refuser les cookies</li>
                <li>Être averti avant d'accepter</li>
                <li>Supprimer les cookies stockés</li>
              </ul>
              <p className="mt-4 text-sm">
                Consultez l'aide de votre navigateur pour les instructions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Consentement</h2>
              <p>
                En utilisant ce site, vous acceptez l'utilisation des cookies essentiels.
                Les autres cookies nécessitent votre consentement explicite.
              </p>
            </div>
          </div>
        )}

        {/* Bouton retour */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <a
            href="/#contact"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            ← Retour au site
          </a>
        </div>
      </div>
    </section>
  );
}
