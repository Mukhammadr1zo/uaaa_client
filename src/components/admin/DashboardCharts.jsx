// src/components/admin/DashboardCharts.jsx
'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Pie, Radar, Doughnut } from 'react-chartjs-2';
import { generateRandomData } from '@/utils/helpers';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Translations
const translations = {
  en: {
    sentimentTrend: 'Sentiment Trend (Last 30 days)',
    airportComparison: 'Feedback by Airport',
    serviceAnalysis: 'Feedback by Service',
    positive: 'Positive',
    neutral: 'Neutral',
    negative: 'Negative',
    feedbackCount: 'Feedback Count',
    timeframe: 'Timeframe',
    lastWeek: 'Last Week',
    lastMonth: 'Last Month',
    lastQuarter: 'Last Quarter',
    lastYear: 'Last Year',
    servicePerformance: 'Service Performance',
    feedbackVolume: 'Feedback Volume',
    keywordAnalysis: 'Keyword Analysis',
    topConcerns: 'Top Concerns',
    languageBreakdown: 'Language Breakdown',
    hourlyDistribution: 'Hourly Feedback Distribution'
  },
  ru: {
    sentimentTrend: 'Тренд настроений (Последние 30 дней)',
    airportComparison: 'Отзывы по аэропортам',
    serviceAnalysis: 'Отзывы по услугам',
    positive: 'Положительные',
    neutral: 'Нейтральные',
    negative: 'Отрицательные',
    feedbackCount: 'Количество отзывов',
    timeframe: 'Период',
    lastWeek: 'Последняя неделя',
    lastMonth: 'Последний месяц',
    lastQuarter: 'Последний квартал',
    lastYear: 'Последний год',
    servicePerformance: 'Эффективность услуг',
    feedbackVolume: 'Объем отзывов',
    keywordAnalysis: 'Анализ ключевых слов',
    topConcerns: 'Основные проблемы',
    languageBreakdown: 'Распределение по языкам',
    hourlyDistribution: 'Почасовое распределение отзывов'
  },
  uz: {
    sentimentTrend: 'Kayfiyat tendensiyasi (So\'nggi 30 kun)',
    airportComparison: 'Aeroportlar bo\'yicha fikrlar',
    serviceAnalysis: 'Xizmatlar bo\'yicha fikrlar',
    positive: 'Ijobiy',
    neutral: 'Neytral',
    negative: 'Salbiy',
    feedbackCount: 'Fikrlar soni',
    timeframe: 'Vaqt oralig\'i',
    lastWeek: 'So\'nggi hafta',
    lastMonth: 'So\'nggi oy',
    lastQuarter: 'So\'nggi chorak',
    lastYear: 'So\'nggi yil',
    servicePerformance: 'Xizmatlar samaradorligi',
    feedbackVolume: 'Fikrlar hajmi',
    keywordAnalysis: 'Kalit so\'zlar tahlili',
    topConcerns: 'Asosiy muammolar',
    languageBreakdown: 'Tillar bo\'yicha taqsimot',
    hourlyDistribution: 'Soat bo\'yicha fikrlar taqsimoti'
  }
};

