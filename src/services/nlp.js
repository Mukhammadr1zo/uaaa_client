// src/services/nlp.js - o'zgartirilgan qism

// Sun'iy intellektga so'rovni yuborish va javobni qayta ishlash
export const analyzeSentiment = async (text, language = 'en') => {
  // Browser muhitda ishlashini tekshiramiz
  const isBrowser = typeof window !== 'undefined';
  
  try {
    if (isBrowser) {
      // Browser muhitida mahalliy tahlil qilish
      return mockSentimentAnalysis(text, language);
    } else {
      // Server muhitda API orqali tahlil qilish 
      // Bu yerda haqiqiy API so'rovi bo'lishi kerak
      return mockSentimentAnalysis(text, language);
    }
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw new Error('Failed to analyze sentiment');
  }
};

// Simple mock sentiment analysis
const mockSentimentAnalysis = (text, language = 'en') => {
  if (!text) return { sentiment: 'neutral', score: 0.5, language };
  
  const positiveWords = {
    en: ['good', 'great', 'excellent', 'amazing', 'love', 'nice', 'clean', 'helpful', 'convenient'],
    ru: ['хороший', 'отличный', 'превосходный', 'замечательный', 'люблю', 'приятный', 'чистый', 'полезный', 'удобный'],
    uz: ['yaxshi', 'ajoyib', 'zo\'r', 'a\'lo', 'yoqimli', 'toza', 'foydali', 'qulay']
  };
  
  const negativeWords = {
    en: ['bad', 'poor', 'awful', 'terrible', 'dirty', 'slow', 'rude', 'difficult'],
    ru: ['плохой', 'ужасный', 'отвратительный', 'грязный', 'медленный', 'грубый', 'трудный'],
    uz: ['yomon', 'rasvo', 'jirkanch', 'iflos', 'sekin', 'qo\'pol', 'qiyin']
  };
  
  // Detect language if not provided
  if (!language || language === 'auto') {
    if (/[қўғҳ]/i.test(text)) language = 'uz';
    else if (/[ёъыэ]/i.test(text)) language = 'ru';
    else language = 'en';
  }
  
  const lowerText = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;
  
  // Check for positive words
  (positiveWords[language] || positiveWords.en).forEach(word => {
    if (lowerText.includes(word)) positiveCount++;
  });
  
  // Check for negative words
  (negativeWords[language] || negativeWords.en).forEach(word => {
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
  
  return { sentiment, score, language };
};