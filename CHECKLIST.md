╔═══════════════════════════════════════════════════════════════════════════╗
║                    PRE-DEPLOYMENT CHECKLIST                                ║
║            Make sure everything is ready before going live!                 ║
╚═══════════════════════════════════════════════════════════════════════════╝

## LOCAL SETUP CHECKLIST

☐ Node.js installed (version 16+)
☐ npm installed and updated
☐ All dependencies installed: npm install
☐ .env file exists with all credentials
☐ Backend runs: npm run dev
☐ Frontend loads: http://localhost:3000
☐ No console errors
☐ Google Sign-In works locally
☐ Location selection works
☐ Pincode search works
☐ Form submission works
☐ Emails are being sent

---

## CREDENTIALS READY CHECKLIST

☐ Google Client ID obtained
☐ Firebase Project created
☐ Firebase Firestore database created
☐ Firebase Admin SDK key downloaded
☐ Gmail account set up
☐ Gmail 2FA enabled
☐ Gmail App Password generated (16 chars)
☐ All credentials saved securely
☐ .env file NOT committed to git
☐ .gitignore includes .env

---

## GITHUB SETUP CHECKLIST

☐ GitHub account created
☐ Repository created (public or private)
☐ Repository URL known
☐ Code NOT pushed yet (if not already done)
☐ README.md present
☐ .gitignore properly configured
☐ No node_modules in git
☐ No .env file in git

---

## RAILWAY SETUP CHECKLIST

☐ Railway account created
☐ Connected with GitHub
☐ Understand Railway dashboard
☐ Know how to add environment variables
☐ Ready to add 6 environment variables
☐ Know how to view deployment logs
☐ Understand how to restart deployments
☐ Know where to find public URL

---

## VERCEL SETUP CHECKLIST

☐ Vercel account created
☐ Connected with GitHub
☐ Understand Vercel dashboard
☐ Know how to trigger deployments
☐ Know how to view build logs
☐ Know how to add environment variables (not needed)
☐ Know where to find deployment URL
☐ Know how to configure custom domain

---

## GOOGLE OAUTH CHECKLIST

☐ OAuth Client ID created (Web app type)
☐ Authorized redirect URIs configured
☐ Localhost URIs added for testing
  ☐ http://localhost:3000
  ☐ http://localhost:3000/
☐ Vercel URL will be added after deployment
  ☐ https://your-vercel-project.vercel.app
  ☐ https://your-vercel-project.vercel.app/

---

## FIREBASE CHECKLIST

☐ Firestore database created
☐ Database Rules set (allow authenticated users)
☐ Collections will be auto-created on first submit
☐ Admin SDK service account key downloaded
☐ Key file contains:
  ☐ project_id
  ☐ client_email
  ☐ private_key
☐ Key is secured (not committed)

---

## CODE QUALITY CHECKLIST

