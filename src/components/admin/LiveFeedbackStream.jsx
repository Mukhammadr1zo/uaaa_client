// src/components/admin/LiveFeedbackStream.jsx
'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import { formatDate } from '@/utils/formatters';
import { getSocket, joinAdminRoom } from '@/services/socketService';
import { feedbackAPI } from '@/services/api';
import { translations } from '@/utils/translations';

const getSentimentColor = (sentiment) => {
  switch (sentiment) {
    case 'positive':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'negative':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'neutral':
    default:
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  }
};

const getSentimentText = (sentiment, language) => {
  const t = translations[language];
  
  switch (sentiment) {
    case 'positive':
      return t.positive;
    case 'negative':
      return t.negative;
    case 'neutral':
    default:
      return t.neutral;
  }
};

const LiveFeedbackStream = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFeedbackCount, setNewFeedbackCount] = useState(0);
  const [autoLoad, setAutoLoad] = useState(true);
  const [filteredAirport, setFilteredAirport] = useState('');
  const [availableAirports, setAvailableAirports] = useState([]);
  
  // Load initial feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await feedbackAPI.getFeedbacks({
          limit: 10,
          sort: '-createdAt'
        });
        
        if (response.success) {
          setFeedbacks(response.data);
          
          // Extract unique airports
          const airports = [...new Set(response.data.map(item => item.airport))];
          setAvailableAirports(airports);
        }
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeedbacks();
  }, []);
  
  // Set up socket.io for real-time updates
  useEffect(() => {
    const socket = getSocket();
    
    // Join admin room to get notifications
    joinAdminRoom();
    
    // Listen for new feedbacks
    socket.on('new_feedback', (feedback) => {
      console.log('New feedback received:', feedback);
      
      if (autoLoad && (!filteredAirport || filteredAirport === feedback.airport)) {
        // Add to list if auto-load is on and matches filter
        setFeedbacks(prev => [feedback, ...prev]);
      } else {
        // Otherwise increment counter
        setNewFeedbackCount(prev => prev + 1);
      }
      
      // Update available airports if needed
      setAvailableAirports(prev => {
        if (!prev.includes(feedback.airport)) {
          return [...prev, feedback.airport];
        }
        return prev;
      });
    });
    
    return () => {
      socket.off('new_feedback');
    };
  }, [autoLoad, filteredAirport]);
  
  // Handle loading new feedbacks
  const handleLoadNewFeedbacks = async () => {
    try {
      const params = {
        limit: newFeedbackCount + 5,
        sort: '-createdAt'
      };
      
      if (filteredAirport) {
        params.airport = filteredAirport;
      }
      
      const response = await feedbackAPI.getFeedbacks(params);
      
      if (response.success) {
        // Merge with existing feedbacks
        const existingIds = new Set(feedbacks.map(f => f._id));
        const newFeedbacks = response.data.filter(f => !existingIds.has(f._id));
        
        setFeedbacks(prev => [...newFeedbacks, ...prev]);
        setNewFeedbackCount(0);
      }
    } catch (error) {
      console.error('Error loading new feedbacks:', error);
    }
  };
  
  // Filter feedbacks by airport
  const filteredFeedbacks = filteredAirport
    ? feedbacks.filter(f => f.airport === filteredAirport)
    : feedbacks;
  
  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{t.liveFeedback}</h3>
        
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          {/* Auto refresh toggle */}
          <label className="inline-flex items-center cursor-pointer">
            <span className="mr-2 text-sm text-gray-600">{t.autoRefresh}</span>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={autoLoad}
                onChange={() => setAutoLoad(!autoLoad)}
              />
              <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
            </div>
          </label>
          
          {/* Airport filter */}
          <select 
            className="text-sm border rounded px-2 py-1 bg-white"
            value={filteredAirport}
            onChange={(e) => setFilteredAirport(e.target.value)}
          >
            <option value="">{t.allAirports}</option>
            {availableAirports.map(airport => (
              <option key={airport} value={airport}>{airport}</option>
            ))}
          </select>
          
          {/* New feedbacks notification */}
          {newFeedbackCount > 0 && (
            <button
              onClick={handleLoadNewFeedbacks}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center"
            >
              {newFeedbackCount} {t.newFeedbacks}
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {filteredFeedbacks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {t.noFeedbacksYet}
        </div>
      ) : (
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredFeedbacks.map(feedback => (
            <div key={feedback._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between mb-2">
                <div className="font-medium">{feedback.name || 'Anonymous'}</div>
                <div className="text-sm text-gray-500">{formatDate(feedback.createdAt, language)}</div>
              </div>
              
              <p className="text-gray-700 mb-3">{feedback.comment}</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                  {feedback.airport}
                </span>
                
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  {feedback.service}
                </span>
                
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(feedback.sentiment)}`}>
                  {getSentimentText(feedback.sentiment, language)}
                </span>
                
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  {feedback.language.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
          
          {!autoLoad && (
            <div className="text-center pt-4">
              <button onClick={handleLoadNewFeedbacks} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                {t.loadMore} →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveFeedbackStream;