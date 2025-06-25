'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {language, setLanguage} = useLanguage();
  const router = useRouter();
  
  const translations = {
    en: {
      adminLogin: 'Admin Login',
      username: 'Username',
      password: 'Password',
      login: 'Login',
      loginToAccess: 'Login to access the admin dashboard',
      invalidCredentials: 'Invalid username or password',
    },
    ru: {
      adminLogin: 'Вход для администратора',
      username: 'Имя пользователя',
      password: 'Пароль',
      login: 'Войти',
      loginToAccess: 'Войдите, чтобы получить доступ к панели администратора',
      invalidCredentials: 'Неверное имя пользователя или пароль',
    },
    uz: {
      adminLogin: 'Admin kirishi',
      username: 'Foydalanuvchi nomi',
      password: 'Parol',
      login: 'Kirish',
      loginToAccess: 'Admin panelga kirish uchun tizimga kiring',
      invalidCredentials: 'Noto\'g\'ri foydalanuvchi nomi yoki parol',
    }
  };
  console.log(language);
  
  
  const t = translations[language];
  
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Demo uchun login tekshirish
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'uaaa2025') {
        console.log("Login successful, redirecting...");
        
        // LocalStorage ga saqlash
        window.localStorage.setItem('isAuthenticated', 'true');
        
        // VARIANT 1: NextJS router o'rniga to'g'ridan-to'g'ri window.location ishlating
        window.location.href = '/admin/dashboard';
        
        // VARIANT 2: Agar tepadagi variant ishlamasa:
        // setTimeout(() => {
        //   window.location.href = '/admin/dashboard';
        // }, 100);
      } else {
        setError(t.invalidCredentials);
        setLoading(false);
      }
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header language={language} onLanguageChange={handleLanguageChange} />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">{t.adminLogin}</h1>
          <p className="text-center text-gray-600 mb-6">{t.loginToAccess}</p>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                {t.username}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t.password}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                {loading ? 'Loading...' : t.login}
              </button>
            </div>
          </form>
          
          <div className="mt-6 p-2 bg-gray-100 rounded text-xs">
            <p>Debug info:</p>
            <p>Username: admin</p>
            <p>Password: uaaa2025</p>
          </div>
        </div>
      </main>
      
      <Footer language={language} />
    </div>
  );
}