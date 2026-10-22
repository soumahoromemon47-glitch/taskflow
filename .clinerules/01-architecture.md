# Contexte du projet : TaskFlow

## Objectif

Application de gestion de tâches (todo list) avec :

- Ajout / suppression / toggle de tâches
- Filtres : toutes / actives / terminées
- Persistance dans localStorage (pas de backend)

## Stack technique

- Next.js 16 (App Router) avec TypeScript
- Tailwind CSS pour le style
- Aucune dépendance externe supplémentaire (pas de Redux, Zustand, etc.)
- Stockage : localStorage uniquement

## Architecture des dossiers

- `src/app/` : pages et layouts Next.js
- `src/components/` : composants UI purs (pas de logique métier, pas d'appels à localStorage)
- `src/hooks/` : logique métier réutilisable (ex: `useTasks`)
- `src/types/` : types TypeScript partagés (ex: `Task`)
- `src/lib/` : utilitaires purs (ex: `storage.ts`)

## Conventions de code

- Composants : `export default function NomDuComposant()`
- Fichiers composants : PascalCase (`TaskForm.tsx`)
- Fichiers hooks/utils : camelCase (`useTasks.ts`, `storage.ts`)
- Types : interfaces pour les objets, `type` pour les unions
- Jamais de `any` — utiliser `unknown` si nécessaire
- `const` par défaut, `let` si réassignation
- Commentaires en français
- Pas de `console.log` dans le code final (uniquement pour déboguer)

## Règles pour l'IA

1. **Toujours** lire ce fichier avant de générer du code.
2. **Ne jamais** réécrire un fichier entier sans me montrer un diff avant.
3. **Demander confirmation** avant de créer un nouveau fichier non listé dans l'architecture.
4. Proposer des **petites étapes** plutôt que tout générer d'un coup.
5. Respecter la séparation des responsabilités : UI dans `components`, logique dans `hooks`, utilitaires dans `lib`.
