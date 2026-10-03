# Codify — Online Code Editor & Compiler

A full-stack browser-based IDE similar to Replit/Programiz, built with React + Monaco Editor on the frontend and Node.js + Express + MongoDB on the backend. Code is executed via the **Judge0 API**.

## ✨ Features

- 🖥️ **Monaco Editor** (VS Code's engine) with syntax highlighting for C++, Java, Python, JavaScript
- ⚡ **Real code execution** via Judge0 API (RapidAPI) with stdin support
- 🔐 **JWT Authentication** — signup/login with bcrypt password hashing
- 💾 **Save & manage snippets** — personal dashboard with search and language filter
- 📚 **Tutorials section** — structured lessons with runnable embedded examples
- 🌙 Dark theme with VS Code-inspired design
- 📱 Responsive (stacked layout on mobile)

## 🗂️ Project Structure

```
Codify/
├── client/           # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Navbar, ProtectedRoute, SaveSnippetModal
│   │   ├── context/      # AuthContext (JWT + localStorage)
│   │   ├── pages/        # Landing, Editor, Login, Signup, Dashboard, Tutorials
│   │   └── utils/        # api.js (axios), constants.js
│   └── vite.config.js
└── server/           # Express backend
    ├── models/       # User, Snippet (Mongoose)
    ├── routes/       # auth, code, snippets
    ├── middleware/   # JWT protect middleware
    └── index.js
```

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- MongoDB running locally (`mongod`) or a MongoDB Atlas URI
- [Judge0 RapidAPI key](https://rapidapi.com/judge0-official/api/judge0-ce) (optional — app works in demo mode without it)

### 2. Backend Setup

```bash
cd server
npm install
# Edit .env with your values:
#   MONGODB_URI=mongodb://localhost:27017/codify
#   JWT_SECRET=your_secret_key
#   JUDGE0_API_KEY=your_rapidapi_key   ← optional
npm run dev
```

Server starts on **http://localhost:5000**

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend starts on **http://localhost:5173**

## 🔑 Environment Variables

### `/server/.env`
| Variable | Description |
|---|---|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for JWT signing |
| `JUDGE0_API_KEY` | RapidAPI key for Judge0 |
| `CLIENT_URL` | Frontend URL for CORS |

### `/client/.env`
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

## 📡 API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login + get JWT |
| POST | `/api/auth/logout` | ❌ | Clear auth cookie |
| POST | `/api/code/run` | ❌ | Execute code via Judge0 |
| GET | `/api/snippets` | ✅ | List user's snippets |
| POST | `/api/snippets` | ✅ | Save new snippet |
| PUT | `/api/snippets/:id` | ✅ | Update snippet |
| DELETE | `/api/snippets/:id` | ✅ | Delete snippet |

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS v4 |
| Editor | Monaco Editor (`@monaco-editor/react`) |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Code Execution | Judge0 CE (via RapidAPI) |

## 🔧 Getting a Judge0 API Key

1. Go to [RapidAPI — Judge0 CE](https://rapidapi.com/judge0-official/api/judge0-ce)
2. Subscribe to the **Basic (free)** plan
3. Copy your **X-RapidAPI-Key**
4. Add it to `server/.env` as `JUDGE0_API_KEY`

> **Without a key**, the app runs in **Demo Mode** — you can still use the editor, save snippets, and explore tutorials. Only live code execution is disabled.
