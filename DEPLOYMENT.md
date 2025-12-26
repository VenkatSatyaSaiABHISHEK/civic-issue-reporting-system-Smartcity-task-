# Deployment Guide - Vercel (Frontend) + Railway (Backend)

## Prerequisites
- GitHub account with your repository pushed
- Vercel account (free tier available)
- Railway account (free tier available)

---

## Step 1: Backend Deployment on Railway

### 1.1 Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 1.2 Create Railway Project
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "Create New Project"
4. Select "Deploy from GitHub repo"
5. Choose your "Reporting system" repository
6. Click "Deploy Now"

### 1.3 Configure Environment Variables in Railway
After deployment starts, go to **Project Settings** → **Variables** and add:

```
GOOGLE_CLIENT_ID=your_google_client_id_here
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
GMAIL_USER=your_gmail@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
PORT=3000
NODE_ENV=production
```

### 1.4 Get Backend URL
After successful deployment:
1. Go to Railway Dashboard
2. Click on your project
3. Find **Service** → **Deployments**
4. Copy the **Public URL** (e.g., `https://reporting-system-production.up.railway.app`)
5. Save this URL - you'll need it for Vercel

---

## Step 2: Frontend Deployment on Vercel

### 2.1 Update Frontend API Base
Edit `frontend/script.js` and change API_BASE (if needed):
```javascript
// Change this line to your Railway backend URL:
const API_BASE = 'https://your-railway-url.up.railway.app';
```

Or better: use environment variable in Vercel

### 2.2 Connect Vercel to GitHub
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your "Reporting system" repository
5. Leave default settings
6. Click "Deploy"

### 2.3 Configure Environment Variables in Vercel
1. Go to **Project Settings** → **Environment Variables**
2. Add these variables:

```
VITE_API_BASE=https://your-railway-url.up.railway.app
```

Or update in the deployment settings before deploying.

### 2.4 Redeploy Frontend
1. Go to **Deployments**
2. Click the latest deployment
3. Redeploy with new environment variables

---

## Step 3: Connect Frontend to Backend

### Option A: Update API_BASE in script.js
Edit `frontend/script.js` line 2:
```javascript
const API_BASE = 'https://your-railway-backend-url.up.railway.app';
```

### Option B: Use Environment Variable
Create `.env.production` file:
```
VITE_API_BASE=https://your-railway-backend-url.up.railway.app
```

---

## Step 4: Verify Deployment

1. **Test Frontend**: https://your-vercel-deployment.vercel.app
2. **Test Backend Health**: https://your-railway-url.up.railway.app/health
3. **Test Geolocation**: 
   - Try selecting location on map
   - Try entering a pincode
   - Check browser console for API calls

---

## Troubleshooting

### 404 errors on API calls
- Verify API_BASE URL in frontend matches Railway backend URL
- Check CORS settings in Railway environment

### Firebase/Gmail not working
- Ensure environment variables are set correctly in Railway
- Check that private key is properly escaped (Railway handles this)

### Frontend shows 404
- Make sure vercel.json is correct
- Frontend should serve on root path, backend on /api/*

### Railway deployment fails
- Check Railway logs: Project → Deployments → View Logs
- Ensure package.json has correct start command
- Check Node.js version compatibility

---

## URLs After Deployment

- **Frontend**: https://[your-project].vercel.app
- **Backend API**: https://[your-project].up.railway.app
- **Health Check**: https://[your-project].up.railway.app/health

---

## Post-Deployment Checklist

- [ ] Frontend loads without errors
- [ ] Google Sign-In works
- [ ] Map location selection works
- [ ] Pincode search works
- [ ] Form submission works
- [ ] Email confirmations sent
- [ ] Database (Firestore) records appear

---

## Custom Domain (Optional)

### Vercel Custom Domain
1. Settings → Domains
2. Add your domain
3. Update DNS settings (instructions provided by Vercel)

### Railway Custom Domain
1. Project Settings → Domains
2. Add your domain
3. Update DNS settings

---

## Monitoring & Logs

### Railway Logs
- Project Dashboard → Deployments → View Logs
- Real-time logs visible in the console

### Vercel Logs
- Project Settings → Logs
- Function logs, build logs, edge function logs

---

## Need Help?

- Railway Support: https://support.railway.app
- Vercel Support: https://vercel.com/support
- Firebase: https://firebase.google.com/support
