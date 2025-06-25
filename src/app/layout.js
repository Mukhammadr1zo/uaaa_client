// src/app/layout.js
import { Inter } from 'next/font/google';
import { initializeSocket } from '@/services/socketService';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

// Socket.IO ni boshlang'ich holatda ishga tushirish
if (typeof window !== 'undefined') {
  initializeSocket();
}

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'UAAA - Uzbekistan Airports AI Analytics',
  description: 'Online feedback sentiment analysis platform for Uzbekistan Airports',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}