require('dotenv').config();
const https = require('https');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testNutrition() {
  console.log('Testing Nutrition...');
  const query = '1 apple';
  const apiKey = process.env.CALORIE_NINJAS_API_KEY;
  console.log('API Key:', apiKey);

  const options = {
    hostname: 'api.calorieninjas.com',
    path: `/v1/nutrition?query=${encodeURIComponent(query)}`,
    method: 'GET',
    headers: {
      'X-Api-Key': apiKey
    }
  };

  try {
    const apiResponse = await new Promise((resolve, reject) => {
      const apiReq = https.request(options, (apiRes) => {
        let data = '';
        apiRes.on('data', (chunk) => { data += chunk; });
        apiRes.on('end', () => {
          resolve({ statusCode: apiRes.statusCode, body: data });
        });
      });
      apiReq.on('error', reject);
      apiReq.end();
    });
    console.log('Nutrition Status:', apiResponse.statusCode);
    console.log('Nutrition Body:', apiResponse.body);
  } catch(e) {
    console.error('Nutrition Error:', e);
  }
}

const { OpenAI } = require('openai');

async function testAI() {
  console.log('\nTesting AI (Google AI Studio directly)...');
  const apiKey = process.env.GEMINI_API_KEY || process.env.gemini_key;
  console.log('AI Key:', apiKey);
  
  if (!apiKey) {
    console.log('No AI key found');
    return;
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const models = ['gemini-2.5-flash', 'gemini-1.5-flash'];
  
  for (const modelName of models) {
    try {
      console.log('Trying model:', modelName);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Hello');
      console.log(`Success with ${modelName}:`, result.response.text());
      break;
    } catch(e) {
      console.error(`Failed with ${modelName}:`, e.message);
    }
  }
}

async function run() {
  await testAI();
}

run();
