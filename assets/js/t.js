// Simple translation utility for School MS Pro React
// Usage: t('Students')
const translations = window.schoolmsTranslations || {};
export function t(str) {
  return translations[str] || str;
}

// Optionally, expose t globally for inline use
toGlobal();
function toGlobal() {
  window.schoolms_t = t;
}
