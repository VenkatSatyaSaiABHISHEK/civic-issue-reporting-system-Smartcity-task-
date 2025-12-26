- [x] Verify that the copilot-instructions.md file in the .github directory is created.

- [x] Clarify Project Requirements
  - Tech: Node.js/Express backend, vanilla HTML/CSS/JS frontend, Firebase Firestore, Google OAuth, Gmail SMTP.

- [x] Scaffold the Project
  - Created folder structure with backend/, frontend/, package.json, .env.example, .gitignore.

- [x] Customize the Project
  - Implemented premium UI with gradient theme, Google login, geolocation with reverse geocoding, issue form with category tiles, Firestore storage, Gmail email notifications, reference ID generation.

- [x] Install Required Extensions
  - No extensions required for this project.

- [x] Compile the Project
  - Dependencies installed; dev server runs on port 3000.

- [x] Create and Run Task
  - Task "dev server" runs `npm run dev` in background (nodemon watches changes).

- [x] Launch the Project
  - Server running; navigate to http://localhost:3000. Configure .env with Google Client ID, Firebase, Gmail credentials.

- [x] Ensure Documentation is Complete
  - README.md with setup instructions and folder structure documentation complete.

## Project Details
- **Frontend**: Vanilla JS with Google Identity Services, Geolocation API, OpenStreetMap.
- **Backend**: Express with Firebase Admin SDK, Nodemailer for SMTP, OAuth2 token verification.
- **Database**: Firestore (issues collection) with reference ID as doc key.
- **Security**: Email and Firebase configuration managed via .env (never committed).
- **Design**: Modern gradient UI, responsive mobile-first, accessible with ARIA labels.

## Next Steps for Configuration
1. Create Google OAuth Client ID (Web app) at console.cloud.google.com
2. Create Firebase project with Firestore database
3. Generate Firebase service account key
4. Create Gmail App Password (2FA required)
5. Copy .env.example to .env and fill placeholders
6. Run `npm run dev` and test at http://localhost:3000
