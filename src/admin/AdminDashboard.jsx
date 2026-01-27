import { useState } from 'react';
import ProjectsManager from './ProjectsManager';
import SkillsManager from './SkillsManager';
import MessagesViewer from './MessagesViewer';
import { FiLogOut, FiSettings, FiMail } from 'react-icons/fi';

/**
 * Dashboard admin - Interface CRUD
 */
export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'skills', 'messages'

  function handleLogout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    if (typeof onLogout === 'function') {
      onLogout();
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">{user?.email || 'Admin'}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-200 transition"
            >
              <FiLogOut size={18} />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-slate-700 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 flex gap-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-4 px-2 font-semibold border-b-2 transition ${
              activeTab === 'projects'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <FiSettings className="inline mr-2" size={18} />
            Projets
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`py-4 px-2 font-semibold border-b-2 transition ${
              activeTab === 'skills'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <FiSettings className="inline mr-2" size={18} />
            Compétences
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-4 px-2 font-semibold border-b-2 transition ${
              activeTab === 'messages'
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <FiMail className="inline mr-2" size={18} />
            Messages
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'skills' && <SkillsManager />}
        {activeTab === 'messages' && <MessagesViewer />}
      </main>
    </div>
  );
}
