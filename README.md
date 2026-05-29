# GlowCity

Mumbai luxury beauty salon marketplace — a full-stack monorepo featuring a Next.js 14 App Router frontend and an Express REST API backend connected to MongoDB.

## Features

- **Dynamic Booking System**: Users can book appointments with detailed capture of contact information.
- **User Authentication**: Complete user signup and signin functionality with session storage.
- **Salon Registration**: Dedicated portal for salon owners to list their business.
- **Advanced Filtering**: Browse salons by area, service type (case-insensitive), rating, and price.
- **AI Integration**: AI Consultant demo functionality to help find the perfect salon.

## Project Structure

```text
salon/
├── frontend/          # Next.js 14 App Router (UI)
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
├── backend/           # Express REST API
│   └── src/
│       ├── config/    # MongoDB configuration
│       ├── models/    # Mongoose models (User, Salon, Booking, etc.)
│       ├── routes/    # API endpoints
│       └── index.ts
└── package.json       # Root scripts
```

## Setup

Ensure you have a MongoDB instance running (e.g., `mongodb://localhost:27017/glowcity`) and configure your environment variables.

```bash
# Install dependencies for both apps
npm run install:all

# Or separately:
cd frontend && npm install
cd backend && npm install

# Environment variables setup
cp backend/.env.example backend/.env
# Update .env with your MONGODB_URI and other keys
```

## Development

```bash
# Frontend only (http://localhost:3000)
npm run dev:frontend

# Backend only (http://localhost:4000)
npm run dev:backend
```

Run each in its own terminal for full-stack development.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/salons` | List/filter salons |
| GET | `/api/salons/:id` | Salon detail |
| GET | `/api/salons/meta` | Areas, services, categories |
| POST | `/api/bookings` | Create booking |
| POST | `/api/ai/chat` | AI consultant demo |
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/signin` | Authenticate existing user |
| POST | `/api/registrations` | Submit a new salon registration |

## Database Models

- **User**: Name, Email, Password.
- **Salon**: Name, Area, City, Services, Rating, etc.
- **Booking**: Customer details, Salon reference, Service details.
- **SalonRegistration**: Capture form details from new salon partners.
