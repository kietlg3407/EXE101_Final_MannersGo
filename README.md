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
- `POST /api/auth/register` and `POST /api/auth/login` — create an account or sign in with email and password
- `POST /api/auth/google` — sign in or register with a verified Google account
- `GET /api/auth/me` and `POST /api/auth/logout` — inspect or end the current session

Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI`. Never commit `.env` or production credentials.

## Authentication setup

- Set `AUTH_TOKEN_SECRET` in `backend/.env` to a private random value of at least 32 characters.
- Create a Google OAuth 2.0 Web client in Google Cloud Console. Add the frontend origin (for example, `http://localhost:5173`) to its authorized JavaScript origins.
- Set the same Google client ID as `VITE_GOOGLE_CLIENT_ID` in `frontend/.env` and `GOOGLE_CLIENT_ID` in `backend/.env`.
- Set `CLIENT_ORIGIN` to the frontend origin(s), comma-separated when there are multiple. For a deployed site, include its exact HTTPS origin.
- Set `VITE_API_URL` to the deployed API origin when the frontend and backend are hosted separately. Keep the trailing slash optional.

Email/password registration validates the email and requires at least 6 password characters. Passwords are stored as salted scrypt hashes; sessions use an HTTP-only cookie. Google sign-in requires a verified Google email.

## Deploy the API with MongoDB Atlas and Vercel

The Vercel frontend and Express API are separate services. Deploy the API first, then point Vercel at its public HTTPS URL.

1. In MongoDB Atlas, create a cluster and a **database user**. Copy the application's connection string from **Connect → Drivers** and replace the username, password, and database name placeholders. Keep this string private.
2. In Atlas **Network Access**, allow the API host to reach the cluster. For a host without fixed outbound IPs, Atlas may require `0.0.0.0/0`; use a dedicated database user with a strong unique password and never publish the URI.
3. In Render, create a **Web Service** from the GitHub repository. Set **Root Directory** to `backend`, **Build Command** to `npm install`, and **Start Command** to `npm start`.
4. Add these Render environment variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = the private Atlas connection string
   - `AUTH_TOKEN_SECRET` = a private random string of at least 32 characters
   - `CLIENT_ORIGIN` = the exact Vercel site origin, e.g. `https://your-project.vercel.app` (no trailing slash)
   - `GOOGLE_CLIENT_ID` = the Google OAuth Web client ID, if Google sign-in is needed
5. Deploy the Render service and open `https://your-api.onrender.com/api/health`. Confirm the response contains `"database":"connected"`.
6. In Vercel, open the frontend project **Settings → Environment Variables** and set `VITE_API_URL` to `https://your-api.onrender.com` (no trailing slash). Set `VITE_GOOGLE_CLIENT_ID` to the same Google Web client ID if using Google sign-in. Redeploy the frontend so Vite includes the new values.
7. For Google OAuth, add the Vercel site origin to the OAuth client's **Authorized JavaScript origins**. Add the callback/origin details required by Google Identity Services if prompted.

For local development, copy the environment examples to `backend/.env` and `frontend/.env`. Add an Atlas URI and a private `AUTH_TOKEN_SECRET` to the backend env file, then use `http://localhost:5173` as `CLIENT_ORIGIN`. Do not commit either `.env` file.
