@echo off
REM DEPLOYMENT SCRIPT FOR WINDOWS - Run this batch file

setlocal enabledelayedexpansion

cls
echo.
echo =====================================================================
echo   Citizen Issue Reporting System - Deployment Guide (Windows)
echo =====================================================================
echo.
echo This script will guide you through deploying your application.
echo.
pause

REM STEP 1: Git Setup
cls
echo.
echo STEP 1: Initialize Git Repository
echo ─────────────────────────────────────────────────────────────────────
echo.
echo Run these commands in PowerShell or Command Prompt:
echo.
echo   cd "c:\VS\Reporting system"
echo   git init
echo   git add .
echo   git commit -m "Initial commit - ready for production"
echo   git remote add origin https://github.com/YOUR_USERNAME/reporting-system.git
echo   git push -u origin main
echo.
echo Time: ~5 minutes
echo.
echo ✓ Press any key after you've pushed to GitHub...
pause > nul

REM STEP 2: Railway
cls
echo.
echo STEP 2: Deploy Backend to Railway
echo ─────────────────────────────────────────────────────────────────────
echo.
echo 1. Go to https://railway.app
echo 2. Sign in with GitHub
echo 3. Create New Project
echo 4. Deploy from GitHub repo
echo 5. Select your repository
echo 6. Add these Environment Variables:
echo.
echo    GOOGLE_CLIENT_ID=your_value
echo    FIREBASE_PROJECT_ID=your_value
echo    FIREBASE_CLIENT_EMAIL=your_value
echo    FIREBASE_PRIVATE_KEY=your_value
echo    GMAIL_USER=your_value
echo    GMAIL_APP_PASSWORD=your_value
echo.
echo 7. Copy your Railway URL when deployment succeeds
echo.
echo Time: ~5-10 minutes
echo.
echo ✓ Press any key after Railway deployment is complete...
pause > nul

REM STEP 3: Vercel
cls
echo.
echo STEP 3: Deploy Frontend to Vercel
echo ─────────────────────────────────────────────────────────────────────
echo.
echo 1. Go to https://vercel.com
echo 2. Sign in with GitHub
echo 3. Click "Add New" → "Project"
echo 4. Select your repository
echo 5. Click "Deploy"
echo.
echo That's it! No configuration needed.
echo.
echo Your Vercel URL will be something like:
echo   https://reporting-system.vercel.app
echo.
echo Time: ~3-5 minutes
echo.
echo ✓ Press any key after Vercel deployment is complete...
pause > nul

REM STEP 4: Testing
cls
echo.
echo STEP 4: Verify Everything Works
echo ─────────────────────────────────────────────────────────────────────
echo.
echo Test these URLs:
echo.
echo 1. Backend Health Check:
echo    https://your-railway-url/health
echo    (Should show: {"status":"ok"})
echo.
echo 2. Frontend:
echo    https://your-vercel-url
echo    (Should show sign-in page)
echo.
echo 3. Complete Test:
echo    - Sign in with Google
echo    - Select location on map
echo    - Verify auto-fill
echo    - Submit form
echo    - Check email inbox
echo.
echo Time: ~10 minutes
echo.
echo ✓ Press any key to continue...
pause > nul

REM STEP 5: Optional Google OAuth
cls
echo.
echo STEP 5: (Optional) Update Google OAuth
echo ─────────────────────────────────────────────────────────────────────
echo.
echo If Google Sign-In fails:
echo.
echo 1. Go to https://console.cloud.google.com
echo 2. Select your project
echo 3. Go to APIs ^& Services → Credentials
echo 4. Click your OAuth 2.0 Client ID
echo 5. Add your Vercel URL to Authorized redirect URIs:
echo    https://your-vercel-url
echo    https://your-vercel-url/
echo 6. Click Save
echo 7. Test again
echo.
echo Time: ~5 minutes
echo.
echo ✓ Press any key to finish...
pause > nul

REM Completion
cls
echo.
echo =====================================================================
echo   ✅ DEPLOYMENT COMPLETE!
echo =====================================================================
echo.
echo Your application is now LIVE at:
echo.
echo   Frontend:  https://your-vercel-project.vercel.app
echo   Backend:   https://your-railway-project.up.railway.app
echo.
echo Share your frontend URL with users!
echo.
echo =====================================================================
echo.
echo For help, see:
echo   - START_HERE.md
echo   - DEPLOY_NOW.md
echo   - DEPLOYMENT.md
echo.
echo Press any key to exit...
pause > nul
