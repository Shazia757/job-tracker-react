# Job Application Tracker

A full-stack web application for tracking job applications, managing application statuses, and keeping job-search information organized.

**Live Demo:** https://job-tracker-react-beta.vercel.app/

## Repositories

- **Frontend:** https://github.com/Shazia757/job-tracker-react
- **Backend:** https://github.com/Shazia757/node-practice

## Features

- View all job applications
- Add new applications
- Edit application details and update status
- Delete applications
- Persist application data in PostgreSQL
- Communicate with a REST API

## Technology Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- REST API
- PostgreSQL
- `pg` PostgreSQL client

**Testing and Deployment**
- Node.js built-in test runner
- Supertest
- Vercel for frontend hosting
- Railway for backend and database hosting
- Git and GitHub

## Architecture

The application uses a frontend–backend–database architecture.

1. **Frontend:** React renders the user interface and sends HTTP requests to the API.
2. **Backend:** Express handles API requests, validates input, and performs database operations.
3. **Database:** PostgreSQL stores application records persistently.

The backend uses parameterized SQL queries for database operations.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/applications` | Retrieve all applications |
| POST | `/api/applications` | Create an application |
| PATCH | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |

## Run the Frontend Locally

### Prerequisites

- Node.js and npm
- Git
- A running instance of the backend API and its PostgreSQL database

### 1. Clone the repository

```bash
git clone https://github.com/Shazia757/job-tracker-react.git
cd job-tracker-react
npm install
```

### 2. Configure the environment

Create a `.env.local` file in the project root:

```env
VITE_API_URL=http://localhost:3000
```

This assumes the backend is running locally on port `3000`. If your backend uses a different URL, update the value accordingly.

### 3. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

**Backend setup:** See the [backend repository](https://github.com/Shazia757/node-practice) for the API source code. Backend and PostgreSQL configuration instructions will be added to its README.

## Future Improvements

- User authentication and authorization
- Per-user application management
- Search, filtering, and sorting
- Expanded automated test coverage
- Additional security and production-readiness improvements

## Author

Shazia

[GitHub Profile](https://github.com/Shazia757)