import type { Localized } from '../i18n/utils';

export interface Project {
  title: Localized;
  /** One-line context shown under the title, e.g. company and years. */
  context: Localized;
  problem: Localized;
  work: Localized;
  result: Localized;
  /** simple-icons slugs or plain names (see src/lib/icons.ts). */
  stack: string[];
  url?: string;
}

// Built from the CV; each stack lists only what that CV entry mentions.
// Outcomes are qualitative; add numbers (lead time, incidents, cost...) where you have them.
export const projects: Project[] = [
  {
    title: { fr: 'Plateforme cloud et livraison continue', en: 'Cloud platform and continuous delivery' },
    context: { fr: 'Believe · Ingénieur plateforme · 2022 – 2026', en: 'Believe · Platform Engineer · 2022 – 2026' },
    problem: {
      fr: "Des applications critiques à héberger, à livrer vite et à faire tourner de façon fiable en production.",
      en: 'Business-critical applications that must be hosted, shipped quickly and run reliably in production.',
    },
    work: {
      fr: "Conception et évolution de l'infrastructure cloud (Kubernetes, Terraform). Pipelines CI/CD complets : build, tests, analyse de sécurité, quality gate et déploiement. Pratiques GitOps avec les équipes de développement.",
      en: 'Designed and evolved the cloud infrastructure (Kubernetes, Terraform). End-to-end CI/CD pipelines: build, test, security scanning, quality gate and deployment. GitOps practices alongside the development teams.',
    },
    result: {
      fr: "Une livraison continue automatisée, une meilleure observabilité et un diagnostic plus rapide des incidents en production.",
      en: 'Automated continuous delivery, better observability and faster diagnosis of production incidents.',
    },
    stack: ['kubernetes', 'terraform', 'GitOps', 'CI/CD'],
  },
  {
    title: { fr: 'Architecture microservices et industrialisation', en: 'Microservices architecture and delivery' },
    context: { fr: 'Crédit Agricole · Tech lead · 2021 – 2022', en: 'Crédit Agricole · Tech Lead · 2021 – 2022' },
    problem: {
      fr: "Concevoir une architecture logicielle scalable et performante, et standardiser la façon de la construire et de la déployer.",
      en: 'Design a scalable, high-performance software architecture and standardise how it is built and deployed.',
    },
    work: {
      fr: "Architecture microservices et API REST, choix des technologies, revues de code. Builds et déploiements automatisés (GitLab CI, XL Release), environnements standardisés sur Docker et Kubernetes, tests automatisés.",
      en: 'Microservices and REST API architecture, technology choices, code reviews. Automated builds and deployments (GitLab CI, XL Release), standardised Docker and Kubernetes environments, automated testing.',
    },
    result: {
      fr: "Des environnements homogènes, des déploiements automatisés et une équipe encadrée, documentée et montée en compétence.",
      en: 'Consistent environments, automated deployments, and a team that was mentored, documented and upskilled.',
    },
    stack: ['gitlab', 'XL Release', 'docker', 'kubernetes'],
  },
  {
    title: { fr: 'API Gateway et microservices', en: 'API Gateway and microservices' },
    context: { fr: 'Enedis · Tech lead · 2019 – 2020', en: 'Enedis · Tech Lead · 2019 – 2020' },
    problem: {
      fr: "Rendre les applications plus résilientes et performantes, avec un point d'entrée unique pour le routage et la sécurité.",
      en: 'Make applications more resilient and performant, with a single entry point for routing and security.',
    },
    work: {
      fr: "Définition et implémentation d'architectures microservices modulaires. Mise en place d'une API Gateway (routage, authentification, flux de données) et de pipelines CI/CD avec tests intégrés.",
      en: 'Defined and implemented modular microservices architectures. Set up an API Gateway (routing, authentication, data flows) and CI/CD pipelines with integrated testing.',
    },
    result: {
      fr: "Des applications plus résilientes et des déploiements continus rapides et fiables.",
      en: 'More resilient applications and fast, reliable continuous deployment.',
    },
    stack: ['Microservices', 'API Gateway', 'CI/CD'],
  },
  {
    title: { fr: 'OpenShift sur Azure', en: 'OpenShift on Azure' },
    context: { fr: 'Franprix · DevOps · 2018 – 2019', en: 'Franprix · DevOps Engineer · 2018 – 2019' },
    problem: {
      fr: "Héberger et exposer les applications sur une plateforme de conteneurs managée, avec un contrôle du trafic et de la sécurité des API.",
      en: 'Host and expose applications on a managed container platform, with control over API traffic and security.',
    },
    work: {
      fr: "Installation, configuration et exploitation des clusters OpenShift sur Azure. Déploiement de 3scale API Management. Pipelines CI/CD avec Jenkins.",
      en: 'Installed, configured and operated OpenShift clusters on Azure. Deployed 3scale API Management. CI/CD pipelines with Jenkins.',
    },
    result: {
      fr: "Une plateforme de conteneurs en production, des API maîtrisées et des déploiements continus.",
      en: 'A production container platform, governed APIs and continuous deployment.',
    },
    stack: ['OpenShift', 'Azure', '3scale', 'jenkins'],
  },
  {
    title: { fr: 'Migration du legacy vers Kubernetes', en: 'Legacy migration to Kubernetes' },
    context: { fr: 'Banque Populaire · Architecte applicatif · 2017 – 2018', en: 'Banque Populaire · Application Architect · 2017 – 2018' },
    problem: {
      fr: "Des applications legacy monolithiques, difficiles à faire évoluer et à exploiter.",
      en: 'Monolithic legacy applications that were hard to evolve and operate.',
    },
    work: {
      fr: "Refonte en microservices (CQRS, event sourcing) et migration sur Kubernetes. Déploiement et configuration de Kafka pour les flux de données entre services.",
      en: 'Re-architected them as microservices (CQRS, event sourcing) and migrated them to Kubernetes. Deployed and configured Kafka for data streaming between services.',
    },
    result: {
      fr: "Des services découplés qui communiquent de façon résiliente via Kafka.",
      en: 'Decoupled services communicating resiliently through Kafka.',
    },
    stack: ['kubernetes', 'apachekafka', 'CQRS', 'Event sourcing'],
  },
  {
    title: { fr: 'Plateforme IoT sur Kubernetes', en: 'IoT platform on Kubernetes' },
    context: { fr: 'mnubo · Ingénieur cloud · 2015 – 2016', en: 'mnubo · Cloud Engineer · 2015 – 2016' },
    problem: {
      fr: "Collecter et traiter les données d'objets connectés, puis les rendre exploitables par d'autres systèmes.",
      en: 'Collect and process data from connected devices, then make it usable by other systems.',
    },
    work: {
      fr: "Création d'une API de collecte et de traitement des données IoT, d'un middleware d'intégration, et de l'infrastructure Kubernetes pour l'héberger.",
      en: 'Built an API to collect and process IoT data, an integration middleware, and the Kubernetes infrastructure to run them.',
    },
    result: {
      fr: "Des flux de données IoT gérés efficacement sur une infrastructure scalable, dès les débuts de Kubernetes.",
      en: 'IoT data flows handled efficiently on scalable infrastructure, from the early days of Kubernetes.',
    },
    stack: ['kubernetes', 'IoT', 'API'],
  },
];
