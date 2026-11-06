import type { Localized } from '../i18n/utils';
import type { StackItem } from './stack';

/**
 * Featured missions with animated architecture diagrams.
 *
 * CONFIDENTIALITY: this content is public. Use component types and roles only. Never add project/org IDs, domains,
 * IPs/CIDRs, emails, bucket/cluster/DB/secret names, repo URLs, regions, or company/team/product/vendor names.
 */

export type DiagramIcon =
  | 'code' | 'check' | 'pipe' | 'eye' | 'play' | 'org' | 'box' | 'net'
  | 'container' | 'registry' | 'git' | 'sync' | 'cluster' | 'puzzle'
  | 'db' | 'msg' | 'bucket' | 'user' | 'shield' | 'lb' | 'proxy' | 'key'
  | 'gauge' | 'pause' | 'clock' | 'bell' | 'cloud' | 'router' | 'link' | 'building';

export interface DiagramNode {
  id: string;
  icon: DiagramIcon;
  title: Localized;
  /** One short line, max 24 characters (checked at build time). */
  sub: Localized;
}

export interface DiagramColumn {
  /** Small uppercase label above the zone. */
  zone: Localized;
  /** Dashed accent border: private or isolated zone. */
  dashed?: boolean;
  nodes: DiagramNode[];
}

export interface Diagram {
  /** Short description used for the SVG's accessible name. */
  label: Localized;
  columns: DiagramColumn[];
  /** [fromId, toId]: same column = vertical arrow, next columns = elbow arrow (left to right only). */
  edges: [string, string][];
  caption: Localized;
}

export interface Mission {
  tag: Localized;
  /** Small line next to the tag: domain (anonymised) and main technology. */
  sector: Localized;
  title: Localized;
  text: Localized;
  chips: StackItem[];
  diagram: Diagram;
}

const same = (s: string): Localized => ({ fr: s, en: s });

export interface MissionGroup {
  label: Localized;
  intro: Localized;
  missions: Mission[];
}

const gcp: Localized = { fr: 'Distribution numérique · Google Cloud', en: 'Digital distribution · Google Cloud' };
const deliveryJava: Localized = { fr: 'Distribution numérique · Java', en: 'Digital distribution · Java' };
const videoJava: Localized = { fr: 'Gestion vidéo et droits · Java', en: 'Video & rights management · Java' };
const videoAws: Localized = { fr: 'Gestion vidéo et droits · AWS', en: 'Video & rights management · AWS' };

