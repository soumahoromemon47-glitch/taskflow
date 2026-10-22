# TaskFlow

Une todo list simple, rapide et persistante. Construite en **vibecoding** avec [Cline](https://cline.bot) dans VS Code.

🔗 **Démo en ligne** : [taskflow-lime-two.vercel.app](https://taskflow-lime-two.vercel.app/)

## ✨ Fonctionnalités

- Ajout / suppression / toggle de tâches
- Filtres : Toutes / Actives / Terminées
- Persistance automatique dans `localStorage`
- Compteur de tâches restantes
- Effacer les tâches terminées
- Accessibilité (labels, `aria-*`, `sr-only`)
- Mode clair uniquement, design minimal éditorial

## 🛠️ Stack technique

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript** (strict, aucun `any`)
- **Tailwind CSS v4**
- **`localStorage`** (pas de backend)

## 🏗️ Architecture

```text
src/
├── app/         → pages et layout Next.js
├── components/  → composants UI purs (aucune logique métier)
├── hooks/       → logique métier (useTasks)
├── lib/         → utilitaires (storage localStorage)
└── types/       → types TypeScript partagés
```

Séparation stricte : les composants ne touchent jamais au stockage, la logique est centralisée dans le hook `useTasks`.

## 🔧 Choix techniques

- **Aucun backend.** L'application est entièrement statique ; toutes les données vivent dans le `localStorage` du navigateur. Aucun serveur, aucune base, aucun compte utilisateur.
- **Aucune librairie d'état** (Redux, Zustand…). Un unique hook `useTasks` suffit et rend le flux de données explicite.
- **Stockage isolé dans `lib/storage.ts`.** La lecture et l'écriture du `localStorage` sont centralisées et typées ; les composants n'y ont jamais accès.
- **Composants UI purs.** `TaskForm`, `TaskItem` et `TaskList` ne contiennent que du JSX : ils reçoivent des props et déclenchent des callbacks, sans jamais muter d'état.
- **Typage strict.** Le mode `strict` de TypeScript est activé et le mot-clé `any` est banni du code applicatif ; les valeurs non typées sont traitées en `unknown`.

## ♿ Accessibilité

- Chaque champ de formulaire est associé à un `<label>` (visuellement masqué via `sr-only`).
- Les filtres utilisent `role="group"` avec un `aria-label`, et chaque bouton expose son état via `aria-pressed`.
- Chaque case à cocher est nommée par son texte de tâche via `aria-labelledby`.
- Le bouton de suppression porte un `aria-label` décrivant la tâche concernée.
- Le focus clavier reste visible et l'ordre de tabulation suit l'ordre visuel.

## 🚀 Lancer en local

```bash
git clone https://github.com/soumahoromemon47-glitch/taskflow.git
cd taskflow
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## 📜 Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Serveur de développement (Turbopack) |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | ESLint |

## 🧠 Vibecoding

Ce projet a été construit en pilotant un agent IA (Cline) avec un workflow structuré :

- Fichier de contexte (`.clinerules/`) décrivant l'architecture et les conventions
- Petites étapes validables une par une
- Relecture systématique du code généré avant écriture
- Commits atomiques (un concern par commit)
- Tests automatiques (ESLint + TypeScript + build Next.js)

## 📋 Statut du projet

- Mode clair uniquement (aucun thème sombre).
- Aucune suite de tests unitaires : la validation repose sur ESLint, le compilateur TypeScript et le build de production.
- Les tâches sont stockées localement dans le navigateur : vider les données du site les supprime.

## 📄 Licence

MIT

