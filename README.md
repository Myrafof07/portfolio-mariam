# 🚀 Portfolio Mariam - UE7 Compliant

> Site portfolio personnel full-stack construit avec React, Node.js, MongoDB et Tailwind CSS. 
> Conforme RGPD et UE7 avec admin panel dynamique.

🔗 **[Voir le site en ligne](https://portfolio-mariam-steel.vercel.app)**

---

## 📋 Table des matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Stack technologique](#stack-technologique)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Structure du projet](#structure-du-projet)
- [API Routes](#api-routes)
- [Dépendances](#dépendances)
- [Déploiement](#déploiement)

---

## 📝 Description

Ce projet est un **portfolio professionnel full-stack** qui combine :

### Frontend
- Interface moderne et responsive avec React 19 + Vite
- Animations fluides (Framer Motion, Three.js pour la 3D)
- Design glass-morphism avec Tailwind CSS
- Pages légales complètes (RGPD, cookies, mentions légales)

### Backend
- API REST Express.js sécurisée
- Base de données MongoDB avec Mongoose
- Authentification JWT pour l'admin
- Formulaire de contact avec validation et email
- Rate-limiting et protection CSRF

### Admin Panel
- Interface CRUD pour les projets et compétences
- Gestion des messages de contact
- Authentification sécurisée

---

## ✨ Fonctionnalités

### Public
- ✅ Design responsive et accessible (mobile/desktop/tablet)
- ✅ Sections dynamiques : Hero, About, Projects, Skills, Contact
- ✅ Animations 3D (Three.js)
- ✅ Formulaire de contact avec validation côté client ET serveur
- ✅ Pages légales complètes (RGPD, Privacy, Cookies)
- ✅ Performance optimisée

### Admin
- ✅ Authentification JWT sécurisée
- ✅ CRUD Projets (créer, lire, modifier, supprimer)
- ✅ CRUD Compétences avec niveaux
- ✅ Visualisation des messages de contact
- ✅ Fallback aux données locales si API indisponible

### Sécurité
- ✅ HTTPS (production)
- ✅ Helmet pour les headers sécurisés
- ✅ CORS configuré
- ✅ Rate-limiting (5 tentatives/10min pour contact)
- ✅ Validation des données (express-validator)
- ✅ Passwords hashés (bcryptjs)
- ✅ JWT pour l'authentification
- ✅ Protection contre l'injection SQL/XSS

---

## 🛠 Stack technologique

### Frontend
| Technologie | Version | Utilisation |
|------------|---------|-------------|
| **React** | 19.x | Framework UI |
| **Vite** | 7.2.x | Build tool |
| **Tailwind CSS** | 4.x | Styling |
| **Framer Motion** | - | Animations |
| **Three.js** | - | 3D graphics |
| **React Router** | 6.x | Navigation |
| **React Icons** | - | Icônes |

### Backend
| Technologie | Version | Utilisation |
|------------|---------|-------------|
| **Node.js** | 18+ | Runtime |
| **Express** | 5.2.x | Framework HTTP |
| **MongoDB** | - | Base de données |
| **Mongoose** | 9.x | ODM |
| **JWT** | 9.x | Authentification |
| **bcryptjs** | 3.x | Hash passwords |
| **Nodemailer** | 7.x | Emails |
| **Helmet** | 8.x | Sécurité headers |
| **express-rate-limit** | 8.x | Rate limiting |

---

## 📦 Installation

### Prérequis
- Node.js 18+
- npm ou yarn
- MongoDB (local ou Atlas)

### Clone le projet
```bash
git clone https://github.com/mariamfofana/portfolio-mariam.git
cd portfolio-mariam
```

### Frontend
```bash
npm install
npm run dev
```
Accès : `http://localhost:5173`

### Backend
```bash
cd server
npm install
npm run dev
```
Accès API : `http://localhost:4000/api`

---

## ⚙️ Configuration

### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000/api
```

### Backend (server/.env)
```env
PORT=4000
NODE_ENV=development

# MongoDB (optionnel, fallback en mémoire si absent)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio

# JWT
JWT_SECRET=your-super-secret-key-change-in-production

# Email (optionnel, simule si absent)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
MAIL_FROM=noreply@portfolio.com
MAIL_TO=your-email@gmail.com

# CORS
CLIENT_URL=http://localhost:5173,https://portfolio-mariam.vercel.app
```

---

## 🚀 Usage

### Développement Frontend
```bash
npm run dev      # Démarre en dev mode
npm run build    # Build pour production
npm run preview  # Prévisualise la build
npm run lint     # Eslint
```

### Développement Backend
```bash
cd server
npm run dev      # Démarre avec nodemon
npm start        # Prod mode
```

### Test des routes API
Trois options disponibles :

#### 1️⃣ Page de test React
- Accès : `http://localhost:5173/test-api`
- Clique sur "Lancer tous les tests"
- Visualise les résultats

#### 2️⃣ Extension REST Client VS Code
- Installe : **REST Client** (Huachao Mao)
- Ouvre : `test-api.http`
- Clique : **"Send Request"** sur chaque requête

#### 3️⃣ Commandes curl
```bash
# Health check
curl http://localhost:4000/api/health

# Get projects
curl http://localhost:4000/api/projects

# Get skills
curl http://localhost:4000/api/skills

# Post contact
curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello","consent":true}'

# Admin login
curl -X POST http://localhost:4000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

---

## 📁 Structure du projet

```
portfolio-mariam/
├── public/
│   └── Mariam_Fofana_CV.pdf
├── src/
│   ├── api/
│   │   └── apiClient.js              # Client API centralisé
│   ├── admin/
│   │   ├── AdminLogin.jsx            # Page login admin
│   │   ├── AdminDashboard.jsx        # Dashboard principal
│   │   ├── ProjectsManager.jsx       # CRUD projets
│   │   ├── SkillsManager.jsx         # CRUD compétences
│   │   ├── MessagesViewer.jsx        # Visualisation messages
│   │   └── TestAPI.jsx               # Tests interactifs
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── GlassCard.jsx
│   │   ├── FormContact.jsx
│   │   └── useScrollSpy.js
│   ├── hooks/
│   │   ├── useForm.js                # Gestion formulaires
│   │   └── useFetch.js               # Fetch données + fallback
│   ├── data/
│   │   ├── projects.js               # Données par défaut
│   │   └── skills.js
│   ├── sections/
│   │   ├── Landing3D.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Legal.jsx                 # Pages légales
│   ├── styles/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── config/
│   │   └── db.js                     # Connexion MongoDB
│   ├── controllers/
│   │   ├── contactController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js                   # JWT + roles
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── models/
│   │   ├── Contact.js
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   └── Users.js
│   ├── routes/
│   │   ├── contact.js                # POST /contact
│   │   ├── admin.js                  # Routes admin protégées
│   │   └── publics.js                # GET /projects, /skills
│   ├── utils/
│   │   ├── logger.js
│   │   └── sendEmail.js
│   ├── server.js                     # Entry point
│   ├── package.json
│   └── .env
├── test-api.http                     # Requêtes pour REST Client
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🔌 API Routes

### Routes Publiques

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/health` | Health check du serveur |
| `GET` | `/api/projects` | Liste les projets |
| `GET` | `/api/skills` | Liste les compétences |
| `POST` | `/api/contact` | Envoie un message de contact |

### Routes Admin (Protégées JWT)

#### Authentication
| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/admin/login` | Authentification admin |

#### Projets
| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/admin/projects` | Liste (admin) |
| `POST` | `/api/admin/projects` | Créer |
| `PATCH` | `/api/admin/projects/:id` | Modifier |
| `DELETE` | `/api/admin/projects/:id` | Supprimer |

#### Compétences
| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/admin/skills` | Liste (admin) |
| `POST` | `/api/admin/skills` | Créer |
| `PATCH` | `/api/admin/skills/:id` | Modifier |
| `DELETE` | `/api/admin/skills/:id` | Supprimer |

#### Messages
| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/admin/messages` | Liste les messages de contact |

---

## 📦 Dépendances

### Frontend (src/package.json)
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.x",
    "framer-motion": "^11.x",
    "three": "^r128.x",
    "react-icons": "^4.x"
  },
  "devDependencies": {
    "vite": "^7.2.x",
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^4.x",
    "postcss": "^8.x"
  }
}
```

### Backend (server/package.json)
```json
{
  "dependencies": {
    "express": "^5.2.1",
    "mongoose": "^9.1.5",
    "jsonwebtoken": "^9.0.3",
    "bcryptjs": "^3.0.3",
    "nodemailer": "^7.0.12",
    "express-validator": "^7.3.1",
    "helmet": "^8.1.0",
    "cors": "^2.8.6",
    "express-rate-limit": "^8.2.1",
    "dotenv": "^17.2.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.11"
  }
}
```

---

## 🌐 Déploiement

### Frontend (Vercel)
```bash
# Vercel détecte automatiquement Vite
# Connecte le repo GitHub → Auto deploy
# Build: npm run build
# Start: npm run preview
```

### Backend (Railway/Render)
```bash
# Connecte server/ folder
# Build: npm install
# Start: npm start
```

### Env Variables Production
```env
NODE_ENV=production
JWT_SECRET=generate-a-strong-secret
MONGODB_URI=your-production-mongo-uri
SMTP_HOST/SMTP_USER/SMTP_PASS=configure-smtp
CLIENT_URL=https://your-domain.com
```

---

## ✅ Conformité

### RGPD ✅
- ✅ Politique de confidentialité complète
- ✅ Consentement explicite pour les données
- ✅ Droit à l'oubli (endpoint à ajouter)
- ✅ Données conservées 1 an max
- ✅ Emails sécurisés avec JWT

### UE7 ✅
- ✅ Portfolio responsif
- ✅ Formulaire de contact
- ✅ Admin panel CRUD
- ✅ Page légale
- ✅ Sécurité backend

### Accessibilité
- ✅ Sémantique HTML correcte
- ✅ ARIA labels
- ✅ Contraste adéquat
- ✅ Navigation au clavier

---

## 🤝 Contribution

Ce projet est personnel. Les contributions externe ne sont pas acceptées.

---

## 📧 Contact

**Mariam Fofana**
- Email : mf8013006@gmail.com
- GitHub : [github.com/mariamfofana](https://github.com/mariamfofana)
- Portfolio : [portfolio-mariam.vercel.app](https://portfolio-mariam.vercel.app)

---

## 📄 License

Ce projet est propriétaire. Tous droits réservés © 2024-2025 Mariam Fofana

---

## 🙏 Remerciements

- **React** & **Vite** pour l'excellent DX
- **Tailwind CSS** pour le styling
- **Framer Motion** & **Three.js** pour les animations
- **Express.js** & **MongoDB** pour le backend
- **Vercel** & **Railway** pour l'hosting

---

**Dernière mise à jour :** 27 janvier 2026

## Installation (développement)

1. Cloner le dépôt :

```bash
git clone <url-du-repo>
cd portfolio-mariam
```

2. Installer les dépendances :

```bash
npm install
```

3. Lancer le serveur de développement :

```bash
npm run dev
```

Ouvrir http://localhost:5173 (ou l'URL indiquée) pour voir le site en développement.

4. Lien github 

https://github.com/Myrafof07 


5. Lien du site 
https://portfolio-mariam-steel.vercel.app/

## Scripts usuels

- `npm run dev` : démarre le serveur de développement Vite
- `npm run build` : construit l'application pour la production
- `npm run preview` : sert la version build localement pour test

Vérifiez `package.json` pour les scripts exacts si besoin.

## Déploiement

Le site peut être déployé sur n'importe quel hébergeur statique (Netlify, Vercel, GitHub Pages, Surge). Procédure générale : générer le build (`npm run build`) puis déployer le contenu du dossier `dist/`.