const platformMissions: Mission[] = [
  {
    tag: same('IaC'),
    sector: gcp,
    title: {
      fr: "Infrastructure as code, en mode GitOps",
      en: 'Infrastructure as code, GitOps style',
    },
    text: {
      fr: "Un monorepo Terraform/Terragrunt : des stacks réutilisables d'un côté, des unités fines par environnement de l'autre. La CI se génère pour les seules unités modifiées, le plan tourne en lecture seule avec une identité sans clé, et l'apply reste manuel, après revue.",
      en: 'A Terraform/Terragrunt monorepo: reusable stacks on one side, thin per-environment units on the other. CI is generated for the changed units only, the plan runs read-only with keyless identity, and apply stays manual, after review.',
    },
    chips: ['terraform', 'Terragrunt', { icon: 'gitlab', label: 'GitLab CI' }, { icon: 'openid', label: 'OIDC' }, 'Workload Identity'],
    diagram: {
      label: {
        fr: "Chaîne de livraison de l'infrastructure, de la merge request jusqu'aux projets Google Cloud",
        en: 'Infrastructure delivery chain, from merge request to Google Cloud projects',
      },
      columns: [
        {
          zone: same('MERGE REQUEST'),
          nodes: [
            { id: 'code', icon: 'code', title: same('Code'), sub: { fr: 'unités Terragrunt', en: 'Terragrunt units' } },
            { id: 'checks', icon: 'check', title: { fr: 'Contrôles', en: 'Checks' }, sub: same('lint · secrets · SAST') },
          ],
        },
        {
          zone: { fr: 'CI · PIPELINE GÉNÉRÉ', en: 'CI · GENERATED PIPELINE' },
          nodes: [
            { id: 'plan', icon: 'pipe', title: same('Plan'), sub: { fr: 'lecture seule · OIDC', en: 'read-only · OIDC' } },
            { id: 'review', icon: 'eye', title: { fr: 'Revue', en: 'Review' }, sub: { fr: 'plan publié dans la MR', en: 'plan posted to the MR' } },
            { id: 'apply', icon: 'play', title: same('Apply'), sub: { fr: 'manuel, après merge', en: 'manual, after merge' } },
          ],
        },
        {
          zone: same('GOOGLE CLOUD'),
          nodes: [
            { id: 'org', icon: 'org', title: { fr: 'Organisation', en: 'Organization' }, sub: { fr: 'dossiers prod/hors-prod', en: 'prod / non-prod folders' } },
            { id: 'projects', icon: 'box', title: { fr: 'Projets', en: 'Projects' }, sub: same('project factory') },
            { id: 'vpc', icon: 'net', title: same('Shared VPC'), sub: { fr: 'hôte + projets par env', en: 'host + per-env projects' } },
          ],
        },
      ],
      edges: [
        ['code', 'checks'],
        ['checks', 'plan'],
        ['plan', 'review'],
        ['review', 'apply'],
        ['apply', 'org'],
        ['org', 'projects'],
        ['projects', 'vpc'],
      ],
      caption: {
        fr: 'Chaque changement suit plan → revue → apply ; la CI ne détient aucune clé statique.',
        en: 'Every change goes plan → review → apply; CI never holds a static key.',
      },
    },
  },
  {
    tag: same('GitOps'),
    sector: gcp,
    title: {
      fr: 'Plateforme Kubernetes multi-environnements',
      en: 'Multi-environment Kubernetes platform',
    },
    text: {
      fr: "Des clusters GKE privés et régionaux par environnement, déployés depuis un hub Argo CD. Crossplane permet aux équipes de provisionner elles-mêmes leurs ressources cloud, dans les limites fixées par Workload Identity.",
      en: 'Private, regional GKE clusters per environment, deployed from an Argo CD hub. Crossplane lets teams provision their own cloud resources, within the bounds set by Workload Identity.',
    },
    chips: [{ icon: 'kubernetes', label: 'GKE' }, { icon: 'argo', label: 'Argo CD' }, 'helm', 'Crossplane', 'Artifact Registry', 'KEDA'],
    diagram: {
      label: {
        fr: "Livraison applicative : build, registre, dépôt GitOps, hub Argo CD, clusters GKE privés et services gérés",
        en: 'Application delivery: build, registry, GitOps repo, Argo CD hub, private GKE clusters and managed services',
      },
      columns: [
        {
          zone: same('CI/CD'),
          nodes: [
            { id: 'build', icon: 'container', title: same('Build'), sub: { fr: 'image conteneur', en: 'container image' } },
            { id: 'registry', icon: 'registry', title: same('Artifact Registry'), sub: { fr: 'images versionnées', en: 'versioned images' } },
            { id: 'gitops', icon: 'git', title: { fr: 'Dépôt GitOps', en: 'GitOps repo' }, sub: { fr: 'values Helm', en: 'Helm values' } },
          ],
        },
        {
          zone: { fr: 'CLUSTER PARTAGÉ', en: 'SHARED CLUSTER' },
          nodes: [{ id: 'argo', icon: 'sync', title: same('Argo CD'), sub: { fr: 'hub de déploiement', en: 'deployment hub' } }],
        },
        {
          zone: { fr: 'GKE PRIVÉ · PAR ENV', en: 'PRIVATE GKE · PER ENV' },
          dashed: true,
          nodes: [
            { id: 'apps', icon: 'cluster', title: { fr: 'Applications', en: 'Workloads' }, sub: same('Workload Identity') },
            { id: 'xp', icon: 'puzzle', title: same('Crossplane'), sub: { fr: 'libre-service cloud', en: 'cloud self-service' } },
          ],
        },
        {
          zone: { fr: 'SERVICES GÉRÉS', en: 'MANAGED SERVICES' },
          nodes: [
            { id: 'sql', icon: 'db', title: same('Cloud SQL'), sub: same('MySQL · PostgreSQL') },
            { id: 'pubsub', icon: 'msg', title: same('Pub/Sub'), sub: { fr: 'événements', en: 'events' } },
            { id: 'gcs', icon: 'bucket', title: same('Cloud Storage'), sub: { fr: 'objets', en: 'objects' } },
          ],
        },
      ],
      edges: [
        ['build', 'registry'],
        ['registry', 'gitops'],
        ['gitops', 'argo'],
        ['argo', 'apps'],
        ['argo', 'xp'],
        ['xp', 'sql'],
        ['xp', 'pubsub'],
        ['xp', 'gcs'],
      ],
      caption: {
        fr: 'Un seul hub Argo CD déploie partout ; les applications demandent elles-mêmes leurs ressources.',
        en: 'One Argo CD hub deploys everywhere; apps request their own cloud resources.',
      },
    },
  },
  {
    tag: { fr: 'Sécurité', en: 'Security' },
    sector: gcp,
    title: {
      fr: 'Réseau privé et données chiffrées',
      en: 'Private network, encrypted data',
    },
    text: {
      fr: "Un Shared VPC avec des réseaux séparés par environnement, des clusters privés derrière des load balancers internes et des bases sans IP publique, joignables uniquement via Private Service Connect. Chiffrement par clés gérées (CMEK) et secrets centralisés dans Vault.",
      en: 'A Shared VPC with networks split by environment, private clusters behind internal load balancers, and databases with no public IP, reachable only through Private Service Connect. Customer-managed encryption keys (CMEK) and secrets centralised in Vault.',
    },
    chips: ['Shared VPC', 'Private Service Connect', 'Cloud KMS', { icon: 'vault', label: 'HashiCorp Vault' }, 'Cloud SQL'],
    diagram: {
      label: {
        fr: "Chemin d'une requête : edge, VPC privé de production, puis données et secrets",
        en: 'Request path: edge, private production VPC, then data and secrets',
      },
      columns: [
        {
          zone: same('EDGE'),
          nodes: [
            { id: 'users', icon: 'user', title: { fr: 'Utilisateurs', en: 'Users' }, sub: { fr: 'trafic public', en: 'public traffic' } },
            { id: 'waf', icon: 'shield', title: same('WAF · CDN'), sub: { fr: 'tunnels zero trust', en: 'zero-trust tunnels' } },
          ],
        },
        {
          zone: { fr: 'VPC PARTAGÉ · PROD', en: 'SHARED VPC · PROD' },
          dashed: true,
          nodes: [
            { id: 'lb', icon: 'lb', title: { fr: 'LB interne', en: 'Internal LB' }, sub: same('API gateway') },
            { id: 'gke', icon: 'cluster', title: { fr: 'GKE privé', en: 'Private GKE' }, sub: { fr: 'nœuds privés', en: 'private nodes' } },
            { id: 'proxy', icon: 'proxy', title: { fr: 'Proxy SQL', en: 'SQL proxy' }, sub: { fr: 'pool de connexions', en: 'connection pooling' } },
          ],
        },
        {
          zone: { fr: 'DONNÉES · SECRETS', en: 'DATA · SECRETS' },
          nodes: [
            { id: 'vault', icon: 'key', title: same('Vault'), sub: { fr: 'auto-unseal KMS', en: 'KMS auto-unseal' } },
            { id: 'sql', icon: 'db', title: same('Cloud SQL'), sub: same('PSC · CMEK · HA') },
          ],
        },
      ],
      edges: [
        ['users', 'waf'],
        ['waf', 'lb'],
        ['lb', 'gke'],
        ['gke', 'proxy'],
        ['proxy', 'sql'],
        ['gke', 'vault'],
      ],
      caption: {
        fr: "Aucune base n'est exposée ; toutes les clés sont gérées et tournent automatiquement.",
        en: 'No database is exposed; every key is managed and rotated automatically.',
      },
    },
  },
  {
    tag: { fr: 'Réseau', en: 'Network' },
    sector: { fr: 'Distribution numérique · GCP + AWS', en: 'Digital distribution · GCP + AWS' },
    title: { fr: 'Réseau hybride multi-cloud', en: 'Hybrid multi-cloud network' },
    text: {
      fr: "GCP et AWS partagent un même backbone WAN privé, qui relie aussi les bureaux et l'on-prem. GCP s'y raccorde par Partner Interconnect (attachements VLAN et Cloud Router/BGP sur deux régions, en actif/passif), AWS par Direct Connect, une Direct Connect Gateway et un Transit Gateway partagé à toute l'organisation. Des tables de routage par environnement, une isolation par routes blackhole et un DNS transféré dans les deux sens donnent des réseaux segmentés sous un seul espace de noms privé.",
      en: 'GCP and AWS share one private WAN backbone that also links offices and on-prem sites. GCP connects through Partner Interconnect (VLAN attachments and Cloud Router/BGP in two regions, active/passive), AWS through Direct Connect, a Direct Connect Gateway and an organization-shared Transit Gateway. Per-environment route tables, blackhole isolation and DNS forwarding in both directions give segmented networks under a single private namespace.',
    },
    chips: [{ icon: 'googlecloud', label: 'Partner Interconnect' }, 'Cloud Router · BGP', 'AWS Direct Connect', 'Transit Gateway', 'Route 53 Resolver', 'terraform'],
    diagram: {
      label: {
        fr: "Réseau hybride : VPC partagé GCP et Interconnect, backbone WAN avec bureaux et on-prem, bordure AWS Direct Connect, cœur Transit Gateway",
        en: 'Hybrid network: GCP Shared VPC and Interconnect, WAN backbone with offices and on-prem, AWS Direct Connect edge, Transit Gateway core',
      },
      columns: [
        {
          zone: { fr: 'GCP · VPC PARTAGÉ', en: 'GCP · SHARED VPC' },
          nodes: [
            { id: 'hub', icon: 'cloud', title: { fr: 'Hub VPC partagé', en: 'Shared VPC hub' }, sub: { fr: 'spokes par env. appairés', en: 'peered env spokes' } },
            { id: 'router', icon: 'router', title: same('Cloud Router'), sub: { fr: 'BGP · bypass Terraform', en: 'BGP · Terraform bypass' } },
            { id: 'ic', icon: 'link', title: same('Interconnect'), sub: { fr: 'VLAN · actif/passif', en: 'VLAN · active/passive' } },
          ],
        },
        {
          zone: { fr: 'BACKBONE WAN', en: 'WAN BACKBONE' },
          dashed: true,
          nodes: [
            { id: 'wan', icon: 'net', title: { fr: 'WAN privé', en: 'Private WAN' }, sub: { fr: 'routage any-to-any', en: 'any-to-any routing' } },
            { id: 'sites', icon: 'building', title: { fr: 'Bureaux et on-prem', en: 'Offices & on-prem' }, sub: { fr: 'sites + DNS on-prem', en: 'sites + on-prem DNS' } },
          ],
        },
        {
          zone: { fr: 'BORDURE AWS', en: 'AWS EDGE' },
          nodes: [
            { id: 'dx', icon: 'link', title: same('Direct Connect'), sub: { fr: 'VIF Transit + BGP', en: 'Transit VIF + BGP' } },
            { id: 'dxgw', icon: 'shield', title: { fr: 'Passerelle DX', en: 'DX Gateway' }, sub: { fr: 'filtre de préfixes', en: 'allowed-prefix filter' } },
          ],
        },
        {
          zone: { fr: 'CŒUR AWS', en: 'AWS CORE' },
          nodes: [
            { id: 'tgw', icon: 'lb', title: same('Transit Gateway'), sub: { fr: 'table de routage par env', en: 'route table per env' } },
            { id: 'vpcs', icon: 'box', title: { fr: 'VPC applicatifs', en: 'Workload VPCs' }, sub: { fr: "partage RAM, toute l'org", en: 'RAM-shared, org-wide' } },
            { id: 'r53', icon: 'msg', title: same('Route 53 Resolver'), sub: { fr: 'DNS hybride', en: 'hybrid DNS' } },
          ],
        },
      ],
      edges: [
        ['hub', 'router'],
        ['router', 'ic'],
        ['ic', 'wan'],
        ['wan', 'sites'],
        ['wan', 'dx'],
        ['dx', 'dxgw'],
        ['dxgw', 'tgw'],
        ['tgw', 'vpcs'],
        ['vpcs', 'r53'],
      ],
      caption: {
        fr: "Une seule bascule fait passer le trafic d'une région à l'autre ; l'astreinte n'est appelée que si toutes les régions tombent.",
        en: 'One switch moves traffic from one region to the other; on-call is paged only when every region is down.',
      },
    },
  },
  {
    tag: same('AWS'),
    sector: videoAws,
    title: { fr: 'GitOps en mode pull sur AWS EKS', en: 'Pull-based GitOps on AWS EKS' },
    text: {
      fr: "Trois environnements EKS provisionnés avec Terraform (état S3/DynamoDB, rôle de déploiement inter-comptes, apply manuel), chacun amorcé avec Flux. L'automatisation d'images de Flux scrute le registre et recommite les nouveaux tags dans Git : builds de branche en dev, versions semver en recette et en production. Une vingtaine de services et autant de CronJobs, sur un pool de nœuds dédié et auto-scalé, lisent leurs secrets dans un Vault central via External Secrets et reçoivent des rôles IAM ciblés via IRSA.",
      en: 'Three EKS environments provisioned with Terraform (S3/DynamoDB state, cross-account deployer role, manual apply), each bootstrapped with Flux. Flux image automation scans the registry and commits new tags back to Git: branch builds in dev, semver releases in staging and production. About twenty services and as many CronJobs, on a dedicated autoscaled node pool, read their secrets from a central Vault through External Secrets and get scoped IAM roles via IRSA.',
    },
    chips: ['terraform', 'AWS EKS', 'flux', 'Kustomize', 'External Secrets', { icon: 'mongodb', label: 'MongoDB Atlas' }],
    diagram: {
      label: {
        fr: "GitOps en mode pull : build, Flux et Kustomize, cluster EKS, puis données et secrets",
        en: 'Pull-based GitOps: build, Flux and Kustomize, EKS cluster, then data and secrets',
      },
      columns: [
        {
          zone: { fr: 'INTÉGRATION', en: 'BUILD' },
          nodes: [{ id: 'ci', icon: 'container', title: { fr: 'Pipeline CI', en: 'CI pipeline' }, sub: { fr: 'image taguée → ECR', en: 'tagged image → ECR' } }],
        },
        {
          zone: { fr: 'GITOPS PULL', en: 'PULL GITOPS' },
          nodes: [
            { id: 'policy', icon: 'sync', title: { fr: 'Image policy Flux', en: 'Flux image policy' }, sub: { fr: 'branche (dev) · semver', en: 'branch (dev) · semver' } },
            { id: 'kz', icon: 'git', title: { fr: 'Templates Kustomize', en: 'Kustomize templates' }, sub: { fr: 'tag commité auto', en: 'auto-committed tag' } },
          ],
        },
        {
          zone: { fr: 'CLUSTER EKS', en: 'EKS CLUSTER' },
          dashed: true,
          nodes: [
            { id: 'gw', icon: 'lb', title: { fr: 'Passerelle API', en: 'API gateway' }, sub: { fr: 'clés et rôles par client', en: 'per-client keys, roles' } },
            { id: 'wl', icon: 'cluster', title: { fr: 'Services et batchs', en: 'Services & batches' }, sub: { fr: 'pool CronJob dédié', en: 'dedicated CronJob pool' } },
          ],
        },
        {
          zone: { fr: 'DONNÉES · SECRETS', en: 'DATA · SECRETS' },
          nodes: [
            { id: 'mongo', icon: 'db', title: { fr: 'MongoDB managé', en: 'Managed MongoDB' }, sub: { fr: 'peering VPC · CMEK KMS', en: 'VPC peering · KMS CMEK' } },
            { id: 'vault', icon: 'key', title: { fr: 'Vault central', en: 'Central Vault' }, sub: same('External Secrets') },
            { id: 's3', icon: 'bucket', title: same('S3 via IRSA'), sub: { fr: 'rôle IAM par workload', en: 'per-workload IAM role' } },
          ],
        },
      ],
      edges: [
        ['ci', 'policy'],
        ['policy', 'kz'],
        ['kz', 'wl'],
        ['gw', 'wl'],
        ['wl', 'mongo'],
        ['wl', 'vault'],
        ['wl', 's3'],
      ],
      caption: {
        fr: "Personne ne pousse dans le cluster : Flux tire depuis Git, et publier un tag semver suffit à promouvoir une version.",
        en: 'Nobody pushes to the cluster: Flux pulls from Git, and publishing a semver tag is all it takes to promote a release.',
      },
    },
  },
  {
    tag: { fr: 'Observabilité', en: 'Observability' },
    sector: { fr: 'Distribution numérique · multi-cloud', en: 'Digital distribution · multi-cloud' },
    title: { fr: 'Observabilité double moteur : OpenTelemetry, Datadog et Tsuga', en: 'Dual-vendor observability: OpenTelemetry, Datadog and Tsuga' },
    text: {
      fr: "Un agrégateur Vector multi-région centralise logs, métriques et traces issus des agents Datadog et de collecteurs OpenTelemetry (Kubernetes, VM, logs cloud), les enrichit, contrôle leur format et les route vers Datadog et vers Tsuga en OTLP. Les traces APM sont dupliquées pour alimenter les deux plateformes pendant la migration de Datadog vers Tsuga. Moniteurs, SLO, index, archives et politiques de tags sont gérés en code, avec des alertes orientées résultat métier où un silence compte comme zéro.",
      en: 'A multi-region Vector aggregator gathers logs, metrics and traces from Datadog agents and OpenTelemetry collectors (Kubernetes, VMs, cloud logs), enriches them, checks their format and routes them to Datadog and to Tsuga over OTLP. APM traces are mirrored so both platforms are fed during the Datadog-to-Tsuga migration. Monitors, SLOs, indexes, archives and tag policies are managed as code, with business-outcome alerts where silence counts as zero.',
    },
    chips: ['opentelemetry', 'Vector', 'datadog', 'Tsuga', 'Monitoring as code', 'Private Service Connect'],
    diagram: {
      label: {
        fr: "Observabilité : sources, collecte Datadog et OpenTelemetry, agrégation Vector, puis Datadog, archive et Tsuga",
        en: 'Observability: sources, Datadog and OpenTelemetry collection, Vector aggregation, then Datadog, archive and Tsuga',
      },
      columns: [
        {
          zone: same('SOURCES'),
          nodes: [
            { id: 'apps', icon: 'code', title: same('Applications'), sub: { fr: 'agent OTel · logs JSON', en: 'OTel agent · JSON logs' } },
            { id: 'k8s', icon: 'cluster', title: same('Kubernetes'), sub: { fr: 'nœuds · pods · cluster', en: 'nodes · pods · cluster' } },
            { id: 'vm', icon: 'box', title: { fr: 'VM et logs cloud', en: 'VMs & cloud logs' }, sub: { fr: 'OTel hôte · log sinks', en: 'host OTel · log sinks' } },
          ],
        },
        {
          zone: { fr: 'COLLECTE', en: 'COLLECTION' },
          nodes: [
            { id: 'ddagent', icon: 'eye', title: { fr: 'Agent Datadog', en: 'Datadog Agent' }, sub: { fr: 'APM · logs · métriques', en: 'APM · logs · metrics' } },
            { id: 'otel', icon: 'pipe', title: same('OTel Collector'), sub: same('daemonset + cluster') },
            { id: 'pubsub', icon: 'msg', title: { fr: 'Export Pub/Sub', en: 'Pub/Sub export' }, sub: same('sink → Pub/Sub → push') },
          ],
        },
        {
          zone: { fr: 'AGRÉGATION', en: 'AGGREGATION' },
          dashed: true,
          nodes: [
            { id: 'vector', icon: 'lb', title: { fr: 'Agrégateur Vector', en: 'Vector aggregator' }, sub: { fr: 'HA multi-région · TLS', en: 'multi-region HA · TLS' } },
            { id: 'route', icon: 'proxy', title: { fr: 'Enrichir et router', en: 'Enrich & route' }, sub: { fr: 'tags · conformité logs', en: 'tags · log compliance' } },
            { id: 'psc', icon: 'link', title: { fr: 'Lien privé (PSC)', en: 'Private link (PSC)' }, sub: { fr: 'intake Tsuga privé', en: 'private Tsuga intake' } },
          ],
        },
        {
          zone: same('DESTINATIONS'),
          nodes: [
            { id: 'dd', icon: 'gauge', title: same('Datadog'), sub: { fr: 'moniteurs · SLO · APM', en: 'monitors · SLOs · APM' } },
            { id: 'archive', icon: 'bucket', title: { fr: 'Archive froide', en: 'Cold archive' }, sub: { fr: 'stockage objet', en: 'object storage' } },
            { id: 'tsuga', icon: 'bell', title: same('Tsuga'), sub: { fr: 'OTLP · en migration', en: 'OTLP · migrating' } },
          ],
        },
      ],
      edges: [
        ['apps', 'ddagent'],
        ['k8s', 'otel'],
        ['vm', 'pubsub'],
        ['ddagent', 'vector'],
        ['otel', 'vector'],
        ['vector', 'route'],
        ['route', 'dd'],
        ['route', 'archive'],
        ['route', 'tsuga'],
        ['pubsub', 'psc'],
        ['psc', 'tsuga'],
      ],
      caption: {
        fr: "Double envoi pendant la migration : chaque trace part vers Datadog et sa copie vers OpenTelemetry, par simple configuration des services.",
        en: 'Dual-shipping during the migration: each trace goes to Datadog and a copy to OpenTelemetry, through service configuration only.',
      },
    },
  },
];

