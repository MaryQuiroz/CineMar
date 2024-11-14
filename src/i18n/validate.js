// src/i18n/validate.js
import es from './locales/es';
import en from './locales/en';

function validateTranslations(base, compare, path = '') {
  const errors = [];
  
  Object.keys(base).forEach(key => {
    const currentPath = path ? `${path}.${key}` : key;
    
    if (!(key in compare)) {
      errors.push(`Missing translation for key: ${currentPath}`);
    } else if (typeof base[key] === 'object') {
      errors.push(...validateTranslations(base[key], compare[key], currentPath));
    }
  });
  
  return errors;
}

// Validar que todas las traducciones existan
const errors = validateTranslations(es, en);
if (errors.length) {
  console.error('Translation validation failed:', errors);
}