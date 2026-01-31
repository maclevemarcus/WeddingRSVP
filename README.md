# Wedding Reception RSVP — Carolinegel & Macleve

Online RSVP card for the wedding reception (7 November 2026, 5 PM at Dewan Ken Hwa).

## Hero image

Place your couple photo in:

- **`assets/hero-couple.jpg`**

Use a landscape or square image (e.g. 1200×800 px or 1000×1000 px). If the file is missing, the hero shows the sage green background.

## Run locally

**Use a local server** so the Gray Seagulls load-screen animation can load (opening `index.html` directly with `file://` often blocks loading the JSON):

```bash
npx serve .
```

Then open the URL shown (e.g. http://localhost:3000).

## RSVP submissions

The form currently shows a thank-you message on submit. To save responses:

1. **Formspree** — Create a form at [formspree.io](https://formspree.io), then in `script.js` uncomment the `fetch` and set your form ID.
2. **Google Sheets** — Use a service like [SheetDB](https://sheetdb.io) or a Google Apps Script web app and post the form data there.
3. **Your own backend** — Point the form `action` or the `fetch` URL to your API.

## Venue

- **Dewan Ken Hwa**, Keningau, Sabah, Malaysia  
- The page includes an embedded Google Map and an “Open in Google Maps” link.
