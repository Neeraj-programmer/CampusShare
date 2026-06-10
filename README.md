# 🎓 CampusShare: Smart College Resource Booking System

[![React](https://img.shields.io/badge/React-18.x-blue?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-success?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

A comprehensive MERN-stack web application designed to digitalize the booking and management of shared college resources (e.g., Projectors, Labs, Seminar Halls, Cameras). Built as an academic mini-project to solve real-world campus management issues.

## 👥 The Team
This project was developed collaboratively by a team of 3 members.

*   **Neeraj Thakur (Full-Stack Developer)**
    *   *Responsibilities:* Core Backend API integration, JWT Security implementation, React State Management (Context API), and MongoDB Schema Design.
*   **[Teammate 1 Name] (Frontend Developer)**
    *   *Responsibilities:* UI/UX design, building React components, implementing Tailwind CSS (Glassmorphism, responsive layouts), and Frontend routing.
*   **[Teammate 2 Name] (Backend Developer)**
    *   *Responsibilities:* Setting up Express server, writing robust CRUD endpoints, Booking overlap algorithm logic, and Role-Based Access Control (RBAC) validations.



## 🚀 Features
*   **Role-Based Access Control (RBAC):** Distinct dashboards and routing for `Students` and `Admins`.
*   **Secure Authentication:** Password hashing (bcrypt) and JWT-based session management.
*   **Real-time Availability:** Dynamic rendering of resource states (Available vs. Booked).
*   **Accountability Protocol:** Mandatory Roll Number verification and Responsibility Agreement for students.
*   **Admin Management:** Centralized control to Add/Delete resources and Approve/Reject bookings.



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
