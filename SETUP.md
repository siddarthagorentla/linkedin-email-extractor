# LinkedIn Email Extractor - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### 3. Configure Environment Variables

Open `.env.local` and replace the placeholder:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Run the Application

#### Option A: Frontend Only (Limited)

```bash
npm run dev
```

⚠️ **Note:** API calls will fail because serverless functions don't run with Vite dev server.

#### Option B: Full Stack (Recommended)

```bash
npx vercel dev
```

✅ This runs both frontend and API endpoints locally.

### 5. Open in Browser

Navigate to the URL shown in terminal (usually `http://localhost:3000` or `http://localhost:5173`)

---

## 📦 Project Structure

```
├── api/
│   └── extract.ts          # Vercel serverless function
├── components/
│   ├── ContactCard.tsx     # Contact info display
│   ├── Loader.tsx          # Loading spinner
│   └── icons.tsx           # SVG icons
├── hooks/
│   └── useCopyToClipboard.ts
├── services/
│   └── geminiService.ts    # API client
├── App.tsx                 # Main application
├── index.tsx              # Entry point
├── types.ts               # TypeScript types
├── vite.config.ts         # Vite configuration
└── .env.local             # Environment variables (not in git)
```

---

## 🔧 Technology Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS (CDN)
- **AI Service:** Google Gemini 2.0 Flash
- **Deployment:** Vercel Serverless Functions

---

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set Environment Variable:**
    - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
    - Add `GEMINI_API_KEY` with your API key
    - Redeploy: `vercel --prod`

---

## 🐛 Troubleshooting

### Issue: "API_KEY is missing" error

**Solution:** Ensure `.env.local` exists and contains valid `GEMINI_API_KEY`

### Issue: API calls return 404 in development

**Solution:** Use `npx vercel dev` instead of `npm run dev`

### Issue: TypeScript errors

**Solution:**

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Gemini API errors

**Solution:**

- Verify your API key is valid
- Check you have billing enabled (if required)
- Ensure the API is enabled in Google Cloud Console

---

## 📝 Development Notes

- The app uses Google's Gemini AI with web search capabilities
- Search is performed server-side to protect the API key
- Results are parsed and validated before display
- All contact fields support copy-to-clipboard
- Results can be exported as CSV

---

## 🔒 Security

- Never commit `.env.local` to version control
- API key is only used server-side in Vercel functions
- No sensitive data is stored or logged

---

## 📄 License

This project is for educational purposes only. Ensure compliance with LinkedIn's Terms of Service and applicable laws.
