'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '@/types';
import { Trash2 } from 'lucide-react';
import { TaskModal } from './task-modal';
import { cn } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { deleteTask } from '@/lib/store/taskSlice';
import { Button } from './button';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const priorityClasses = {
    'high': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
    'medium': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
    'low': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={cn(
          "bg-white dark:bg-card p-4 rounded-lg shadow-sm cursor-move",
          "hover:shadow-md transition-all dark:border dark:border-border",
          isDragging && "opacity-50",
          "group touch-none"
        )}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-foreground">{task.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 h-6 w-6"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className={cn(
            "px-2 py-1 rounded text-xs",
            priorityClasses[task.priority]
          )}>
            {task.priority}
          </span>
          <span className="text-sm text-muted-foreground">{task.assignee}</span>
        </div>
        {task.dueDate && (
          <div className="text-xs text-muted-foreground mt-2">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>
      <TaskModal
        task={task}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}