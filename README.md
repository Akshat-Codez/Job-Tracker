# 💼 Job Tracker - Full-Stack MERN Application

A modern full-stack web application built to help job seekers organize, track, and manage their job applications in real-time. Features dynamic metrics analytics, complete application CRUD management, and secure Passport.js user authentication.

---

## ✨ Features

- 🔐 **User Authentication:** Secure Signup & Login powered by Passport.js (Local Strategy), `bcrypt` password hashing, and session management.
- 📊 **Interactive Analytics Dashboard:** Real-time summary statistics including Total Applications, Interviews, Offers Received, and Success Rate %.
- 📝 **Full Application CRUD:** Add new job applications, view status tables, edit application details, and delete entries.
- 🎨 **Modern Tailwind CSS UI:** Responsive, clean interface matching modern web standards with FontAwesome icons.
- ⚡ **Pre-filled Demo Data:** Built-in demo data for rapid testing and demonstrations.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** FontAwesome
- **HTTP Client:** Native Fetch API (`credentials: 'include'`)

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js (v5)
- **Database:** MongoDB Atlas (Cloud)
- **ODM:** Mongoose (v9)

### **Authentication & Security**
- **Authentication:** Passport.js (`passport-local`)
- **Password Hashing:** `bcrypt`
- **Session Management:** `express-session`
- **Security:** `cors` & `dotenv`

---

## 📁 Project Structure

```
Job-Tracker/
├── backend/
│   ├── config/          # DB & Passport Configuration
│   ├── controllers/     # Application & Auth Logic
│   ├── models/          # Mongoose Schemas (User, Application)
│   ├── routes/          # Express API Endpoints
│   ├── .env             # Environment Variables
│   ├── server.js        # Backend Entry Point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, Form, Table Components
│   │   ├── pages/       # Dashboard, Login, Register Pages
│   │   ├── App.jsx      # View Navigation & Main Layout
│   │   └── main.jsx     # Vite React Entry Point
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) or local MongoDB instance

---

### **1. Backend Setup**

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

Run the backend server:

```bash
npm run dev
# Server will run on http://localhost:8080/
```

---

### **2. Frontend Setup**

```bash
cd frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
# Frontend will run on http://localhost:5173/
```

---

## 🔑 API Endpoints

### **Authentication (`/api/auth`)**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in user with Passport local strategy |
| `GET` | `/api/auth/logout` | Destroy active session and log out |
| `GET` | `/api/auth/me` | Fetch active user session |

### **Job Applications (`/api/applications`)**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/applications` | Fetch all applications |
| `POST` | `/api/applications` | Create a new application |
| `PUT` | `/api/applications/:id` | Update an existing application |
| `DELETE` | `/api/applications/:id` | Delete an application |

---

## 📝 Demo Credentials

To test the application quickly:
- **Email:** `jane@example.com`
- **Password:** `password123`
