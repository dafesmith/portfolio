# Dafe Smith Ofoh — portfolio

A personal portfolio for DevOps, AI engineering, and healthcare software projects. This first draft keeps the visual direction of [Hamish Williams' open-source portfolio](https://github.com/HamishMW/portfolio), including its motion and device models. The featured projects and personal copy have been replaced with Dafe's work. Original design credit is also included in `public/humans.txt`.

## Featured work

- GraphRAG Decision Trace — public prototype for traceable AI decisions
- Fanoni Scribe — clinical documentation workflow
- Biomedical image collaboration — Fanoni Imaging, based on OHIF v3 and Orthanc
- Fanoni Care Chat — care research pilot with cited papers, trial records, saved studies, and a support-request path
- Fanoni EHR — practitioner-facing clinical workspace
- Fanoni Clinical AI Agent — pre-deployment clinical agent pilot; source temporarily private while exposed credentials are addressed

Project pages distinguish public repositories, private project summaries, synthetic demonstration data, and illustrative artwork. No patient data is used in the portfolio visuals.

## Run locally

Use Node.js 19.9 or newer. Install dependencies and start the Remix development server:

```bash
npm ci
npm run dev
```

The site prints its local URL (currently `http://localhost:7777`). To check the production bundle:

```bash
npm run build
```

## Cloudflare Pages

The site is deployed to the `dafesmith-portfolio` Pages project in the Cloudflare account associated with `dafesmith0@gmail.com`. Its primary address is [dafesmith.com](https://dafesmith.com), with [dafesmith-portfolio.pages.dev](https://dafesmith-portfolio.pages.dev) retained as the Pages address. To publish a new build from this checkout:

```bash
npm run deploy
```

`SESSION_SECRET` is configured as a Pages production secret. Keep it out of source control. The contact page currently offers direct email and a prepared project inquiry email to `dafesmith0@gmail.com`; it does not yet have a server-backed form.

The domain remains registered at GoDaddy. Its nameservers point to Cloudflare DNS, where the apex and `www` records target the Pages project. The unrelated `pay`, `_domainconnect`, and `_dmarc` records were preserved during cutover.

The original project's MIT license remains in `LICENSE`.
