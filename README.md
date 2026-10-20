# LUMI — Wellness Dashboard Prototype

LUMI is a React + TypeScript wellness dashboard prototype. It brings daily wellness tools into one interface, including a dashboard, AI chat, voice commands, medicine reminders, period tracking, activity charts, music, profile, and a premium information page.

> **Project status:** Frontend prototype. Most reminder and tracking state is held in component memory and is not persisted to a backend. The dashboard therefore labels summary metrics as untracked rather than presenting sample numbers as real user data.

## Features

- React + TypeScript single-page interface built with Vite.
- Wellness dashboard with an activity chart and date calendar.
- Gemini-powered chat component with conversation history.
- Voice-command navigation for supported dashboard sections.
- Medicine reminder and period-tracking UI.
- Music, profile, and premium information screens.
- Loading, empty-configuration, and request-error states in AI chat.

## Tech stack

- React 18, TypeScript, Vite
- Tailwind CSS
- Google Generative AI SDK
- Framer Motion and React Hot Toast
- React Calendar and Recharts

## Repository layout

The Vite application currently lives in `LUMI-main/LUMI-main/` inside this repository.

```text
LUMI/
├── README.md
└── LUMI-main/
    └── LUMI-main/
        ├── package.json
        ├── vite.config.ts
        └── src/
            ├── App.tsx
            └── components/
```

## Run locally

Requirements: Node.js 18+ and npm.

From the repository root:

```bash
cd LUMI-main/LUMI-main
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Set `VITE_GEMINI_API_KEY` in `.env.local`, then start the dev server:

```bash
npm run dev
```

Build and lint checks:

```bash
npm run build
npm run lint
```

## Gemini key note

The current Gemini SDK call is made from the browser. Vite variables prefixed with `VITE_` are bundled into client-side code and **are not secret**. For a public deployment, use a small server-side API proxy and keep the provider key on the server. If using this prototype locally, never commit your real key, restrict it in Google AI Studio/Google Cloud where supported, and rotate it if it is exposed.

## Current limitations

- Reminder, profile, and tracking data are not persisted to an account or database.
- Dashboard summary values are not calculated from a central user-data store.
- The Settings screen is a placeholder.
- The frontend needs a server-side proxy before using a Gemini key in a public production deployment.
- This is a wellness UI prototype, not medical advice or a diagnostic tool.

## Next steps

1. Add a backend for user accounts and persistence.
2. Proxy Gemini calls through the backend with rate limits and server-side secret storage.
3. Add tests for chat history, reminder validation, and tracking calculations.
4. Add accessible empty/loading states and responsive layout checks.

## Author

Nikhil Kushwaha · [GitHub](https://github.com/nikhil-247) · [LinkedIn](https://www.linkedin.com/in/nikhil-kushwaha-265880273)
