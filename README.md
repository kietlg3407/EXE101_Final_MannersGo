# MannersGo

Landing page for the MannersGo Japanese-culture learning kit, with a separate React/Vite frontend and Express/MongoDB backend.

## Requirements

- Node.js 18 or later
- A MongoDB Atlas connection string (optional for local frontend/backend development; required to persist registrations)

## Run the backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
# Add your MongoDB Atlas URI to backend/.env
npm run dev
```

The API runs at `http://localhost:5000`. Check `GET /api/health` to inspect server and database status.

## Run the frontend

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

The Vite development server proxies `/api` requests to the backend. Set `VITE_API_URL` only when the API is hosted on a different origin.

## API

- `GET /api/health` — server and MongoDB connection status
- `POST /api/preorders` — register a name, email, and kit quantity

Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI`. Never commit `.env` or production credentials.
