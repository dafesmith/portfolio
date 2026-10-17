# Dafe Smith Ofoh

**Senior DevOps & AI Engineer · SRE · Cloud Architect**

I build and operate production cloud platforms, then use that foundation to ship practical AI systems. I have more than ten years of experience across retail, aerospace, defense, energy, and online services. My recent work focuses on healthcare software and AI that keeps its sources visible and its decisions reviewable.

[Portfolio](https://dafesmith.com) · [GitHub](https://github.com/dafesmith) · [LinkedIn](https://www.linkedin.com/in/dafe-ofoh-b35592196/) · [Email](mailto:dafesmith0@gmail.com) · [Fanoni on Hugging Face](https://huggingface.co/Fanoni)

## What I do

- **Cloud platforms:** Build and run AWS and Azure infrastructure with Terraform, Kubernetes (EKS and AKS), networking, high availability, and disaster recovery.
- **Reliable delivery:** Develop CI/CD pipelines, observability, SLOs, alerting, and incident response practices for production services.
- **AI engineering:** Build retrieval-augmented generation (RAG) systems, agents, knowledge graphs, and integrations that connect models to useful tools and data.
- **Healthcare software:** Apply platform and AI engineering to clinical documentation, FHIR workflows, biomedical imaging, care research, and source-grounded clinical assistance.

## Selected projects

| Project | What it shows | Explore |
| --- | --- | --- |
| GraphRAG Decision Trace | An AI decision-support prototype that connects answers to graph context and evidence. | [Case study](https://dafesmith.com/projects/graphrag-decision-trace) · [Code](https://github.com/dafesmith/graphrag-decision-trace) |
| Fanoni Scribe | A clinical documentation workflow with transcript-linked draft notes for clinician review. | [Case study](https://dafesmith.com/projects/fanoni-scribe) · [Code](https://github.com/Fanoni-ai/fanoni-scribe) |
| Biomedical image collaboration | DICOM study review with measurements and annotations, built on OHIF and Orthanc. | [Case study](https://dafesmith.com/projects/fanoni-imaging) · [Code](https://github.com/Fanoni-ai/fanoni-imaging) |
| Fanoni Care Chat | Care research with cited papers, public trial records, saved studies, and a support-request path. | [Case study](https://dafesmith.com/projects/fanoni-care-chat) · [Live product](https://care.fanoni.ai/) |
| Fanoni EHR | A practitioner workspace for chart context, care plans, and visit workflows. | [Case study](https://dafesmith.com/projects/fanoni-ehr) · [Live product](https://ehr.fanoni.ai/) |
| Fanoni Clinical AI Agent | Focused chart, medication, coding, and evidence tools with explicit source and safety boundaries. | [Case study](https://dafesmith.com/projects/clinical-medical-agent) |

The clinical agent source is temporarily private while exposed credentials are addressed. Project pages distinguish public repositories, private project summaries, synthetic demonstration data, and illustrative artwork. No patient data is used in the portfolio visuals.

## About this site

This repository powers [dafesmith.com](https://dafesmith.com). It adapts the visual direction of [Hamish Williams' open-source portfolio](https://github.com/HamishMW/portfolio), including its motion and device models. The original design credit is also included in `public/humans.txt`.

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
