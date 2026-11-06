import type { Localized } from '../i18n/utils';

export interface StackGroup {
  label: Localized;
  /** simple-icons slugs (rendered with their logo) or plain names (rendered as text). */
  items: string[];
}

// From the CV skills section.
export const stack: StackGroup[] = [
  { label: { fr: 'Cloud', en: 'Cloud' }, items: ['AWS', 'googlecloud', 'Azure'] },
  { label: { fr: 'Conteneurs & orchestration', en: 'Containers & orchestration' }, items: ['kubernetes', 'docker', 'helm', 'Crossplane'] },
  { label: { fr: 'Infra as code & CI/CD', en: 'Infra as code & CI/CD' }, items: ['terraform', 'ansible', 'gitlab', 'jenkins'] },
  { label: { fr: 'Observabilité & FinOps', en: 'Observability & FinOps' }, items: ['datadog', 'Tsuga', 'grafana', 'Costory', 'Apptio'] },
  { label: { fr: 'Données & streaming', en: 'Data & streaming' }, items: ['apachekafka', 'Debezium', 'postgresql', 'mysql', 'mongodb'] },
  { label: { fr: 'Langages & systèmes', en: 'Languages & systems' }, items: ['linux', 'python', 'go', 'Java'] },
];
