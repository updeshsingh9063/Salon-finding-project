# GlowCity

Mumbai luxury beauty salon marketplace — monorepo with separate frontend and backend.

## Project structure

```
salon/
├── frontend/          # Next.js 14 App Router (UI)
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
├── backend/           # Express REST API
│   └── src/
│       ├── routes/
│       ├── data.ts
│       └── index.ts
└── package.json       # Root scripts
```

## Setup

```bash
# Install dependencies for both apps
npm run install:all

# Or separately:
cd frontend && npm install
cd backend && npm install
cp backend/.env.example backend/.env
```

## Development

```bash
# Frontend only (http://localhost:3000)
npm run dev:frontend

# Backend only (http://localhost:4000)
npm run dev:backend
```

Run each in its own terminal for full-stack development.

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/salons` | List/filter salons |
| GET | `/api/salons/:id` | Salon detail |
| GET | `/api/salons/meta` | Areas, services, categories |
| POST | `/api/bookings` | Create booking |
| POST | `/api/ai/chat` | AI consultant demo |

The frontend currently uses local mock data in `frontend/lib/data.ts`. Connect to the API via `NEXT_PUBLIC_API_URL` when ready.
