import { useLanguage } from '@/context/LanguageContext';
const translations = {
  en: {
    home: "Home",
    about: "About",
    contact: "Contact",
    admin: "Admin Panel"
  },
  ru: {
    home: "Главная",
    about: "О нас",
    contact: "Контакты",
    admin: "Панель администратора"
  },
  uz: {
    home: "Asosiy",
    about: "Biz haqimizda",
    contact: "Aloqa",
    admin: "Admin panel"
  }
};

const Header = () => {
  const {language, setLanguage} = useLanguage();
  const t = translations[language];
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a href="/" className="text-xl font-bold text-blue-600 flex items-center">
            <img src="/assets/images/logo.png" alt="UAAA Logo" className="h-12 mr-2" />
          </a>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600">{t.home}</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600">{t.about}</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600">{t.contact}</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none bg-gray-100 px-3 py-1 rounded-md border border-gray-300 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">🇬🇧 EN</option>
                <option value="ru">🇷🇺 RU</option>
                <option value="uz">🇺🇿 UZ</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            <a href="/admin" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
              {t.admin}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;