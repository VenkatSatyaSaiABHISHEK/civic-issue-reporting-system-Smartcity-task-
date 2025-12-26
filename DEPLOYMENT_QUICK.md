# QUICK DEPLOYMENT STEPS

## For Railway Backend:

### Step 1: Go to railway.app
- Login with GitHub
- Create New Project
- Deploy from GitHub repo (select your repo)

### Step 2: Add Environment Variables in Railway:
```
GOOGLE_CLIENT_ID=your_value
FIREBASE_PROJECT_ID=your_value
FIREBASE_CLIENT_EMAIL=your_value
FIREBASE_PRIVATE_KEY=your_value
GMAIL_USER=your_value
GMAIL_APP_PASSWORD=your_value
```

### Step 3: Get your Railway URL
- Copy the Public URL from Railway Dashboard
- It will look like: https://reporting-system-production.up.railway.app

---

## For Vercel Frontend:

### Step 1: Go to vercel.com
- Login with GitHub
- Add New Project
- Select your repo
- Click Deploy

### Step 2: No environment variables needed
- Frontend uses `window.location.origin` for API calls
- This automatically points to wherever it's deployed

### Step 3: Verify it works
- Open your Vercel URL: https://your-project.vercel.app
- Sign in with Google
- Try selecting a location
- Try entering a pincode

---

## Testing After Deployment:

1. Frontend URL: https://your-project.vercel.app
2. Backend Health: https://your-railway-url/health
3. Test the form end-to-end
4. Check browser console for any errors

---

## Important Notes:

✅ Vercel automatically serves frontend from root /
✅ Railway automatically serves backend on the main URL
✅ API calls use window.location.origin - works automatically
✅ Both services have free tiers!

## Troubleshooting:

If API calls fail with 404:
1. Check that Railway backend is running (test /health endpoint)
2. Check browser console for exact URL being called
3. Ensure environment variables are set in Railway

If Google Sign-In fails:
1. Add Vercel URL to Google OAuth authorized redirect URIs
2. Settings → API OAuth 2.0 → Update authorized origins

---

See DEPLOYMENT.md for detailed instructions
