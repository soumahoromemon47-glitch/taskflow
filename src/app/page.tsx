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
    <main className="min-h-screen bg-stone-50 px-4 py-16 text-[15px] text-stone-900">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-10 text-4xl font-semibold tracking-tight text-stone-900">
          Mes tâches
        </h1>

        <TaskForm onAdd={addTask} />

        <div className="mt-8">
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
      </div>
    </main>
  );
}
