import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/cloudflare';
import { Button } from '~/components/button';
import { Footer } from '~/components/footer';
import { Section } from '~/components/section';
import { baseMeta } from '~/utils/meta';
import { projects } from '~/data/projects';
import { ClinicalAgentCase } from '~/components/clinical-agent-case';
import { EhrPreview } from '~/components/ehr-preview';
import config from '~/config.json';
import styles from '~/styles/project-page.module.css';

export const loader = ({ params }) => {
  const project = projects[params.slug];
  if (!project) throw new Response('Project not found', { status: 404 });
  return json(project);
};

export const meta = ({ data }) =>
  baseMeta({
    title: data ? data.title : 'Project',
    description: data?.summary || 'Project details',
  });

export default function ProjectPage() {
  const project = useLoaderData();
  if (project.customPreview === 'clinical-agent')
    return <ClinicalAgentCase project={project} />;
  return (
    <Section className={styles.project}>
      <div className={styles.content}>
        <div className={styles.back}>
          <a href="/#project-1">← All projects</a>
        </div>
        <header className={styles.header}>
          <span className={styles.attribution}>
            {config.name} / Senior DevOps &amp; AI Engineer
          </span>
          <span className={styles.eyebrow}>
            {project.number} / {project.eyebrow}
          </span>
          <h1>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
          {project.links.length > 0 && (
            <div className={styles.headerActions}>
              {project.links.map(link => (
                <Button key={link.href} href={link.href} iconEnd="arrow-right">
                  {link.label}
                </Button>
              ))}
            </div>
          )}
        </header>
        <figure
          className={`${styles.figure} ${
            project.imagePortrait ? styles.portraitFigure : ''
          }`}
        >
          <div className={styles.figureHeader}>
            <span className={styles.figureDots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>{project.imageKind}</span>
          </div>
          <div className={styles.figureSurface}>
            {project.customPreview === 'fanoni-ehr' ? (
              <EhrPreview />
            ) : (
              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                title="Open full-size product screen"
              >
                <img src={project.image} alt={project.imageAlt} />
              </a>
            )}
          </div>
          <figcaption>
            {project.imageNote}{' '}
            <a href={project.image} target="_blank" rel="noopener noreferrer">
              View full-size image ↗
            </a>
          </figcaption>
        </figure>
        {project.demo && (
          <section className={styles.demo} aria-labelledby="demo-title">
            <span className={styles.eyebrow}>In practice</span>
            <h2 id="demo-title">{project.demo.title}</h2>
            <p>{project.demo.intro}</p>
            <ol className={styles.demoSteps}>
              {project.demo.steps.map(step => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <span>{step.description}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
        <div className={styles.grid}>
          <div>
            <h2>The issue</h2>
            <p>{project.challenge}</p>
            <h2>How it works</h2>
            <p>{project.approach}</p>
          </div>
          <aside>
            <h2>Project context</h2>
            <p>{project.scope}</p>
            <h2>Technology</h2>
            <ul>
              {project.technologies.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Button href={project.repository} secondary iconEnd="arrow-right">
              {project.repositoryPrivate
                ? 'View private GitHub repo'
                : 'View GitHub repo'}
            </Button>
          </aside>
        </div>
        <div className={styles.next}>
          <Button href="/contact" iconEnd="arrow-right">
            Discuss a project
          </Button>
        </div>
      </div>
      <Footer />
    </Section>
  );
}
