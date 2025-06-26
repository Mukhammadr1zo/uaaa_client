'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LiveFeedbackStream from '@/components/admin/LiveFeedbackStream';
import { feedbackAPI } from '@/services/api';

// Dinamik Chart
const DashboardCharts = dynamic(() => import('@/components/admin/DashboardCharts'), {
  ssr: false,
  loading: () => <div className="p-8 text-center">Loading charts...</div>
});

const translations = {
  en: {
    dashboard: 'Dashboard',
    welcome: 'Welcome to UAAA Admin Dashboard',
    overview: 'Here you can monitor feedback sentiment analysis in real-time',
    totalFeedbacks: 'Total Feedbacks',
    positiveFeedbacks: 'Positive',
    neutralFeedbacks: 'Neutral',
    negativeFeedbacks: 'Negative',
    latestFeedbacks: 'Latest Feedbacks',
    feedbackAnalytics: 'Feedback Analytics',
    sentimentTrend: 'Sentiment Trend',
    airportComparison: 'Airport Comparison',
    serviceAnalysis: 'Service Analysis',
    logout: 'Logout',
    feedbackStream: 'Feedback Stream'
  },
  ru: {
    dashboard: 'Панель управления',
    welcome: 'Добро пожаловать в панель управления UAAA',
    overview: 'Здесь вы можете отслеживать анализ отзывов в режиме реального времени',
    totalFeedbacks: 'Всего отзывов',
    positiveFeedbacks: 'Положительные',
    neutralFeedbacks: 'Нейтральные',
    negativeFeedbacks: 'Отрицательные',
    latestFeedbacks: 'Последние отзывы',
    feedbackAnalytics: 'Аналитика отзывов',
    sentimentTrend: 'Тренд настроения',
    airportComparison: 'Сравнение аэропортов',
    serviceAnalysis: 'Анализ услуг',
    logout: 'Выйти',
    feedbackStream: 'Поток отзывов'
  },
  uz: {
    dashboard: 'Boshqaruv paneli',
    welcome: 'UAAA boshqaruv paneliga xush kelibsiz',
    overview: 'Bu yerda fikr-mulohazalar tahlilini real vaqtda kuzatishingiz mumkin',
    totalFeedbacks: 'Jami fikrlar',
    positiveFeedbacks: 'Ijobiy',
    neutralFeedbacks: 'Neytral',
    negativeFeedbacks: 'Salbiy',
    latestFeedbacks: 'So\'nggi fikrlar',
    feedbackAnalytics: 'Fikr-mulohazalar tahlili',
    sentimentTrend: 'Kayfiyat tendensiyasi',
    airportComparison: 'Aeroportlar taqqoslash',
    serviceAnalysis: 'Xizmatlar tahlili',
    logout: 'Chiqish',
    feedbackStream: 'Fikrlar oqimi'
  }
};

export default function Dashboard() {
  const { language, setLanguage } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const router = useRouter();
  const t = translations[language];

  // Auth va feedbacklarni yuklash
  useEffect(() => {
    try {
      const auth =
        typeof window !== 'undefined'
          ? localStorage.getItem('isAuthenticated')
          : null;
      if (auth === 'true') setIsAuthenticated(true);
      else router.push('/admin');

      feedbackAPI.getFeedbacks({ limit: 1000 })
        .then(res => setFeedbacks(res.data || []))
        .catch(() => setFeedbacks([]))
        .finally(() => setIsLoading(false));
    } catch (error) {
      router.push('/admin');
      setIsLoading(false);
    }
  }, [router]);

  // Real-time statistikani hisoblash
  const stats = {
    totalFeedbacks: feedbacks.length,
    positive: feedbacks.filter(f => f.sentiment === 'positive').length,
    neutral: feedbacks.filter(f => f.sentiment === 'neutral').length,
    negative: feedbacks.filter(f => f.sentiment === 'negative').length
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
    }
    router.push('/admin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{t.dashboard}</h1>
              <p className="text-gray-600">{t.welcome}</p>
              <p className="text-sm text-gray-500">{t.overview}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              {t.logout}
            </button>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">
                {t.totalFeedbacks}
              </h3>
              <div className="flex items-center">
                <div className="text-3xl font-bold">{stats.totalFeedbacks}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
              <h3 className="text-gray-500 text-sm font-medium mb-2">
                {t.positiveFeedbacks}
              </h3>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-green-600">
                  {stats.positive}
                </div>
                <div className="ml-2 text-sm text-gray-500">
                  ({stats.totalFeedbacks > 0
                    ? Math.round((stats.positive / stats.totalFeedbacks) * 100)
                    : 0}
                  %)
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-yellow-500">
              <h3 className="text-gray-500 text-sm font-medium mb-2">
                {t.neutralFeedbacks}
              </h3>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-yellow-600">
                  {stats.neutral}
                </div>
                <div className="ml-2 text-sm text-gray-500">
                  ({stats.totalFeedbacks > 0
                    ? Math.round((stats.neutral / stats.totalFeedbacks) * 100)
                    : 0}
                  %)
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-red-500">
              <h3 className="text-gray-500 text-sm font-medium mb-2">
                {t.negativeFeedbacks}
              </h3>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-red-600">
                  {stats.negative}
                </div>
                <div className="ml-2 text-sm text-gray-500">
                  ({stats.totalFeedbacks > 0
                    ? Math.round((stats.negative / stats.totalFeedbacks) * 100)
                    : 0}
                  %)
                </div>
              </div>
            </div>
          </div>
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Charts Section */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">{t.feedbackAnalytics}</h2>
                <DashboardCharts feedbacks={feedbacks} language={language} />
              </div>
            </div>
            {/* Feed Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">{t.feedbackStream}</h2>
                <LiveFeedbackStream language={language} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
}