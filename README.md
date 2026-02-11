# 🌿 EcoExplorer

A production-ready, full-stack Environmental Education & Engagement Platform built using the MERN stack.

EcoExplorer is designed with scalability, modular backend architecture, role-based authentication, and deployment-ready configuration. The project follows industry-grade structure and clean coding standards.

---

## 📌 Project Overview

EcoExplorer is a web platform created to:

- Promote environmental awareness
- Provide quiz-based learning
- Support reporting & engagement features
- Implement role-based access control
- Maintain clean, scalable backend architecture
- Be deployment-ready for real-world usage

---

## 🏗 System Architecture

Frontend (React + Tailwind)
↓
REST API (Node.js + Express)
↓
MongoDB Database


---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Role-Based Middleware

### Dev & Deployment
- Git & GitHub
- Render / Vercel
- dotenv
- Nodemon

---

## 🔐 User Roles

| Role         | Permissions |
|-------------|------------|
| Admin       | Manage users, quizzes, reports |
| Teacher     | Create and manage own quizzes |
| Student     | Attempt quizzes |
| General User| View content |

Role-based middleware ensures secure route access.

---

## ⚙️ Environment Variables

### Backend `.env`
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development

### Frontend `.env`
VITE_API_BASE_URL=http://localhost:5000/api


---

## 🚀 How To Run The Project (Development Mode)

### 1️⃣ Clone Repository

git clone https://github.com/nishitsharma123/EcoExplorer.git

cd EcoExplorer


---

### 2️⃣ Setup Backend

cd backend
npm install


Create `.env` file inside backend folder.

Start backend: npm run dev
Backend runs at: http://localhost:5000


---

### 3️⃣ Setup Frontend

Open a new terminal:
cd client
npm install
npm run dev
Frontend runs at: http://localhost:5173


---

## 🧪 API Structure Overview

POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile

GET /api/quizzes
POST /api/quizzes
PUT /api/quizzes/:id
DELETE /api/quizzes/:id

GET /api/admin/users
DELETE /api/admin/users/:id


---

## 🚢 Production Deployment Guide

### Backend Deployment (Render)

1. Push backend to GitHub
2. Create new Web Service
3. Add environment variables
4. Build command: npm install
5. Start command: node server.js


---

### Frontend Deployment (Vercel)

1. Import GitHub repository
2. Set root directory to `client`
3. Add environment variable: VITE_API_BASE_URL=https://your-backend-url.com/api
4. 4. Deploy

---

## 🔒 Security Practices

- Password hashing using bcrypt
- JWT token-based authentication
- Role-based route protection
- Environment variables for secrets
- Centralized error handling middleware

---

## 📈 Production Best Practices Implemented

- Clean MVC structure
- Modular backend separation
- Role-based middleware
- RESTful API standards
- Scalable folder architecture
- Environment-based configuration

---

## 🧩 Future Improvements

- Swagger API documentation
- Unit & integration tests
- Docker containerization
- CI/CD pipeline
- Rate limiting middleware
- Logging system (Winston)

---

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch  
3. Commit changes  
4. Push branch  
5. Open Pull Request  

Follow clean coding standards and meaningful commit messages.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Nishit Sharma  
B.Tech CSE  
Full Stack MERN Developer  
AI & Scalable Systems Enthusiast  

GitHub: https://github.com/nishitsharma123



