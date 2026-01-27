/**
 * Client API centralisé pour communiquer avec le backend
 * Utilise fetch natif + gestion d'erreurs
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

/**
 * Wrapper autour fetch avec gestion d'erreurs
 */
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Ajouter token JWT si présent
  const token = localStorage.getItem('admin_token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Parsing JSON
    const data = await response.json().catch(() => null);

    // Gestion erreurs HTTP
    if (!response.ok) {
      const error = new Error(data?.error || `HTTP ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error.message);
    throw error;
  }
}

/**
 * ===== ENDPOINTS PUBLICS =====
 */

export const api = {
  // Health check
  health: () => apiCall('/health'),

  // Projets (GET public)
  getProjects: () => apiCall('/projects'),

  // Compétences (GET public)
  getSkills: () => apiCall('/skills'),

  // Formulaire de contact
  postContact: (data) =>
    apiCall('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * ===== ENDPOINTS ADMIN (protégés JWT) =====
   */

  // Login
  adminLogin: (email, password) =>
    apiCall('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  // Projets admin
  adminGetProjects: () => apiCall('/admin/projects'),
  adminCreateProject: (data) =>
    apiCall('/admin/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  adminUpdateProject: (id, data) =>
    apiCall(`/admin/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  adminDeleteProject: (id) =>
    apiCall(`/admin/projects/${id}`, {
      method: 'DELETE',
    }),

  // Compétences admin
  adminGetSkills: () => apiCall('/admin/skills'),
  adminCreateSkill: (data) =>
    apiCall('/admin/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  adminUpdateSkill: (id, data) =>
    apiCall(`/admin/skills/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  adminDeleteSkill: (id) =>
    apiCall(`/admin/skills/${id}`, {
      method: 'DELETE',
    }),

  // Messages de contact
  adminGetMessages: () => apiCall('/admin/messages'),
};

export default api;
