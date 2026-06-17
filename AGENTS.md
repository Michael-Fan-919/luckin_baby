# AGENTS.md

## Cursor Cloud specific instructions

### Product
This repo is a single, purely client-side static web app: the Luckin Coffee
"瑞质安风险智能管理塔台" (Quality-Risk Intelligent Management Control Tower)
dashboard. It is built with **Vite** and uses **ECharts** for charts and the
China map. There is **no backend, database, or API** — all data is fetched at
runtime from static JSON in `public/data/` (`dashboard.json`, `china.json`),
with a hardcoded JS fallback in `app.js` if the fetch fails.

### Running the app
The only service is the Vite dev server. Standard commands live in
`package.json` (`npm run dev` / `npm start`, `npm run build`, `npm run preview`).
The dev server binds to `127.0.0.1` (default port `5173`).

### Notes / gotchas
- There are **no lint or test scripts** in this repo. `npm run build` is the
  main programmatic check; the build prints a benign chunk-size warning
  (the ECharts bundle is >500 kB) — this is expected, not an error.
- The three views are client-side routes: `/overview` (China map + KPIs),
  `/trace` (风险追溯, knowledge graph + risk tables), and `/analysis`
  (智能研判, AI analysis panels). Navigate via the header tabs.
- `pdf-parse` and `xlsx` are listed as devDependencies but are not imported by
  the running app; they are for offline data prep only.
- Vite 8 requires a modern Node (Node 20.19+ / 22.12+). The VM's Node 22.x works.
