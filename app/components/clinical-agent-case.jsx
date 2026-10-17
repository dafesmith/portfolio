import { useState } from 'react';
import { Footer } from '~/components/footer';
import { Section } from '~/components/section';
import config from '~/config.json';
import styles from './clinical-agent-case.module.css';

const scenarios = [
  {
    id: 'chart',
    label: 'Patient chart',
    moment: 'Before a visit',
    question: 'What medications is Nikolai Chen taking?',
    route: 'patient_chart',
    steps: [
      {
        label: 'Identify',
        detail:
          'Search for the patient and resolve an ambiguous match before reading records.',
        tool: 'search_fhir_patients',
      },
      {
        label: 'Retrieve',
        detail: 'Read MedicationRequest resources for the confirmed patient.',
        tool: 'get_patient_fhir_resource',
      },
      {
        label: 'Return',
        detail: 'Summarize only records the FHIR tool returned, with a source label.',
        tool: 'FHIR chart data',
      },
    ],
    boundary: 'No match means stop. Multiple matches mean ask the clinician to choose.',
  },
  {
    id: 'safety',
    label: 'Medication safety',
    moment: 'During medication review',
    question: 'Check interactions between metformin and lisinopril.',
    route: 'med_safety',
    steps: [
      {
        label: 'Route',
        detail: 'Recognize a two-drug interaction question.',
        tool: 'med_safety',
      },
      {
        label: 'Check',
        detail: 'Ask the curated interaction source for this exact pair.',
        tool: 'drug_interaction_check',
      },
      {
        label: 'Return',
        detail: 'Report the source finding or say that no curated result was returned.',
        tool: 'Source-linked finding',
      },
    ],
    boundary:
      'The agent must not invent an interaction or turn an advisory result into a prescription.',
  },
  {
    id: 'coding',
    label: 'Coding & billing',
    moment: 'After documentation',
    question: 'Which ICD-10 code matches this documented condition?',
    route: 'coding_billing',
    steps: [
      {
        label: 'Route',
        detail: 'Keep a coding question out of the chart and medication tools.',
        tool: 'coding_billing',
      },
      {
        label: 'Look up',
        detail: 'Search the terminology service for a supported code.',
        tool: 'icd10_code_search',
      },
      {
        label: 'Return',
        detail: 'Show the code and descriptor from the tool result for review.',
        tool: 'Terminology result',
      },
    ],
    boundary:
      'Codes are returned from the tool; the agent is instructed not to recall them from memory.',
  },
  {
    id: 'evidence',
    label: 'Clinical evidence',
    moment: 'When evidence is needed',
    question: 'For type 2 diabetes, compare a proposed metformin plan with the indexed rule.',
    route: 'clinical_cds',
    steps: [
      {
        label: 'Route',
        detail: 'Send a guideline request to the clinical evidence skill.',
        tool: 'clinical_cds',
      },
      {
        label: 'Search',
        detail:
          'Compare the condition and proposed plan with the coded guideline rules.',
        tool: 'guideline_check',
      },
      {
        label: 'Return',
        detail: 'Show the matched rule, comparison status, and stored citation for review.',
        tool: 'Rule comparison',
      },
    ],
    boundary:
      'An unmatched condition is reported as unknown. The result remains advisory.',
  },
];

