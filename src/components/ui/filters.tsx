'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setPriorityFilter } from '@/lib/store/taskSlice';
import { RootState } from '@/lib/store/store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from '@/types';

export function Filters() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filters.priority);

  const handlePriorityChange = (value: string) => {
    if (value === 'all') {
      dispatch(setPriorityFilter(null));
    } else {
      dispatch(setPriorityFilter(value as Task['priority']));
    }
  };

  return (
    <div className="flex gap-2">
      <Select
        value={currentFilter || 'all'}
        onValueChange={handlePriorityChange}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}