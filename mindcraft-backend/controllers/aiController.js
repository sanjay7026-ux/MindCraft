const { OpenAI } = require('openai');

// @desc    Chat with AI assistant
// @route   POST /api/ai/chat
// @access  Private
const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.gemini_key;

    if (!apiKey) {
      console.error('AI Chat Error: GEMINI_API_KEY missing');
      return res.status(500).json({ message: 'Gemini API key not configured' });
    }

    console.log('AI Chat Request:', message);

    // Initialize Google Generative AI SDK
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash', systemInstruction: 'You are a helpful health and wellness assistant. Give advice on nutrition, fitness, habits and motivation. Keep responses concise and friendly.' });

    // Call Gemini API
    const result = await model.generateContent(message);
    const reply = result.response.text() || 'Sorry, I could not generate an AI response right now.';

    console.log('AI Chat Response:', reply);

    res.status(200).json({ reply });
  } catch (error) {
    console.error('AI Chat Error Details:', {
      message: error.message,
      stack: error.stack,
    });
    
    // Graceful fallback so the frontend doesn't break on API/Quota errors
    const fallbackMessage = "I'm currently running in offline mode because of an API connection issue, but I'm still here to tell you: you're doing great! Keep up the consistency with your habits.";
    
    res.status(200).json({ reply: fallbackMessage });
  }
};

module.exports = {
  chatWithAI
};
