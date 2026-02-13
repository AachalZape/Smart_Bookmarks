# Vercel Deployment Guide

Follow these steps to deploy your Smart Bookmark App to Vercel.

## Prerequisites

- ✅ Your app is working locally
- ✅ You have a GitHub account
- ✅ You have a Vercel account (sign up at [vercel.com](https://vercel.com) if needed)
- ✅ Your Supabase project is set up

## Step 1: Prepare Your Code for Git

### 1.1 Initialize Git Repository (if not already done)

```bash
git init
```

### 1.2 Create a `.gitignore` file (already exists)

Make sure `.env.local` is in `.gitignore` (it should be already).

### 1.3 Stage and Commit Your Code

```bash
git add .
git commit -m "Initial commit - Smart Bookmark App"
```

## Step 2: Push to GitHub

### 2.1 Create a New Repository on GitHub

1. Go to [github.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Name it (e.g., `smart-bookmark-app`)
4. **Don't** initialize with README, .gitignore, or license
5. Click "Create repository"

### 2.2 Push Your Code

```bash
# Add GitHub remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Import Project

1. Go to [vercel.com](https://vercel.com)
2. Sign in (or create an account)
3. Click **"Add New..."** → **"Project"**
4. Click **"Import Git Repository"**
5. Find and select your GitHub repository
6. Click **"Import"**

### 3.2 Configure Project Settings

Vercel will auto-detect Next.js. Keep these settings:
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 3.3 Add Environment Variables

**IMPORTANT**: Add these environment variables in Vercel:

1. Click **"Environment Variables"** section
2. Add these two variables:

   **Variable 1:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your Supabase project URL (from Supabase Dashboard → Settings → API)
   - **Environment**: Production, Preview, Development (select all)

   **Variable 2:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Your Supabase anon/public key (from Supabase Dashboard → Settings → API)
   - **Environment**: Production, Preview, Development (select all)

3. Click **"Save"** after adding each variable

### 3.4 Deploy

1. Click **"Deploy"** button
2. Wait for the build to complete (usually 1-2 minutes)
3. Once deployed, you'll get a URL like: `https://your-app-name.vercel.app`

## Step 4: Update Supabase OAuth Settings

### 4.1 Update Redirect URLs in Supabase

1. Go to your **Supabase Dashboard**
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Vercel URL to **Redirect URLs**:
   ```
   https://your-app-name.vercel.app/auth/callback
   ```
4. Also keep your local URL for development:
   ```
   http://localhost:3000/auth/callback
   ```
5. Click **"Save"**

### 4.2 Update Google OAuth Settings (if using Google OAuth)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your OAuth project
3. Go to **APIs & Services** → **Credentials**
4. Edit your OAuth 2.0 Client ID
5. Add your Vercel URL to **Authorized redirect URIs**:
   ```
   https://your-app-name.vercel.app/auth/callback
   ```
6. Click **"Save"**

## Step 5: Test Your Deployment

1. Visit your Vercel URL: `https://your-app-name.vercel.app`
2. Test the login flow
3. Test adding bookmarks
4. Test real-time updates (open multiple tabs)

## Step 6: (Optional) Custom Domain

If you want a custom domain:

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow the DNS configuration instructions

## Troubleshooting

### Build Fails

- Check that all environment variables are set correctly
- Check the build logs in Vercel for specific errors
- Make sure `package.json` has all required dependencies

### OAuth Not Working

- Verify redirect URLs are correct in Supabase
- Check that environment variables are set in Vercel
- Make sure the Vercel URL is added to Google OAuth (if using Google)

### Real-time Not Working

- Verify Realtime is enabled in Supabase Dashboard → Database → Replication
- Check that the `bookmarks` table has replication enabled

## Quick Reference

**Vercel Dashboard**: https://vercel.com/dashboard
**Supabase Dashboard**: https://app.supabase.com
**Your App URL**: `https://your-app-name.vercel.app`

---

🎉 **Congratulations!** Your app is now live on Vercel!
