'use client';

import { DndContext, DragOverlay, closestCorners, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { RootState } from '@/lib/store/store';
import { Task } from '@/types';
import { updateTask } from '@/lib/store/taskSlice';
import { TaskCard } from './task-card';
import { Column } from './column';

const columns = ['backlog', 'todo', 'in-progress', 'review', 'done'] as const;

export function Board() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const priorityFilter = useSelector((state: RootState) => state.tasks.filters.priority);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const filteredTasks = tasks.filter(task => 
    priorityFilter ? task.priority === priorityFilter : true
  );

  const onDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    // Only update if dropping into a different column
    if (activeTask && activeTask.status !== over.id) {
      dispatch(updateTask({
        ...activeTask,
        status: over.id as Task['status'],
      }));
    }

    setActiveTask(null);
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="flex gap-4 min-h-[calc(100vh-12rem)] overflow-x-auto pb-8">
        {columns.map(column => (
          <Column
            key={column}
            id={column}
            title={column}
            tasks={filteredTasks.filter(task => task.status === column)}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}