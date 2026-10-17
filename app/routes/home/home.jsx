import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import { projects } from '~/data/projects';
import styles from './home.module.css';

export const links = () => [
  { rel: 'prefetch', href: '/draco/draco_wasm_wrapper.js', as: 'script', type: 'text/javascript' },
  { rel: 'prefetch', href: '/draco/draco_decoder.wasm', as: 'fetch', type: 'application/wasm' },
];

export const meta = () => baseMeta({
  title: 'Senior DevOps & AI Engineer',
  description: `${config.name} builds reliable cloud platforms and practical AI systems, with work across healthcare, imaging, and decision support.`,
});

const screen = (path, width) => ({
  srcSet: `${path} ${width}w`,
  placeholder: path,
});

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const projectSix = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, projectFour, projectFive, projectSix, details];
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          setVisibleSections(previous => [...previous, entry.target]);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    const indicatorObserver = new IntersectionObserver(([entry]) => {
      setScrollIndicatorHidden(!entry.isIntersecting);
    }, { rootMargin: '-100% 0px 0px 0px' });

    sections.forEach(section => sectionObserver.observe(section.current));
    indicatorObserver.observe(intro.current);
    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.home}>
      <Intro id="intro" sectionRef={intro} scrollIndicatorHidden={scrollIndicatorHidden} />
      <ProjectSummary
        id="project-1" sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)} index={1}
        title="Make AI decisions inspectable"
        description="GraphRAG Decision Trace connects an answer to graph context, policy evidence, and a reviewable reasoning path."
        buttonText="Explore project" buttonLink="/projects/graphrag-decision-trace"
        repositoryLink={projects['graphrag-decision-trace'].repository}
        repositoryPrivate={projects['graphrag-decision-trace'].repositoryPrivate}
        model={{ type: 'laptop', alt: projects['graphrag-decision-trace'].imageAlt, textures: [screen(projects['graphrag-decision-trace'].image, 2972)] }}
      />
      <ProjectSummary
        id="project-2" alternate sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)} index={2}
        title="A note you can trace back"
        description="Fanoni Scribe keeps a draft SOAP note connected to the conversation so a clinician can review it before signing."
        buttonText="Explore project" buttonLink="/projects/fanoni-scribe"
        repositoryLink={projects['fanoni-scribe'].repository}
        repositoryPrivate={projects['fanoni-scribe'].repositoryPrivate}
        model={{ type: 'laptop', alt: projects['fanoni-scribe'].imageAlt, textures: [screen(projects['fanoni-scribe'].image, 1440)] }}
      />
      <ProjectSummary
        id="project-3" sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)} index={3}
        title="Biomedical image collaboration"
        description="Fanoni Imaging keeps DICOM review, measurements, and annotations connected to the same study."
        buttonText="Explore project" buttonLink="/projects/fanoni-imaging"
        repositoryLink={projects['fanoni-imaging'].repository}
        repositoryPrivate={projects['fanoni-imaging'].repositoryPrivate}
        model={{ type: 'laptop', alt: projects['fanoni-imaging'].imageAlt, textures: [screen(projects['fanoni-imaging'].image, 2800)] }}
      />
      <ProjectSummary
        id="project-4" alternate sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)} index={4}
        title="Fanoni Care Chat"
        description="Explore care questions through cited research and clinical trials, save studies that matter, and find a path to human support."
        buttonText="Explore project" buttonLink="/projects/fanoni-care-chat"
        liveLink={projects['fanoni-care-chat'].links[0]}
        repositoryLink={projects['fanoni-care-chat'].repository}
        repositoryPrivate={projects['fanoni-care-chat'].repositoryPrivate}
        model={{ type: 'laptop', alt: 'Fanoni Care Chat live pilot screenshot showing a clinical trial research question and a public study record', textures: [{ ...screen('/projects/fanoni-care-chat-live.png', 1334), crop: { top: 0.1, height: 0.455 } }] }}
      />
      <ProjectSummary
        id="project-5" sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)} index={5}
        title="From chart context to care action"
        description="Fanoni EHR connects results, medications, care plans, and visit work in one practitioner workspace."
        buttonText="Explore project" buttonLink="/projects/fanoni-ehr"
        liveLink={projects['fanoni-ehr'].links[0]}
        repositoryLink={projects['fanoni-ehr'].repository}
        repositoryPrivate={projects['fanoni-ehr'].repositoryPrivate}
        model={{ type: 'laptop', alt: projects['fanoni-ehr'].imageAlt, textures: [screen(projects['fanoni-ehr'].image, 1126)] }}
      />
      <ProjectSummary
        id="project-6" alternate sectionRef={projectSix}
        visible={visibleSections.includes(projectSix.current)} index={6}
        title="Clinical AI that shows its work"
        description="Fanoni Clinical AI routes chart, medication, coding, and evidence questions to focused tools with clear source and safety boundaries."
        buttonText="Explore project" buttonLink="/projects/clinical-medical-agent"
        model={{ type: 'laptop', alt: projects['clinical-medical-agent'].imageAlt, textures: [screen(projects['clinical-medical-agent'].image, 1240)] }}
      />
      <Profile sectionRef={details} visible={visibleSections.includes(details.current)} id="details" />
      <Footer />
    </div>
  );
};
