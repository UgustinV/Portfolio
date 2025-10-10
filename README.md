# 🚀 Portfolio Augustin Viard

Un portfolio moderne et interactif développé avec Next.js, TypeScript et Tailwind CSS, présentant mes projets, compétences et parcours professionnel.

## ✨ Fonctionnalités

### 🎨 Interface Utilisateur
- **Design responsive** adapté à tous les appareils
- **Mode sombre/clair** avec basculement automatique
- **Animations fluides** avec Framer Motion et Keen Slider
- **Navigation accessible** avec support clavier complet
- **Carousel automatique** pour les compétences
- **Scroll horizontal animé** pour les projets

### 🔐 Administration
- **Authentification sécurisée** avec NextAuth.js
- **Interface d'administration** pour gérer le contenu
- **Upload d'images** via Cloudinary
- **CRUD complet** (projets et compétences)
- **Gestion automatique des comptes** inactifs

### 📧 Communication
- **Formulaire de contact** fonctionnel
- **Envoi d'emails** automatisé avec Resend
- **Notifications système** pour la gestion des comptes

### 🛡️ Sécurité & Maintenance
- **Nettoyage automatique** des comptes inactifs (> 1 an)
- **Emails d'avertissement** avant suppression
- **Protection des comptes administrateur**
- **Tâches cron** quotidiennes avec Vercel

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique pour une meilleure fiabilité
- **Tailwind CSS 4** - Framework CSS utilitaire
- **Framer Motion** - Animations et transitions fluides
- **Keen Slider** - Carousel haute performance
- **Flowbite React** - Composants UI

### Backend
- **Prisma** - ORM pour la base de données
- **PostgreSQL** - Base de données relationnelle
- **NextAuth.js** - Authentification sécurisée
- **Resend** - Service d'envoi d'emails
- **React Email** - Templates d'emails en React

### Services Externes
- **Cloudinary** - Gestion et optimisation d'images
- **Vercel** - Hébergement et déploiement
- **Vercel Cron Jobs** - Tâches automatisées

## 🚀 Installation & Configuration

### Prérequis
- Node.js 18+ et pnpm
- PostgreSQL
- Comptes : Cloudinary, Resend

### Installation
```bash
# Cloner le projet
git clone https://github.com/UgustinV/portfolio.git
cd portfolio

# Installer les dépendances
pnpm install

# Configurer la base de données
npx prisma migrate dev
npx prisma generate
```

### Variables d'environnement
Créer un fichier `.env` avec :

```bash
# Base de données
DATABASE_URL=DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=your_api_key"

# Authentification
NEXTAUTH_SECRET="votre-secret-nextauth"
NEXTAUTH_URL="http://localhost:3000"

# GitHub (pour l'authentification)
GITHUB_CLIENT_ID="votre-client-id"
GITHUB_CLIENT_SECRET="votre-client-secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="votre-cloud-name"
CLOUDINARY_API_KEY="votre-api-key"
CLOUDINARY_API_SECRET="votre-api-secret"

# Resend
RESEND_API_KEY="votre-resend-api-key"

# Nettoyage automatique
CLEANUP_CRON_SECRET="votre-secret-cron"
```

### Démarrage
```bash
# Mode développement
pnpm dev

# Build production
pnpm build
pnpm start
```

## 📁 Structure du Projet

```
├── app/                   # App Router Next.js
│   ├── api/               # Routes API
│   │   ├── auth/          # Authentification
│   │   ├── cleanup-users/ # Nettoyage automatique
│   │   ├── projects/      # Gestion des projets
│   │   └── competences/   # Gestion des compétences
│   ├── globals.css        # Styles globaux
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   └── sections/          # Sections du portfolio
├── emails/                # Templates d'emails
├── hooks/                 # Hooks personnalisés
├── lib/                   # Utilitaires
├── prisma/                # Schéma et migrations
└── public/                # Assets statiques
```

## 🎯 Fonctionnalités Détaillées

### Système de Gestion des Comptes
- **Nettoyage quotidien** : Vérification automatique des comptes inactifs
- **Email d'avertissement** : Envoyé 7 jours avant suppression (358 jours d'inactivité)
- **Suppression automatique** : Après 365 jours d'inactivité
- **Protection admin** : Les comptes administrateur ne sont jamais supprimés

### Interface d'Administration
- **Gestion des projets** : Ajout, modification, suppression
- **Gestion des compétences** : CRUD complet avec niveaux
- **Upload d'images** : Intégration Cloudinary avec optimisation
- **Interface intuitive** : Modales et formulaires adaptatifs

### Animations & UX
- **Carousel infini** : Défilement automatique des compétences
- **Scroll horizontal** : Navigation fluide dans les projets
- **Animations d'apparition** : Éléments qui s'animent au scroll
- **Responsive design** : Adaptation parfaite mobile/tablet/desktop

### Surveillance
- **Logs Vercel** : Monitoring des tâches cron
- **Emails de rapport** : Résumé des actions effectuées
- **Gestion d'erreurs** : Logging complet des problèmes

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connecter le repo GitHub à Vercel
2. Configurer les variables d'environnement
3. Le déploiement se fait automatiquement

### Configuration Cron
Les tâches automatisées sont configurées dans `vercel.json` :
- **Nettoyage quotidien** : 2h00 UTC tous les jours

## 📈 Performance & SEO

- **Optimisation d'images** : Cloudinary avec lazy loading
- **Bundle splitting** : Chargement optimal des ressources
- **Métadonnées SEO** : Structured data et Open Graph
- **Core Web Vitals** : Performance optimisée

## 🤝 Contribution

Ce projet est un portfolio personnel, mais les suggestions d'amélioration sont les bienvenues !

### Développement Local
1. Fork le projet
2. Créer une branche feature
3. Commiter les changements
4. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📧 Contact

**Augustin Viard**
- Portfolio : [augustinviard.dev](https://augustinviard.dev)
- Email : augustin.viard0@gmail.com
- GitHub : [@UgustinV](https://github.com/UgustinV)

---

*Développé avec ❤️ par Augustin Viard*
