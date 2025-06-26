'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import { feedbackAPI } from '@/services/api';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  ArcElement, RadialLinearScale, Title, Tooltip, Legend, Filler
);

const translations = {
  en: {
    sentimentTrend: 'Sentiment Trend (Last 30 days)',
    airportComparison: 'Feedback by Airport',
    serviceAnalysis: 'Feedback by Service',
    languageBreakdown: 'Feedback by Language',
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative',
    feedbackCount: 'Feedback Count'
  },
  ru: {
    sentimentTrend: 'Тренд настроений (30 дней)',
    airportComparison: 'Отзывы по аэропортам',
    serviceAnalysis: 'Отзывы по услугам',
    languageBreakdown: 'Отзывы по языкам',
    positive: 'Положительный',
    neutral: 'Нейтральный',
    negative: 'Отрицательный',
    feedbackCount: 'Количество отзывов'
  },
  uz: {
    sentimentTrend: "Kayfiyat trendi (so'nggi 30 kun)",
    airportComparison: "Aeroportlar bo'yicha fikrlar",
    serviceAnalysis: "Xizmatlar bo'yicha fikrlar",
    languageBreakdown: "Til bo'yicha fikrlar",
    positive: "Ijobiy",
    neutral: "Neytral",
    negative: "Salbiy",
    feedbackCount: "Fikrlar soni"
  }
};

export default function DashboardCharts() {
  const [activeTab, setActiveTab] = useState('sentiment');
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];

  useEffect(() => {
    setLoading(true);
    feedbackAPI.getFeedbacks({ limit: 500 }) // Admin uchun ko‘p feedback
      .then(res => setFeedbacks(res.data || []))
      .catch(() => setFeedbacks([]))
      .finally(() => setLoading(false));
  }, []);

  // Sentiment trend (oxirgi 30 kun)
  const now = new Date();
  const dateLabels = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });
  const sentimentsByDay = dateLabels.map(date => {
    const todays = feedbacks.filter(f => f.createdAt?.slice(0, 10) === date);
    return {
      date,
      positive: todays.filter(f => f.sentiment === 'positive').length,
      neutral: todays.filter(f => f.sentiment === 'neutral').length,
      negative: todays.filter(f => f.sentiment === 'negative').length,
    };
  });
  const sentimentTrendData = {
    labels: dateLabels,
    datasets: [
      { label: t.positive, data: sentimentsByDay.map(d => d.positive), borderColor: 'rgb(34,197,94)', backgroundColor: 'rgba(34,197,94,0.2)', tension: 0.3 },
      { label: t.neutral,  data: sentimentsByDay.map(d => d.neutral),  borderColor: 'rgb(234,179,8)', backgroundColor: 'rgba(234,179,8,0.2)', tension: 0.3 },
      { label: t.negative, data: sentimentsByDay.map(d => d.negative), borderColor: 'rgb(239,68,68)', backgroundColor: 'rgba(239,68,68,0.2)', tension: 0.3 }
    ]
  };

  // **2. Airport bar chart**
  const airportStats = {};
  feedbacks.forEach(f => {
    const a = f.airport || "Unknown";
    airportStats[a] = (airportStats[a] || 0) + 1;
  });
  const airportComparisonData = {
    labels: Object.keys(airportStats),
    datasets: [
      { label: t.feedbackCount, data: Object.values(airportStats), backgroundColor: 'rgba(59,130,246,0.8)', }
    ]
  };

  // **3. Service pie chart**
  const serviceStats = {};
  feedbacks.forEach(f => {
    const s = f.service || "Unknown";
    serviceStats[s] = (serviceStats[s] || 0) + 1;
  });
  const serviceAnalysisData = {
    labels: Object.keys(serviceStats),
    datasets: [
      {
        label: t.feedbackCount,
        data: Object.values(serviceStats),
        backgroundColor: [
          'rgba(59,130,246,0.8)','rgba(139,92,246,0.8)','rgba(249,115,22,0.8)','rgba(34,197,94,0.8)',
          'rgba(234,179,8,0.8)','rgba(239,68,68,0.8)','rgba(236,72,153,0.8)','rgba(14,165,233,0.8)'
        ]
      }
    ]
  };

  // **4. Language doughnut chart**
  const langStats = {};
  feedbacks.forEach(f => {
    const l = ((f.language || "en") + "").toLowerCase();
    langStats[l] = (langStats[l] || 0) + 1;
  });
  const languageBreakdownData = {
    labels: Object.keys(langStats),
    datasets: [
      {
        label: 'Languages',
        data: Object.values(langStats),
        backgroundColor: [
          'rgba(59,130,246,0.8)', // en
          'rgba(239,68,68,0.8)',  // ru
          'rgba(34,197,94,0.8)',  // uz
          'rgba(234,179,8,0.8)'   // others
        ]
      }
    ]
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
        <button className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'sentiment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`} onClick={() => setActiveTab('sentiment')}>{t.sentimentTrend}</button>
        <button className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'airports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`} onClick={() => setActiveTab('airports')}>{t.airportComparison}</button>
        <button className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'services' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`} onClick={() => setActiveTab('services')}>{t.serviceAnalysis}</button>
        <button className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'languages' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`} onClick={() => setActiveTab('languages')}>{t.languageBreakdown}</button>
      </div>
      <div className="mt-4">
        {activeTab === 'sentiment' && <Line  data={sentimentTrendData} />}
        {activeTab === 'airports' && <Bar data={airportComparisonData} />}
        {activeTab === 'services' && <Pie data={serviceAnalysisData} />}
        {activeTab === 'languages' && <Doughnut data={languageBreakdownData} />}
      </div>
    </div>
  );
}