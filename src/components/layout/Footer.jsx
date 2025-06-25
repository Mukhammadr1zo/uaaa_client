// src/components/layout/Footer.jsx
import { useLanguage } from '@/context/LanguageContext';
const translations = {
  en: {
    footerDescription: "A platform for analyzing customer feedback about airport services using artificial intelligence.",
    contactUs: "Contact Us",
    address: "Address",
    phone: "Phone",
    followUs: "Follow Us",
    allRightsReserved: "All Rights Reserved",
    quickLinks: "Quick Links",
    home: "Home",
    about: "About Us",
    services: "Services",
    faq: "FAQ",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service"
  },
  ru: {
    footerDescription: "Платформа для анализа отзывов клиентов об услугах аэропорта с использованием искусственного интеллекта.",
    contactUs: "Свяжитесь с нами",
    address: "Адрес",
    phone: "Телефон",
    followUs: "Следите за нами",
    allRightsReserved: "Все права защищены",
    quickLinks: "Быстрые ссылки",
    home: "Главная",
    about: "О нас",
    services: "Услуги",
    faq: "FAQ",
    privacyPolicy: "Политика конфиденциальности",
    termsOfService: "Условия использования"
  },
  uz: {
    footerDescription: "Sun'iy intellektdan foydalanib, aeroport xizmatlari haqida mijozlar fikrlarini tahlil qilish platformasi.",
    contactUs: "Biz bilan bog'laning",
    address: "Manzil",
    phone: "Telefon",
    followUs: "Bizni kuzating",
    allRightsReserved: "Barcha huquqlar himoyalangan",
    quickLinks: "Tezkor havolalar",
    home: "Asosiy",
    about: "Biz haqimizda",
    services: "Xizmatlar",
    faq: "Ko'p so'raladigan savollar",
    privacyPolicy: "Maxfiylik siyosati",
    termsOfService: "Foydalanish shartlari"
  }
};

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">UAAA</h3>
            <p className="text-gray-300 mb-4">{t.footerDescription}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition duration-300">{t.home}</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition duration-300">{t.about}</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-white transition duration-300">{t.services}</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-white transition duration-300">{t.faq}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t.contactUs}</h3>
            <p className="text-gray-300 mb-2">
              <strong>Email:</strong> info@uaaa.uz
            </p>
            <p className="text-gray-300 mb-2">
              <strong>{t.phone}:</strong> +998 71 123 45 67
            </p>
            <p className="text-gray-300 mb-2">
              <strong>{t.address}:</strong> Tashkent, Uzbekistan
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t.followUs}</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-700 transition duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a href="#" className="bg-blue-400 w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-500 transition duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              
              <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 flex items-center justify-center rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a href="#" className="bg-blue-700 w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-800 transition duration-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-700 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Uzbekistan Airports AI Analytics. {t.allRightsReserved}.
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="/privacy" className="hover:text-white transition duration-300">{t.privacyPolicy}</a>
            <a href="/terms" className="hover:text-white transition duration-300">{t.termsOfService}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;