// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setTasks } from '@/lib/store/taskSlice';
import { Board } from '@/components/ui/board';
import { Filters } from '@/components/ui/filters';
import { ThemeToggle } from '../components/theme-toggle';
import { AddTaskDialog } from '../components/add-task-dialog';
import { Task } from '@/types';
import { UseQueryOptions } from '@tanstack/react-query';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface TodoResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

const taskStatuses = ['backlog', 'todo', 'in-progress', 'review', 'done'] as const;
const priorities = ['low', 'medium', 'high'] as const;

async function fetchTasks(): Promise<Task[]> {
  const res = await fetch('https://dummyjson.com/todos?limit=30'); // Increased limit
  if (!res.ok) throw new Error('Failed to fetch tasks');
  
  const data: TodoResponse = await res.json();
  
  return data.todos.map((todo) => ({
    id: todo.id.toString(),
    title: todo.todo,
    description: '',
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: taskStatuses[Math.floor(Math.random() * taskStatuses.length)],
    dueDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: ['John', 'Jane', 'Bob', 'Alice'][Math.floor(Math.random() * 4)],
  }));
}

export default function Home() {
  const dispatch = useDispatch();

  const queryOptions: UseQueryOptions<Task[], Error> = {
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    gcTime: 30 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  };
  
  const { isLoading, isError, data } = useQuery(queryOptions);

  useEffect(() => {
    if (data) {
      dispatch(setTasks(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading tasks...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">
          Failed to load tasks. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-foreground">Design Sprint</h1>
            <AddTaskDialog />
          </div>
          <div className="flex items-center gap-4">
            <Filters />
            <ThemeToggle />
          </div>
        </div>
        <Board />
      </div>
    </main>
  );
}