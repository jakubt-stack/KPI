# Lenzip Dashboard

## Deploy to Vercel

1. Push this folder to a GitHub repo, or
2. Run locally:

```bash
npm install
npx vercel
```

When prompted:
- Set up and deploy: Yes
- Which scope: your account
- Link to existing project: No
- Project name: lenzip-dashboard
- Directory: ./
- Override settings: No

Vercel will auto-detect Vite and build to `dist/`.

## Manual build

```bash
npm install
npm run build
```

Output is in `dist/`. Upload that folder if deploying manually.