const codeMissions: Mission[] = [
  {
    tag: same('Event-driven'),
    sector: deliveryJava,
    title: { fr: 'Pipeline de livraison event-sourcé', en: 'Event-sourced delivery pipeline' },
    text: {
      fr: "J'ai bâti une plateforme de microservices Java réactifs qui prépare des contenus numériques et les livre à des plateformes partenaires. Un orchestrateur central valide chaque transition d'état et l'ajoute à un event store ; la capture de changements (CDC) la publie sur Kafka, sans double écriture, et un routeur de flux la distribue aux workers en préservant l'ordre de chaque livraison.",
      en: 'I built a reactive Java microservices platform that packages digital content and delivers it to partner platforms. A central orchestrator validates every state transition and appends it to an event store; change data capture publishes it to Kafka with no dual write, and a stream router fans it out to workers while preserving each delivery’s order.',
    },
    chips: ['Java', { icon: 'spring', label: 'Spring WebFlux' }, 'apachekafka', 'Debezium', 'Kafka Streams', 'mysql'],
    diagram: {
      label: {
        fr: "Pipeline de livraison : API, orchestrateur et event store, capture CDC et routeur de flux, puis workers",
        en: 'Delivery pipeline: API, orchestrator and event store, CDC capture and stream router, then workers',
      },
      columns: [
        {
          zone: { fr: 'ENTRÉE', en: 'INGRESS' },
          nodes: [{ id: 'api', icon: 'code', title: same('API REST'), sub: { fr: 'commande async · 202', en: 'async command · 202' } }],
        },
        {
          zone: same('ORCHESTRATION'),
          nodes: [
            { id: 'orch', icon: 'pipe', title: { fr: 'Orchestrateur', en: 'Orchestrator' }, sub: { fr: 'machine à états', en: 'state machine' } },
            { id: 'store', icon: 'db', title: same('Event store'), sub: { fr: 'MySQL · ajout seul', en: 'MySQL · append-only' } },
          ],
        },
        {
          zone: { fr: 'DIFFUSION', en: 'FAN-OUT' },
          dashed: true,
          nodes: [
            { id: 'cdc', icon: 'proxy', title: { fr: 'Capture CDC', en: 'CDC capture' }, sub: same('binlog → Kafka') },
            { id: 'router', icon: 'lb', title: { fr: 'Routeur de flux', en: 'Stream router' }, sub: { fr: 'ordre par livraison', en: 'per-delivery order' } },
          ],
        },
        {
          zone: same('WORKERS'),
          nodes: [
            { id: 'xml', icon: 'code', title: { fr: 'Générateur XML', en: 'XML generator' }, sub: { fr: 'messages standard', en: 'standard messages' } },
            { id: 'batch', icon: 'box', title: { fr: 'Gestion des lots', en: 'Batch manager' }, sub: { fr: 'regroupe et clôture', en: 'groups and closes' } },
            { id: 'ship', icon: 'net', title: { fr: 'Envoi partenaires', en: 'Partner delivery' }, sub: same('SFTP · FTP · API · cloud') },
          ],
        },
      ],
      edges: [
        ['api', 'orch'],
        ['orch', 'store'],
        ['store', 'cdc'],
        ['cdc', 'router'],
        ['router', 'xml'],
        ['router', 'batch'],
        ['router', 'ship'],
      ],
      caption: {
        fr: "L'insertion en base vaut publication : pas de double écriture, et chaque worker renvoie son statut à l'orchestrateur.",
        en: 'The database insert is the publish: no dual write, and every worker reports its status back to the orchestrator.',
      },
    },
  },
  {
    tag: { fr: 'Résilience', en: 'Resilience' },
    sector: deliveryJava,
    title: { fr: 'Livraison résiliente et auto-réparatrice', en: 'Resilient, self-healing delivery' },
    text: {
      fr: "J'ai rendu l'étape de livraison résiliente face à des partenaires instables, sans perte ni doublon. Un registre d'offsets en base permet de reprendre exactement là où le consommateur s'était arrêté ; des garde-fous par partenaire (coupe-circuit, limite de débit à fenêtre glissante, pauses de partition comptées) freinent au lieu d'échouer, et chaque erreur est relancée selon sa nature. Des jobs nocturnes et des alertes sur le volume livré rattrapent le reste.",
      en: 'I made the delivery stage resilient to unstable partners, with no loss and no duplicates. A database-backed offset ledger lets consumers resume exactly where they stopped; per-partner guards (circuit breaker, sliding-window rate limit, ref-counted partition pauses) push back instead of failing, and each error is retried according to its type. Nightly jobs and alerts on delivered volume catch the rest.',
    },
    chips: [{ icon: 'apachekafka', label: 'Reactor Kafka' }, 'redis', 'Micrometer', 'Testcontainers', { icon: 'cucumber', label: 'Cucumber BDD' }],
    diagram: {
      label: {
        fr: "Livraison résiliente : registre d'offsets, garde-fous par partenaire, upload, puis relances et alertes",
        en: 'Resilient delivery: offset ledger, per-partner guards, upload, then retries and alerting',
      },
      columns: [
        {
          zone: { fr: 'CONSOMMATION', en: 'INTAKE' },
          nodes: [{ id: 'ledger', icon: 'registry', title: { fr: "Ledger d'offsets", en: 'Offset ledger' }, sub: { fr: 'reprise sans perte', en: 'lossless resume' } }],
        },
        {
          zone: { fr: 'GARDE-FOUS', en: 'GUARDS' },
          dashed: true,
          nodes: [
            { id: 'cb', icon: 'shield', title: { fr: 'Coupe-circuit', en: 'Circuit breaker' }, sub: { fr: 'par partenaire', en: 'per partner' } },
            { id: 'rl', icon: 'gauge', title: { fr: 'Limiteur de débit', en: 'Rate limiter' }, sub: { fr: 'fenêtre glissante', en: 'sliding window' } },
            { id: 'pause', icon: 'pause', title: { fr: 'Pause de partition', en: 'Partition pause' }, sub: { fr: 'comptée par raison', en: 'ref-counted reasons' } },
          ],
        },
        {
          zone: { fr: 'EXÉCUTION', en: 'EXECUTION' },
          nodes: [{ id: 'upload', icon: 'net', title: { fr: 'Upload partenaire', en: 'Partner upload' }, sub: { fr: 'pool de connexions', en: 'pooled connections' } }],
        },
        {
          zone: { fr: 'REPRISE', en: 'RECOVERY' },
          nodes: [
            { id: 'nightly', icon: 'clock', title: { fr: 'Filets nocturnes', en: 'Nightly safety nets' }, sub: { fr: 'relance des bloqués', en: 're-arm stuck items' } },
            { id: 'retry', icon: 'sync', title: { fr: 'Arbitre de retry', en: 'Retry arbiter' }, sub: { fr: 'politique par erreur', en: 'policy per error type' } },
            { id: 'alert', icon: 'bell', title: { fr: 'Alerte métier', en: 'Outcome alerting' }, sub: { fr: 'volume livré, pas CPU', en: 'throughput, not CPU' } },
          ],
        },
      ],
      edges: [
        ['ledger', 'cb'],
        ['cb', 'rl'],
        ['rl', 'pause'],
        ['rl', 'upload'],
        ['upload', 'retry'],
        ['upload', 'alert'],
        ['nightly', 'retry'],
      ],
      caption: {
        fr: "Au plafond, le message est retenu sans commit d'offset : jamais perdu, jamais envoyé deux fois.",
        en: 'At the hard limit the message is held without committing its offset: never lost, never sent twice.',
      },
    },
  },
  {
    tag: same('CQRS'),
    sector: videoJava,
    title: { fr: 'Microservices CQRS event-sourcés', en: 'Event-sourced CQRS microservices' },
    text: {
      fr: "J'ai conçu un socle d'event sourcing partagé, réutilisé par une trentaine de services Spring Boot : agrégats versionnés avec verrouillage optimiste, event store entièrement audité avec reconstruction à une date donnée, et compacteur planifié qui condense l'historique en snapshots. Les écritures passent par des commandes Kafka, les lectures par des subgraphs GraphQL fédérés.",
      en: 'I designed a shared event-sourcing core reused by about thirty Spring Boot services: versioned aggregates with optimistic locking, a fully audited event store with point-in-time rebuild, and a scheduled compactor that folds history into snapshots. Writes go through Kafka commands, reads through federated GraphQL subgraphs.',
    },
    chips: ['Java', 'springboot', 'apachekafka', 'mongodb', { icon: 'graphql', label: 'GraphQL Federation' }, 'ShedLock'],
    diagram: {
      label: {
        fr: "CQRS event-sourcé : entrées, côté écriture, event store, côté lecture",
        en: 'Event-sourced CQRS: inputs, write side, event store, read side',
      },
      columns: [
        {
          zone: { fr: 'ENTRÉES', en: 'INPUTS' },
          nodes: [
            { id: 'sync', icon: 'sync', title: { fr: 'Services de synchro', en: 'Sync services' }, sub: { fr: 'diff vs plateforme', en: 'diff vs platform' } },
            { id: 'ops', icon: 'code', title: { fr: 'API GraphQL', en: 'GraphQL API' }, sub: { fr: 'mutations back-office', en: 'back-office mutations' } },
          ],
        },
        {
          zone: { fr: 'CÔTÉ ÉCRITURE', en: 'WRITE SIDE' },
          dashed: true,
          nodes: [
            { id: 'cmd', icon: 'msg', title: { fr: 'Handler commandes', en: 'Command handler' }, sub: { fr: 'commandes Kafka', en: 'Kafka commands' } },
            { id: 'agg', icon: 'box', title: { fr: 'Agrégat', en: 'Aggregate root' }, sub: { fr: 'versionnage optimiste', en: 'optimistic versioning' } },
          ],
        },
        {
          zone: { fr: 'STOCKAGE', en: 'STORE' },
          nodes: [
            { id: 'es', icon: 'db', title: same('Event store'), sub: { fr: 'MongoDB · audité', en: 'MongoDB · audited' } },
            { id: 'compact', icon: 'clock', title: { fr: 'Compacteur', en: 'Event compactor' }, sub: { fr: 'snapshots planifiés', en: 'scheduled snapshots' } },
          ],
        },
        {
          zone: { fr: 'CÔTÉ LECTURE', en: 'READ SIDE' },
          nodes: [
            { id: 'events', icon: 'msg', title: { fr: 'Événements métier', en: 'Domain events' }, sub: same('Kafka · JSON Merge Patch') },
            { id: 'query', icon: 'eye', title: { fr: 'Subgraphs lecture', en: 'Query subgraphs' }, sub: { fr: 'GraphQL fédéré', en: 'federated GraphQL' } },
          ],
        },
      ],
      edges: [
        ['sync', 'cmd'],
        ['ops', 'cmd'],
        ['cmd', 'agg'],
        ['agg', 'es'],
        ['es', 'compact'],
        ['es', 'events'],
        ['es', 'query'],
      ],
      caption: {
        fr: "Chaque événement porte son ascendance (corrélation, source, auteur) : l'historique se rejoue et s'audite de bout en bout.",
        en: 'Every event carries its lineage (correlation, source, author): history can be replayed and audited end to end.',
      },
    },
  },
];

export const missionGroups: MissionGroup[] = [
  {
    label: { fr: 'Côté plateforme', en: 'Platform side' },
    intro: { fr: 'Une infrastructure Google Cloud multi-environnements.', en: 'A multi-environment Google Cloud infrastructure.' },
    missions: platformMissions,
  },
  {
    label: { fr: 'Côté code', en: 'Code side' },
    intro: { fr: 'Des microservices Java orientés événements, du flux de livraison au modèle de données.', en: 'Event-driven Java microservices, from delivery flow to data model.' },
    missions: codeMissions,
  },
];
