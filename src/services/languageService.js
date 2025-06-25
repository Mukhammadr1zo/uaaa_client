// src/services/languageService.js

const translations = {
  en: {
    // Global navigation
    home: "Home",
    about: "About",
    contact: "Contact Us",
    admin: "Admin Panel",
    loginToAdmin: "Login to Admin",
    logout: "Logout",
    
    // Home page
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
    
    // Tabs
    feedbackTab: 'Share Feedback',
    aboutTab: 'About Platform',
    howItWorksTab: 'How It Works',
    servicesTab: 'Airport Services',
    
    // Services
    airportServices: 'Airport Services',
    checkIn: 'Check-in',
    baggage: 'Baggage',
    security: 'Security',
    immigration: 'Immigration',
    shops: 'Shops & Dining',
    airportMap: 'Airport Map',
    
    // Feedback form
    name: "Name",
    email: "Email",
    airport: "Airport",
    service: "Service",
    yourFeedback: "Your Feedback",
    enterName: "Enter your name",
    enterEmail: "Enter your email",
    selectAirport: "Select an airport",
    selectService: "Select a service",
    enterFeedback: "Please share your experience...",
    submit: "Submit Feedback",
    submitting: "Submitting...",
    analyzing: "Analyzing your feedback...",
    optional: "optional",
    commentRequired: "Please enter your feedback comment.",
    feedbackSubmitted: "Thank you for your feedback!",
    passportControl: "Passport Control",
    restrooms: "Restrooms",
    wifi: "Wi-Fi Services",
    restaurants: "Restaurants & Cafes",
    transportation: "Transportation",
    overallExperience: "Overall Experience",
    
    // Sentiment analysis
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
    feedbackProcessing: "Your feedback will be processed by our team to improve services.",
    
    // Admin
    adminLogin: 'Admin Login',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    loginToAccess: 'Login to access the admin dashboard',
    invalidCredentials: 'Invalid username or password',
    dashboard: 'Dashboard',
    welcome: 'Welcome to UAAA Admin Dashboard',
    overview: 'Here you can monitor feedback sentiment analysis in real-time',
    
    // Dashboard stats
    totalFeedbacks: 'Total Feedbacks',
    positiveFeedbacks: 'Positive',
    neutralFeedbacks: 'Neutral',
    negativeFeedbacks: 'Negative',
    latestFeedbacks: 'Latest Feedbacks',
    feedbackAnalytics: 'Feedback Analytics',
    
    // Charts
    sentimentTrend: 'Sentiment Trend',
    airportComparison: 'Airport Comparison',
    serviceAnalysis: 'Service Analysis',
    feedbackCount: 'Feedback Count',
    timeframe: 'Timeframe',
    lastWeek: 'Last Week',
    lastMonth: 'Last Month',
    lastQuarter: 'Last Quarter',
    lastYear: 'Last Year',
    
    // Footer
    footerDescription: "A platform for analyzing customer feedback about airport services using artificial intelligence.",
    contactUs: "Contact Us",
    phone: "Phone",
    address: "Address",
    followUs: "Follow Us",
    allRightsReserved: "All Rights Reserved",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
  },
  ru: {
    // Global navigation
    home: "Главная",
    about: "О нас",
    contact: "Контакты",
    admin: "Панель администратора",
    loginToAdmin: "Вход для администратора",
    logout: "Выйти",
    
    // Home page
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
    
    // Tabs
    feedbackTab: 'Оставить отзыв',
    aboutTab: 'О платформе',
    howItWorksTab: 'Как это работает',
    servicesTab: 'Услуги аэропорта',
    
    // Services
    airportServices: 'Услуги аэропорта',
    checkIn: 'Регистрация',
    baggage: 'Багаж',
    security: 'Безопасность',
    immigration: 'Иммиграция',
    shops: 'Магазины и рестораны',
    airportMap: 'Карта аэропорта',
    
    // Feedback form
    name: "Имя",
    email: "Эл. почта",
    airport: "Аэропорт",
    service: "Услуга",
    yourFeedback: "Ваш отзыв",
    enterName: "Введите ваше имя",
    enterEmail: "Введите вашу эл. почту",
    selectAirport: "Выберите аэропорт",
    selectService: "Выберите услугу",
    enterFeedback: "Поделитесь своим опытом...",
    submit: "Отправить отзыв",
    submitting: "Отправка...",
    analyzing: "Анализируем ваш отзыв...",
    optional: "необязательно",
    commentRequired: "Пожалуйста, введите текст отзыва.",
    feedbackSubmitted: "Спасибо за ваш отзыв!",
    passportControl: "Паспортный контроль",
    restrooms: "Санитарные комнаты",
    wifi: "Wi-Fi услуги",
    restaurants: "Рестораны и кафе",
    shops: "Магазины",
    transportation: "Транспорт",
    overallExperience: "Общее впечатление",
    
    // Sentiment analysis
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
    feedbackProcessing: "Ваш отзыв будет обработан нашей командой для улучшения услуг.",
    
    // Admin
    adminLogin: 'Вход для администратора',
    username: 'Имя пользователя',
    password: 'Пароль',
    login: 'Войти',
    loginToAccess: 'Войдите, чтобы получить доступ к панели администратора',
    invalidCredentials: 'Неверное имя пользователя или пароль',
    dashboard: 'Панель управления',
    welcome: 'Добро пожаловать в панель управления UAAA',
    overview: 'Здесь вы можете отслеживать анализ отзывов в режиме реального времени',
    
    // Dashboard stats
    totalFeedbacks: 'Всего отзывов',
    positiveFeedbacks: 'Положительные',
    neutralFeedbacks: 'Нейтральные',
    negativeFeedbacks: 'Отрицательные',
    latestFeedbacks: 'Последние отзывы',
    feedbackAnalytics: 'Аналитика отзывов',
    
    // Charts
    sentimentTrend: 'Тренд настроения',
    airportComparison: 'Сравнение аэропортов',
    serviceAnalysis: 'Анализ услуг',
    feedbackCount: 'Количество отзывов',
    timeframe: 'Период',
    lastWeek: 'Последняя неделя',
    lastMonth: 'Последний месяц',
    lastQuarter: 'Последний квартал',
    lastYear: 'Последний год',
    
    // Footer
    footerDescription: "Платформа для анализа отзывов клиентов об услугах аэропорта с использованием искусственного интеллекта.",
    contactUs: "Свяжитесь с нами",
    phone: "Телефон",
    address: "Адрес",
    followUs: "Следите за нами",
    allRightsReserved: "Все права защищены",
    privacyPolicy: "Политика конфиденциальности",
    termsOfService: "Условия использования",
  },
  uz: {
    // Global navigation
    home: "Asosiy",
    about: "Biz haqimizda",
    contact: "Bog'lanish",
    admin: "Admin panel",
    loginToAdmin: "Admin kirishi",
    logout: "Chiqish",
    
    // Home page
    heroTitle: 'Uzbekistan Airports AI Analytics platformasiga xush kelibsiz',
    heroDescription: "Aeroport xizmatlari haqida fikringizni baham ko'ring va izohlaringizning his-tuyg'ular tahlilini darhol ko'ring.",
    feedbackTitle: 'Fikringizni bildiring',
    feedbackDescription: "Sizning fikringiz xizmatlarimizni yaxshilashga yordam beradi. Iltimos, O'zbekiston aeroportlari tajribangiz haqida fikr bildirish uchun quyidagi shaklni to'ldiring.",
    yourFeedbackAnalysis: 'Fikringiz tahlili',
    aboutUAAA: 'UAAA platformasi haqida',
    aboutDescription: "Uzbekistan Airports AI Analytics (UAAA) - mijozlar fikrlarini tahlil qilish va aeroport xizmatlarini yaxshilash uchun sun'iy intellektdan foydalanadigan ilg'or platforma.",
    howItWorks: 'Bu qanday ishlaydi',
    howItWorksDescription: "Bizning AI tizimimiz sizning fikrlaringizni real vaqt rejimida tahlil qiladi, his-tuyg'ularni (ijobiy, salbiy yoki neytral) va jamoamizga muammolarni hal qilish va tajribangizni yaxshilashda yordam berish uchun asosiy mavzularni aniqlaydi.",
    didYouKnow: 'Bilasizmi?',
    didYouKnowText: "UAAA ingliz, rus va o'zbek tillaridagi fikr-mulohazalarni yuqori aniqlik bilan tahlil qila oladi, bu bizga turli mijozlarimizga yaxshiroq xizmat ko'rsatishga yordam beradi.",
    airports: 'Aeroportlarimiz',
    
    // Tabs
    feedbackTab: 'Fikr bildirish',
    aboutTab: 'Platforma haqida',
    howItWorksTab: 'Qanday ishlaydi',
    servicesTab: 'Aeroport xizmatlari',
    
    // Services
    airportServices: 'Aeroport xizmatlari',
    checkIn: 'Ro\'yxatdan o\'tish',
    baggage: 'Bagaj',
    security: 'Xavfsizlik',
    immigration: 'Immigratsiya',
    shops: 'Do\'konlar va restoranlar',
    airportMap: 'Aeroport xaritasi',
    
    // Feedback form
    name: "Ism",
    email: "Elektron pochta",
    airport: "Aeroport",
    service: "Xizmat",
    yourFeedback: "Sizning fikringiz",
    enterName: "Ismingizni kiriting",
    enterEmail: "Elektron pochtangizni kiriting",
    selectAirport: "Aeroportni tanlang",
    selectService: "Xizmat turini tanlang",
    enterFeedback: "Tajribangizni baham ko'ring...",
    submit: "Yuborish",
    submitting: "Yuborilmoqda...",
    analyzing: "Sizning fikringiz tahlil qilinmoqda...",
    optional: "ixtiyoriy",
    commentRequired: "Iltimos, fikr matnini kiriting.",
    feedbackSubmitted: "Fikr bildirgningiz uchun rahmat!",
    passportControl: "Pasport nazorati",
    restrooms: "Hojatxonalar",
    wifi: "Wi-Fi xizmatlari",
    restaurants: "Restoranlar va kafelar",
    shops: "Do'konlar",
    transportation: "Transport",
    overallExperience: "Umumiy taassurot",
    
    // Sentiment analysis
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
    feedbackProcessing: "Sizning fikringiz xizmatlarni yaxshilash uchun jamoamiz tomonidan ko'rib chiqiladi.",
    
    // Admin
    adminLogin: 'Admin kirishi',
    username: 'Foydalanuvchi nomi',
    password: 'Parol',
    login: 'Kirish',
    loginToAccess: 'Admin panelga kirish uchun tizimga kiring',
    invalidCredentials: 'Noto\'g\'ri foydalanuvchi nomi yoki parol',
    dashboard: 'Boshqaruv paneli',
    welcome: 'UAAA boshqaruv paneliga xush kelibsiz',
    overview: 'Bu yerda fikr-mulohazalar tahlilini real vaqtda kuzatishingiz mumkin',
    
    // Dashboard stats
    totalFeedbacks: 'Jami fikrlar',
    positiveFeedbacks: 'Ijobiy',
    neutralFeedbacks: 'Neytral',
    negativeFeedbacks: 'Salbiy',
    latestFeedbacks: 'So\'nggi fikrlar',
    feedbackAnalytics: 'Fikr-mulohazalar tahlili',
    
    // Charts
    sentimentTrend: 'Kayfiyat tendensiyasi',
    airportComparison: 'Aeroportlar taqqoslash',
    serviceAnalysis: 'Xizmatlar tahlili',
    feedbackCount: 'Fikrlar soni',
    timeframe: 'Vaqt oralig\'i',
    lastWeek: 'So\'nggi hafta',
    lastMonth: 'So\'nggi oy',
    lastQuarter: 'So\'nggi chorak',
    lastYear: 'So\'nggi yil',
    
    // Footer
    footerDescription: "Sun'iy intellektdan foydalanib, aeroport xizmatlari haqida mijozlar fikrlarini tahlil qilish platformasi.",
    contactUs: "Biz bilan bog'laning",
    phone: "Telefon",
    address: "Manzil",
    followUs: "Bizni kuzating",
    allRightsReserved: "Barcha huquqlar himoyalangan",
    privacyPolicy: "Maxfiylik siyosati",
    termsOfService: "Foydalanish shartlari",
  }
};

// Get translation for specific key and language
export const getTranslation = (key, language = 'en') => {
  if (!translations[language] || !translations[language][key]) {
    // Fallback to English if translation doesn't exist
    return translations.en[key] || key;
  }
  return translations[language][key];
};

// Get all translations for a language
export const getAllTranslations = (language = 'en') => {
  return translations[language] || translations.en;
};

// Detect language from text
export const detectLanguage = (text) => {
  if (!text) return 'en';
  
  // Simple language detection based on specific characters
  if (/[қўғҳ]/i.test(text)) return 'uz';
  if (/[ёъыэ]/i.test(text)) return 'ru';
  
  return 'en';
};

// Language options for UI selection
export const languageOptions = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'uz', name: 'O\'zbek', flag: '🇺🇿' }
];