☐ No syntax errors in JavaScript
☐ No syntax errors in HTML
☐ No syntax errors in CSS
☐ No console errors when running locally
☐ All API endpoints tested
☐ Error handling implemented
☐ Loading states working
☐ No hardcoded credentials in code
☐ API calls use correct paths (/api/*)
☐ Frontend uses window.location.origin

---

## DEPLOYMENT CONFIGURATION CHECKLIST

✅ vercel.json created (auto-routes)
✅ railway.json created (build config)
✅ package.json has correct start script
✅ package.json start: "node backend/server.js"
✅ package.json dev: "nodemon backend/server.js"
✅ All dependencies in package.json
✅ No typos in package.json
✅ backend/server.js exists
✅ backend/server.js has correct port
✅ frontend/index.html exists
✅ frontend/script.js exists
✅ frontend/styles.css exists

---

## FINAL TESTING CHECKLIST

LOCAL TESTS:
☐ npm run dev starts without errors
☐ Page loads at http://localhost:3000
☐ Google Sign-In button appears
☐ Can sign in with Google
☐ Can click "Select Location"
☐ Map appears and is interactive
☐ Can click on map and place marker
☐ City auto-fills from map
☐ Pincode auto-fills from map
☐ Can enter custom pincode
☐ Street options appear
☐ Can select issue category
☐ Can upload image
☐ Can fill description
☐ Can submit form
☐ See confirmation page
☐ Reference ID appears
☐ Email is received

---

## INTEGRATION TESTS

☐ API calls show correct endpoints in Network tab
☐ Firebase console shows new document
☐ Email inbox receives confirmation
☐ Email contains map image
☐ Email contains all location data
☐ Email contains reference ID
☐ Refresh page, data persists
☐ Multiple submissions work
☐ Different users can submit

---

## LIGHTHOUSE CHECKLIST

☐ Performance > 50
☐ Accessibility > 80
☐ Best Practices > 80
☐ SEO > 80

(Optional but recommended)

---

## BEFORE PUSHING TO GITHUB

☐ git status shows no uncommitted secrets
☐ .env file is in .gitignore
☐ package-lock.json is present
☐ node_modules is in .gitignore
☐ All important files are in repo
☐ README.md is updated
☐ Ready to push!

PUSH COMMAND:
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

---

## RAILWAY DEPLOYMENT CHECKLIST

☐ Repository successfully pushed to GitHub
☐ Railway.app account created and logged in
☐ GitHub account connected to Railway
☐ New project created
☐ Repository selected and deployed
☐ Deployment started (watch logs)
☐ Deployment completed successfully
☐ 6 Environment variables added:
  ☐ GOOGLE_CLIENT_ID
  ☐ FIREBASE_PROJECT_ID
  ☐ FIREBASE_CLIENT_EMAIL
  ☐ FIREBASE_PRIVATE_KEY
  ☐ GMAIL_USER
  ☐ GMAIL_APP_PASSWORD
☐ Server restarted after env vars added
☐ Public URL copied
☐ /health endpoint returns {"status":"ok"}
☐ Logs show "Connected to Firestore"
☐ No errors in logs

RAILWAY URL FORMAT:
https://[your-project]-production.up.railway.app

---

## VERCEL DEPLOYMENT CHECKLIST

☐ Vercel.app account created and logged in
☐ GitHub account connected to Vercel
☐ Repository successfully imported
☐ Project created
☐ Build started (watch logs)
☐ Build completed successfully
☐ Deployment completed successfully
☐ Public URL copied
☐ Frontend loads at URL
☐ No 404 errors
☐ Google Sign-In button visible
☐ Can interact with page

VERCEL URL FORMAT:
https://[your-project].vercel.app

---

## POST-DEPLOYMENT VERIFICATION

☐ Visit Vercel URL: https://your-vercel-project.vercel.app
☐ Page loads without 404
☐ Google Sign-In button appears
☐ Sign in with Google works
☐ Can select location
☐ Backend API calls successful
  ☐ No 404 errors in console
  ☐ No CORS errors
  ☐ Location resolves properly
☐ Form submission works
☐ Firestore document created (check Firebase Console)
☐ Email received in inbox
☐ Everything matches local testing

---

## GOOGLE OAUTH POST-DEPLOYMENT

☐ Go to Google Cloud Console
☐ Find OAuth 2.0 Client ID
☐ Add Vercel URL to Authorized redirect URIs
  ☐ https://your-vercel-project.vercel.app
  ☐ https://your-vercel-project.vercel.app/
☐ Save changes
☐ Test Google Sign-In again
☐ Should work without permission errors

---

## GO LIVE CHECKLIST

☐ All tests passing
☐ No critical errors
☐ Database working
☐ Emails working
☐ API calls working
☐ Frontend responsive
☐ Mobile tested
☐ Dark theme works
☐ Light theme works
☐ All features tested
☐ Performance acceptable
☐ Ready to share URL

---

## AFTER GOING LIVE

☐ Monitor Railway logs for errors
☐ Monitor Vercel analytics
☐ Check Firebase for submissions
☐ Share URL with users
☐ Gather feedback
☐ Monitor for issues
☐ Keep code updated
☐ Regular backups (optional)
☐ Plan scaling (if needed)

---

## QUICK STATUS CHECKLIST

BEFORE DEPLOYMENT:
- [ ] All files ready
- [ ] Credentials prepared
- [ ] Code tested locally
- [ ] GitHub repository set up

DURING DEPLOYMENT:
- [ ] Railway deployment started
- [ ] Railway deployment completed
- [ ] Railway environment variables added
- [ ] Vercel deployment started
- [ ] Vercel deployment completed

AFTER DEPLOYMENT:
- [ ] Both services show success
- [ ] No critical errors in logs
- [ ] Health check passes
- [ ] Frontend loads
- [ ] API calls work
- [ ] Ready for users!

---

═══════════════════════════════════════════════════════════════════════════════

ESTIMATED TIME:
  Local Testing:     30 minutes
  Push to GitHub:    5 minutes
  Railway Deployment: 5-10 minutes
  Vercel Deployment: 3-5 minutes
  Post-Deployment Testing: 10 minutes
  ─────────────────
  TOTAL:            ~60 minutes

═══════════════════════════════════════════════════════════════════════════════

If you check ✅ on ALL items above, you're ready to deploy!

Questions? See DEPLOY_NOW.md for step-by-step instructions.
