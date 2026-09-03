# Card Check — Frontend

A one-page Next.js app that checks a card number against the deployed
Luhn-validation API, styled as a live card mockup.


**Live app:** https://card-validation-frontend.vercel.app
**Backend API:** https://card-validation-assessment.onrender.com

A one-page Next.js app that checks a card number against the deployed
Luhn-validation API, styled as a live card mockup.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- sonner (toast notifications)

## Local development

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open http://localhost:3000.

## Environment variable

- `NEXT_PUBLIC_API_URL` — base URL of the deployed backend
  (defaults to `https://card-validation-assessment.onrender.com` if unset).

## Deploying to Vercel

1. Push this folder to its own GitHub repo (or a `frontend/` subfolder of your
   existing repo — see note below).
2. Go to vercel.com → New Project → import the repo.
3. Add environment variable `NEXT_PUBLIC_API_URL` = your Render backend URL.
4. Deploy. Vercel auto-detects Next.js, no build config needed.

**If keeping frontend + backend in one repo:** in Vercel's project settings,
set "Root Directory" to the frontend folder (e.g. `frontend`) so Vercel only
builds this app, not the NestJS backend.

## Important: enable CORS on the backend

The backend must allow requests from your Vercel domain, or the browser will
block every request with a CORS error. In the NestJS `main.ts`:

```typescript
app.enableCors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
});
```

Add this before `app.listen(...)`, redeploy the backend on Render, then the
frontend will be able to reach it.




git init
git add README.md
git commit -m "card-validation-frontend"
git branch -M main
git remote add origin https://github.com/Solex247/card-validation-frontend.git
git push -u origin main