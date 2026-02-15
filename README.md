# ExpendiTrack

A personal expense tracker built with Next.js 14, Tailwind CSS, and local JSON storage.

## Features

- 💰 Track expenses with categories
- 📅 Daily spending history
- 🔍 Search and filter expenses
- ✏️ Edit and delete expenses
- 📱 Install as app on Android & iPad (PWA)
- 🌙 Dark mode support

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel (Free)

### Step 1: Push to GitHub

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Repository name: `expense-tracker`
   - Select "Public" or "Private"
   - Click "Create repository"

2. Push your code:
   ```bash
   cd expense-tracker
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign up (use GitHub to sign in)

2. Click "Add New Project"

3. Select your `expense-tracker` repository

4. Click "Deploy"

5. Wait for deployment to complete (~1-2 minutes)

6. You'll get a URL like: `https://expense-tracker-xxx.vercel.app`

### Step 3: Install on Android & iPad

**On Android (Chrome):**

1. Open your Vercel URL in Chrome
2. Tap the 3 dots menu (⋮)
3. Tap "Install App" or "Add to Home Screen"
4. The app will appear in your app drawer

**On iPad (Safari):**

1. Open your Vercel URL in Safari
2. Tap the Share button (□↗)
3. Tap "Add to Home Screen"
4. The app will appear on your home screen

## Files to Push to GitHub

✅ **Push these:**

- `src/` - All source code
- `public/` - Icons and manifest
- `package.json` - Dependencies
- `next.config.mjs` - Next.js config
- `tailwind.config.ts` - Tailwind config
- `tsconfig.json` - TypeScript config
- `postcss.config.mjs` - PostCSS config
- `README.md` - This file

❌ **Don't push:**

- `node_modules/` - Installed packages (auto-generated)
- `.next/` - Build output (auto-generated)
- `data/expense-data.json` - Your personal expense data

## Note on Data Storage

Your expense data is stored locally in `data/expenses.json`. This file is not synced to the cloud - it's only on your device. To back up your data, you can:

1. Manually copy the file
2. Or use version control to track changes

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Storage:** Local JSON file
