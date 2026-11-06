import { pick, type Lang, type Localized } from '../i18n/utils';

/**
 * A simple-icons slug or plain name (e.g. 'kubernetes', 'AWS'), or an object to set the
 * displayed label yourself, optionally translated (e.g. { icon: 'argo', label: 'Argo CD' }).
 */
export type StackItem = string | { icon?: string; label: string | Localized };

export interface StackGroup {
  label: Localized;
  items: StackItem[];
}

export const stack: StackGroup[] = [
  { label: { fr: 'Cloud', en: 'Cloud' }, items: ['AWS', 'googlecloud', 'Azure'] },
  { label: { fr: 'Conteneurs & orchestration', en: 'Containers & orchestration' }, items: ['kubernetes', 'docker', 'helm', 'Kustomize', 'Crossplane'] },
  { label: { fr: 'Infra as code, CI/CD & GitOps', en: 'Infra as code, CI/CD & GitOps' }, items: ['terraform', 'ansible', 'gitlab', 'jenkins', { icon: 'argo', label: 'Argo CD' }, 'flux'] },
  { label: { fr: 'Observabilité & FinOps', en: 'Observability & FinOps' }, items: ['datadog', 'Tsuga', 'grafana', 'prometheus', 'Costory', 'Apptio'] },
  { label: { fr: 'Données & streaming', en: 'Data & streaming' }, items: ['apachekafka', 'Debezium', 'postgresql', 'mysql', 'mongodb'] },
  { label: { fr: 'Langages & frameworks', en: 'Languages & frameworks' }, items: ['Java', 'springboot', 'python', 'go', 'linux'] },
  { label: { fr: 'Sécurité & identité', en: 'Security & identity' }, items: ['OAuth2', { icon: 'openid', label: 'OIDC' }, { icon: 'jsonwebtokens', label: 'JWT' }, { icon: 'vault', label: 'HashiCorp Vault' }] },
  {
    label: { fr: 'Méthodes & IA', en: 'Methods & AI' },
    items: [{ label: { fr: 'Scrum Master certifié', en: 'Certified Scrum Master' } }, 'claudecode'],
  },
];

/** The icon slug to look up and the label override (if any) for an item. */
export function resolveItem(item: StackItem, lang: Lang): { name: string; label?: string } {
  if (typeof item === 'string') return { name: item };
  return { name: item.icon ?? '', label: typeof item.label === 'string' ? item.label : pick(lang, item.label) };
}
