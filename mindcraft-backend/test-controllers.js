require('dotenv').config();
const { chatWithAI } = require('./controllers/aiController');
const { lookupNutrition } = require('./controllers/nutritionController');

async function runTests() {
  console.log('--- TESTING CHATBOT ---');
  
  const messagesToTest = [
    "I'm feeling really unmotivated to work out today.",
    "What are some healthy snacks for late night cravings?"
  ];

  for (const msg of messagesToTest) {
    console.log(`\nUser: ${msg}`);
    
    const req = { body: { message: msg } };
    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        console.log(`AI (Status ${this.statusCode}): ${data.reply || data.message || JSON.stringify(data)}`);
      }
    };
    
    await chatWithAI(req, res);
  }

  console.log('\n--- TESTING NUTRITION ---');
  
  const nutritionQueries = [
    "pizza"
  ];

  for (const query of nutritionQueries) {
    console.log(`\nQuery: ${query}`);
    
    const req = { body: { query } };
    const res = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        console.log(`Nutrition Output (Status ${this.statusCode}):\n`, JSON.stringify(data, null, 2));
      }
    };
    
    await lookupNutrition(req, res);
  }
}

runTests();
