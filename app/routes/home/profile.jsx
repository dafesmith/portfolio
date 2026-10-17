import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="About me" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I’m Dafe Ofoh, a Senior DevOps &amp; AI Engineer with more than ten years
      of experience building and operating production cloud platforms. I work across
      AWS and Azure, AKS and EKS, Terraform, delivery pipelines, and observability.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      My recent work connects that platform experience with practical AI and healthcare
      software: clinical documentation, FHIR workflows, biomedical imaging, and
      traceable retrieval. My AI work also includes RAG systems and agents using
      Azure OpenAI and Azure AI Search.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Explore the projects above, or get in touch to discuss the work.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;
  return (
    <Section className={styles.profile} onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)} as="section" id={id} ref={sectionRef}
      aria-labelledby={titleId} tabIndex={-1}>
      <Transition in={visible || focused} timeout={0}>
        {({ visible: shown, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <ProfileText visible={shown} titleId={titleId} />
              <Button secondary className={styles.button} data-visible={shown}
                href="/contact" icon="send">Get in touch</Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider notchWidth="64px" notchHeight="8px" collapsed={!shown} collapseDelay={1000} />
                <div className={styles.tagText} data-visible={shown}>Focus areas</div>
              </div>
              <div className={styles.expertise} data-visible={shown}>
                <span className={styles.expertiseLabel}>BUILD / OPERATE / IMPROVE</span>
                <strong>Cloud platforms</strong>
                <strong>AI systems</strong>
                <strong>Healthcare software</strong>
                <span className={styles.expertiseFoot}>AWS · Azure · Kubernetes · Terraform · FHIR</span>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
