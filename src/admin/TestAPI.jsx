import { useState } from 'react';
import api from '../api/apiClient';

/**
 * Page de test des routes API
 * À supprimer en production !
 */
export default function TestAPI() {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function runTests() {
    setTestResults([]);
    setIsLoading(true);

    const results = [];

    try {
      // Test 1: Health
      try {
        const res = await api.health();
        results.push({ name: '✅ Health check', status: 'OK', data: res });
      } catch (err) {
        results.push({ name: '❌ Health check', status: 'FAIL', error: err.message });
      }

      // Test 2: Projects
      try {
        const res = await api.getProjects();
        results.push({
          name: `✅ GET /projects`,
          status: 'OK',
          data: `${res.length} projects reçus`
        });
      } catch (err) {
        results.push({
          name: '❌ GET /projects',
          status: 'FAIL',
          error: err.message
        });
      }

      // Test 3: Skills
      try {
        const res = await api.getSkills();
        results.push({
          name: `✅ GET /skills`,
          status: 'OK',
          data: `${res.length} skills reçues`
        });
      } catch (err) {
        results.push({
          name: '❌ GET /skills',
          status: 'FAIL',
          error: err.message
        });
      }

      // Test 4: Contact (valid)
      try {
        const res = await api.postContact({
          name: 'Test',
          email: 'test@example.com',
          message: 'Ceci est un test de l\'API de contact depuis la page de test',
          consent: true
        });
        results.push({
          name: '✅ POST /contact (valid)',
          status: 'OK',
          data: res.message || 'Message envoyé'
        });
      } catch (err) {
        results.push({
          name: '❌ POST /contact (valid)',
          status: 'FAIL',
          error: err.message
        });
      }

      // Test 5: Contact (invalid email)
      try {
        await api.postContact({
          name: 'Test',
          email: 'invalid-email',
          message: 'Test',
          consent: true
        });
        results.push({
          name: '⚠️ POST /contact (invalid email)',
          status: 'SHOULD_FAIL',
          error: 'Devrait avoir échoué!'
        });
      } catch (err) {
        results.push({
          name: '✅ POST /contact (invalid email - correctly rejected)',
          status: 'OK',
          data: `Validé correctement: ${err.message}`
        });
      }

      // Test 6: Contact (message trop court)
      try {
        await api.postContact({
          name: 'Test',
          email: 'test@example.com',
          message: 'Court',
          consent: true
        });
        results.push({
          name: '⚠️ POST /contact (message trop court)',
          status: 'SHOULD_FAIL',
          error: 'Devrait avoir échoué!'
        });
      } catch (err) {
        results.push({
          name: '✅ POST /contact (message trop court - correctly rejected)',
          status: 'OK',
          data: `Validé correctement: ${err.message}`
        });
      }

      // Test 7: Contact (sans consentement)
      try {
        await api.postContact({
          name: 'Test',
          email: 'test@example.com',
          message: 'Message de test',
          consent: false
        });
        results.push({
          name: '⚠️ POST /contact (no consent)',
          status: 'SHOULD_FAIL',
          error: 'Devrait avoir échoué!'
        });
      } catch (err) {
        results.push({
          name: '✅ POST /contact (no consent - correctly rejected)',
          status: 'OK',
          data: `Validé correctement: ${err.message}`
        });
      }
    } finally {
      setTestResults(results);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🧪 Test API</h1>

        <button
          onClick={runTests}
          disabled={isLoading}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 rounded-lg font-semibold mb-8 transition"
        >
          {isLoading ? 'Tests en cours...' : 'Lancer tous les tests'}
        </button>

        <div className="space-y-3">
          {testResults.map((result, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${
                result.status === 'OK'
                  ? 'bg-green-600/20 border-green-500'
                  : result.status === 'FAIL'
                  ? 'bg-red-600/20 border-red-500'
                  : 'bg-orange-600/20 border-orange-500'
              }`}
            >
              <h3 className="font-bold mb-2">{result.name}</h3>
              <p className="text-sm text-white/80">
                {result.data && `✓ ${result.data}`}
                {result.error && `✗ ${result.error}`}
              </p>
            </div>
          ))}
        </div>

        {testResults.length === 0 && !isLoading && (
          <p className="text-white/50 text-center py-12">
            Clique sur le bouton pour lancer les tests
          </p>
        )}
      </div>
    </div>
  );
}
