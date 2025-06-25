// src/components/feedback/FeedbackForm.jsx
'use client';

import { useState } from 'react';
import { feedbackAPI } from '@/services/api';
import { getSocket } from '@/services/socketService';
import { airports, services } from '@/config';
import { translations } from '@/utils/translations';
import { useLanguage } from '@/context/LanguageContext';

const FeedbackForm = ({ onResult}) => {
  const {language, setLanguage} = useLanguage();
  const t = translations[language];
  
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    airport: '',
    service: '',
    comment: ''
  });
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisStep, setAnalysisStep] = useState(0); // 0: not started, 1: submitting, 2: analyzing
  const [success, setSuccess] = useState(false);
  
  // Input o'zgarishini kuzatish
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing in comment field
    if (name === 'comment' && error) {
      setError('');
    }
  };
  
  // Formani yuborish
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccess(false);
    setAnalysisStep(0);
    
    // Validation
    if (!formData.comment.trim()) {
      setError(t.commentRequired);
      return;
    }
    
    if (!formData.airport) {
      setError(t.airportRequired);
      return;
    }
    
    if (!formData.service) {
      setError(t.serviceRequired);
      return;
    }
    
    setLoading(true);
    setAnalysisStep(1); // Submitting
    
    try {
      // Submit to API
      setAnalysisStep(2); // Analyzing
      const response = await feedbackAPI.submitFeedback(formData);
      
      // Send to socket if available
      const socket = getSocket();
      if (socket && socket.connected) {
        socket.emit('feedback_submitted', {
          id: response.data.id,
          comment: formData.comment,
          name: formData.name || 'Anonymous',
          airport: formData.airport,
          service: formData.service,
          sentiment: response.data.sentiment,
          language: response.data.language
        });
      }
      
      // Pass result to parent component
      onResult({
        sentiment: response.data.sentiment,
        score: response.data.sentimentScore,
        language: response.data.language
      });
      
      // Success message
      setSuccess(true);
      
      // Optional: Reset form
      // setFormData({
      //   name: '',
      //   email: '',
      //   airport: '',
      //   service: '',
      //   comment: ''
      // });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError(error.message || t.submissionError);
    } finally {
      setLoading(false);
      setAnalysisStep(0);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t.name} ({t.optional})
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t.enterName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t.email} ({t.optional})
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.enterEmail}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="airport" className="block text-sm font-medium text-gray-700 mb-1">
              {t.airport} <span className="text-red-500">*</span>
            </label>
            <select
              id="airport"
              name="airport"
              value={formData.airport}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
              required
            >
              <option value="">{t.selectAirport}</option>
              {airports.map(airport => (
                <option key={airport.id} value={airport.id}>
                  {airport.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
              {t.service} <span className="text-red-500">*</span>
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
              required
            >
              <option value="">{t.selectService}</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {t[service.id] || service.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            {t.yourFeedback} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder={t.enterFeedback}
            rows={5}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          ></textarea>
          
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
          
          {success && (
            <div className="mt-2 p-2 bg-green-50 text-green-700 rounded-md text-sm">
              {t.feedbackSubmitted}
            </div>
          )}
        </div>
        
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 flex justify-center items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {analysisStep === 1 ? t.submitting : t.analyzing}
              </>
            ) : t.submit}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FeedbackForm;