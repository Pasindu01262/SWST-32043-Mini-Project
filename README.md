## SWST-32043: University Course Registration Portal

## Group Members
   Kossinna .P .R – CT/2021/031
   Randima .M.H.V – CT/2021/052
   Amaranayaka .W.M.S.K – CT/2021/020
   Pahalawaththa . P.A.P.R – CT/2021/056
   Muaffika . M.A – CT/2021/089

## System Description
   The University Course Registration Portal is a full-stack MERN application built to digitize and simplify university course registration and administration. It replaces manual  enrollment by automatically identifying a student's degree program, academic year, and semester, displaying only the relevant subjects. The system features a role-based web platform that allows administrators to efficiently manage courses, lecturers, grades, and student records while giving students a fast, one-click course enrollment experience.

## Technology Used
   Frontend:  React, Vite, React Router DOM, Axios, Lucide React, React Icons, CSS
   Backend: Node.js, Express.js, Mongoose, bcryptjs (Password hashing), jsonwebtoken (JWT authentication), dotenv
   Database: MongoDB (via MongoDB Atlas)
   Development Tools:  GitHub, Postman, Visual Studio Code

## Installation / Setup
Follow these steps to set up the project on a new machine:

1. type cmd and open terminal:

2.Clone the repository
   bash
   git clone https://github.com/Pasindu01262/SWST-32043-Mini-Project
   cd SWST-32043-Mini-Project

3.Backend Setup:
       Navigate to the backend directory: cd backend
       Install dependencies: npm install
       Create a .env file in the backend directory and add the following configurations:
            PORT=5000
            MONGO_URI=mongodb://pasindukossinna_db_user:7jo1fcXn6AAaxVwM@ac-hcghwoq-shard-00-00.4twr1wv.mongodb.net:27017,ac-hcghwoq-shard-00-01.4twr1wv.mongodb.net:27017,ac-hcghwoq-shard-00-02.4twr1wv.mongodb.net:27017/?ssl=true&replicaSet=atlas-13daax-shard-0&authSource=admin&appName=Cluster0

4. Frontend Setup:
         Open a new terminal and navigate to the frontend directory: cd frontend
         Install dependencies: npm install

## How to Run
  Start the Backend Server: node server.js
  The server will start on http://localhost:5000 and indicate a successful MongoDB connection.
     
  Start the Frontend Application: npm run dev
  http://localhost:3000 in your web browser.

## Main Features
     
   Student Module (Course Enrollment): Automatic course display, one-click batch enrollment, and student-side dashboard. (Responsible: Vishan Randima - CT/2021/052)

  Course Management Module: Admin functionalities for adding, updating, searching, and deleting course records with real-time UI updates. (Responsible: P.A.P.R. Pahalawaththa - CT/2021/056)

   Lecturer Management & Student Administration Modules: Full CRUD operations for lecturers, student registration, secure Admin Login, and protected routes. (Responsible: Kossinna P .R - CT/2021/031)

  Dashboard Module: Real-time summary statistics and data tables for overall platform activity tracking. (Responsible: Amaranayake W.M.S.K - CT/2021/020)

  Grade Management Module: Admin capabilities to assign/edit grades, and a dedicated student lookup portal to view personal results. (Responsible: M .A Muaffika - CT/2021/089)

##GitHub Contribution Summary
         
   The project utilized a feature-branch workflow. Each member developed their assigned module on an independent feature branch (e.g., feature/lecturer-management, feature/course-   management). Completed features were tested via Postman, code-reviewed, and merged into the shared develop branch to prevent integration conflicts, before the final, stable version was   merged into the main branch.


