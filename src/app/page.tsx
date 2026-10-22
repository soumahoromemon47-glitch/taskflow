"use client";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
  const {
    tasks,
    allTasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  } = useTasks();

  // Calcul trivial sur quelques dizaines de tâches : pas de useMemo nécessaire.
  const activeCount = allTasks.filter((task) => !task.completed).length;
  const completedCount = allTasks.length - activeCount;

  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Mes tâches</h1>

      <TaskForm onAdd={addTask} />

      <div className="mt-6">
        <TaskList
          tasks={tasks}
          filter={filter}
          onFilterChange={setFilter}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onClearCompleted={clearCompleted}
          activeCount={activeCount}
          completedCount={completedCount}
        />
      </div>
    </main>
  );
}
