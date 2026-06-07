# Mindcraft Habit Builder 🧠✨

Mindcraft is a comprehensive, AI-driven wellness and habit-tracking platform designed to help you build positive habits, stay motivated, and track your nutrition with ease. It goes beyond traditional habit trackers by acting as a personal wellness companion powered by Google's Gemini AI.

## 🚀 Features

- **Interactive Habit Tracking:** Easily log, manage, and monitor your daily habits.
- **AI Wellness Chatbot:** Get 24/7 personalized advice on fitness, motivation, and healthy habits.
- **Smart Nutrition Lookup:** Type any meal (e.g., "2 eggs and toast") and instantly get accurate calorie and macronutrient breakdowns using AI.
- **Analytics Dashboard:** Visual representation of your progress, streaks, and perfect days using real-time data.
- **Secure Authentication:** JWT-based user login and secure data protection.

## 🛠️ Technology Stack

- **Frontend:** Next.js, React, Tailwind CSS, Recharts
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **AI Integration:** Google Gemini API (`@google/generative-ai`)

## 💻 Getting Started (Local Development)

Follow these steps to set up the project locally on your machine.

### Prerequisites
- Node.js installed
- MongoDB instance (local or MongoDB Atlas)
- Google Gemini API Key (from Google AI Studio)

### 1. Clone the repository
```bash
git clone https://github.com/sanjay7026-ux/MindCraft.git
cd MindCraft
```

### 2. Backend Setup
```bash
cd mindcraft-backend
npm install
```
Create a `.env` file in the `mindcraft-backend` folder and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=super_secret_mindcraft_key_2026
FRONTEND_URL=http://localhost:3000
gemini_key=your_google_gemini_api_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd mindcraft-frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## 🌐 Deployment
- **Backend:** Designed to be hosted on platforms like Render or Railway.
- **Frontend:** Designed to be deployed effortlessly on Vercel.

## 🔮 Future Scope
- Integration with wearables and fitness trackers (Apple Health, Google Fit).
- Social features like leaderboards and community challenges.
- AI-generated personalized workout routines and meal prep schedules.
- Dedicated iOS and Android mobile applications.

---
*Built with ❤️ to make habit building effortless and intelligent.*
