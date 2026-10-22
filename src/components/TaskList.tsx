"use client";

import type { Task, TaskFilter } from "@/types/task";

import TaskItem from "./TaskItem";

interface TaskListProps {
  /** Tâches à afficher, déjà filtrées par le hook. */
  tasks: Task[];
  /** Filtre actuellement appliqué. */
  filter: TaskFilter;
  /** Callback de changement de filtre. */
  onFilterChange: (filter: TaskFilter) => void;
  /** Callback de bascule du statut d'une tâche. */
  onToggle: (id: string) => void;
  /** Callback de suppression d'une tâche. */
  onDelete: (id: string) => void;
  /** Callback de suppression de toutes les tâches terminées. */
  onClearCompleted: () => void;
  /** Nombre de tâches actives. */
  activeCount: number;
  /** Nombre de tâches terminées. */
  completedCount: number;
}

/** Message affiché quand la liste filtrée est vide, selon le filtre courant. */
const EMPTY_MESSAGES: Record<TaskFilter, string> = {
  all: "Aucune tâche pour l'instant. Ajoutez-en une !",
  active: "Aucune tâche active.",
  completed: "Aucune tâche terminée.",
};

/** Filtres proposés dans la barre de filtres. */
const FILTER_OPTIONS: ReadonlyArray<{ value: TaskFilter; label: string }> = [
  { value: "all", label: "Toutes" },
  { value: "active", label: "Actives" },
  { value: "completed", label: "Terminées" },
];

/**
 * Liste des tâches : rendu de la liste filtrée, barre de filtres et compteur.
 * Composant UI pur : il ne contient aucune logique métier et n'accède pas au stockage.
 */
export default function TaskList({
  tasks,
  filter,
  onFilterChange,
  onToggle,
  onDelete,
  onClearCompleted,
  activeCount,
  completedCount,
}: TaskListProps) {
  // Pluriel du compteur : « 1 tâche restante » / « 3 tâches restantes ».
  const remainingLabel =
    activeCount === 1 ? "1 tâche restante" : `${activeCount} tâches restantes`;

  return (
    <div>
      {tasks.length === 0 ? (
        <p className="py-16 text-center text-[15px] text-stone-400">{EMPTY_MESSAGES[filter]}</p>
      ) : (
        <ul className="flex flex-col gap-3" aria-label="Liste des tâches">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </ul>
      )}

      <div className="mt-6 grid grid-cols-3 items-center gap-2">
        <span className="justify-self-start text-xs uppercase tracking-wider text-stone-500">
          {remainingLabel}
        </span>

        <div
          className="flex justify-self-center gap-1"
          role="group"
          aria-label="Filtrer les tâches"
        >
          {FILTER_OPTIONS.map((option) => {
            const isActive = filter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onFilterChange(option.value)}
                aria-pressed={isActive}
                className={
                  isActive
                    ? "rounded-full bg-stone-900 px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors"
                    : "rounded-full bg-transparent px-3.5 py-1.5 text-[13px] font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
                }
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {completedCount > 0 && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="justify-self-end text-xs text-stone-500 transition-colors hover:text-red-600"
          >
            Effacer les terminées
          </button>
        )}
      </div>
    </div>
  );
}

