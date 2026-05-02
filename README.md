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
## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React 19, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend:** Next.js API Routes, NextAuth.js
- **Database:** SQLite & Prisma ORM
- **AI Integration:** Vercel, Groq API
---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/moonglow2003/Care-Nest.git
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
