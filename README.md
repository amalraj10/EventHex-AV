# EventHex Audio

Live session UI with microphone visualization and recording timer.

## Prerequisites

- Node.js 18+ and npm
- A browser with microphone support (Chrome, Edge, Safari)

## Getting started

```sh
git clone <YOUR_REPO_URL>
cd EventHexAudio
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Available scripts

```sh
# Start dev server
npm run dev

# Production build
npm run build

# Preview the production build locally
npm run preview

# Lint source
npm run lint
```

## Using the app

- Click Go live to start the session. Your browser will ask for microphone permission on first use.
- The timer runs only while the microphone is active and the session is recording.
- Click Stop to end recording; the timer will stop and reset.

## Notes on microphone permission

- You must allow microphone access when prompted; otherwise the timer will remain at `00:00:00`.
- On some browsers, mic access requires HTTPS or `localhost`.
- If permission was denied, clear the site permission and try again.

## Tech stack

- Vite, React 18, TypeScript
- React Router
- Tailwind CSS

## Troubleshooting

- Timer stuck at `00:00:00` on first Go live:
  - Ensure you clicked Allow on the mic prompt.
  - Make sure another tab/app isn’t using the microphone exclusively.
  - Try `localhost` over HTTP(S) or serve over HTTPS for some browsers.
