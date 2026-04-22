# Orphanage Adoption Management System

## 📌 Overview

The **Orphanage Adoption Management System** is a full-stack web application designed to digitalize and streamline the adoption process. It provides a secure platform for orphanage administrators to manage children and for parents to apply for adoption online.

---

## 🚀 Tech Stack

* **Frontend:** React
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT (JSON Web Tokens)
* **Other Tools:** Mongoose, bcrypt

---

## 👥 User Roles

### 🔹 Admin

* Manage child profiles (CRUD)
* View and manage adoption applications
* Update application status
* Access dashboard analytics

### 🔹 Parent/User

* View available children
* Apply for adoption
* Track application status

---

## ✨ Features

* Role-based authentication and authorization
* Secure login & registration system
* Child profile management
* Adoption application workflow
* Status tracking system
* Admin dashboard

---

## 🏗️ Project Structure

```
OrphanageAdoption/
│── backend/
│   ├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── app.js
│
│── orphanage-frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.js
```

---

## 🔐 Authentication Flow

1. User registers/logs in
2. JWT token is generated
3. Token is used for protected routes
4. Role-based access is enforced

---

## 📡 API Endpoints

### Auth

* `POST /auth/register`
* `POST /auth/login`
* `GET /auth/me`

### Children (Admin)

* `POST /children`
* `GET /children`
* `PUT /children/:id`
* `DELETE /children/:id`

### Applications

* `POST /applications`
* `GET /applications/my`
* `GET /applications`
* `PUT /applications/:id`

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/23WH1A0537/OrphanageAdoption.git
cd OrphanageAdoption
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

### 3️⃣ Frontend Setup

```bash
cd orphanage-frontend
npm install
npm start
```

---

## 🔒 Security

* Password hashing using bcrypt
* JWT-based authentication
* Role-based access control

---

## 📈 Future Enhancements

* Document upload feature
* Email notifications
* Advanced matching system
* Multi-orphanage support

---

## 📌 Conclusion

This project demonstrates a real-world full-stack application using the MERN stack with secure workflows, role-based access, and scalable design.

---

## 👩‍💻 Author

**Nainika Dugyala**
