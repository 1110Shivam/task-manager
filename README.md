# 📝 Task Management Application

🎥 **Demo Video:** [Watch Now](https://drive.google.com/file/d/1HF4STczNgRbZwMc03XRY7cFTvgjmWj_Q/view?usp=sharing)

> This video demonstrates the full functionality of the application including:
> - Signup & Login
> - Google OAuth Login
> - Creating a Task
> - Viewing Tasks
> - Updating a Task
> - Deleting a Task
> - Searching Tasks

---



### 1. ER Diagram

![ER-Diagram](https://github.com/user-attachments/assets/45490660-1182-4709-b4a7-acaf5ab3cb91)


## 📝 Description

The **Task Manager Application** is a full-stack web application that allows users to manage daily tasks securely and efficiently. Users can sign up, log in, and perform all CRUD operations (Create, Read, Update, Delete) on their tasks.

The application also features **JWT-based authentication** and supports both traditional email/password login and **Google OAuth2 login** (currently implemented for authentication only).

---

## 🚀 Features

* User Registration (Email & Password)
* User Login with JWT Token
* Google Login (Authentication only; task functionality not yet integrated)
* Create, View, Update, and Delete tasks
* Task search functionality
* Responsive frontend UI

---

## 🛠️ Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Security with JWT
* Spring Data JPA
* MySQL

### Frontend

* React.js (Vite)
* TailwindCSS
* React Toastify

### Tools

* MySQL Workbench
* Postman
* VSCode / STS

---

## 📂 Project Structure

### Backend

```
├── src
│   ├── main
│   │   ├── java/com/mrt/taskmanager
│   │   │   ├── config
│   │   │   ├── controller
│   │   │   ├── dto
│   │   │   ├── entity
│   │   │   ├── helpers
│   │   │   ├── repository
│   │   │   ├── security
│   │   │   ├── service
│   │   │   └── TaskManagerApplication.java
│   │   └── resources
│   │       ├── application.properties
```

### Frontend

```
├── src
│   ├── components
│   ├── pages
│   ├── App.jsx
│   └── main.jsx
```

---

## 🧪 How to Run

### Backend

1. Clone the repository
2. Set up MySQL and create a database
3. Update `application.properties` with DB credentials and JWT secret and google credenials
4. Run the application using your IDE

### Frontend

1. Navigate to `frontend` folder
2. Run `npm install`
3. Run `npm run dev`

Must have jdk and node install in system
---

## 🔐 Authentication Flow

* **Email/Password:**

  * On successful login, a JWT is stored in localStorage
  * This token is sent in the Authorization header for protected endpoints

* **Google Login:**

  * JWT token is set as a cookie after login
  * Currently, Google users are authenticated but **not authorized for task operations** (planned as a future improvement)

---

## 🔄 Future Improvements

* Allow Google-authenticated users to perform task operations
* User profile management
* Role-based access control
* Task categories or priority levels

---

## 🧑‍💻 Developer

**Name:** Shivam
**Email:** [shivam.111025@gmail.com](mailto:shivam.111025@gmail.com)
**GitHub:** [github.com/1110Shivam](https://github.com/1110Shivam)
**LinkedIn:** [linkedin.com/in/shivam1110](https://linkedin.com/in/shivam1110)

---

## ✅ Status

* ✅ Backend complete with JWT and Google login
* ✅ Frontend complete with task CRUD + search
* 🔒 Google login implemented for auth only (task management disabled for now)



