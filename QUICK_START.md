# 🚀 Quick Start Checklist

Use this checklist to get the LinkedIn Email Extractor up and running quickly.

---

## Prerequisites

- [ ] Node.js installed (v14 or higher recommended)
- [ ] npm or yarn package manager
- [ ] Google AI Studio account (for API key)

---

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

**Status:** ⬜ Not started | ✅ Complete

---

### 2. Get Gemini API Key

1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the generated key

**Status:** ⬜ Not started | ✅ Complete

---

### 3. Configure Environment

1. Open `.env.local` file
2. Replace `your_gemini_api_key_here` with your actual API key:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   ```

**Status:** ⬜ Not started | ✅ Complete

---

### 4. Choose Development Mode

#### Option A: Frontend Only (Quick Preview)

```bash
npm run dev
```

- Opens at: http://localhost:5173
- ⚠️ API calls will fail
- Good for: UI/UX testing only

**Status:** ⬜ Not started | ✅ Complete

#### Option B: Full Stack (Recommended)

```bash
npx vercel dev
```

- Opens at: http://localhost:3000
- ✅ Full API functionality
- Good for: Complete testing

**Status:** ⬜ Not started | ✅ Complete

---

### 5. Test the Application

1. Open the URL shown in terminal
2. Paste a LinkedIn profile URL:
   ```
   Example: https://www.linkedin.com/in/username
   ```
3. Click "Extract Information"
4. Verify results appear

**Status:** ⬜ Not started | ✅ Complete

---

## Deployment (Optional)

### Deploy to Vercel

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

**Remember:** Add `GEMINI_API_KEY` in Vercel Dashboard → Project Settings → Environment Variables

**Status:** ⬜ Not started | ✅ Complete

---

## Troubleshooting

### ❌ "API_KEY is missing" error

- **Solution:** Check `.env.local` exists and has valid `GEMINI_API_KEY`

### ❌ API calls return 404

- **Solution:** Use `npx vercel dev` instead of `npm run dev`

### ❌ "Module not found" errors

- **Solution:** Run `npm install` again
- **Solution:** Delete `node_modules` and `package-lock.json`, then run `npm install`

### ❌ TypeScript errors

- **Solution:** Ensure TypeScript is installed: `npm install -D typescript`

### ❌ Gemini API errors

- **Solution:** Verify API key is correct and active
- **Solution:** Check API usage limits in Google AI Studio

---

## Quick Reference

### Project Structure

```
├── api/
│   └── extract.ts          # Serverless API function
├── components/
│   ├── ContactCard.tsx     # Display contact info
│   ├── Loader.tsx          # Loading spinner
│   └── icons.tsx           # SVG icons
├── services/
│   └── geminiService.ts    # API client
├── App.tsx                 # Main app
├── .env.local             # Environment variables
└── vercel.json            # Vercel config
```

### Key Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Run frontend only |
| `npx vercel dev` | Run full stack locally |
| `npm run build` | Build for production |
| `vercel` | Deploy to Vercel |

### Important Files

- **`.env.local`** - Your API key (DO NOT commit!)
- **`api/extract.ts`** - Backend logic
- **`App.tsx`** - Frontend UI
- **`README.md`** - Full documentation
- **`SETUP.md`** - Detailed setup guide

---

## Need Help?

1. Check **README.md** for detailed instructions
2. Check **SETUP.md** for troubleshooting
3. Check **FIXES_APPLIED.md** for what was fixed
4. Check Gemini API docs: https://ai.google.dev/

---

## Security Reminder

- ✅ Never commit `.env.local` to git
- ✅ Keep API key secret
- ✅ API is server-side only (safe)
- ✅ No sensitive data is logged

---

## You're Ready! 🎉

Once all steps show ✅, you're ready to:

- Extract contact info from LinkedIn profiles
- Export results as CSV
- Deploy to production
- Build amazing features!

Happy coding! 🚀