const DashboardCharts = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [activeTab, setActiveTab] = useState('sentiment');
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [chartData, setChartData] = useState(null);
  const { language } = useLanguage();
  
  const t = translations[language];
  
  // Load chart data
  useEffect(() => {
    const fetchData = async () => {
      setLoadingCharts(true);
      try {
        // In a real application, this would be an API call
        // For demo, we'll use mock data
        const data = generateChartData();
        setChartData(data);
      } catch (error) {
        console.error('Error loading chart data:', error);
      } finally {
        setLoadingCharts(false);
      }
    };
    
    fetchData();
  }, [timeframe]);
  
  // Generate mock data for charts
  const generateChartData = () => {
    // Generate last 30 days
    const dateLabels = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    // Generate random data for sentiment trend
    const positiveData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 10);
    const neutralData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 15) + 5);
    const negativeData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 10) + 1);
    
    // Airport data
    const airports = [
      'Tashkent', 'Samarkand', 'Bukhara', 'Urgench', 
      'Termez', 'Namangan', 'Andijan', 'Nukus'
    ];
    const airportData = airports.map(() => Math.floor(Math.random() * 200) + 50);
    
    // Service data
    const services = [
      'Check-in', 'Baggage', 'Security', 'Passport Control',
      'Wi-Fi', 'Restaurants', 'Shops', 'Transportation'
    ];
    const serviceData = services.map(() => Math.floor(Math.random() * 150) + 30);
    
    // Service performance data (radar chart)
    const performanceData = services.map(() => Math.floor(Math.random() * 50) + 50);
    
    // Language breakdown
    const languageLabels = ['Uzbek', 'Russian', 'English', 'Others'];
    const languageData = [45, 35, 15, 5]; // Percentages
    
    // Hourly distribution
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const hourlyData = hours.map(() => Math.floor(Math.random() * 40) + 5);
    
    // Top concerns/keywords
    const concernsLabels = [
      'Long queues', 'Wi-Fi issues', 'Baggage delays', 
      'Food prices', 'Cleanliness', 'Staff attitude',
      'Signage', 'Seating'
    ];
    const concernsData = concernsLabels.map(() => Math.floor(Math.random() * 100) + 10);
    
    return {
      dateLabels,
      positiveData,
      neutralData,
      negativeData,
      airports,
      airportData,
      services,
      serviceData,
      performanceData,
      languageLabels,
      languageData,
      hours,
      hourlyData,
      concernsLabels,
      concernsData
    };
  };
  
  if (loadingCharts || !chartData) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }
  
  // Sentiment trend chart data
  const sentimentTrendData = {
    labels: chartData.dateLabels,
    datasets: [
      {
        label: t.positive,
        data: chartData.positiveData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.3,
      },
      {
        label: t.neutral,
        data: chartData.neutralData,
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.2)',
        tension: 0.3,
      },
      {
        label: t.negative,
        data: chartData.negativeData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.3,
      },
    ],
  };
  
  // Airport comparison chart data
  const airportComparisonData = {
    labels: chartData.airports,
    datasets: [
      {
        label: t.feedbackCount,
        data: chartData.airportData,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
    ],
  };
  
  // Service analysis chart data
  const serviceAnalysisData = {
    labels: chartData.services,
    datasets: [
      {
        label: t.feedbackCount,
        data: chartData.serviceData,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(14, 165, 233, 0.8)',
        ],
      },
    ],
  };
  
  // Service performance chart data (radar)
  const servicePerformanceData = {
    labels: chartData.services,
    datasets: [
      {
        label: t.servicePerformance,
        data: chartData.performanceData,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        pointBackgroundColor: 'rgba(59, 130, 246, 0.8)',
      }
    ],
  };
  
  // Language breakdown (doughnut)
  const languageBreakdownData = {
    labels: chartData.languageLabels,
    datasets: [
      {
        label: 'Languages',
        data: chartData.languageData,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(234, 179, 8, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Hourly distribution (line chart)
  const hourlyDistributionData = {
    labels: chartData.hours,
    datasets: [
      {
        label: t.feedbackVolume,
        data: chartData.hourlyData,
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        fill: true,
        tension: 0.4,
      }
    ],
  };
  
  // Top concerns/keywords (horizontal bar chart)
  const topConcernsData = {
    labels: chartData.concernsLabels,
    datasets: [
      {
        label: t.feedbackCount,
        data: chartData.concernsData,
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(14, 165, 233, 0.8)',
        ],
      },
    ],
  };
  
  return (
    <div>
      {/* Tab navigation for chart types */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
        <button 
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'sentiment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
          onClick={() => setActiveTab('sentiment')}
        >
          {t.sentimentTrend}
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'airports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
          onClick={() => setActiveTab('airports')}
        >
          {t.airportComparison}
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'services' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
          onClick={() => setActiveTab('services')}
        >
          {t.serviceAnalysis}
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'keywords' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
          onClick={() => setActiveTab('keywords')}
        >
          {t.keywordAnalysis}
        </button>
        <button 
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'advanced' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
          onClick={() => setActiveTab('advanced')}
        >
          {t.feedbackVolume}
        </button>
      </div>
      
      {/* Timeframe selector */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">{t.timeframe}:</span>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">{t.lastWeek}</option>
            <option value="month">{t.lastMonth}</option>
            <option value="quarter">{t.lastQuarter}</option>
            <option value="year">{t.lastYear}</option>
          </select>
        </div>
      </div>
      
      {/* Chart display based on active tab */}
      <div className="mt-4">
        {activeTab === 'sentiment' && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">{t.sentimentTrend}</h3>
            <div className="h-80">
              <Line
                data={sentimentTrendData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  interaction: {
                    mode: 'index',
                    intersect: false,
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                    },
                  }
                }}
              />
            </div>
          </div>
        )}
        
        {activeTab === 'airports' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">{t.airportComparison}</h3>
              <div className="h-80">
                <Bar
                  data={airportComparisonData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      }
                    },
                    plugins: {
                      legend: {
                        display: false,
                      }
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">{t.languageBreakdown}</h3>
              <div className="h-80 flex justify-center items-center">
                <div style={{ width: '70%', height: '70%' }}>
                  <Doughnut
                    data={languageBreakdownData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          position: 'right',
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">{t.serviceAnalysis}</h3>
              <div className="h-80">
                <Pie
                  data={serviceAnalysisData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      }
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">{t.servicePerformance}</h3>
              <div className="h-80">
                <Radar
                  data={servicePerformanceData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      r: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        ticks: {
                          stepSize: 20
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        display: false,
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'keywords' && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">{t.topConcerns}</h3>
            <div className="h-80">
              <Bar
                data={topConcernsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: 'y',
                  scales: {
                    x: {
                      beginAtZero: true,
                    }
                  },
                  plugins: {
                    legend: {
                      display: false,
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
        
        {activeTab === 'advanced' && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">{t.hourlyDistribution}</h3>
            <div className="h-80">
              <Line
                data={hourlyDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    }
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCharts;