








# 🩺 Care Nest

**Live Demo:** [https://care-nest1234.vercel.app/](https://care-nest1234.vercel.app/)
 
### A Simple, Intelligent Health Companion for Everyday Patients
Care Nest is a patient-first digital health platform that simplifies managing prescriptions, reports, medications, daily vitals, and doctor follow-ups. It offers a secure and easy-to-use interface, along with an empathetic AI healthcare assistant, making personal health management accessible without requiring technical expertise.

---

## 🚨 The Problem

Healthcare management is fragmented and difficult for most patients:
- Prescriptions are often lost or hard to understand
- Patients forget medicines or take incorrect dosages
- Follow-up visits are missed
- Medical history is scattered across files and apps
- Elderly and non-tech users struggle with complex interfaces

➡️ *This leads to poor adherence, delayed care, and avoidable health risks.*

---

## 💡 The Solution

Care Nest provides a **single, intuitive platform** that organizes a patient’s entire medical journey:
- 📂 Centralized storage for prescriptions and reports
- 💊 Smart medicine reminders with dosage tracking
- ⏰ Automated follow-up alerts
- 📊 Clean, accessible dashboard for daily health overview
- 🤖 AI-powered assistance for better understanding and guidance

---

## ✨ Key Features

- **🔒 Secure User Authentication:** Full login and registration system powered by NextAuth.js and bcrypt.
- **📊 Personalized Dashboard:** Isolated, user-centric data storage. Users only see and manage their own private health records.
- **❤️ Vitals Tracking:** Interactive modals to record and track blood pressure, heart rate, and weight.
- **💊 Medication Management:** Add daily prescriptions and track whether they've been taken.
- **🤖 Care Bot (AI Assistant):** A floating, context-aware AI chatbot powered by the lightning-fast Groq API (`llama-3.1-8b-instant`). The assistant knows your name and recent vitals to provide personalized wellness tips.
- **📱 Responsive & Beautiful:** Built with a utility-first approach using Tailwind CSS and Framer Motion for smooth, native-feeling animations across desktop and mobile.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React 19, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend:** Next.js API Routes, NextAuth.js
- **Database:** PostgreSQL & Prisma ORM
- **AI Integration:** Vercel AI SDK, Groq API
- **Deployment:** Vercel

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/moonglow2003/Care-Nest.git
cd Care-Nest
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory and add the following:

```env
NEXTAUTH_SECRET="your_secure_random_string"
NEXTAUTH_URL="http://localhost:3000"

# PostgreSQL Database URL (e.g., from Neon.tech or Supabase)
DATABASE_URL="postgresql://user:password@host/database"

# Groq API Key for Care Bot Assistant
GROQ_API_KEY="gsk_YourGroqApiKeyHere"
```

### 4. Initialize the Database
Push the Prisma schema to your database to create the necessary tables:
```bash
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```



---

## 📄 License
This project is licensed under the MIT License.
