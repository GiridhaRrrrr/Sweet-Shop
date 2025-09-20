TDD Kata: Sweet Shop Management System

This project is a full-stack Sweet Shop Management System built as a technical assignment. It features a complete RESTful backend API and a modern, feature-rich single-page React frontend. The entire project was developed following professional software engineering practices, including Test-Driven Development (TDD) for the backend and a structured, feature-based Git workflow.

✨ Features
Full-Stack Architecture: A robust Node.js/Express backend API connected to a dynamic React frontend.

User Authentication: Secure user registration and login with JWT-based authentication and hashed passwords.

Role-Based Access Control: A clear distinction between user and admin roles, with UI elements and API endpoints protected accordingly.(by default role is user and the devloper can assign the admin role replicaating the real world senario and security)

Complete CRUD Functionality: Admins have full Create, Read, Update, and Delete capabilities for sweets through an intuitive modal-based interface.

Inventory Management: Functionality for users to "purchase" sweets and for admins to "restock" them.

Advanced Search & Filtering: The frontend allows users to search and filter the available sweets.

Modern Frontend: A fully responsive and animated UI built with React, Vite, and Tailwind CSS.

Professional Theming: A beautiful, custom-themed UI with a functional dark and light mode toggle, built with CSS variables.

Centralized State Management: Global state is managed efficiently using Redux Toolkit, handling authentication, sweets data, and UI state.

Data Visualization: The admin dashboard features charts and stats for a clear overview of shop performance.

🛠️ Tech Stack
Backend
🟢 Node.js: JavaScript runtime environment.

🚀 Express: Web framework for Node.js.

🍃 MongoDB & Mongoose: NoSQL database and Object Data Modeling (ODM) library.

🔑 JSON Web Token (JWT): For securing API endpoints.

🔒 bcryptjs: For robust password hashing.

Frontend
⚛️ React: JavaScript library for building user interfaces.

⚡️ Vite: Next-generation frontend tooling.

🗺️ React Router: For client-side routing.

🔁 Redux Toolkit: For efficient state management.

Styling & Testing
💨 Tailwind CSS: A utility-first CSS framework.

✨ Framer Motion: For production-ready animations.

🧪 Jest & Supertest: For backend Test-Driven Development.

🚀 Local Setup and Installation
Prerequisites
Node.js (v18 or later),npm,MongoDB (a local instance or an Atlas connection string),Git

Instructions
Clone the repository:

git clone <your-repo-link>
cd <your-repo-name>

Backend Setup:

# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file in the /backend folder and add your variables
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_super_secret_key

# Run the backend server
npm run dev

The backend will start on http://localhost:3000.

------------------------------------
BACKEND ENVIRONMENT VARIABLES
------------------------------------
MongoDB Connection URI
For a local MongoDB instance (recommended for development)
MONGO_URI=mongodb://localhost:27017/sweet-shop

For a cloud instance like MongoDB Atlas, it would look like this:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/sweet-shop?retryWrites=true&w=majority

JWT_SECRET=thisIsAReallyLongAndRandomSecretStringThatIsHardToGuess123!@#

Frontend Setup:
(Open a new terminal for the frontend)

# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Run the frontend development server
npm run dev

The frontend will start on http://localhost:5173.

------------------------------------
FRONTEND ENVIRONMENT VARIABLES
------------------------------------

VITE_API_URL=http://localhost:8080/api



🤖 My AI Usage
As per the assignment's policy, this project was developed with the assistance of AI pair programming tools. I directed the entire development process, making all architectural decisions, defining requirements, and managing the project's structure and Git history.

Gemini was used for the backend development and for planning the professional Git commit structure.

Claude was used for the frontend development, as per my direction.

How AI Tools Were Used:

TDD Workflow Facilitation (Backend): I used Gemini to strictly follow a Red-Green-Refactor pattern. I would define the requirements for a test, have it generate the failing test (RED), then generate the minimal code to make it pass (GREEN), and finally, we would collaborate on refactoring for quality (REFACTOR).

Boilerplate and Configuration: The AI assistants were tasked with generating initial setup code, such as the Express server, the Vite + React project, and the configuration for tools like Redux Toolkit and Tailwind CSS.

Component Generation (Frontend): For the frontend and backend, I acted as the project lead, defining the structure and functionality for each React component (e.g., "Create a SweetCard component with these properties, styled with Tailwind"). Claude then generated the high-quality component code, which I reviewed, integrated, and adapted.

Debugging: AI was an invaluable debugging partner. We collaboratively solved several issues, including backend module resolution errors, and a persistent Tailwind CSS dark mode configuration problem by using browser developer tools to diagnose the issue methodically.

Best Practices: The AIs suggested several professional patterns that were incorporated, such as a centralized async error handler for the backend and a modern, CSS-variable-based approach for Tailwind theming.

My Reflection on AI Usage:

Leveraging AI in this project felt like working with a highly efficient junior developer. It allowed me to offload the time-consuming aspects of boilerplate and routine code generation, freeing me up to focus on higher-level architectural decisions, the TDD process, and the overall user experience. This project demonstrates my ability to effectively lead a development process that responsibly and transparently integrates modern AI tools to build a robust, professional, full-stack application.

here is the deployed link:- 