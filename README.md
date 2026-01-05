# Portfolio Mariam

> Site portfolio personnel construit avec Vite, React et Tailwind CSS.

## Description

Ce dépôt contient le site portfolio de Mariam : une landing moderne et responsive présentant une introduction, des projets, des compétences et un formulaire de contact. Le projet est développé avec une architecture de composants React (JSX) et utilise Tailwind pour le style.

## Fonctionnalités

- Design responsive pour mobile et desktop
- Sections : Hero, About, Projects, Skills, Contact
- Composants réutilisables dans `src/components`
- Composant 3D d'accueil dans `src/sections/Landing3D.jsx`
- Intégration Tailwind CSS et configuration Vite

## Stack technique

- Framework : React (Vite)
- Outils : Vite, npm
- Styling : Tailwind CSS
- Structure du code : composants React en JSX

## Arborescence importante
├─ public/
│  └─ Mariam_Fofana_CV.pdf
├─ src/
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ Footer.jsx
│  │  ├─ GlassCard.jsx
│  │  └─ useScrollSpy.js
│  ├─ sections/
│  │  ├─ Landing3D.jsx
│  │  ├─ Hero.jsx
│  │  ├─ About.jsx
│  │  ├─ Skills.jsx
│  │  ├─ Projects.jsx
│  │  └─ Contact.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ README.md
└─ package.json

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

## Scripts usuels

- `npm run dev` : démarre le serveur de développement Vite
- `npm run build` : construit l'application pour la production
- `npm run preview` : sert la version build localement pour test

Vérifiez `package.json` pour les scripts exacts si besoin.

## Déploiement

Le site peut être déployé sur n'importe quel hébergeur statique (Netlify, Vercel, GitHub Pages, Surge). Procédure générale : générer le build (`npm run build`) puis déployer le contenu du dossier `dist/`.

