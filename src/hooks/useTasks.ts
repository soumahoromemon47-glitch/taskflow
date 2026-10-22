"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { loadTasks, saveTasks } from "@/lib/storage";
import type { Task, TaskFilter } from "@/types/task";

/**
 * Logique métier de la todo list : chargement, persistance et mutations.
 */
export function useTasks() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // Chargement initial : on n'utilise pas `useState(loadTasks())` car
  // l'initialiseur serait aussi exécuté côté serveur, ce qui créerait un
  // écart d'hydratation. L'état `isLoaded` garantit par ailleurs qu'on
  // n'écrase pas le localStorage avec un tableau vide avant le chargement.
  /* eslint-disable react-hooks/set-state-in-effect -- synchronisation avec localStorage au montage */
  useEffect(() => {
    setAllTasks(loadTasks());
    setIsLoaded(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    saveTasks(allTasks);
  }, [allTasks, isLoaded]);

  const tasks = useMemo(() => {
    switch (filter) {
      case "active":
        return allTasks.filter((task) => !task.completed);
      case "completed":
        return allTasks.filter((task) => task.completed);
      default:
        return allTasks;
    }
  }, [allTasks, filter]);

  const addTask = useCallback((title: string) => {
    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0) {
      return;
    }
    const task: Task = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      completed: false,
      createdAt: Date.now(),
    };
    setAllTasks((previous) => [task, ...previous]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setAllTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setAllTasks((previous) => previous.filter((task) => task.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setAllTasks((previous) => previous.filter((task) => !task.completed));
  }, []);

  return {
    tasks,
    allTasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  };
}

