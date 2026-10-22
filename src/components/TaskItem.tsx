"use client";

import type { Task } from "@/types/task";

interface TaskItemProps {
  /** La tâche à afficher. */
  task: Task;
  /** Callback de bascule du statut (terminée / active). */
  onToggle: (id: string) => void;
  /** Callback de suppression. */
  onDelete: (id: string) => void;
}

/**
 * Ligne de la todo list : une tâche, sa case à cocher et son bouton de suppression.
 * Composant UI pur : aucune logique métier, aucun accès au stockage.
 */
export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  // Identifiant du titre, utilisé pour nommer la case à cocher via aria-labelledby.
  const titleId = `task-title-${task.id}`;

  return (
    <li className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-labelledby={titleId}
        className="h-5 w-5 shrink-0 cursor-pointer rounded-md border-stone-300 accent-stone-900"
      />
      <span
        id={titleId}
        className={`flex-1 min-w-0 break-words ${
          task.completed ? "line-through text-stone-400" : "text-stone-900"
        }`}
      >
        {task.title}
      </span>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Supprimer la tâche : ${task.title}`}
        className="text-stone-400 transition-colors hover:text-red-600"
      >
        ✕
      </button>
    </li>
  );
}

