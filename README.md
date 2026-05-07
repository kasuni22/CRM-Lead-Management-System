# CRM Lead Management System

A modern MERN internship project built to manage sales leads with secure authentication, real-time dashboards, and lead lifecycle tracking.

## Project Overview

This CRM Lead Management System is a full-stack application built with React, Vite, Node.js, Express, MongoDB, and JWT authentication. It provides an end-to-end workflow for managing leads, tracking lead status, adding notes, and viewing key sales metrics in a polished dashboard.

The app is designed as a real-world internship submission with a clean code structure, protected routes, and a professional frontend experience.

## Features

- Authentication with email/password login and registration
- Protected CRM routes for authenticated users only
- Dashboard with key lead statistics
- Create, read, update, and delete leads
- Lead detail view with notes and metadata
- Lead status updates and source tracking
- Search and filtering for lead lists
- Responsive UI with modern dashboard layout
- API-driven data persistence with MongoDB

## Tech Stack

- Frontend: React, Vite, JavaScript
- Backend: Node.js, Express
- Database: MongoDB with Mongoose ODM
- Authentication: JSON Web Tokens (JWT)
- Styling: CSS custom styles with responsive layout

## Folder Structure

```text
CRM-Lead-Management-System/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kasuni22/CRM-Lead-Management-System.git
   cd CRM-Lead-Management-System
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

## Environment Variables

Create a `.env` file inside the `server` folder with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://crmadmin:admin123@ac-2mhoezg-shard-00-00.3xydbjh.mongodb.net:27017,ac-2mhoezg-shard-00-01.3xydbjh.mongodb.net:27017,ac-2mhoezg-shard-00-02.3xydbjh.mongodb.net:27017/?ssl=true&replicaSet=atlas-thygfs-shard-0&authSource=admin&appName=Cluster0
JWT_SECRET=supersecretjwtkey12345
CLIENT_URL=http://localhost:5173
```

## MongoDB Setup

1. Create a MongoDB cluster on MongoDB Atlas or run a local MongoDB instance.
2. Copy the connection URI.
3. Paste it into `server/.env` as `MONGO_URI`.
4. The backend will automatically connect and store user and lead data.

## Backend Setup

From the `server` folder:

```bash
npm run dev
```

This starts the backend API on `http://localhost:5000`.

### Backend API Overview

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive a JWT token
- `GET /api/leads` - Get authenticated user's leads
- `POST /api/leads` - Create a new lead
- `GET /api/leads/:id` - Get lead details by ID
- `PUT /api/leads/:id` - Update lead details by ID
- `DELETE /api/leads/:id` - Delete lead by ID
- `POST /api/leads/:id/notes` - Add a note to a lead

> All `/api/leads` routes require a valid bearer token in the `Authorization` header.

## Frontend Setup

From the `client` folder:

```bash
npm run dev
```

The frontend runs by default at `http://localhost:5173`.

## Test Credentials

Use the following test account to log in immediately:

- Email: `admin@example.com`
- Password: `password123`


## Reflection

This project demonstrates the fundamentals of a full-stack CRM application. It includes secure authentication, protected routes, lead CRUD operations, and a dashboard with business metrics. Building this app reinforced my understanding of React component structure, Express routing, MongoDB modeling, and secure JWT handling.

The most valuable learning experience was connecting frontend state and navigation with backend API behavior while preserving form validation and user feedback.

## Known Limitations

- Client-side search and filtering are performed in-memory.
- JWT tokens are stored in local storage for simplicity.
- There is no role-based access control or admin panel yet.
- Mobile sidebar navigation can be improved further.

## Future Improvements

- Add server-side filtering and pagination for lead lists
- Improve token storage with secure httpOnly cookies
- Add user roles and multi-tenant lead ownership
- Add activity logging and more analytics
- Add file attachments and lead activity timeline
- Add automated tests for API and UI flows

## Deployment Notes

- Backend: deploy to a Node-compatible host such as Heroku, Railway, or Render.
- Frontend: deploy the `client` build to Vercel, Netlify, or a static web host.
- Ensure `CLIENT_URL` and `MONGO_URI` are configured in deployment environment variables.
- Use HTTPS and a strong `JWT_SECRET` in production.

---

Thank you for reviewing this internship project. I welcome feedback and would be happy to discuss any part of the implementation in an interview.