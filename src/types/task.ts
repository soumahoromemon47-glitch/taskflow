/**
 * Représente une tâche de la todo list.
 */
export interface Task {
  /** Identifiant unique de la tâche, généré à la création. */
  id: string;
  /** Libellé saisi par l'utilisateur. */
  title: string;
  /** true lorsque la tâche est marquée comme terminée. */
  completed: boolean;
  /** Date de création en millisecondes depuis l'époque Unix (Date.now()). */
  createdAt: number;
}

/** Filtres disponibles pour restreindre la liste des tâches affichées. */
export type TaskFilter = "all" | "active" | "completed";

