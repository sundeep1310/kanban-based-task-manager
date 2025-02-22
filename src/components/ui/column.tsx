'use client';

import { useDroppable } from '@dnd-kit/core';
import { Task } from '@/types';
import { TaskCard } from './task-card';

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

export function Column({ id, title, tasks }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div 
      className="w-80 flex-shrink-0 bg-muted/50 dark:bg-muted rounded-lg p-4"
      style={{
        minHeight: '500px'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold capitalize text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground">{tasks.length}</span>
      </div>
      <div 
        ref={setNodeRef}
        className={`space-y-2 min-h-[200px] transition-colors ${isOver ? 'bg-muted/80' : ''}`}
      >
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}