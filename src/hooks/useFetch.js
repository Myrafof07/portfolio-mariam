/**
 * Hook personnalisé pour fetch les données de l'API
 * Gère loading, errors, et fallback aux données locales
 */

import { useState, useEffect } from 'react';
import api from '../api/apiClient';

/**
 * @param {string} endpoint - la clé API à appeler (ex: 'getProjects', 'getSkills')
 * @param {array} fallbackData - données par défaut si API échoue
 * @returns {object} { data, isLoading, error }
 */
export function useFetch(endpoint, fallbackData = []) {
  const [data, setData] = useState(fallbackData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        // Appel API via apiClient
        if (typeof api[endpoint] === 'function') {
          const result = await api[endpoint]();
          if (isMounted) {
            setData(result || fallbackData);
          }
        } else {
          throw new Error(`Endpoint ${endpoint} not found`);
        }
      } catch (err) {
        console.warn(`[useFetch] Erreur ${endpoint}, utilisation fallback:`, err.message);
        if (isMounted) {
          setError(err);
          setData(fallbackData); // Fallback aux données locales
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false; // Éviter memory leak
    };
  }, [endpoint, fallbackData]);

  return { data, isLoading, error };
}
