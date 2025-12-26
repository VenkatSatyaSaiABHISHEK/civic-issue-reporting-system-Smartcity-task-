# Citizen Issue Reporting (MVP)

A modern, citizen-friendly web app to log civic issues, auto-capture location, and notify citizens with a unique reference ID.

## Tech Stack
- Frontend: HTML, CSS, Vanilla JS (Google Identity, Geolocation, optional OpenStreetMap preview)
- Backend: Node.js, Express
- Database: Firebase Firestore (Admin SDK)
- Auth: Google Login (OAuth 2.0 via Google Identity Services)
- Email: Gmail SMTP (App Password)

## Features
- Google-only sign-in; email auto-filled and locked
- Location capture via Geolocation API with reverse geocoding fallback
- Issue form with category tiles and validation
- Generates reference ID (e.g., `CIT-123456`), saves to Firestore, emails the user
- Responsive, premium UI with gradient theme and micro-animations

## Getting Started

### 1) Install dependencies
```
npm install
```

### 2) Configure environment
Copy `.env.example` to `.env` and fill values:
- `PORT`: default 3000
- `FRONTEND_URL`: usually `http://localhost:3000`
- `GOOGLE_CLIENT_ID`: OAuth Client ID from Google Cloud (Web app)
- Firebase Admin (service account): `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (escape newlines as `\n`)
- Gmail SMTP: `GMAIL_USER`, `GMAIL_APP_PASSWORD` (App Password)

### 3) Run the app
```
npm run dev
```
Open `http://localhost:3000`.

## Environment Notes
- Use a Firebase service account with Firestore access. Keep the private key secure.
- Use a Gmail App Password (not your main password) for SMTP.
- Google Identity requires the OAuth Client ID configured in both frontend (`frontend/script.js`) and `.env` for backend verification.

## Future Enhancements
- Admin panel for triage and status updates
- File uploads (photos of the issue)
- Multi-language support and accessibility audits
- Rate limiting and email templates stored in Firestore
