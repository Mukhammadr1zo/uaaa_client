// src/utils/helpers.js

// Generate random data for dashboard
export const generateRandomData = (min, max, length) => {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

// Format date to readable string
export const formatDate = (date, locale = 'en') => {
  return new Date(date).toLocaleDateString(
    locale === 'uz' ? 'uz-UZ' : locale === 'ru' ? 'ru-RU' : 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  );
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  return total > 0 ? Math.round((value / total) * 100) : 0;
};

// Truncate text with ellipsis for long strings
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// Group data by key
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    result[groupKey] = result[groupKey] || [];
    result[groupKey].push(item);
    return result;
  }, {});
};

// Format number with thousands separator
export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Generate simple sentiment score
export const mockSentimentAnalysis = (text) => {
  // This is for demonstration only; in reality, ML model would be used
  if (!text) return { sentiment: 'neutral', score: 0.5 };
  
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'nice', 'clean', 'helpful', 'convenient', 'yaxshi', 'zo\'r', 'ajoyib', 'хороший', 'отлично'];
  const negativeWords = ['bad', 'poor', 'awful', 'terrible', 'dirty', 'slow', 'rude', 'difficult', 'yomon', 'rasvo', 'плохой', 'ужасный'];
  
  const lowerText = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveCount++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeCount++;
  });
  
  // Calculate sentiment score (0 to 1)
  const totalWords = positiveCount + negativeCount;
  let score = 0.5; // default neutral
  
  if (totalWords > 0) {
    score = positiveCount / totalWords;
  }
  
  let sentiment = 'neutral';
  if (score >= 0.6) sentiment = 'positive';
  if (score <= 0.4) sentiment = 'negative';
  
  return { sentiment, score };
};

// Extract keywords from text
export const extractKeywords = (text) => {
  if (!text) return [];
  
  const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
  const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'i', 'you', 'he', 'she', 'it', 'we', 'they'];
  const filteredWords = words.filter(word => !stopWords.includes(word) && word.length > 2);
  
  // Count word frequency
  const wordCounts = {};
  filteredWords.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  
  // Sort by frequency
  const sortedWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
  
  return sortedWords;
};