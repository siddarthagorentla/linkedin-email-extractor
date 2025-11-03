# Run and deploy LinkedIn Email Extractor

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js and npm

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Google API key
    - Get your API key from: https://aistudio.google.com/app/apikey
    - Open `.env.local` and replace `your_gemini_api_key_here` with your actual key

3. Run the app:

   **Option A - Local Development (Frontend Only):**
   ```bash
   npm run dev
   ```
   Note: This runs the frontend only. API calls will fail unless you deploy or use Vercel dev.

   **Option B - Full Stack Development (Recommended):**
   ```bash
   npx vercel dev
   ```
   This runs both frontend and serverless functions locally.

4. Open your browser to the URL shown in the terminal (usually http://localhost:5173 or http://localhost:3000)

## Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variable in Vercel dashboard:
    - Go to your project settings
    - Add `GEMINI_API_KEY` environment variable
    - Redeploy

## Troubleshooting

- **API calls failing locally?** Make sure you're using `vercel dev` instead of `npm run dev`
- **"API_KEY is missing" error?** Check that `.env.local` exists and contains your key
- **TypeScript errors?** Run `npm install` to ensure all dependencies are installed

