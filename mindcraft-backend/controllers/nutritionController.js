const { OpenAI } = require('openai');

// @desc    Lookup nutrition info for a food/meal using Gemini AI
// @route   POST /api/nutrition/lookup
// @access  Private
const lookupNutrition = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({ message: 'Please provide a food query' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.gemini_key;

    if (!apiKey) {
      return res.status(500).json({ message: 'Gemini API key not configured in backend' });
    }

    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);

    const systemPrompt = `You are a strict nutrition database. The user will provide a food or meal query. 
You must respond ONLY with a valid raw JSON array containing exactly one object with the total nutritional estimate.
Do NOT wrap the response in markdown blocks like \`\`\`json. Return just the raw JSON text.
The object MUST have these exact numerical and string keys:
[
  {
    "name": "string (name of food)",
    "calories": number,
    "protein_g": number,
    "carbs_g": number,
    "fat_g": number,
    "fiber_g": number,
    "serving_qty": number,
    "serving_unit": "string (e.g. g, oz, serving)"
  }
]`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash', systemInstruction: systemPrompt });

    const result = await model.generateContent(query.trim());
    let rawOutput = result.response.text();

    if (!rawOutput) {
      throw new Error('No response from AI model');
    }

    // Clean up any potential markdown code blocks if the AI still includes them
    rawOutput = rawOutput.replace(/```json/g, '').replace(/```/g, '').trim();

    const parsedData = JSON.parse(rawOutput);

    // Ensure it's an array and map to exact frontend format
    const items = Array.isArray(parsedData) ? parsedData : [parsedData];

    const foods = items.map(food => ({
      name: food.name || query,
      calories: Math.round(food.calories || 0),
      protein_g: Math.round((food.protein_g || 0) * 10) / 10,
      carbs_g: Math.round((food.carbs_g || 0) * 10) / 10,
      fat_g: Math.round((food.fat_g || 0) * 10) / 10,
      fiber_g: Math.round((food.fiber_g || 0) * 10) / 10,
      serving_qty: food.serving_qty || 1,
      serving_unit: food.serving_unit || 'serving',
      photo: null // We don't have photos from AI
    }));

    res.status(200).json({ foods });
  } catch (error) {
    console.error('Nutrition AI lookup error:', error.message);
    if (error.message && error.message.includes('429')) {
      res.status(429).json({ message: 'Free API rate limit reached. Please wait a minute before trying again.' });
    } else {
      res.status(500).json({ message: 'Failed to fetch nutrition data. Please try again.' });
    }
  }
};

module.exports = {
  lookupNutrition
};
