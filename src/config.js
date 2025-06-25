// src/config.js

// API URL
export const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://uaaa-server.onrender.com/api';

// Server URL without /api path (for WebSockets)
export const serverUrl = apiUrl.replace('/api', '');

// App name
export const appName = 'Uzbekistan Airports AI Analytics';

// Available languages
export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'uz', name: 'O\'zbek', flag: '🇺🇿' }
];

// Airports list
export const airports = [
  { id: 'Tashkent', name: 'Tashkent International Airport' },
  { id: 'Samarkand', name: 'Samarkand International Airport' },
  { id: 'Bukhara', name: 'Bukhara International Airport' },
  { id: 'Urgench', name: 'Urgench International Airport' },
  { id: 'Termez', name: 'Termez International Airport' },
  { id: 'Namangan', name: 'Namangan International Airport' },
  { id: 'Andijan', name: 'Andijan International Airport' },
  { id: 'Nukus', name: 'Nukus International Airport' }
];

// Services list
export const services = [
  { id: 'check-in', name: 'Check-in Services' },
  { id: 'baggage', name: 'Baggage Services' },
  { id: 'passport-control', name: 'Passport Control' },
  { id: 'security', name: 'Security' },
  { id: 'restrooms', name: 'Restrooms' },
  { id: 'wifi', name: 'Wi-Fi Services' },
  { id: 'restaurants', name: 'Restaurants & Cafes' },
  { id: 'shops', name: 'Shops' },
  { id: 'transportation', name: 'Transportation' },
  { id: 'overall', name: 'Overall Experience' }
];