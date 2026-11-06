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
      fr: "Un monorepo Terraform/Terragrunt sépare les modules réutilisables de la configuration propre à chaque environnement. La CI ne s'exécute que pour ce qui a changé, le plan tourne en lecture seule avec une identité sans clé (OIDC), et l'apply reste manuel, après revue.",
      en: "A Terraform/Terragrunt monorepo keeps reusable modules apart from each environment's configuration. CI runs only for what changed, the plan runs read-only with keyless identity (OIDC), and apply stays manual, after review.",
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
            { id: 'org', icon: 'org', title: { fr: 'Organisation', en: 'Organisation' }, sub: { fr: 'dossiers prod/hors-prod', en: 'prod & non-prod folders' } },
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
        fr: 'Chaque changement suit plan → revue → apply, et la CI ne détient aucune clé statique.',
        en: 'Every change goes plan → review → apply, and CI never holds a static key.',
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
      fr: 'Des clusters GKE privés et régionaux, un par environnement, tous déployés depuis un hub Argo CD central. Avec Crossplane, les équipes créent elles-mêmes leurs ressources cloud (bases de données, files de messages, buckets), dans les limites fixées par Workload Identity.',
      en: 'Private, regional GKE clusters, one per environment, all deployed from a central Argo CD hub. With Crossplane, teams create their own cloud resources (databases, message queues, buckets) within the limits set by Workload Identity.',
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
        fr: 'Un seul hub Argo CD déploie partout, et chaque application demande elle-même ses ressources.',
        en: 'One Argo CD hub deploys everywhere, and each app requests its own cloud resources.',
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
      fr: "Un Shared VPC avec un réseau par environnement, des clusters privés derrière des load balancers internes, et des bases de données sans IP publique, accessibles uniquement via Private Service Connect. Les données sont chiffrées avec des clés gérées par l'entreprise (CMEK), et les secrets sont centralisés dans Vault.",
      en: 'A Shared VPC with one network per environment, private clusters behind internal load balancers, and databases with no public IP, reachable only through Private Service Connect. Data is encrypted with customer-managed keys (CMEK), and secrets are centralised in Vault.',
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
        fr: "Aucune base de données n'est exposée sur internet, et toutes les clés sont gérées et renouvelées automatiquement.",
        en: 'No database is exposed to the internet, and every key is managed and rotated automatically.',
      },
    },
  },
  {
    tag: { fr: 'Réseau', en: 'Network' },
    sector: { fr: 'Distribution numérique · GCP + AWS', en: 'Digital distribution · GCP + AWS' },
    title: { fr: 'Réseau hybride multi-cloud', en: 'Hybrid multi-cloud network' },
    text: {
      fr: "GCP et AWS sont reliés au même réseau WAN privé que les bureaux et les datacenters sur site. Côté GCP : Partner Interconnect et Cloud Router (BGP) sur deux régions, en actif/passif. Côté AWS : Direct Connect, une Direct Connect Gateway et un Transit Gateway partagé avec toute l'organisation. Chaque environnement a sa propre table de routage et reste isolé des autres, et le DNS est résolu dans les deux sens, sous un même espace de noms privé.",
      en: 'GCP and AWS join the same private WAN as the offices and on-premises data centres. On GCP: Partner Interconnect and Cloud Router (BGP) in two regions, active/passive. On AWS: Direct Connect, a Direct Connect Gateway and a Transit Gateway shared across the organisation. Each environment has its own route table and stays isolated from the others, and DNS resolves both ways under one private namespace.',
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
            { id: 'hub', icon: 'cloud', title: { fr: 'Hub VPC partagé', en: 'Shared VPC hub' }, sub: { fr: 'un VPC par env, appairé', en: 'one peered VPC per env' } },
            { id: 'router', icon: 'router', title: same('Cloud Router'), sub: { fr: 'BGP · route de secours', en: 'BGP · fallback route' } },
            { id: 'ic', icon: 'link', title: same('Interconnect'), sub: { fr: 'VLAN · actif/passif', en: 'VLAN · active/passive' } },
          ],
        },
        {
          zone: { fr: 'BACKBONE WAN', en: 'WAN BACKBONE' },
          dashed: true,
          nodes: [
            { id: 'wan', icon: 'net', title: { fr: 'WAN privé', en: 'Private WAN' }, sub: { fr: 'relie tous les sites', en: 'links every site' } },
            { id: 'sites', icon: 'building', title: { fr: 'Bureaux et sites', en: 'Offices & sites' }, sub: { fr: 'DNS interne', en: 'internal DNS' } },
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
        fr: "Une seule bascule fait passer le trafic d'une région à l'autre, et l'astreinte n'est appelée que si toutes les régions tombent.",
        en: 'A single switch moves traffic from one region to the other, and on-call is paged only when every region is down.',
      },
    },
  },
  {
    tag: same('AWS'),
    sector: videoAws,
    title: { fr: 'GitOps en mode pull sur AWS EKS', en: 'Pull-based GitOps on AWS EKS' },
    text: {
      fr: "Trois environnements EKS créés avec Terraform (apply manuel, rôle de déploiement inter-comptes), chacun piloté par Flux. Flux surveille le registre d'images et écrit lui-même les nouveaux tags dans Git : la dernière build de branche en dev, la dernière version semver en recette et en production. Une vingtaine de services et autant de CronJobs lisent leurs secrets dans un Vault central via External Secrets, avec des droits AWS limités à chaque workload (IRSA).",
      en: 'Three EKS environments built with Terraform (manual apply, cross-account deployer role), each managed by Flux. Flux watches the image registry and writes new tags back to Git itself: the latest branch build in dev, the latest semver release in staging and production. About twenty services and as many CronJobs read their secrets from a central Vault through External Secrets, with AWS permissions scoped to each workload (IRSA).',
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
            { id: 'kz', icon: 'git', title: { fr: 'Templates Kustomize', en: 'Kustomize templates' }, sub: { fr: 'tag écrit dans Git', en: 'tag written to Git' } },
          ],
        },
        {
          zone: { fr: 'CLUSTER EKS', en: 'EKS CLUSTER' },
          dashed: true,
          nodes: [
            { id: 'gw', icon: 'lb', title: { fr: 'Passerelle API', en: 'API gateway' }, sub: { fr: 'clés et rôles par client', en: 'keys & roles per client' } },
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
        fr: 'Personne ne déploie à la main : Flux lit Git, et publier un tag semver suffit à promouvoir une version.',
        en: 'Nobody deploys by hand: Flux reads from Git, and publishing a semver tag is all it takes to promote a release.',
      },
    },
  },
  {
    tag: { fr: 'Observabilité', en: 'Observability' },
    sector: { fr: 'Distribution numérique · multi-cloud', en: 'Digital distribution · multi-cloud' },
    title: { fr: 'Observabilité : migration de Datadog vers Tsuga via OpenTelemetry', en: 'Observability: migrating from Datadog to Tsuga via OpenTelemetry' },
    text: {
      fr: 'Une migration progressive de Datadog vers Tsuga, sans perte de visibilité. Un agrégateur Vector réparti sur deux régions reçoit les logs, métriques et traces des agents Datadog et des collecteurs OpenTelemetry (Kubernetes, VM, logs cloud), les enrichit, vérifie leur format et les envoie aux deux plateformes. Moniteurs, SLO, index et archives sont gérés en code, avec des alertes sur le résultat métier.',
      en: 'A gradual migration from Datadog to Tsuga, with no loss of visibility. A Vector aggregator spread over two regions receives logs, metrics and traces from Datadog agents and OpenTelemetry collectors (Kubernetes, VMs, cloud logs), enriches them, checks their format and sends them to both platforms. Monitors, SLOs, indexes and archives are managed as code, with alerts on business outcomes.',
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
            { id: 'vm', icon: 'box', title: { fr: 'VM et logs cloud', en: 'VMs & cloud logs' }, sub: { fr: 'OTel sur VM · log sinks', en: 'host OTel · log sinks' } },
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
            { id: 'route', icon: 'proxy', title: { fr: 'Enrichir et router', en: 'Enrich & route' }, sub: { fr: 'tags · format des logs', en: 'tags · log format checks' } },
            { id: 'psc', icon: 'link', title: { fr: 'Lien privé (PSC)', en: 'Private link (PSC)' }, sub: { fr: 'accès privé à Tsuga', en: 'private access to Tsuga' } },
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
        fr: 'Pendant la migration, chaque trace part vers Datadog et une copie vers OpenTelemetry, sans modifier le code des services.',
        en: 'During the migration, each trace goes to Datadog and a copy to OpenTelemetry, with no change to service code.',
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
      fr: "Une plateforme de microservices Java réactifs qui prépare des contenus numériques et les livre aux plateformes partenaires. Un orchestrateur central valide chaque changement d'état et l'enregistre dans un event store. La capture de changements (CDC) le publie ensuite sur Kafka, ce qui évite toute double écriture, et un routeur le distribue aux workers en respectant l'ordre de chaque livraison.",
      en: 'A reactive Java microservices platform that packages digital content and delivers it to partner platforms. A central orchestrator validates every state change and records it in an event store. Change data capture (CDC) then publishes it to Kafka, which avoids any dual write, and a router fans it out to workers while keeping each delivery in order.',
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
            { id: 'xml', icon: 'code', title: { fr: 'Générateur XML', en: 'XML generator' }, sub: { fr: 'messages normalisés', en: 'standard XML messages' } },
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
        fr: "Écrire en base suffit à publier l'événement, et chaque worker renvoie son statut à l'orchestrateur.",
        en: 'Writing to the database is the publish step, and every worker reports its status back to the orchestrator.',
      },
    },
  },
  {
    tag: { fr: 'Résilience', en: 'Resilience' },
    sector: deliveryJava,
    title: { fr: 'Livraison résiliente et auto-réparatrice', en: 'Resilient, self-healing delivery' },
    text: {
      fr: "Une livraison qui résiste aux partenaires instables, sans perte ni doublon. Un registre d'offsets en base permet de reprendre exactement là où le traitement s'était arrêté. Pour chaque partenaire, un coupe-circuit, une limite de débit et des pauses de consommation ralentissent le flux au lieu de le faire échouer, et chaque erreur est relancée selon sa nature. Des jobs nocturnes et des alertes sur le volume livré rattrapent le reste.",
      en: 'Delivery that stays resilient to unstable partners, with no loss and no duplicates. A database-backed offset ledger lets processing resume exactly where it stopped. For each partner, a circuit breaker, a rate limit and consumer pauses slow the flow down instead of letting it fail, and each error is retried according to its type. Nightly jobs and alerts on delivered volume catch the rest.',
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
          nodes: [{ id: 'ledger', icon: 'registry', title: { fr: "Registre d'offsets", en: 'Offset ledger' }, sub: { fr: 'reprise sans perte', en: 'lossless resume' } }],
        },
        {
          zone: { fr: 'GARDE-FOUS', en: 'GUARDS' },
          dashed: true,
          nodes: [
            { id: 'cb', icon: 'shield', title: { fr: 'Coupe-circuit', en: 'Circuit breaker' }, sub: { fr: 'par partenaire', en: 'per partner' } },
            { id: 'rl', icon: 'gauge', title: { fr: 'Limiteur de débit', en: 'Rate limiter' }, sub: { fr: 'fenêtre glissante', en: 'sliding window' } },
            { id: 'pause', icon: 'pause', title: { fr: 'Pause de partition', en: 'Partition pause' }, sub: { fr: 'compteur de raisons', en: 'ref-counted reasons' } },
          ],
        },
        {
          zone: { fr: 'EXÉCUTION', en: 'EXECUTION' },
          nodes: [{ id: 'upload', icon: 'net', title: { fr: 'Envoi partenaire', en: 'Partner upload' }, sub: { fr: 'pool de connexions', en: 'pooled connections' } }],
        },
        {
          zone: { fr: 'REPRISE', en: 'RECOVERY' },
          nodes: [
            { id: 'nightly', icon: 'clock', title: { fr: 'Jobs nocturnes', en: 'Nightly jobs' }, sub: { fr: 'relance des bloqués', en: 're-arm stuck items' } },
            { id: 'retry', icon: 'sync', title: { fr: 'Relances', en: 'Retry policy' }, sub: { fr: "selon le type d'erreur", en: 'per error type' } },
            { id: 'alert', icon: 'bell', title: { fr: 'Alerte métier', en: 'Business alerting' }, sub: { fr: 'volume livré, pas CPU', en: 'throughput, not CPU' } },
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
        fr: 'À la limite de débit, le message attend sans que son offset soit validé : jamais perdu, jamais envoyé deux fois.',
        en: 'At the rate limit, the message waits without its offset being committed: never lost, never sent twice.',
      },
    },
  },
  {
    tag: same('CQRS'),
    sector: videoJava,
    title: { fr: 'Microservices CQRS event-sourcés', en: 'Event-sourced CQRS microservices' },
    text: {
      fr: "Un socle d'event sourcing partagé, utilisé par une trentaine de services Spring Boot : agrégats versionnés avec verrouillage optimiste, event store audité qui permet de reconstruire l'état à n'importe quelle date, et compactage planifié de l'historique en snapshots. Les écritures passent par des commandes Kafka, les lectures par une API GraphQL fédérée.",
      en: 'A shared event-sourcing core used by about thirty Spring Boot services: versioned aggregates with optimistic locking, an audited event store that can rebuild state as of any date, and scheduled compaction of history into snapshots. Writes go through Kafka commands, reads through a federated GraphQL API.',
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
            { id: 'cmd', icon: 'msg', title: { fr: 'Gestion commandes', en: 'Command handler' }, sub: { fr: 'commandes Kafka', en: 'Kafka commands' } },
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
            { id: 'query', icon: 'eye', title: { fr: 'Lecture GraphQL', en: 'Query subgraphs' }, sub: { fr: 'subgraphs fédérés', en: 'federated GraphQL' } },
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
        fr: "Chaque événement garde sa provenance (corrélation, source, auteur) : l'historique se rejoue et s'audite de bout en bout.",
        en: 'Every event carries its lineage (correlation, source, author): history can be replayed and audited end to end.',
      },
    },
  },
];

export const missionGroups: MissionGroup[] = [
  {
    label: { fr: 'Côté plateforme', en: 'Platform side' },
    intro: { fr: 'Infrastructure cloud, réseau et observabilité, sur Google Cloud et AWS.', en: 'Cloud infrastructure, networking and observability across Google Cloud and AWS.' },
    missions: platformMissions,
  },
  {
    label: { fr: 'Côté code', en: 'Code side' },
    intro: { fr: 'Des microservices Java orientés événements : flux de livraison, résilience et modèle de données.', en: 'Event-driven Java microservices: delivery flow, resilience and data model.' },
    missions: codeMissions,
  },
];
