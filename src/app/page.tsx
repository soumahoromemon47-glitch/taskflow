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
      <div className="mx-auto max-w-2xl">
        <h1 className="text-5xl font-bold tracking-tighter text-stone-900">
          Mes tâches
        </h1>
        <p className="mt-2 text-stone-500">Restez organisé, une tâche à la fois.</p>

        <div className="mt-8">
          <TaskForm onAdd={addTask} />
        </div>

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
            totalCount={allTasks.length}
          />
        </div>
      </div>
    </main>
  );
}
