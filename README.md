# Quiz Management System - Implementation Plan

**Project:** Quiz Management System  
**Developer:** Kushal Asarkar

---

## 🎯 Objective

Build a minimal, production-ready Quiz Management System where:
- **Admins** can create quizzes with multiple questions and types
- **Users** can take any quiz publicly
- **Users** get results immediately after completion

Focus is on **clean structure**, **working functionality**, and **real-world trade-offs** rather than feature overload.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js (JavaScript) + Tailwind CSS |
| **State Management** | Redux Toolkit + useState |
| **API Calls** | Fetch API |
| **Backend** | JSON Server (hosted on Render) |
| **Database** | JSON-based mock DB (simulating Postgres/Mongo data structure) |
| **IDE** | VSCode |
| **Hosting** | Frontend: Vercel, Backend: Render |

---

## 🧩 Features Implemented

### Admin Panel
- [x] Create a quiz with title and multiple questions.
- [x] Support three question types:
  - **MCQ** (Multiple Choice with options)
  - **TRUE/FALSE** 
  - **TEXT** (Short answer)
- [x] Stores quizzes to backend using REST APIs.
- [x] View all created quizzes

### Public Quiz Page
- [x] List all available quizzes
- [x] Display quiz details and questions dynamically
- [x] Support answering all question types
- [x] Calculate and display score instantly after submission
- [x] Shows result summary and provides:
  - Retake Quiz
  - Back to Home
  

### General
- [x] Responsive, minimal UI with Tailwind CSS
- [x] Pure `fetch()` for all API calls
- [x] Proper error and loading states
- [x] Clean folder structure

---

## 🏗️ Architecture Overview

### Frontend Structure
```
quiz-frontend/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── AdminPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── QuizListPage.jsx
│   │   └── QuizPage.jsx
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       └── quizSlice.js
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
└── package.json
```

### Data Flow
```
React Component → Redux/useState → Fetch API → JSON Server (Render)
```

---

## Database Structure (db.json)
```
{
  "quizzes": [
    {
      "id": "0a53",
      "title": "React Basics",
      "questions": [
        {
          "text": "What is React?",
          "type": "MCQ",
          "options": ["Library", "Framework", "Language"],
          "correctOption": "Library"
        },
        {
          "text": "React is maintained by?",
          "type": "TRUE_FALSE",
          "correctOption": "True"
        },
        {
          "text": "Name one React hook used for side effects.",
          "type": "TEXT",
          "correctOption": "useEffect"
        }
      ]
    }
  ]
}
```

## Assumptions

- [x] Authentication is optional (since focus is frontend).
- [x] JSON Server mimics backend API behavior for simplicity.
- [x] Admin is not role-restricted (same UI used for quiz creation).
- [x] Basic CSS only — no animations, modals, or transitions to save time.
- [x] Quiz submissions are stored for record but not tied to users.

---

## 🚀 Trade-offs Made

| Trade-off | Reason |
|-----------|--------|
| **Used JSON Server instead of a full backend** | To focus on frontend behavior & API integration |
| **Skipped animations and advanced styling** | Prioritized functionality and clarity |
| **fetch() over axios** | Native API, no extra dependencies, smaller bundle |
| **Kept authentication minimal** | Not required for frontend evaluation |
| **No pagination or search** | Out of 2-hour time scope |

---

### Future Enhancements (If Given More Time)

**Authentication & Roles**
- [x] Implement JWT-based login for Admin and User roles.
- [x] Separate dashboards for quiz creation vs. participation.

**Quiz Analytics**
- [x] Track user-wise submissions, scores, and average accuracy.

**UI/UX Improvements**
- [x] Add progress bar (e.g., “Question 2 of 5”).

- [x] Display correct answers after submission.

- [x] Add confirmation modals and toast notifications.

**Enhanced Admin Tools**
- [x] Option to edit/delete existing quizzes.

- [x] Preview quiz before publishing.

**Deployment**
- [x] Separate FE/BE pipelines with CI/CD.
- [x] Add environment-based configuration.

---

## 🚢 Deployment URLs

- **Frontend:** https://quiz-management-system-react-63g0fgtig-kushal-asarkars-projects.vercel.app/
- **Backend:** https://quiz-management-system-react.onrender.com
- **GitHub Repo:** https://github.com/kushalasarkar/quiz-management-system-react

---
## User credentials

**Admin User**
username: admin
password: admin123

**guest User**
username: guest
password: guest123
