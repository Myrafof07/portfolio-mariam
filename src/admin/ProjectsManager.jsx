import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import api from '../api/apiClient';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

/**
 * Manager pour CRUD Projects
 */
export default function ProjectsManager() {
  const { data: projects, isLoading, error } = useFetch('adminGetProjects', []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', tags: '', link: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = {
        title: form.title,
        description: form.description,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        link: form.link || null
      };

      if (editingId) {
        await api.adminUpdateProject(editingId, data);
      } else {
        await api.adminCreateProject(data);
      }

      setForm({ title: '', description: '', tags: '', link: '' });
      setEditingId(null);
      setIsFormOpen(false);
      // Reload
      window.location.reload();
    } catch (err) {
      console.error('Erreur:', err);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Êtes-vous sûr ?')) return;
    try {
      await api.adminDeleteProject(id);
      window.location.reload();
    } catch (err) {
      console.error('Erreur:', err);
    }
  }

  function handleEdit(project) {
    setForm({
      title: project.title,
      description: project.description || '',
      tags: (project.tags || []).join(', '),
      link: project.link || ''
    });
    setEditingId(project._id);
    setIsFormOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projets ({projects?.length || 0})</h2>
        <button
          onClick={() => {
            setForm({ title: '', description: '', tags: '', link: '' });
            setEditingId(null);
            setIsFormOpen(!isFormOpen);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
        >
          <FiPlus size={18} />
          Nouveau projet
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700 rounded-lg p-6 space-y-4">
          <input
            type="text"
            placeholder="Titre"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <input
            type="text"
            placeholder="Tags (séparés par des virgules)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <input
            type="url"
            placeholder="Lien (optionnel)"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">
              {editingId ? 'Mettre à jour' : 'Créer'}
            </button>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <p className="text-white/50">Chargement...</p>
      ) : (
        <div className="space-y-4">
          {(projects || []).map((project) => (
            <div key={project._id} className="bg-slate-800/60 border border-slate-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-white/60 text-sm">{project.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-200 transition"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-red-200 transition"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(project.tags || []).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-indigo-600/30 text-indigo-200 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
