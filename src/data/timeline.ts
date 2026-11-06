import type { Localized } from '../i18n/utils';

export interface TimelineEntry {
  start: string;
  end?: string; // omit for a current position
  role: Localized;
  org: string;
  summary: Localized;
}

// From the CV, most recent first.
export const timeline: TimelineEntry[] = [
  {
    start: '2022', end: '2026',
    role: { fr: 'Ingénieur plateforme', en: 'Platform Engineer' },
    org: 'Believe',
    summary: {
      fr: "Infrastructure cloud des applications critiques, Kubernetes et Terraform, CI/CD et GitOps, observabilité et fiabilité en production.",
      en: 'Cloud infrastructure for business-critical apps, Kubernetes and Terraform, CI/CD and GitOps, observability and production reliability.',
    },
  },
  {
    start: '2021', end: '2022',
    role: { fr: 'Tech lead', en: 'Tech Lead' },
    org: 'Crédit Agricole',
    summary: {
      fr: "Architecture microservices et API REST, CI/CD (GitLab CI, XL Release), Docker et Kubernetes, encadrement et mentorat.",
      en: 'Microservices and REST API architecture, CI/CD (GitLab CI, XL Release), Docker and Kubernetes, team leadership and mentoring.',
    },
  },
  {
    start: '2020', end: '2021',
    role: { fr: 'Lead developer', en: 'Lead Developer' },
    org: 'April',
    summary: {
      fr: "Encadrement d'une équipe Scrum et choix des orientations techniques avec les architectes.",
      en: 'Led a Scrum team and set the technical direction with architects and stakeholders.',
    },
  },
  {
    start: '2019', end: '2020',
    role: { fr: 'Tech lead', en: 'Tech Lead' },
    org: 'Enedis',
    summary: {
      fr: "Architectures microservices, API Gateway, pipelines CI/CD avec tests intégrés.",
      en: 'Microservices architectures, API Gateway, CI/CD pipelines with integrated testing.',
    },
  },
  {
    start: '2018', end: '2019',
    role: { fr: 'DevOps', en: 'DevOps Engineer' },
    org: 'Franprix',
    summary: {
      fr: "Clusters OpenShift sur Azure, 3scale API Management, CI/CD Jenkins.",
      en: 'OpenShift clusters on Azure, 3scale API Management, Jenkins CI/CD.',
    },
  },
  {
    start: '2017', end: '2018',
    role: { fr: 'Architecte applicatif', en: 'Application Architect' },
    org: 'Banque Populaire',
    summary: {
      fr: "Migration du legacy vers Kubernetes en microservices (CQRS, event sourcing), Kafka.",
      en: 'Legacy migration to Kubernetes as microservices (CQRS, event sourcing), Kafka.',
    },
  },
  {
    start: '2016', end: '2017',
    role: { fr: 'Ingénieur cloud', en: 'Cloud Engineer' },
    org: 'InsideSales',
    summary: {
      fr: "Traitement et analyse en temps réel des données Salesforce, infrastructure AWS.",
      en: 'Real-time processing and analysis of Salesforce data, AWS infrastructure.',
    },
  },
  {
    start: '2015', end: '2016',
    role: { fr: 'Ingénieur cloud', en: 'Cloud Engineer' },
    org: 'mnubo',
    summary: {
      fr: "API de collecte de données IoT, middleware d'intégration, infrastructure Kubernetes.",
      en: 'IoT data collection API, integration middleware, Kubernetes infrastructure.',
    },
  },
  {
    start: '2014', end: '2015',
    role: { fr: 'Architecte applicatif', en: 'Application Architect' },
    org: 'Banque de France',
    summary: {
      fr: "Expertise et conseil auprès des équipes projets, analyses d'impact, études de performance.",
      en: 'Expertise and advice for project teams, impact analyses, performance studies.',
    },
  },
  {
    start: '2012', end: '2014',
    role: { fr: 'Ingénieur études et développement', en: 'Software Engineer' },
    org: 'Informatique Caisse des Dépôts',
    summary: {
      fr: "Application de gestion des prêts locatifs sociaux, middleware vers les systèmes legacy.",
      en: 'Social housing loan management application, middleware to legacy systems.',
    },
  },
  {
    start: '2011', end: '2012',
    role: { fr: 'Ingénieur études et développement', en: 'Software Engineer' },
    org: 'Société Générale CIB',
    summary: {
      fr: "Solution de gestion des ETF pour les courtiers, intégration aux systèmes de trading, contrôle d'accès.",
      en: 'ETF management solution for brokers, trading system integration, access control.',
    },
  },
  {
    start: '2009', end: '2011',
    role: { fr: 'Ingénieur études et développement', en: 'Software Engineer' },
    org: 'SFR',
    summary: {
      fr: "Espace client en ligne, intégration paiement et notifications, authentification.",
      en: 'Online customer account platform, payment and notification integrations, authentication.',
    },
  },
  {
    start: '2004', end: '2009',
    role: { fr: 'Ingénieur études et développement', en: 'Software Engineer' },
    org: 'Banque Nationale du Canada',
    summary: {
      fr: "Solutions de gestion des clients particuliers et entreprises.",
      en: 'Retail and business client management solutions.',
    },
  },
];
