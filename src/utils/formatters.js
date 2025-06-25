// utils/formatters.js

export const formatDate = (date, locale = 'en') => {
  if (!date) return '';

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  try {
    return new Date(date).toLocaleString(
      locale === 'uz' ? 'uz-UZ' : locale === 'ru' ? 'ru-RU' : 'en-US',
      options
    );
  } catch (error) {
    console.error('Date formatting error:', error);
    return String(date);
  }
};