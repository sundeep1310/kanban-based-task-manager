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
    const newStatus = over.id as Task['status'];

    if (activeTask && activeTask.status !== newStatus) {
      dispatch(updateTask({
        ...activeTask,
        status: newStatus,
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
        {columns.map(columnId => {
          const columnTasks = filteredTasks.filter(task => task.status === columnId);
          return (
            <Column
              key={columnId}
              id={columnId}
              title={columnId}
              tasks={columnTasks}
            />
          );
        })}
      </div>
      <DragOverlay>
        {activeTask && <TaskCard task={activeTask} />}
      </DragOverlay>
    </DndContext>
  );
}