export function ClinicalAgentWorkbench() {
  const [selected, setSelected] = useState(scenarios[0]);

  return (
    <div
      className={styles.workbench}
      aria-label="Interactive illustration of four clinical agent use cases"
    >
      <aside className={styles.workbenchRail}>
        <div className={styles.workbenchBrand}>
          <span className={styles.mark}>✳</span>
          <span>
            FANONI <b>CLINICAL AI</b>
          </span>
        </div>
        <div className={styles.railHint}>SELECT A CLINICIAN QUESTION</div>
        <div className={styles.scenarioList} aria-label="Clinical use cases">
          {scenarios.map((scenario, index) => (
            <button
              key={scenario.id}
              type="button"
              aria-pressed={selected.id === scenario.id}
              onClick={() => setSelected(scenario)}
              className={selected.id === scenario.id ? styles.activeScenario : ''}
            >
              <span>0{index + 1}</span>
              {scenario.label}
              <b>↗</b>
            </button>
          ))}
        </div>
        <div className={styles.railBottom}>
          <span className={styles.liveDot} />
          Four focused skills
          <br />
          One clinical entry point
        </div>
      </aside>
      <div className={styles.workbenchMain}>
        <div className={styles.workbenchTop}>
          <span>
            ILLUSTRATIVE WORKFLOW <b>/ SYNTHETIC PROMPTS</b>
          </span>
          <span>
            ROUTED TO <strong>{selected.route}</strong>
          </span>
        </div>
        <div className={styles.workbenchContent} aria-live="polite">
          <div className={styles.questionHead}>
            <div>
              <span>{selected.moment}</span>
              <h2>
                A question becomes a<br />
                <em>reviewable path.</em>
              </h2>
            </div>
            <div className={styles.sourceTag}>
              TOOL-GROUNDED
              <br />
              CLINICIAN REVIEW
            </div>
          </div>
          <div className={styles.questionBox}>
            <span>CLINICIAN ASKS</span>
            <p>“{selected.question}”</p>
          </div>
          <div className={styles.traceLabel}>
            <span>HOW THE AGENT HANDLES IT</span>
            <span>01 → 02 → 03</span>
          </div>
          <div className={styles.traceCards}>
            {selected.steps.map((step, index) => (
              <div key={step.label} className={styles.traceCard}>
                <span className={styles.traceNumber}>
                  0{index + 1} / {step.label}
                </span>
                <strong>{step.detail}</strong>
                <code>{step.tool}</code>
              </div>
            ))}
          </div>
          <div className={styles.boundary}>
            <span>THE BOUNDARY</span>
            <p>{selected.boundary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const useCases = [
  {
    number: '01',
    title: 'Patient context',
    detail:
      'Find a patient, read chart resources, or answer a cohort question from the FHIR store.',
  },
  {
    number: '02',
    title: 'Medication review',
    detail:
      'Check an interaction, label, boxed warning, or medication list through curated safety tools.',
  },
  {
    number: '03',
    title: 'Coding support',
    detail:
      'Look up ICD-10, CPT, or HCPCS data and review code or payment details returned by tools.',
  },
  {
    number: '04',
    title: 'Clinical evidence',
    detail:
      'Compare plans with coded guideline rules, retrieve PubMed literature, or run deterministic scores for clinician review.',
  },
];

const research = [
  {
    eyebrow: 'PUBLIC DATASET / APACHE 2.0',
    title: 'Medical EHR training data',
    description:
      'Synthetic EHR questions with expected answers, routing strategies, and terminology fields for earlier DSPy and GEPA experiments.',
    href: 'https://huggingface.co/datasets/Fanoni/medical-ehr-training-data',
    action: 'Open dataset',
  },
  {
    eyebrow: 'PUBLIC RESEARCH ARTIFACT / APACHE 2.0',
    title: 'Medical EHR GEPA module',
    description:
      'A published structured-output optimization artifact from earlier research. The current skills pilot uses Gemini on Vertex AI instead.',
    href: 'https://huggingface.co/Fanoni/medical-ehr-gepa',
    action: 'Open model card',
  },
];

const architecture = [
  {
    number: '01',
    title: 'A single clinical entry point',
    detail:
      'The EHR agent surface sends a question through the clinical API to the NeMo service. The configured router selects one specialist skill instead of exposing every tool at once.',
    code: 'router_agent → one of four skills',
    source: 'medical_ehr/configs/medical_ehr_SKILLS_gemini.yml',
  },
  {
    number: '02',
    title: 'Limited tools for each job',
    detail:
      'The patient skill gets FHIR reads and cohort tools; medication safety, coding, and decision support each get their own shorter list. Each skill also has its own answer and failure rules.',
    code: 'skill → curated MCP / native tools',
    source: 'medical_ehr/configs/medical_ehr_SKILLS_gemini.yml',
  },
  {
    number: '03',
    title: 'Data stays behind source boundaries',
    detail:
      'The MCP server reads the selected FHIR backend for chart data. Medication checks inspect drug labels, code searches use terminology tools, and named risk scores run through calculator functions.',
    code: 'MCP → FHIR + specialist sources',
    source: 'clinical-mcp-server/tools/fhir_tools.py',
  },
];

const designDecisions = [
  {
    label: 'IDENTITY BEFORE DATA',
    title: 'A name is a search, not an identity.',
    detail:
      'A chart question first calls patient search. No match stops the flow; several matches are returned for a clinician to resolve before a record is read.',
    source: 'clinical-mcp-server/tools/fhir_tools.py',
  },
  {
    label: 'COUNTS WITH CONTEXT',
    title: 'Population answers define what is counted.',
    detail:
      'FHIR cohort tools count unique patients and support condition intersections and exclusions. The skill asks for numerator and denominator when it reports a percentage.',
    source: 'clinical-mcp-server/tools/fhir_tools.py',
  },
  {
    label: 'MEMORY IS SECONDARY',
    title: 'Remembered context cannot replace a chart.',
    detail:
      'Optional Graphiti memory is keyed by patient ID. The skill instructs the agent to verify current clinical state against FHIR, and a memory outage should not block a chart answer.',
    source: 'medical_ehr/src/nat_medical_ehr/tools/graphiti_memory_tool.py',
  },
  {
    label: 'EVIDENCE HAS A TYPE',
    title: 'A rule comparison is labeled as a rule comparison.',
    detail:
      'The guideline tool matches a condition and proposed plan against coded rules. Literature lookup is a separate PubMed tool. The portfolio does not present either as a continuously updated clinical guideline service.',
    source: 'clinical-mcp-server/tools/tier2_tools.py',
  },
];

export function ClinicalAgentCase({ project }) {
  return (
    <>
      <Section className={styles.page}>
        <div className={styles.content}>
          <div className={styles.back}>
            <a href="/#project-1">← All projects</a>
            <span>{config.name} / Case study 06</span>
          </div>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>CLINICAL AI · AGENT SYSTEMS</span>
              <h1>
                From clinical question to <em>reviewable evidence.</em>
              </h1>
              <p>
                I built Fanoni Clinical AI to make the path behind an answer visible:
                choose a focused skill, retrieve from the right source, and stop when the
                record or evidence cannot support the claim.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryLink} href="#explore">
                  Explore the workflow <span>↗</span>
                </a>
                <span className={styles.textLink}>Source temporarily private</span>
              </div>
            </div>
            <aside className={styles.heroMap} aria-label="Clinical AI architecture at a glance">
              <div className={styles.mapTop}><span>FANONI / CLINICAL AI</span><span>ARCHITECTURE 01</span></div>
              <div className={styles.mapQuestion}><span>INPUT</span><strong>Clinician question</strong></div>
              <div className={styles.mapLine} aria-hidden="true" />
              <div className={styles.mapRouter}><span>NeMo router</span><strong>Select one specialist</strong></div>
              <div className={styles.mapBranches}>
                <span>CHART</span><span>MEDS</span><span>CODING</span><span>EVIDENCE</span>
              </div>
              <div className={styles.mapLine} aria-hidden="true" />
              <div className={styles.mapSources}>
                <span>FHIR CHART</span><span>DRUG LABELS</span><span>TERMINOLOGY</span><span>CALCULATORS</span>
              </div>
              <div className={styles.mapBottom}>
                <b>Source-backed answer or explicit stop</b>
                <span>SOURCE PRIVATE · LOCALLY EVALUATED PILOT</span>
              </div>
            </aside>
          </header>
          <section
            id="explore"
            className={styles.explore}
            aria-labelledby="explore-title"
          >
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>SEE THE DECISION PATH</span>
              <h2 id="explore-title">Four questions. Four focused routes.</h2>
              <p>
                Choose a use case to see the tools and rules behind the response. These
                are synthetic prompts based on the repository configuration; the screen
                does not display patient records or a live agent answer. The guideline
                example uses coded rules in the repository, not a live guideline feed.
              </p>
            </div>
            <ClinicalAgentWorkbench />
            <p className={styles.caption}>
              Interactive portfolio walkthrough based on the skills configuration.
              The source repository is temporarily private during credential rotation.
            </p>
          </section>
          <section className={styles.architecture} aria-labelledby="architecture-title">
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>INSIDE THE SYSTEM</span>
              <h2 id="architecture-title">The answer path is an architecture decision.</h2>
              <p>
                The current skills configuration connects a NeMo router to four tool-calling
                agents. Each branch has a small, explicit tool list and an instruction set
                for what to do when data is missing, ambiguous, or unavailable.
              </p>
            </div>
            <div className={styles.architectureGrid}>
              {architecture.map(item => (
                <article key={item.number}>
                  <span className={styles.architectureNumber}>{item.number} / SYSTEM LAYER</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <code>{item.code}</code>
                  <code className={styles.sourcePath}>{item.source}</code>
                </article>
              ))}
            </div>
            <div className={styles.designGrid}>
              {designDecisions.map(item => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <code className={styles.sourcePath}>{item.source}</code>
                </article>
              ))}
            </div>
          </section>
          <section className={styles.problem} aria-labelledby="problem-title">
            <div>
              <span className={styles.eyebrow}>THE PROBLEM</span>
              <h2 id="problem-title">A confident answer can still be the wrong one.</h2>
            </div>
            <div>
              <p>
                Clinical questions span patient charts, medication references, coding
                sources, and published evidence. A general response is hard to trust when
                it skips patient matching, fills in absent records, or obscures which
                source was consulted.
              </p>
              <p>
                This project gives each question a narrower route and a clear stopping
                rule. It is designed to help a clinician inspect information, not to make
                a diagnosis or treatment decision on their behalf.
              </p>
            </div>
          </section>
          <section className={styles.jobs} aria-labelledby="jobs-title">
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>WHAT IT COVERS</span>
              <h2 id="jobs-title">One entry point, four clinical jobs.</h2>
            </div>
            <div className={styles.jobGrid}>
              {useCases.map(item => (
                <article key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </section>
          <section className={styles.built} aria-labelledby="built-title">
            <div>
              <span className={styles.eyebrow}>HOW I CHECKED IT</span>
              <h2 id="built-title">
                Test the failure path, not just a polished answer.
              </h2>
            </div>
            <div className={styles.builtList}>
              <div>
                <b>01</b>
                <span>
                  <strong>Identity and no-record cases</strong>
                  <p>
                    The clinician suite asks for an ambiguous surname and for patients
                    absent from the test store. It checks that the agent asks for a choice
                    or stops instead of inventing a medication list.
                  </p>
                </span>
              </div>
              <div>
                <b>02</b>
                <span>
                  <strong>Known chart and cohort facts</strong>
                  <p>
                    The same script checks selected medication, encounter, diagnosis,
                    and population answers against a mirrored synthetic FHIR dataset.
                    It also checks that counts describe unique patients.
                  </p>
                </span>
              </div>
              <div>
                <b>03</b>
                <span>
                  <strong>Keep routes separate</strong>
                  <p>
                    Guideline and interaction prompts are checked for relevant source
                    language, while an unsupported reimbursement question should say
                    the data is unavailable. These checks are internal system tests,
                    not clinical outcome evidence.
                  </p>
                </span>
              </div>
              <code className={styles.evalLink}>medical_ehr/evals/doctor_suite.py</code>
            </div>
          </section>
          <section className={styles.research} aria-labelledby="research-title">
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>OPEN RESEARCH</span>
              <h2 id="research-title">The public work behind the experiments.</h2>
              <p>
                These Fanoni Hugging Face assets document earlier medical EHR training and
                structured-output research. The current pilot configuration uses Gemini
                2.5 Flash through Vertex AI.
              </p>
            </div>
            <div className={styles.researchGrid}>
              {research.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <b>{item.action} ↗</b>
                </a>
              ))}
            </div>
            <a
              className={styles.hubLink}
              href="https://huggingface.co/Fanoni"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore all public Fanoni work on Hugging Face <span>↗</span>
            </a>
          </section>
          <section className={styles.outro}>
            <div>
              <span className={styles.eyebrow}>PROJECT CONTEXT</span>
              <h2>Evaluated as a workflow, still under clinical review.</h2>
              <p>
                The repository’s clinician-flow suite checks patient disambiguation,
                missing-record stops, chart answers, cohorts, medication interactions,
                and evidence routing. These are internal system checks. The project
                remains a pre-deployment pilot, and the portfolio walkthrough uses
                synthetic questions rather than a live patient record.
              </p>
            </div>
            <div className={styles.outroLinks}>
              <div className={styles.privateSource}>
                Source repository <span>Temporarily private during credential rotation</span>
              </div>
              <a
                href="https://huggingface.co/Fanoni"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fanoni on Hugging Face <span>Public research ↗</span>
              </a>
              <a href="/contact">
                Discuss this work <span>Contact Dafe ↗</span>
              </a>
            </div>
          </section>
        </div>
      </Section>
      <Footer />
    </>
  );
}
