"use client";

import { useRef, useState, type SubmitEvent } from "react";

interface TaskFormProps {
  /** Callback appelé avec le titre saisi, déjà nettoyé des espaces superflus. */
  onAdd: (title: string) => void;
}

/**
 * Formulaire de saisie d'une nouvelle tâche.
 * Composant UI pur : il ne contient aucune logique métier et n'accède pas au stockage.
 */
export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmedTitle = title.trim();
  const isEmpty = trimmedTitle.length === 0;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    // Empêche la soumission native du formulaire (rechargement de la page).
    event.preventDefault();

    // Titre vide ou composé uniquement d'espaces : on ne fait rien
    // et on laisse l'input inchangé pour que l'utilisateur corrige sa saisie.
    if (trimmedTitle.length === 0) {
      return;
    }

    onAdd(trimmedTitle);
    setTitle("");
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="task-input" className="sr-only">
        Ajouter une tâche
      </label>
      <input
        ref={inputRef}
        id="task-input"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Ajouter une tâche..."
        className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-[15px] text-stone-900 shadow-sm transition-all hover:shadow-md placeholder:text-stone-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
      <button
        type="submit"
        disabled={isEmpty}
        className="rounded-xl bg-indigo-600 px-5 py-2.5 text-[15px] font-medium text-white transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Ajouter
      </button>
    </form>
  );
}

