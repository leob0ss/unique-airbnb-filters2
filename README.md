# Airbnb Filters

**Live at [airbnbfilters.vercel.app](https://airbnbfilters.vercel.app)**

Find unique Airbnb stays that the platform no longer surfaces by default.

---

## Background

Airbnb used to let you browse by unique property categories — treehouses, caves, yurts, domes, houseboats, and 50+ others. In 2025, they quietly removed these filters from both the app and the mobile web experience. They still exist in Airbnb's search backend, but there's no official UI to reach them anymore.

This tool brings them back.

## How it works

Airbnb's desktop web app reads search parameters directly from the URL and passes them to its search API. One of those parameters — `raw_text_query` — accepts a freeform keyword that Airbnb's search engine uses to filter results by property type.

When you pick a category and location and click **Search on Airbnb**, the tool constructs a URL like this:

```
https://www.airbnb.com/s/Vermont/homes?raw_text_query=treehouse&search_mode=regular_search&channel=EXPLORE&...
```

Airbnb's frontend picks up `raw_text_query=treehouse`, sends it to their API, and returns only treehouse listings — exactly as if the category filter still existed.

## Why it only works on desktop

Airbnb serves a different experience depending on the device:

- **Desktop web** — honors `raw_text_query` and surfaces the category filter in the UI
- **Mobile web** — the "What" search bar doesn't exist; `raw_text_query` is ignored
- **Mobile app** — Universal Links open the app, which strips unrecognized URL parameters

A warning banner is shown to mobile users explaining this limitation.

## Running locally

```bash
npm install
npm run dev
```

Requires Node.js. Built with React + Vite.

## Stack

- [React](https://react.dev)
- [Vite](https://vite.dev)
- Deployed on [Vercel](https://vercel.com)

---

*Not affiliated with Airbnb.*
