# AUTHENTIFICATOR - Documentation Complète du Projet

## Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Objectif du projet](#objectif-du-projet)
3. [Architecture et rôle](#architecture-et-rôle)
4. [Fonctionnement du système](#fonctionnement-du-système)
5. [Stack technologique](#stack-technologique)
6. [Variables d'environnement](#variables-denvironnement)
7. [Endpoints API](#endpoints-api)
8. [Flux d'authentification](#flux-dauthentification)
9. [Structure du projet](#structure-du-projet)
10. [Déploiement et configuration](#déploiement-et-configuration)
11. [Sécurité](#sécurité)
12. [Intégration Firebase](#intégration-firebase)

---

## Vue d'ensemble

**AUTHENTIFICATOR** est un service centralisé d'authentification (Identity Provider / IdP) construit sur Vercel, conçu pour fournir une solution d'authentification unifiée à plusieurs applications. Il agit comme un **fournisseur OAuth 2.0** en se connectant à Google et GitHub, puis génère des tokens Firebase Custom pour sécuriser l'accès aux applications clientes.

### Caractéristiques principales
- Authentification via Google OAuth 2.0
- Authentification via GitHub OAuth 2.0
- Génération de Firebase Custom Tokens
- Tableau de bord administrateur en temps réel
- Historique des connexions avec statistiques
- Base de données PostgreSQL (Neon)
- API serverless (Vercel Functions)

---

## Objectif du projet

AUTHENTIFICATOR résout le problème de gestion d'authentification décentralisée. Au lieu que chaque application gère sa propre authentification, AUTHENTIFICATOR centralise :

1. **L'authentification** : Gestion unifiée des identités via Google et GitHub
2. **La génération de tokens** : Création sécurisée de tokens Firebase Custom
3. **Le suivi** : Enregistrement de toutes les connexions pour des statistiques et audits
4. **L'administration** : Dashboard pour monitoring des connexions en temps réel

**Cas d'usage :**
- Applications multi-tenant qui ont besoin de la même source de vérité pour l'authentification
- Services qui souhaitent externaliser la gestion d'identité
- Équipes ayant besoin d'une solution SSO (Single Sign-On) centralisée

---

## Architecture et rôle

### Rôle du service

AUTHENTIFICATOR agit comme un **intermédiaire de confiance** entre :
- **Providers OAuth** (Google, GitHub) → Fournisseurs d'identité
- **Applications clientes** (AfroVibe, etc.) → Consommateurs d'authentification
- **Firebase** → Gestionnaire de tokens backend

```
┌─────────────────┐
│  Applications   │
│   Clientes      │
└────────┬────────┘
         │
         │ 1. Redirige vers /api/auth/google?redirect_uri=...
         │
         ▼
┌─────────────────────────────────────┐
│   AUTHENTIFICATOR (Service)         │
│  ┌───────────────────────────────┐  │
│  │ /api/auth/google              │  │
│  │ /api/auth/github              │  │
│  │ /api/callback/google          │  │
│  │ /api/callback/github          │  │
│  │ /api/admin/stats              │  │
│  └───────────────────────────────┘  │
└────┬─────────────────────────────┬──┘
     │                             │
     │ 2. Redirige vers           │ 4. Stocke événements
     │    OAuth Provider           │    dans PostgreSQL
     │                             │
     ▼                             ▼
┌──────────────┐          ┌────────────────┐
│ Google OAuth │          │  Neon Database │
│ GitHub OAuth │          │  (PostgreSQL)  │
└──────┬───────┘          └────────────────┘
       │
       │ 3. Redirige avec code
       │
       ▼
┌─────────────────────────────────┐
│ /api/callback/*                 │
│ - Échange code pour token       │
│ - Crée Firebase Custom Token    │
│ - Redirige l'app avec token     │
└─────────┬───────────────────────┘
          │
          │ Token Firebase Custom
          │
          ▼
┌─────────────────────────────────┐
│ Application cliente              │
│ - Reçoit token                  │
│ - Authentifie avec Firebase     │
└─────────────────────────────────┘
```

### Architecture technique

```
Vercel Functions (Serverless)
├── api/auth/google.js ........... Initie OAuth Google
├── api/auth/github.js ........... Initie OAuth GitHub
├── api/callback/google.js ....... Callback Google + Firebase Token
├── api/callback/github.js ....... Callback GitHub + Firebase Token
├── api/lib/firebase.js .......... Firebase Admin SDK
├── api/lib/prisma.js ............ Client Prisma
├── api/admin/stats.js ........... Statistiques connexions
└── api/admin/clean.js ........... Nettoyage données

Frontend (React + Vite)
├── Pages d'authentification
├── Dashboard admin
├── Gestion des utilisateurs
└── Visualisation des statistiques (Recharts)

Base de données
└── Neon PostgreSQL (Prisma ORM)
    └── Tables: users, sessions, logs, stats
```

---

## Fonctionnement du système

### Étape 1 : Initiation de l'authentification

L'application cliente redirige l'utilisateur vers AUTHENTIFICATOR :

```
GET https://authentificator.vercel.app/api/auth/google?
  app=MonApp&
  redirect_uri=https://monapp.com/auth-callback
```

### Étape 2 : Redirection vers le provider OAuth

AUTHENTIFICATOR redirige vers Google/GitHub :

```
GET https://accounts.google.com/o/oauth2/v2/auth?
  client_id=xxx&
  redirect_uri=https://authentificator.vercel.app/api/callback/google&
  scope=openid email profile&
  state=<encoded_state>
```

L'état contient les infos pour le callback :
```json
{
  "app": "MonApp",
  "redirect_uri": "https://monapp.com/auth-callback"
}
```

### Étape 3 : Authentification utilisateur

L'utilisateur se connecte à Google/GitHub. Le provider redirige vers AUTHENTIFICATOR avec un code :

```
GET https://authentificator.vercel.app/api/callback/google?
  code=<oauth_code>&
  state=<encoded_state>
```

### Étape 4 : Échange du code et génération du token

AUTHENTIFICATOR :
1. Échange le code OAuth contre un access token
2. Récupère les informations de l'utilisateur
3. Crée un **Firebase Custom Token** via Firebase Admin SDK
4. Enregistre l'événement dans la base de données
5. Redirige l'utilisateur vers son app avec le token

```
Redirect to:
https://monapp.com/auth-callback?
  status=success&
  customToken=<firebase_token>&
  uid=google_123456&
  email=user@example.com&
  name=User Name&
  avatar=https://...
```

### Étape 5 : Authentification auprès de Firebase

L'application cliente :
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

const auth = getAuth();
const customToken = new URLSearchParams(location.search).get('customToken');
await signInWithCustomToken(auth, customToken);
```

---

## Stack technologique

### Frontend
| Technologie | Version | Rôle |
|-------------|---------|------|
| **React** | 19.2.6 | Framework UI |
| **Vite** | 8.0.12 | Bundler et dev server |
| **React Router** | 7.17.0 | Gestion de la navigation |
| **Tailwind CSS** | 4.3.1 | Styling |
| **Tremor** | 3.18.7 | Composants dashboard |
| **Recharts** | 3.8.1 | Graphiques et données |
| **Lucide React** | 0.475.0 | Icônes |
| **Axios** | 1.17.0 | Client HTTP |

### Backend (Serverless)
| Technologie | Version | Rôle |
|-------------|---------|------|
| **Node.js** | (Vercel) | Runtime serverless |
| **Express** | (Implicite) | Routing via functions |
| **Passport.js** | 0.7.0 | Strategies OAuth |
| **passport-google-oauth20** | 2.0.0 | OAuth Google |
| **passport-github2** | 0.1.12 | OAuth GitHub |
| **jsonwebtoken** | 9.0.3 | JWT (tokens legacy) |
| **firebase-admin** | 14.0.0 | Firebase Admin SDK |

### Base de données
| Technologie | Rôle |
|-------------|------|
| **PostgreSQL (Neon)** | Base de données cloud |
| **Prisma ORM** | 7.8.0 | Client ORM |
| **@prisma/adapter-pg** | 7.8.0 | Adaptateur PostgreSQL |
| **pg** | 8.21.0 | Driver PostgreSQL |

### Infrastructure
| Service | Rôle |
|---------|------|
| **Vercel** | Hébergement, Functions, déploiement |
| **Neon** | PostgreSQL serverless |
| **Firebase** | Authentication backend, tokens |

---

## Variables d'environnement

### Variables requises pour développement local

```env
# OAuth Google
GOOGLE_CLIENT_ID=<votre_google_client_id>
GOOGLE_CLIENT_SECRET=<votre_google_client_secret>

# OAuth GitHub
GITHUB_CLIENT_ID=<votre_github_client_id>
GITHUB_CLIENT_SECRET=<votre_github_client_secret>

# Base de données
DATABASE_URL=postgresql://user:password@host:5432/database

# JWT (Legacy - en phase d'élimination)
JWT_SECRET=<votre_jwt_secret_long_et_complexe>

# Firebase Admin SDK
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=<votre_firebase_project_id>
FIREBASE_PRIVATE_KEY_ID=<votre_private_key_id>
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=<votre_service_account_email>
FIREBASE_CLIENT_ID=<votre_firebase_client_id>
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=<votre_cert_url>

# Environnement
NODE_ENV=development
```

### Où placer ces variables

**Développement local :**
- Fichier `.env.development.local` (ignoré par git)

**Production (Vercel) :**
- Vercel Project Settings → Environment Variables
- Ou via CLI: `vercel env add`

### Configuration alternative (Local dev)

Au lieu de variables d'environnement, vous pouvez placer :
```
./serviceAccountKey.json
```

Le fichier sera automatiquement chargé par `api/lib/firebase.js`.

---

## Endpoints API

### Endpoints d'authentification

#### 1. Google OAuth - Initiation
```
GET /api/auth/google?app=<appName>&redirect_uri=<url>

Paramètres:
  - app: Nom de l'application (pour le suivi)
  - redirect_uri: URL où rediriger l'utilisateur après connexion
  - email (optionnel): Email de hint pour Google

Réponse:
  Redirection HTTP 302 vers Google OAuth
```

**Exemple :**
```
https://authentificator.vercel.app/api/auth/google?
  app=AfroVibe&
  redirect_uri=https://afrovibe.com/auth-callback
```

#### 2. GitHub OAuth - Initiation
```
GET /api/auth/github?app=<appName>&redirect_uri=<url>

Paramètres:
  - app: Nom de l'application
  - redirect_uri: URL de retour

Réponse:
  Redirection HTTP 302 vers GitHub OAuth
```

#### 3. Google Callback
```
GET /api/callback/google?code=<oauth_code>&state=<state>

Paramètres:
  - code: Code OAuth retourné par Google
  - state: État contenant app et redirect_uri

Réponse:
  Redirection vers redirect_uri avec:
    - status: success | failure
    - customToken: Token Firebase
    - uid: ID utilisateur
    - email: Email utilisateur
    - name: Nom utilisateur
    - avatar: URL avatar
```

#### 4. GitHub Callback
```
GET /api/callback/github?code=<oauth_code>&state=<state>

Paramètres:
  - code: Code OAuth retourné par GitHub
  - state: État

Réponse:
  Redirection vers redirect_uri avec tokens
```

### Endpoints Admin

#### 5. Statistiques
```
GET /api/admin/stats

Réponse (JSON):
{
  "totalLogins": 150,
  "totalUsers": 75,
  "googleLogins": 90,
  "githubLogins": 60,
  "recentLogins": [
    {
      "id": "cuid",
      "provider": "google",
      "userEmail": "user@example.com",
      "userName": "User Name",
      "appName": "AfroVibe",
      "loginTime": "2024-06-14T10:30:00Z"
    }
  ]
}
```

#### 6. Nettoyage des données
```
POST /api/admin/clean

Réponse:
{
  "deletedCount": 42,
  "message": "Old records deleted"
}
```

---

## Flux d'authentification

### Vue d'ensemble complète

```
1. USER VISITS APP
   └─> User clicks "Login with Google"
       └─> App redirects to: /api/auth/google?app=...&redirect_uri=...

2. AUTHENTICATE ENDPOINT
   └─> Creates state with app + redirect_uri
   └─> Redirects to Google OAuth URL
       └─> Google shows consent screen

3. USER AUTHORIZES
   └─> User logs in to Google
   └─> User grants permissions
   └─> Google redirects to /api/callback/google?code=...&state=...

4. CALLBACK PROCESSING
   ├─> Parse state (recover app + redirect_uri)
   ├─> Exchange code for access_token
   ├─> Fetch user profile from Google API
   ├─> Extract email, name, avatar
   ├─> Create Firebase Custom Token
   ├─> Log event to database
   └─> Redirect to: redirect_uri?status=success&customToken=...&...

5. APP RECEIVES TOKEN
   └─> App extracts customToken from URL
   └─> Calls: signInWithCustomToken(auth, customToken)
   └─> Firebase verifies token
   └─> User authenticated in app

6. USER LOGGED IN
   └─> App can now use Firebase session
   └─> User data available in app
```

### Gestion des erreurs

À chaque étape, les erreurs sont loggées et l'utilisateur est redirigé avec `status=failure` :

```
Redirect to: redirect_uri?status=failure&error=<error_message>
```

Erreurs possibles :
- `Missing code or state`
- `Invalid state parameter`
- `Failed to exchange code for token`
- `Unable to retrieve email`
- `Firebase authentication failed`

---

## Structure du projet

```
authentificator/
├── api/
│   ├── auth/
│   │   ├── google.js ..................... OAuth Google init
│   │   └── github.js ..................... OAuth GitHub init
│   ├── callback/
│   │   ├── google.js ..................... Google callback + Firebase token
│   │   └── github.js ..................... GitHub callback + Firebase token
│   ├── admin/
│   │   ├── stats.js ...................... Endpoint statistiques
│   │   └── clean.js ...................... Nettoyage données
│   └── lib/
│       ├── firebase.js ................... Firebase Admin SDK init
│       └── prisma.js ..................... Client Prisma
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── ...
│   ├── App.jsx
│   └── main.jsx
│
├── prisma/
│   ├── schema.prisma ..................... Schema base de données
│   └── migrations/ ....................... Migrations
│
├── public/
│   └── ... (assets statiques)
│
├── .env.development.local ............... Variables d'env local
├── package.json
├── vite.config.js
├── tailwind.config.js
├── prisma.schema
│
├── README.md ............................ Guide basique
├── DOCS.md .............................. Guide intégration
├── FIREBASE_SETUP.md .................... Configuration Firebase
├── FIREBASE_QUICK_START.md .............. Démarrage rapide Firebase
└── PROJET.md ............................ Ce fichier (guide complet)
```

---

## Déploiement et configuration

### Déploiement initial sur Vercel

```bash
# 1. Créer un projet Vercel
vercel

# 2. Définir les variables d'environnement
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
vercel env add GITHUB_CLIENT_ID
vercel env add GITHUB_CLIENT_SECRET
vercel env add DATABASE_URL
vercel env add FIREBASE_PROJECT_ID
# ... et les autres variables Firebase

# 3. Déployer
vercel deploy --prod
```

### Configuration OAuth Providers

#### Google Cloud Console
1. Aller sur [Google Cloud Console](https://console.cloud.google.com)
2. Créer un nouveau projet
3. Activer l'API Google+ ou Google Identity
4. Créer une clé OAuth 2.0 (Web Application)
5. Ajouter URIs autorisées :
   - `https://accounts.google.com/o/oauth2/auth`
   - Callback (local) : `http://localhost:5173/api/callback/google`
   - Callback (prod) : `https://<your-vercel-domain>/api/callback/google`

#### GitHub Developer Settings
1. Aller sur [GitHub Settings → Developer settings](https://github.com/settings/developers)
2. Créer une nouvelle OAuth App
3. Configurer :
   - Authorization callback URL (local) : `http://localhost:5173/api/callback/github`
   - Authorization callback URL (prod) : `https://<your-vercel-domain>/api/callback/github`

#### Firebase Console
1. Aller sur [Firebase Console](https://console.firebase.google.com)
2. Créer un nouveau projet
3. Aller à Project Settings → Service Accounts
4. Générer une nouvelle clé privée
5. Télécharger le JSON (utilisé pour les variables d'env)

### Base de données - Migrations

```bash
# Créer une migration après modification du schema.prisma
npx prisma migrate dev --name add_new_table

# Générer le client Prisma
npx prisma generate

# Voir la base de données
npx prisma studio
```

---

## Sécurité

### Mesures de sécurité implémentées

1. **Protection CSRF**
   - État encodé en base64 transmis lors du flux OAuth
   - Validation de l'état au callback

2. **Tokens sécurisés**
   - Firebase Custom Tokens : Signés par Firebase
   - Durée de vie courte (~1 heure)
   - Validation backend par Firebase

3. **Variables d'environnement**
   - Secrets stockés dans Vercel (jamais en git)
   - Fichier serviceAccountKey.json ignoré par git

4. **HTTPS enforced**
   - Tous les endpoints fonctionnent en HTTPS
   - URLs de callback validées

5. **Validation des entrées**
   - Paramètres `app` et `redirect_uri` validés
   - Emails validés avant traitement

6. **Logging sécurisé**
   - Tokens ne sont jamais loggés
   - Informations sensibles masquées dans les logs

### Bonnes pratiques

- Ne jamais commiteer `.env.development.local`
- Rotation régulière des secrets OAuth
- Vérifier les permissions OAuth demandées
- Auditer les logs d'authentification
- Utiliser des URLs HTTPS pour redirect_uri

---

## Intégration Firebase

### Pourquoi Firebase ?

Firebase Custom Tokens offrent :
- ✅ Tokens courts et sécurisés
- ✅ Validation backend automatique
- ✅ Gestion centralisée des sessions
- ✅ Scalabilité enterprise
- ✅ Intégration avec Firestore/Realtime DB

### Flux Firebase

```
AUTHENTIFICATOR                FIREBASE
       │                          │
       ├─> Admin SDK init         │
       │   (serviceAccountKey)     │
       │                          │
       ├─> createCustomToken      │
       │   (userId)               │
       │                          │
       │                          │◄─ Sign token with private key
       │                          │
       ◄──────── customToken ──────┤
       │                          │
       └─> Send to client         │
           (via redirect URL)     │
           
CLIENT                          FIREBASE
       │                          │
       ├─> Receive customToken    │
       │                          │
       ├─> signInWithCustomToken  │
       │   (token)                │
       │                          │
       │                          ├─> Verify signature
       │                          ├─> Check expiration
       │                          ├─> Create session
       │                          │
       ◄─── idToken, userData ────┤
       │                          │
       └─> Authenticated !        │
```

### Configuration initiale

1. **Créer projet Firebase**
   - Firebase Console → Nouveau projet
   - Activer Authentication
   - Activer Sign-in method: Custom token

2. **Télécharger serviceAccountKey.json**
   - Project Settings → Service Accounts
   - Generate New Private Key
   - Sauvegarder en sécurité

3. **Configurer les variables d'env**
   - Voir section "Variables d'environnement"

4. **Tester localement**
   ```bash
   cp ~/Downloads/serviceAccountKey.json ./
   npm run dev
   # Tester /api/auth/google
   ```

---

## Troubleshooting

### Erreur : "Cannot read properties of undefined (reading 'length')"
**Solution :** Firebase Admin SDK non initialisé
- Vérifier `serviceAccountKey.json` ou variables d'env
- Voir `FIREBASE_CRITICAL_FIX.md`

### Erreur : "Invalid redirect_uri"
**Solution :** Callback URLs non configurées dans OAuth providers
- Ajouter l'URL Vercel dans Google Cloud Console
- Ajouter l'URL Vercel dans GitHub Developer Settings

### Erreur : "Database connection failed"
**Solution :** DATABASE_URL manquante ou invalide
- Vérifier la connection string Neon
- Format : `postgresql://user:password@host:5432/db`

### User ne reçoit pas le token
**Solution :** Vérifier les logs
- Aller dans Vercel Dashboard → Functions Logs
- Chercher les erreurs `[Firebase]` ou `[Callback]`

---

## Liens utiles

### Documentation
- [OAuth 2.0 Flow](https://tools.ietf.org/html/rfc6749)
- [Firebase Custom Tokens](https://firebase.google.com/docs/auth/admin/create-custom-tokens)
- [Prisma ORM](https://www.prisma.io/docs)
- [Neon PostgreSQL](https://neon.tech/docs)
- [Vercel Functions](https://vercel.com/docs/functions/serverless-functions)

### Consoles d'administration
- [Google Cloud Console](https://console.cloud.google.com)
- [GitHub Developer Settings](https://github.com/settings/developers)
- [Firebase Console](https://console.firebase.google.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Neon Console](https://console.neon.tech)

### Code
- Repository: `Archlord12345/AUTHENTIFICATOR`
- Branch de développement: `v0/raveliop12345-fccec984`

---

## Maintenance et évolution

### Tâches régulières
- Monitorer les logs Vercel
- Vérifier les stats d'authentification
- Nettoyer les vieilles sessions (API `/admin/clean`)
- Mettre à jour les dépendances npm
- Renouveler les secrets OAuth

### Évolutions futures
- [ ] Support d'autres providers (Microsoft, Apple, SAML)
- [ ] 2FA/MFA
- [ ] Gestion des rôles et permissions
- [ ] API GraphQL
- [ ] SDK clients (JS, React, Vue)

---

**Version :** 1.0  
**Dernière mise à jour :** Juin 2024  
**Maintenu par :** Équipe AUTHENTIFICATOR
