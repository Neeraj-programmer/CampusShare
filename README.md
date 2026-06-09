# 🎓 CampusShare: Smart College Resource Booking System

[![React](https://img.shields.io/badge/React-18.x-blue?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-success?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

A comprehensive MERN-stack web application designed to digitalize the booking and management of shared college resources (e.g., Projectors, Labs, Seminar Halls, Cameras). Built as an academic mini-project to solve real-world campus management issues.

## 👥 The Team
This project was developed collaboratively by a team of 3 members.

*   **Neeraj Thakur (Team Lead & Full-Stack Integration)**
    *   *Responsibilities:* System architecture design, database schema planning, core API integration, routing, JWT security implementation, and project management.
*   **[Teammate 1 Name] (Frontend Developer)**
    *   *Responsibilities:* UI/UX design, building React components, implementing Tailwind CSS (Glassmorphism, responsive layouts).
*   **[Teammate 2 Name] (Backend Developer)**
    *   *Responsibilities:* Setting up Express server, creating Mongoose models, and writing basic CRUD endpoints for resources.

## 🚀 Features
*   **Role-Based Access Control (RBAC):** Distinct dashboards and routing for `Students` and `Admins`.
*   **Secure Authentication:** Password hashing (bcrypt) and JWT-based session management.
*   **Real-time Availability:** Dynamic rendering of resource states (Available vs. Booked).
*   **Accountability Protocol:** Mandatory Roll Number verification and Responsibility Agreement for students.
*   **Admin Management:** Centralized control to Add/Delete resources and Approve/Reject bookings.

## 📂 Project Architecture & Leadership Approach
As the Team Lead, I utilized an Agile-inspired workflow to manage the project scope and ensure timely delivery:
1.  **Phase 1 (Planning):** Designed the database schema and defined API contracts so frontend and backend could be developed in parallel.
2.  **Phase 2 (Development):** Assigned UI tasks to the frontend dev and basic routes to the backend dev, while I focused on the complex integration (connecting React to Node) and security features (JWT, Admin Secret keys).
3.  **Phase 3 (Review & Refactoring):** Conducted code reviews, optimized React state management (Context API), and polished the Tailwind CSS for a premium look.

## 🛠️ Installation & Setup

### Prerequisites
*   Node.js installed
*   MongoDB running locally or via MongoDB Atlas

### 1. Clone the repository
```bash
git clone https://github.com/YourUsername/CampusShare.git
cd CampusShare
```

### 2. Setup Backend
```bash
cd backend
npm install
# Create a .env file with MONGO_URI, JWT_SECRET, and ADMIN_SECRET
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔒 Security Measures Implemented
*   **Admin Secret Key:** Prevents unauthorized admin registrations.
*   **Physical Verification Logic:** Roll Number tracking tied directly to the booking request for physical ID validation by storekeepers.
*   **Protected Routes:** React Router navigation guards to prevent URL-bypassing.

---
*Built with ❤️ for our College Mini Project.*
