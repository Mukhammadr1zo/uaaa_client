'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import SentimentResult from '@/components/feedback/SentimentResult';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const {language, setLanguage} = useLanguage();
  const [sentimentResult, setSentimentResult] = useState(null);
  const [activeTab, setActiveTab] = useState('feedback'); // feedback, about, howItWorks
  
  // Til o'zgarganda
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };
  
  // Formadan natija kelganda
  const handleFeedbackResult = (result) => {
    setSentimentResult(result);
    
    // Natijani ko'rish uchun avtomatik scroll
    setTimeout(() => {
      const resultElement = document.getElementById('result-section');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  const translations = {
    en: {
      heroTitle: 'Welcome to Uzbekistan Airports AI Analytics',
      heroDescription: 'Share your feedback about airport services and instantly see a sentiment analysis of your comments.',
      feedbackTitle: 'Share Your Feedback',
      feedbackDescription: 'Your opinion helps us improve our services. Please fill out the form below to share your experience with Uzbekistan Airports.',
      yourFeedbackAnalysis: 'Your Feedback Analysis',
      aboutUAAA: 'About UAAA Platform',
      aboutDescription: 'Uzbekistan Airports AI Analytics (UAAA) is an advanced platform that uses artificial intelligence to analyze customer feedback and improve airport services.',
      howItWorks: 'How It Works',
      howItWorksDescription: 'Our AI system analyzes your feedback in real-time, identifying sentiment (positive, negative, or neutral) and key topics to help our team address issues and enhance your experience.',
      didYouKnow: 'Did You Know?',
      didYouKnowText: 'UAAA can analyze feedback in English, Russian, and Uzbek languages with high accuracy, helping us better serve our diverse customers.',
      airports: 'Our Airports',
      feedbackTab: 'Share Feedback',
      aboutTab: 'About Platform',
      howItWorksTab: 'How It Works',
      airportServices: 'Airport Services',
      checkIn: 'Check-in',
      baggage: 'Baggage',
      security: 'Security',
      immigration: 'Immigration',
      shops: 'Shops & Dining',
      airportMap: 'Airport Map'
    },
    ru: {
      heroTitle: 'Добро пожаловать в Uzbekistan Airports AI Analytics',
      heroDescription: 'Поделитесь своим мнением об услугах аэропорта и мгновенно увидите анализ эмоционального тона ваших комментариев.',
      feedbackTitle: 'Поделитесь своим мнением',
      feedbackDescription: 'Ваше мнение помогает нам улучшать наши услуги. Пожалуйста, заполните форму ниже, чтобы поделиться своим опытом с аэропортами Узбекистана.',
      yourFeedbackAnalysis: 'Анализ вашего отзыва',
      aboutUAAA: 'О платформе UAAA',
      aboutDescription: 'Uzbekistan Airports AI Analytics (UAAA) - это передовая платформа, использующая искусственный интеллект для анализа отзывов клиентов и улучшения услуг аэропорта.',
      howItWorks: 'Как это работает',
      howItWorksDescription: 'Наша система ИИ анализирует ваши отзывы в реальном времени, определяя эмоциональный тон (положительный, отрицательный или нейтральный) и ключевые темы, чтобы помочь нашей команде решить проблемы и улучшить ваш опыт.',
      didYouKnow: 'Знаете ли вы?',
      didYouKnowText: 'UAAA может анализировать отзывы на английском, русском и узбекском языках с высокой точностью, помогая нам лучше обслуживать наших разнообразных клиентов.',
      airports: 'Наши аэропорты',
      feedbackTab: 'Оставить отзыв',
      aboutTab: 'О платформе',
      howItWorksTab: 'Как это работает',
      airportServices: 'Услуги аэропорта',
      checkIn: 'Регистрация',
      baggage: 'Багаж',
      security: 'Безопасность',
      immigration: 'Иммиграция',
      shops: 'Магазины и рестораны',
      airportMap: 'Карта аэропорта'
    },
    uz: {
      heroTitle: 'Uzbekistan Airports AI Analytics platformasiga xush kelibsiz',
      heroDescription: "Aeroport xizmatlari haqida fikringizni baham ko'ring va izohlaringizning his-tuyg'ular tahlilini darhol ko'ring.",
      feedbackTitle: 'Fikringizni bildiring',
      feedbackDescription: "Sizning fikringiz xizmatlarimizni yaxshilashga yordam beradi. Iltimos, O'zbekiston aeroportlari tajribangiz haqida fikr bildirish uchun quyidagi shaklni to'ldiring.",
      yourFeedbackAnalysis: 'Fikringiz tahlili',
      aboutUAAA: 'UAAA platformasi haqida',
      aboutDescription: "Uzbekistan Airports AI Analytics (UAAA) - mijozlar fikrlarini tahlil qilish va aeroport xizmatlarini yaxshilash uchun sun'iy intellektdan foydalanadi",
      howItWorks: 'Bu qanday ishlaydi',
      howItWorksDescription: "Bizning AI tizimimiz sizning fikrlaringizni real vaqt rejimida tahlil qiladi, his-tuyg'ularni (ijobiy, salbiy yoki neytral) va jamoamizga muammolarni hal qilish va tajribangizni yaxshilashda yordam berish uchun asosiy mavzularni aniqlaydi.",
      didYouKnow: 'Bilasizmi?',
      didYouKnowText: "UAAA ingliz, rus va o'zbek tillaridagi fikr-mulohazalarni yuqori aniqlik bilan tahlil qila oladi, bu bizga turli mijozlarimizga yaxshiroq xizmat ko'rsatishga yordam beradi.",
      airports: 'Aeroportlarimiz',
      feedbackTab: 'Fikr bildirish',
      aboutTab: 'Platforma haqida',
      howItWorksTab: 'Qanday ishlaydi',
      airportServices: 'Aeroport xizmatlari',
      checkIn: 'Ro\'yxatdan o\'tish',
      baggage: 'Bagaj',
      security: 'Xavfsizlik',
      immigration: 'Immigratsiya',
      shops: 'Do\'konlar va restoranlar',
      airportMap: 'Aeroport xaritasi'
    }
  };

  const t = translations[language];
  
  // Airport services data
  const services = [
    { 
      id: 'checkin', 
      icon: '✓', 
      name: t.checkIn,
      description: {
        en: 'Fast and efficient check-in services across all our airports with self-service kiosks and dedicated staff.',
        ru: 'Быстрые и эффективные услуги регистрации во всех наших аэропортах с терминалами самообслуживания и специальным персоналом.',
        uz: 'Barcha aeroportlarimizda o\'z-o\'ziga xizmat ko\'rsatish terminallari va maxsus xodimlar bilan tez va samarali ro\'yxatdan o\'tish xizmatlari.'
      },
      image: '/assets/images/check.jpg'
    },
    { 
      id: 'baggage', 
      icon: '🧳', 
      name: t.baggage,
      description: {
        en: 'Efficient baggage handling systems ensuring your luggage arrives safely and on time.',
        ru: 'Эффективные системы обработки багажа, обеспечивающие безопасное и своевременное прибытие вашего багажа.',
        uz: 'Yukingizning xavfsiz va o\'z vaqtida yetib kelishini ta\'minlovchi samarali bagaj tizimi.'
      },
      image: '/images/baggage.jpg'
    },
    { 
      id: 'security', 
      icon: '🔒', 
      name: t.security,
      description: {
        en: 'State-of-the-art security procedures for your safety with minimal waiting times.',
        ru: 'Современные процедуры безопасности для вашей защиты с минимальным временем ожидания.',
        uz: 'Minimal kutish vaqti bilan xavfsizligingiz uchun zamonaviy xavfsizlik protsedura.'
      },
      image: '/images/security.jpg'
    },
    { 
      id: 'immigration', 
      icon: '🛂', 
      name: t.immigration,
      description: {
        en: 'Streamlined immigration and passport control processes for international travelers.',
        ru: 'Оптимизированные процессы иммиграционного и паспортного контроля для международных путешественников.',
        uz: 'Xalqaro sayohatchilar uchun soddalashtirilashtirgan immigratsiya va pasport nazorat jarayonlari.'
      },
      image: '/images/immigration.jpg'
    },
    { 
      id: 'shops', 
      icon: '🛍️', 
      name: t.shops,
      description: {
        en: 'Wide variety of shops and dining options to enhance your pre-flight experience.',
        ru: 'Широкий выбор магазинов и ресторанов для улучшения вашего опыта перед полетом.',
        uz: 'Parvozdan oldingi tajribangizni yaxshilash uchun turli xil do\'konlar va ovqatlanish imkoniyatlari.'
      },
      image: '/images/shops.jpg'
    }
  ];
  
  const [selectedService, setSelectedService] = useState(services[0]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} onLanguageChange={handleLanguageChange} />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  {t.heroTitle}
                </h1>
                <p className="text-xl mb-6">
                  {t.heroDescription}
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/assets/images/airport-illustration.jpg"
                  alt="Airport Illustration"
                  width={1000}
                  height={400}
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Main content */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Tab navigation */}
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
              <button 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'feedback' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('feedback')}
              >
                {t.feedbackTab}
              </button>
              <button 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'about' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('about')}
              >
                {t.aboutTab}
              </button>
              <button 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'services' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('services')}
              >
                {t.airportServices}
              </button>
              <button 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'how' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('how')}
              >
                {t.howItWorksTab}
              </button>
            </div>
            
            {/* Tab content */}
            <div>
              {/* Feedback Form */}
              {activeTab === 'feedback' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">
                      {t.feedbackTitle}
                    </h2>
                    <p className="mb-6">
                      {t.feedbackDescription}
                    </p>
                    
                    <FeedbackForm onResult={handleFeedbackResult} language={language} />
                    
                    {/* Result section */}
                    {sentimentResult && (
                      <div id="result-section" className="mt-10 scroll-mt-24">
                        <h3 className="text-xl font-bold mb-4">
                          {t.yourFeedbackAnalysis}
                        </h3>
                        <SentimentResult result={sentimentResult} language={language} />
                      </div>
                    )}
                  </div>
                  
                  {/* Sidebar */}
                  <div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-4">
                        {t.aboutUAAA}
                      </h3>
                      <p className="mb-4">
                        {t.aboutDescription}
                      </p>
                      
                      <h4 className="text-lg font-semibold mb-2">
                        {t.howItWorks}
                      </h4>
                      <p className="mb-4">
                        {t.howItWorksDescription}
                      </p>
                      
                      <div className="bg-blue-50 p-4 rounded-md mt-6">
                        <h4 className="text-lg font-semibold text-blue-700 mb-2">
                          {t.didYouKnow}
                        </h4>
                        <p className="text-sm">
                          {t.didYouKnowText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* About Tab */}
              {activeTab === 'about' && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6">{t.aboutUAAA}</h2>
                  <p className="mb-6">{t.aboutDescription}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">{t.airports}</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 text-blue-600">✈️</div>
                          <div className="ml-3">
                            <p className="font-medium">Tashkent International Airport</p>
                            <p className="text-sm text-gray-600">Main international gateway to Uzbekistan</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 text-blue-600">✈️</div>
                          <div className="ml-3">
                            <p className="font-medium">Samarkand International Airport</p>
                            <p className="text-sm text-gray-600">Serving the historic city of Samarkand</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 text-blue-600">✈️</div>
                          <div className="ml-3">
                            <p className="font-medium">Bukhara International Airport</p>
                            <p className="text-sm text-gray-600">Gateway to the ancient Silk Road city</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 text-blue-600">✈️</div>
                          <div className="ml-3">
                            <p className="font-medium">Other Regional Airports</p>
                            <p className="text-sm text-gray-600">Including Urgench, Termez, Namangan, and more</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">UAAA Platform</h3>
                      <div className="prose">
                        <p>The Uzbekistan Airports AI Analytics platform leverages artificial intelligence to:</p>
                        <ul>
                          <li>Analyze customer feedback in multiple languages</li>
                          <li>Identify sentiment trends and patterns</li>
                          <li>Highlight areas for service improvement</li>
                          <li>Enhance overall passenger experience</li>
                          <li>Provide data-driven insights for management</li>
                        </ul>
                        <p>Our system processes thousands of feedback submissions monthly to continuously improve airport services across Uzbekistan.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Services Tab */}
              {activeTab === 'services' && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6">{t.airportServices}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <ul className="border rounded-lg overflow-hidden">
                        {services.map(service => (
                          <li key={service.id} className="border-b last:border-b-0">
                            <button
                              className={`w-full flex items-center p-4 text-left ${selectedService.id === service.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
                              onClick={() => setSelectedService(service)}
                            >
                              <span className="text-xl mr-3">{service.icon}</span>
                              <span className="font-medium">{service.name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="col-span-1 md:col-span-3">
                      <div className="rounded-lg overflow-hidden">
                        <div className="relative h-60 w-full">
                          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                            <span className="text-lg text-gray-500">[Service Image]</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3">{selectedService.name}</h3>
                          <p className="text-gray-700">
                            {selectedService.description[language]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* How It Works Tab */}
              {activeTab === 'how' && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6">{t.howItWorks}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4">1</div>
                      <h3 className="text-lg font-semibold mb-2">Submit Your Feedback</h3>
                      <p className="text-gray-600">Fill out the feedback form with your experience at any Uzbekistan airport</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4">2</div>
                      <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
                      <p className="text-gray-600">Our AI system analyzes your feedback for sentiment and key topics in real-time</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mb-4">3</div>
                      <h3 className="text-lg font-semibold mb-2">Improvement</h3>
                      <p className="text-gray-600">Your feedback helps us identify areas for improvement and implement changes</p>
                    </div>
                  </div>
                  
                  <div className="mt-10 border-t pt-6">
                    <h3 className="text-xl font-bold mb-4">Technical Details</h3>
                    <p className="mb-4">The UAAA platform uses advanced natural language processing (NLP) and machine learning algorithms to:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Multilingual Analysis</h4>
                        <p className="text-sm text-gray-600">Our system can analyze content in Uzbek, Russian, and English with specialized linguistic models for each language.</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Sentiment Classification</h4>
                        <p className="text-sm text-gray-600">AI models classify feedback as positive, neutral, or negative with confidence scores to indicate certainty.</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Topic Extraction</h4>
                        <p className="text-sm text-gray-600">Advanced algorithms identify key topics and themes across thousands of feedback submissions.</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Trend Analysis</h4>
                        <p className="text-sm text-gray-600">The system tracks sentiment trends over time across different airports and service categories.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
}