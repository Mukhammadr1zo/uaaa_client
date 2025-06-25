// src/app/api/feedback/route.js
import { NextResponse } from 'next/server';
import { analyzeSentiment } from '@/services/nlp';

export async function POST(request) {
  try {
    const body = await request.json();
    const { comment, name, email, airport, service } = body;
    
    if (!comment) {
      return NextResponse.json({ error: 'Comment is required' }, { status: 400 });
    }
    
    // Detect language (in real implementation, this would be more sophisticated)
    let language = 'en';
    if (/[қўғҳ]/i.test(comment)) {
      language = 'uz';
    } else if (/[ёъыэ]/i.test(comment)) {
      language = 'ru';
    }
    
    // Analyze sentiment
    const sentimentResult = await analyzeSentiment(comment, language);
    
    // In a real implementation, store to database here
    // const feedback = await db.collection('feedbacks').insertOne({
    //   comment,
    //   name: name || 'Anonymous',
    //   email,
    //   airport,
    //   service,
    //   language,
    //   sentiment: sentimentResult.sentiment,
    //   sentimentScore: sentimentResult.score,
    //   timestamp: new Date()
    // });
    
    // Return the sentiment analysis result
    return NextResponse.json({
      success: true,
      data: {
        feedbackId: 'temp-id-' + Date.now(), // In real implementation, this would be the DB ID
        sentiment: sentimentResult.sentiment,
        score: sentimentResult.score,
        language
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json({ error: 'Failed to process feedback' }, { status: 500 });
  }
}