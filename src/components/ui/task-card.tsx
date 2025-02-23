'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '@/types';
import { Trash2, GripVertical } from 'lucide-react';
import { TaskModal } from './task-modal';
import { cn } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { deleteTask } from '@/lib/store/taskSlice';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const priorityClasses = {
    'high': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
    'medium': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
    'low': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
  };

  const onDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Delete clicked', task.id);
    dispatch(deleteTask(task.id));
  };

  return (
    <>
      <div 
        ref={setNodeRef}
        style={style}
        className={cn(
          "bg-white dark:bg-card p-4 rounded-lg shadow-sm",
          "hover:shadow-md transition-all dark:border dark:border-border",
          "group touch-none relative"
        )}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute left-2 top-1/2 -translate-y-1/2 cursor-move p-2 hover:bg-gray-100 rounded-md"
        >
          <GripVertical className="h-4 w-4 text-gray-500" />
        </div>

        {/* Delete Button */}
        <button
          type="button"
          onClick={onDeleteClick}
          className="absolute top-2 right-2 p-2 rounded-md hover:bg-red-100 
                   dark:hover:bg-red-900/30 transition-colors z-10 cursor-pointer"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </button>

        {/* Content Area */}
        <div 
          className="pl-8 pr-8" 
          onClick={() => setIsModalOpen(true)}
        >
          <h3 className="font-medium text-foreground">{task.title}</h3>
          
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
      </div>

      <TaskModal
        task={task}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}