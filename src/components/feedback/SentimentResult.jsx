// src/components/feedback/SentimentResult.jsx
'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const translations = {
  en: {
    analysisResult: "Sentiment Analysis Result",
    positive: "Positive",
    negative: "Negative",
    neutral: "Neutral",
    confidenceScore: "Confidence Score",
    sentimentExplanation: "Our AI has analyzed the sentiment of your feedback based on the text you provided.",
    whatThisMeans: "What This Means",
    positiveExplanation: "Your feedback is generally positive. Thank you for your kind words! We're happy that you had a good experience.",
    neutralExplanation: "Your feedback contains a mix of positive and negative elements or is primarily neutral in tone.",
    negativeExplanation: "Your feedback contains concerns or issues that need attention. We appreciate your honesty and will work to improve.",
    feedbackProcessing: "Your feedback will be processed by our team to improve services."
  },
  ru: {
    analysisResult: "Результат анализа настроения",
    positive: "Положительный",
    negative: "Отрицательный",
    neutral: "Нейтральный",
    confidenceScore: "Уровень уверенности",
    sentimentExplanation: "Наш ИИ проанализировал тональность вашего отзыва на основе предоставленного вами текста.",
    whatThisMeans: "Что это значит",
    positiveExplanation: "Ваш отзыв в целом положительный. Спасибо за ваши добрые слова! Мы рады, что вы получили хороший опыт.",
    neutralExplanation: "Ваш отзыв содержит смесь положительных и отрицательных элементов или в основном нейтрален по тону.",
    negativeExplanation: "Ваш отзыв содержит замечания или проблемы, требующие внимания. Мы ценим вашу честность и будем работать над улучшением.",
    feedbackProcessing: "Ваш отзыв будет обработан нашей командой для улучшения услуг."
  },
  uz: {
    analysisResult: "His-tuyg'ular tahlili natijasi",
    positive: "Ijobiy",
    negative: "Salbiy",
    neutral: "Neytral",
    confidenceScore: "Ishonch darajasi",
    sentimentExplanation: "Bizning sun'iy intellektimiz siz taqdim etgan matn asosida fikringizning his-tuyg'ularini tahlil qildi.",
    whatThisMeans: "Bu nimani anglatadi",
    positiveExplanation: "Sizning fikringiz asosan ijobiy. Iliq so'zlaringiz uchun rahmat! Sizning yaxshi tajriba olganingizdan xursandmiz.",
    neutralExplanation: "Sizning fikringiz ijobiy va salbiy elementlarni o'z ichiga oladi yoki asosan neytral ohangda.",
    negativeExplanation: "Sizning fikringiz e'tibor talab qiladigan tashvishlar yoki muammolarni o'z ichiga oladi. Samimiyligingizni qadrlaymiz va yaxshilash uchun harakat qilamiz.",
    feedbackProcessing: "Sizning fikringiz xizmatlarni yaxshilash uchun jamoamiz tomonidan ko'rib chiqiladi."
  }
};

const SentimentResult = ({ result }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [expanded, setExpanded] = useState(false);
  
  if (!result) return null;
  
  const { sentiment, score } = result;
  
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500 text-white';
      case 'negative':
        return 'bg-red-500 text-white';
      case 'neutral':
      default:
        return 'bg-yellow-500 text-white';
    }
  };
  
  const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😞';
      case 'neutral':
      default:
        return '😐';
    }
  };
  
  const getSentimentText = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return t.positive;
      case 'negative':
        return t.negative;
      case 'neutral':
      default:
        return t.neutral;
    }
  };
  
  const getSentimentExplanation = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return t.positiveExplanation;
      case 'negative':
        return t.negativeExplanation;
      case 'neutral':
      default:
        return t.neutralExplanation;
    }
  };
  
  const percentScore = Math.round(score * 100);
  
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md"
      style={{ borderTop: `4px solid ${sentiment === 'positive' ? '#22c55e' : sentiment === 'negative' ? '#ef4444' : '#eab308'}` }}
    >
      <h3 className="text-xl font-semibold mb-6 text-center">
        {t.analysisResult}
      </h3>
      
      <div className="flex justify-center items-center mb-8">
        <div className="text-center">
          <span className="text-5xl block mb-4">{getSentimentEmoji(sentiment)}</span>
          <span className={`px-6 py-2 rounded-full font-bold text-lg ${getSentimentColor(sentiment)}`}>
            {getSentimentText(sentiment)}
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">{t.confidenceScore}</span>
          <span className="font-bold">{percentScore}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full ${sentiment === 'positive' ? 'bg-green-500' : sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'}`}
            style={{ width: `${percentScore}%` }}
          ></div>
        </div>
      </div>
      
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-96' : 'max-h-0'}`}>
        <div className="border-t pt-4 mb-4">
          <h4 className="font-medium mb-2">{t.whatThisMeans}</h4>
          <p className="text-gray-700 mb-4">
            {getSentimentExplanation(sentiment)}
          </p>
          <p className="text-gray-600 text-sm">
            {t.feedbackProcessing}
          </p>
        </div>
      </div>
      
      <button 
        onClick={() => setExpanded(!expanded)} 
        className="w-full text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mt-2"
      >
        {expanded ? 'Show Less' : 'Show More'} 
        <svg 
          className={`ml-1 w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>
  );
};

export default SentimentResult;