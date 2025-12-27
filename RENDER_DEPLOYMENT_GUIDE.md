# Render Deployment Guide

## Why It Doesn't Work on Render (But Works Locally)

### Common Issues:

1. **Environment Variables Not Set** - Render environment variables are different from your local `.env`
2. **CORS Issues** - Frontend URL doesn't match what Render is serving
3. **FRONTEND_URL Pointing to localhost** - The CORS setting won't allow localhost in production
4. **Firebase Credentials Not Configured** - Service account key not properly set in Render
5. **Gmail Credentials Not Set** - SMTP credentials not configured in Render environment

---

## Step-by-Step Deployment to Render

### 1. Create a New Web Service on Render

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in the form:
   - **Name**: `civic-issue-reporting` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or `node backend/server.js`)
   - **Plan**: Free tier is fine for testing

### 2. Configure Environment Variables in Render

Click **"Environment"** and add ALL these variables:

```
PORT=3000

FRONTEND_URL=https://civic-issue-reporting.onrender.com

GOOGLE_CLIENT_ID=401713212611-0gvsieb6l915pejddavg5bv49r7c5s7v.apps.googleusercontent.com

FIREBASE_PROJECT_ID=khub-bdabd
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@khub-bdabd.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmxHQRppBVz7ID\nWnK3lgWw63c9sSh0AxFiumwH0xk6+/2eraJfpkAE3vR69eiJ2ihca1TJv3vHXAzw\nhmUjKdmikCdBfriMWvnCKbnXkHXpyEvQkVfgYc2p6dJHD1+UfJ5Hkuog/XITsCDc\n0iIyEmUIZJW5VY9DYdQoSTvgbX5LkVfiyd4Hmou4sGbakvmnXO+V/Ooy9bN0arRs\nBYpSqO5PCw9n2luKT5VeITPG7VlcxM8P1D2kSqVeaD0zgulsT5DkE4ttUxyaTv6H\n3dJp7hkzmryDOxtHvzXRhP9afZdZOc5t07soVDmRww/tTH/44WqBTMBDr42CFjYn\nNkh/6RvtAgMBAAECggEAHruWfkg5Ui8P6bFJ8c46Z0PFej+DKnoEQrMDRJ/hBu84\nan0qLsFXC+7AlEZsH7dt97Yp7nIU0AUFN3A1BDlqq5wwN9AwF2GOpHsHDhRHvpkU\na6/VR3sOqTD3ePP608TxcFRBRGogk0NCkx9AgQTFzLmoo/qCB9NoAzKXz8Ct5SPr\nq1UKuArYgV7yD5+122hEFYDRMLxNmWFmlTGlYU2l5Mz3WcbEHcySRAWVm73xDEsF\nGDoV2+59RfPv8pEuOqJECz9bC983CvS0XGuVYfbTwLendBfHEjbQw6PlDIXtIR5j\nSrRVP1AhYqghynw76PKAWDpLvMdoq5ZS4PGtK5IvEQKBgQDnwmVgC9J2I99cNgcs\nlgGPFPosH+U4fSm39189dKz0IQkSkbVCPe3Lbt3yLbdwbGqfUmjTmhq9eew52AQn\nyY8Lyrm4FPBAAD2P6xQuNJUvNqEhpSLhIXoEmOwmFN+TXcSgavcmp/vo7OvzdwiQ\nH+S2Y7yIqj2oRvcKAb+I0zD1uQKBgQC4NdQJjLix1j2MLu6Q9nos8tEFqhFlMXWT\nRuRqND4bIXOr6fjCFZBjRz3hU/M9sBgGMI4JalvMn+CwDig/WFz8/xR8XGBMe84Q\nJdsJjCyRA+MUgjlwQOqm8nGvLXQuX8psUO+i/yJSz3n/D13iMXk5+gu1WH70Ga88\nGgGKZGZx1QKBgQCIh6zQ+CX0Ew3ydKGlUnl4oRMAC4otzQ5WohQpUCLTbuK5Xb06\nWOFNhvKZSPVX9YaadSHsBkzacokHSoqoJcVvXO4r06n1Ci86KXKqBbAdMEGcYHw7\nxEztiGkVxhYv6n17Q4h17WApx+j4dJdG0IMcL4VRvXi1OZku+/ip0kB1gQKBgGP+\nXD5e0/c9G6XX6ApqsUFrAYm4mr66jV9H8T+xYjEqBHdCh5UbTYiGqJGDF5vZ1gCu\nJLv5ryExfC81UCWqmrd+46jqICAEaIQdeHwDSkHhwUdltTY5FudO3eVAoDt4JhKM\nELkDE6euFkQdHFJnlq2hDPAAvNFWi+ftGf78pxuNAoGBALVw+/idVefw+Fg7+AxU\nwx1Hh9kmGmUik3zYH+h4mkRjva5csypDlHAr9W48EcYExbZ5My3NPND6ZQ7vJ05L\nhPuu9etA6ppfyQfAz3fu7io0T1180cTYxeWEpIIjMOpvuYuLmZFJcymcR+8reKoE\n40N5vzStofGFeE0AbPanhaBo\n-----END PRIVATE KEY-----

GMAIL_USER=abhi31mahi@gmail.com
GMAIL_APP_PASSWORD=wqbejcvnsokgcvua
```

**⚠️ IMPORTANT**: Replace `https://civic-issue-reporting.onrender.com` with your actual Render URL once deployed!

### 3. Update GOOGLE_CLIENT_ID in Google Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Add your Render domain to **Authorized JavaScript origins**:
   - `https://civic-issue-reporting.onrender.com` (replace with your URL)
6. Click **Save**

### 4. Update GOOGLE_CLIENT_ID in Frontend

The frontend also needs the correct Google Client ID. Check [frontend/index.html](frontend/index.html) for the script tag:

```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

This should work as-is since we're using the same Client ID.

### 5. Deploy

1. Click **"Deploy"** on Render
2. Wait for deployment to complete (5-10 minutes)
3. Once deployed, you'll get a URL like: `https://civic-issue-reporting-xyz.onrender.com`

---

## Troubleshooting Render Deployment

### Issue: "CORS error" or "Failed to fetch"

**Solution**: 
- Make sure `FRONTEND_URL` matches your Render domain exactly
- Restart your service after changing environment variables

### Issue: "Firebase permission denied"

**Solution**:
- Verify `FIREBASE_PRIVATE_KEY` is properly formatted with escaped newlines (`\n`)
- Check that the Firebase credentials have Firestore read/write permissions

### Issue: "Email not sending"

**Solution**:
- Verify `GMAIL_APP_PASSWORD` doesn't have spaces
- Make sure 2-Step Verification is enabled on the Gmail account
- Ensure the app password was generated correctly

### Issue: "Cannot get /api/report" (404 error)

**Solution**:
- Make sure you're POSTing to `/api/report`, not GETting
- Check server logs on Render dashboard for errors

---

## Local Testing Before Deployment

To test locally with production URLs:

1. Update `.env` with your test domain
2. Run `npm run dev`
3. Test all features
4. Once confirmed working, deploy to Render

---

## After Deployment

1. Test the app at your Render URL
2. Submit a test issue to verify:
   - ✅ Issue saves to Firestore
   - ✅ Confirmation email is sent
   - ✅ Reference ID is displayed
3. Check Render logs for any errors

---

## Useful Links

- [Render Documentation](https://render.com/docs)
- [Environment Variables on Render](https://render.com/docs/environment-variables)
- [Node.js on Render](https://render.com/docs/deploy-node)
