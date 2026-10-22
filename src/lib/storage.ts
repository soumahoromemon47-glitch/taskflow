import type { Task } from "@/types/task";

/** Clé utilisée pour persister les tâches dans le localStorage. */
const STORAGE_KEY = "taskflow.tasks";

/**
 * Garde de type : vérifie qu'une valeur inconnue correspond à la forme d'une Task.
 */
function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (
    !("id" in value) ||
    !("title" in value) ||
    !("completed" in value) ||
    !("createdAt" in value)
  ) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.completed === "boolean" &&
    typeof value.createdAt === "number"
  );
}

/**
 * Charge les tâches persistées dans le localStorage.
 * Retourne un tableau vide si le stockage est indisponible ou si les données
 * stockées sont corrompues ou mal formées.
 */
export function loadTasks(): Task[] {
  // Garde SSR : aucun accès à window en dehors du client
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    // On ne conserve que les entrées valides et on ignore les autres
    return (parsed as unknown[]).filter(isTask);
  } catch {
    // JSON corrompu ou localStorage inaccessible : on repart d'un état vide
    return [];
  }
}

/**
 * Sérialise puis persiste les tâches dans le localStorage.
 * Les erreurs d'écriture sont ignorées afin de ne pas interrompre l'application.
 */
export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Quota dépassé ou stockage indisponible : l'état reste uniquement en mémoire
  }
}

