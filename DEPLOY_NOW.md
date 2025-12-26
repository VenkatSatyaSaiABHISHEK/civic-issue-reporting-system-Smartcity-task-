# READY TO DEPLOY? Follow These Steps Exactly

## ✅ BEFORE YOU START
Make sure you have:
- [ ] GitHub account with repo pushed
- [ ] Vercel account (free, connect with GitHub)
- [ ] Railway account (free, connect with GitHub)
- [ ] Your credentials ready:
  - Google Client ID
  - Firebase credentials
  - Gmail App Password

---

## 🚀 DEPLOY BACKEND TO RAILWAY (5 minutes)

1. **Go to [railway.app](https://railway.app)**

2. **Click "Create New Project"** → Select "Deploy from GitHub repo"

3. **Choose your repository** and click "Deploy Now"

4. **While deploying, go to Settings → Variables and add:**
   ```
   GOOGLE_CLIENT_ID=401713212611-0gvsieb6l915pejddavg5bv49r7c5s7v.apps.googleusercontent.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=your_email@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY=your_key_here
   GMAIL_USER=your_email@gmail.com
   GMAIL_APP_PASSWORD=your_password
   ```

5. **Wait for deployment to finish** (should say "Success")

6. **Copy your Railway URL** (e.g., https://reporting-system-production.up.railway.app)

7. **Test it works:** Visit `https://your-railway-url/health` 
   - Should show: `{"status":"ok"}`

---

## 🎨 DEPLOY FRONTEND TO VERCEL (3 minutes)

1. **Go to [vercel.com](https://vercel.com)**

2. **Click "Add New" → "Project"**

3. **Select your GitHub repository**

4. **Click "Deploy"** (no configuration needed!)

5. **Wait for deployment** (should show "Ready in production")

6. **Copy your Vercel URL** (e.g., https://reporting-system.vercel.app)

7. **Test it works:** Visit your Vercel URL
   - Should show sign-in page with Google button

---

## 🔗 CONNECT FRONTEND TO BACKEND

The frontend is already configured to use `window.location.origin` for API calls, which means:
- When deployed on Vercel: Uses `https://your-vercel-url`
- When deployed on Railway: Uses `https://your-railway-url`
- When running locally: Uses `http://localhost:3000`

**This works automatically!** No changes needed.

---

## ✅ FINAL VERIFICATION

### Test Frontend
1. Open: https://your-vercel-url
2. Click "Sign in with Google"
3. Go to Step 2 and:
   - Click "Select Location"
   - Pick a location on the map
   - Verify city/pincode auto-fill
4. Submit the form

### Test Backend
1. Open: https://your-railway-url/health
2. Should see: `{"status":"ok"}`

---

## 🎉 YOU'RE LIVE!

Your application is now live:
- **Frontend**: https://your-vercel-url
- **Backend API**: https://your-railway-url

Share your frontend URL with users!

---

## 📝 OPTIONAL: Update Google OAuth

If Google Sign-In shows errors after deploying:

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Select your project
3. Go to "APIs & Services" → "Credentials"
4. Click on your OAuth 2.0 Client ID
5. Under "Authorized redirect URIs", add:
   - `https://your-vercel-url`
   - `https://your-vercel-url/`
6. Click Save

---

## 🆘 TROUBLESHOOTING

### Form submission says "API Error"
- Check that Railway backend is running
- Test: https://your-railway-url/health
- Check browser console for exact error

### Google Sign-In button doesn't work
- Add your Vercel URL to Google OAuth authorized URIs (see above)
- Clear browser cache and try again

### Location selection shows blank map
- Check browser console for errors
- Make sure map picker code loaded
- Try in Chrome instead of Edge

### Emails not being sent
- Check Gmail settings are correct in Railway
- Make sure Gmail App Password (not regular password) is used
- Gmail must have 2FA enabled

---

## 📚 Full Documentation

See these files for more details:
- `DEPLOYMENT.md` - Detailed deployment guide
- `DEPLOYMENT_QUICK.md` - Quick reference
- `README.md` - General project info
- `.env.production.example` - Environment variables template

---

## 🎯 NEXT STEPS

After deployment:
1. Share your frontend URL with users
2. Monitor Railway logs for errors
3. Monitor Vercel analytics
4. Set up custom domain (optional)
5. Configure monitoring alerts (optional)

---

**Questions?** Check the deployment guides or contact support:
- Railway: https://support.railway.app
- Vercel: https://vercel.com/support
