# Focus — soccer training app (v0)

The core loop: pick a focus area, pick your minutes, get one assigned drill. Same logic as the concierge test, now in an app instead of a text thread.

## What's real vs. placeholder right now
- The 6 focus areas and 18 drills are the same ones from the concierge test's drill library — real content, not filler.
- The streak counter works and persists on your phone (via `localStorage`), but only on the device you open it on — no accounts yet, so it won't sync between your phone and Harsha's or Kyle's.
- `manifest.json`'s icon list is empty — the app will install to a home screen but with a generic icon until we add real app icons (192px and 512px PNGs). Worth doing before you hand this to teammates; a blank icon looks unfinished.
- App name is placeholder ("Focus"). Rename when you've settled on one — it's a five-minute change in `manifest.json` and the `<title>` tag in `index.html`.

## How to look at it right now
Open `index.html` directly in a browser on this computer — double-click it, or drag it into a browser tab. Full functionality works locally, no server needed for a first look.

## How to actually test it on your phone (the real test)
`localStorage` and "add to home screen" require the app to be served over a real URL, not opened as a local file. Fastest free options, in order of least setup:
1. **GitHub Pages** — if you already have or make a free GitHub account, push this folder to a repo and turn on Pages in settings. Free permanent URL.
2. **Netlify Drop** (netlify.com/drop) — drag this folder into the browser, get a live URL in seconds, no account required for a quick test link (though it'll expire without one).
3. **Vercel** — similar to Netlify, slightly more setup, better if you want it to stick around long-term.

Once it's live at a URL, open that URL on your phone in Safari (iPhone) or Chrome (Android), then use "Add to Home Screen" — it'll install like an app, full-screen, no browser bar.

Tell me which of these you want to use and I'll walk you through the exact steps, or set it up with you directly.

## The path to a true native app later
Once the concierge test + this app validate that removing the daily decision actually improves adherence, the same code here gets wrapped with a tool called **Capacitor** into real iOS/Android app binaries — not rebuilt from scratch. That's the point of building it this way now: nothing here is throwaway work.
