export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
    dueDate: string;
    assignee: string;
  }