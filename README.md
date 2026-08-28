# 4Seasons

**A landing page for a home internet provider in Kyiv** — plans, network coverage, and support, presented as a single scrollable page.

[Live Demo](https://4seasons-one.vercel.app) · [Source](https://github.com/eerinessofsilence/4seasons)

![4seasons landing page](docs/images/overview.jpg)

> **Status:** static marketing site. There is no backend, account system, or payment processing — content is hardcoded in the frontend.

## What it delivers

- A hero section, technology/network overview, and a comparison of benefits.
- Apartment and building tariff plans with pricing and feature breakdowns.
- An interactive coverage map (Leaflet) showing serviced streets in Kyiv.
- An FAQ/support section with contact details.
- Light/dark theme toggle persisted to `localStorage`.
- Ukrainian-language copy throughout (`lang="uk"`).

## Stack

React 19 + TypeScript, Vite 7, Tailwind CSS 4, React Router, Lucide icons, and `ogl` for the WebGL hero background.

## Quick start

```bash
git clone https://github.com/eerinessofsilence/4seasons.git
cd 4seasons/frontend
npm install
npm run dev
```

Open the Vite URL printed in the terminal, normally `http://127.0.0.1:5173`.

## Checks

```bash
cd frontend
npm run lint
npm run build
```

## Notes

- Everything lives under [`frontend/`](frontend) — the repo has no backend or database.
- Nav links, contact details, plan pricing, and coverage streets are hardcoded in the `frontend/components` tree rather than fetched from an API.

## License

The repository is public for portfolio and evaluation purposes. No open-source license is currently included.
