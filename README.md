# AI Companion Chat App

A modern web application that allows users to chat with AI companions (girlfriend/boyfriend) using Google's Gemini AI. The app features user authentication, credit system, and payment integration using Stripe.

## Features

- Choose between AI girlfriend or boyfriend personality
- Real-time chat interface
- Credit-based conversation system
- User authentication with Firebase
- Payment integration with Stripe
- Modern and responsive UI with Tailwind CSS

## Prerequisites

- Node.js 18.x or later
- Firebase account and project
- Google Gemini API key
- Stripe account and API keys

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd ai-companion-chat
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Google Gemini API
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Sign in using your Firebase account
2. Choose between AI girlfriend or boyfriend personality
3. Start chatting! Each message costs 1 credit
4. Purchase more credits when needed using Stripe

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Firebase (Authentication & Firestore)
- Google Gemini AI
- Stripe
- Zustand (State Management)
