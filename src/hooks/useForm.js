import { useState, useCallback } from 'react';

/**
 * Hook personnalisé pour gestion formulaires
 * @param {object} initialValues - valeurs initiales du formulaire
 * @param {function} onSubmit - callback lors du submit
 * @returns {object} { values, errors, isLoading, handleChange, handleSubmit, resetForm }
 */
export function useForm(initialValues = {}, onSubmit = null) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Effacer l'erreur en tapant
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }

      setIsLoading(true);
      try {
        if (typeof onSubmit === 'function') {
          await onSubmit(values);
        }
      } catch (error) {
        // Erreurs déjà gérées dans onSubmit
        console.error('Form submission error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [values, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldError = useCallback((fieldName, errorMsg) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMsg,
    }));
  }, []);

  return {
    values,
    errors,
    touched,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldError,
    setValues,
  };
}
