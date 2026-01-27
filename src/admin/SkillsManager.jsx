import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import api from '../api/apiClient';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

/**
 * Manager pour CRUD Skills
 */
export default function SkillsManager() {
  const { data: skills, isLoading, error } = useFetch('adminGetSkills', []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', level: 50, category: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = {
        name: form.name,
        level: parseInt(form.level, 10),
        category: form.category
      };

      if (editingId) {
        await api.adminUpdateSkill(editingId, data);
      } else {
        await api.adminCreateSkill(data);
      }

      setForm({ name: '', level: 50, category: '' });
      setEditingId(null);
      setIsFormOpen(false);
      window.location.reload();
    } catch (err) {
      console.error('Erreur:', err);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Êtes-vous sûr ?')) return;
    try {
      await api.adminDeleteSkill(id);
      window.location.reload();
    } catch (err) {
      console.error('Erreur:', err);
    }
  }

  function handleEdit(skill) {
    setForm({
      name: skill.name,
      level: skill.level || 50,
      category: skill.category || ''
    });
    setEditingId(skill._id);
    setIsFormOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Compétences ({skills?.length || 0})</h2>
        <button
          onClick={() => {
            setForm({ name: '', level: 50, category: '' });
            setEditingId(null);
            setIsFormOpen(!isFormOpen);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
        >
          <FiPlus size={18} />
          Nouvelle compétence
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700 rounded-lg p-6 space-y-4">
          <input
            type="text"
            placeholder="Nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <input
            type="text"
            placeholder="Catégorie"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
          />
          <div>
            <label className="block text-sm font-semibold mb-2">Niveau ({form.level}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: parseInt(e.target.value, 10) })}
              className="w-full"
            />
          </div>
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
        <div className="grid md:grid-cols-2 gap-4">
          {(skills || []).map((skill) => (
            <div key={skill._id} className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{skill.name}</h3>
                  <p className="text-white/60 text-sm">{skill.category}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-blue-200 transition"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-red-200 transition"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${skill.level || 0}%` }}
                />
              </div>
              <p className="text-xs text-white/50 mt-2">{skill.level || 0}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
