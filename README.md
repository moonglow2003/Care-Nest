<<<<<<< HEAD
# 🩺 Care Nest  
### A Simple, Intelligent Health Companion for Everyday Patients

Care Nest is a patient-first digital health platform designed to simplify how individuals manage prescriptions, reports, medications, and doctor follow-ups—without requiring technical expertise.

---

## 🚨 Problem

Healthcare management is fragmented and difficult for most patients:

- Prescriptions are often lost or hard to understand  
- Patients forget medicines or take incorrect dosages  
- Follow-up visits are missed  
- Medical history is scattered across files and apps  
- Elderly and non-tech users struggle with complex interfaces  

➡️ This leads to poor adherence, delayed care, and avoidable health risks.

---

## 💡 Solution

Care Nest provides a **single, intuitive platform** that organizes a patient’s entire medical journey:

- 📂 Centralized storage for prescriptions and reports  
- 💊 Smart medicine reminders with dosage tracking  
- ⏰ Automated follow-up alerts  
- 📊 Clean, accessible dashboard for daily health overview  
- 🤖 AI-powered assistance for better understanding and guidance  

---
=======
# 🪹 Care Nest

Care Nest is a modern, dynamic, and personalized healthcare dashboard designed with "Compassionate Clarity." It provides a secure, highly legible, and supportive environment for users to manage their personal medical records, track daily vitals, and receive instant, empathetic guidance from a built-in AI healthcare assistant.

## ✨ Features

- **🔒 Secure User Authentication:** Full login and registration system powered by NextAuth.js and bcrypt.
- **📊 Personalized Dashboard:** Isolated, user-centric data storage. Users only see and manage their own private health records.
- **❤️ Vitals Tracking:** Interactive modals to record and track blood pressure, heart rate, and weight.
- **💊 Medication Management:** Add daily prescriptions and track whether they've been taken.
- **🤖 Care Bot (AI Assistant):** A floating, context-aware AI chatbot powered by the lightning-fast Groq API (`llama-3.1-8b-instant`). The assistant knows your name and recent vitals to provide personalized wellness tips.
- **📱 Responsive & Beautiful:** Built with a utility-first approach using Tailwind CSS and Framer Motion for smooth, native-feeling animations across desktop and mobile.

>>>>>>> 11a4e7e (fix: remove const email = session.user.email;

    where: { userId: email } session?.user?.email ?? undefined; check for deployment)
## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React 19, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend:** Next.js API Routes, NextAuth.js
- **Database:** SQLite & Prisma ORM
<<<<<<< HEAD
- **AI Integration:** Vercel, Groq API
---
=======
- **AI Integration:** Vercel AI SDK, Groq API
>>>>>>> 11a4e7e (fix: remove const email = session.user.email;

    where: { userId: email } session?.user?.email ?? undefined; check for deployment)

## 🚀 Getting Started

### 1. Clone the repository
```bash
<<<<<<< HEAD
git clone https://github.com/moonglow2003/Care-Nest.git
=======
git clone https://github.com/your-username/care-nest.git
>>>>>>> 11a4e7e (fix: remove const email = session.user.email;

    where: { userId: email } session?.user?.email ?? undefined; check for deployment)
cd care-nest
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

# Groq API Key for Care Bot Assistant
GROQ_API_KEY="gsk_YourGroqApiKeyHere"
```

### 4. Initialize the Database
Push the Prisma schema to your local SQLite database to create the necessary tables:
```bash
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```
<<<<<<< HEAD
=======

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📄 License
This project is licensed under the MIT License.
>>>>>>> 11a4e7e (fix: remove const email = session.user.email;

    where: { userId: email } session?.user?.email ?? undefined; check for deployment)
