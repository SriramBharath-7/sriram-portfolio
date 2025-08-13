import { useState, useCallback } from 'react';
import { sanitizeString, sanitizeObject } from '@/utils/sanitize';

interface FormErrors {
  [key: string]: string;
}

type SanitizedValue = string | number | boolean | null | undefined;

interface UseSecureFormOptions<T extends Record<string, SanitizedValue>> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  validate?: (values: T) => FormErrors;
}

export function useSecureForm<T extends Record<string, SanitizedValue>>({
  initialValues,
  onSubmit,
  validate,
}: UseSecureFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: sanitizeString(value)
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    try {
      setIsSubmitting(true);
      // Sanitize all values before submission
      const sanitizedValues = sanitizeObject(values) as T;
      await onSubmit(sanitizedValues);
      setErrors({});
    } catch (error) {
      setErrors({
        submit: error instanceof Error ? error.message : 'An error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setValues
  };
} 