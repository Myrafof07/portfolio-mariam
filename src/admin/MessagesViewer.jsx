import { useFetch } from '../hooks/useFetch';
import { FiMail, FiCheckCircle } from 'react-icons/fi';

/**
 * Viewer pour messages de contact
 */
export default function MessagesViewer() {
  const { data: messages, isLoading, error } = useFetch('adminGetMessages', []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Messages de contact ({messages?.length || 0})</h2>
        <p className="text-white/60 text-sm mt-2">Derniers messages reçus</p>
      </div>

      {isLoading ? (
        <p className="text-white/50">Chargement...</p>
      ) : error ? (
        <div className="p-4 bg-orange-600/20 border border-orange-500 rounded-lg">
          <p className="text-orange-200 text-sm">{error.message}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {(messages || []).length === 0 ? (
            <p className="text-white/50 text-center py-12">Aucun message pour le moment.</p>
          ) : (
            (messages || []).map((msg, idx) => (
              <div
                key={msg._id || idx}
                className="bg-slate-800/60 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <FiMail className="text-purple-400" />
                      {msg.name}
                    </h3>
                    <p className="text-purple-400 text-sm">{msg.email}</p>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <FiCheckCircle size={16} />
                    {msg.consent ? 'RGPD accepté' : 'Non accepté'}
                  </div>
                </div>

                <div className="bg-slate-900/40 rounded-lg p-4 mb-4">
                  <p className="text-white/90 leading-relaxed whitespace-pre-wrap break-words">
                    {msg.message}
                  </p>
                </div>

                <div className="flex justify-between text-xs text-white/50">
                  <span>
                    Reçu le {new Date(msg.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
