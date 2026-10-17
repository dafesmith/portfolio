import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { baseMeta } from '~/utils/meta';
import config from '~/config.json';
import styles from './contact.module.css';

const projectInquiryHref = `mailto:${config.email}?subject=${encodeURIComponent(
  'Project inquiry for Dafe Smith Ofoh'
)}&body=${encodeURIComponent(
  'Hi Dafe,\n\nI’m building:\n\nThe help I’m looking for:\n\nMy timeline:\n\nBest way to reach me:\n'
)}`;

export const meta = () =>
  baseMeta({
    title: 'Contact',
    description:
      'Discuss a DevOps, cloud, AI, or healthcare software project with Dafe Smith Ofoh.',
  });

export const Contact = () => (
  <Section className={styles.contact}>
    <div className={styles.contactContent}>
      <span className={styles.eyebrow}>{config.name.toUpperCase()} / CONTACT</span>
      <Heading level={3} as="h1" className={styles.contactTitle}>
        <DecoderText text="Let’s talk" delay={300} />
      </Heading>
      <Divider className={styles.contactDivider} />
      <Text size="l" as="p" className={styles.contactLead}>
        Have a cloud, AI, or healthcare software project in mind? Tell me what you’re
        building, where you need help, and your timeline. I’m open to discussing new work.
      </Text>
      <a className={styles.email} href={`mailto:${config.email}`}>
        {config.email}
      </a>
      <div className={styles.actions}>
        <Button href={projectInquiryHref} icon="send">
          Start a project conversation
        </Button>
        <Button secondary href={`mailto:${config.email}`} iconEnd="arrow-right">
          General email
        </Button>
        <Button secondary href={config.linkedin} iconEnd="arrow-right">
          LinkedIn
        </Button>
        <Button
          secondary
          href={`https://github.com/${config.github}`}
          iconEnd="arrow-right"
        >
          GitHub
        </Button>
      </div>
    </div>
    <Footer className={styles.footer} />
  </Section>
);
