import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/types';

interface TaskState {
  tasks: Task[];
  filters: {
    priority: Task['priority'] | null;
  };
}

const initialState: TaskState = {
  tasks: [],
  filters: {
    priority: null,
  },
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setPriorityFilter: (state, action: PayloadAction<Task['priority'] | null>) => {
      state.filters.priority = action.payload;
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, setPriorityFilter } = taskSlice.actions;
export default taskSlice.reducer;