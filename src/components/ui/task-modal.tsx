'use client';

import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Task } from "@/types";
import { updateTask } from "@/lib/store/taskSlice";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TaskModalProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskModal({ task, open, onOpenChange }: TaskModalProps) {
  const dispatch = useDispatch();

  const editor = useEditor({
    extensions: [StarterKit],
    content: task.description,
    onUpdate: ({ editor }) => {
      dispatch(updateTask({
        ...task,
        description: editor.getHTML(),
      }));
    },
  });

  const handlePriorityChange = (value: string) => {
    dispatch(updateTask({
      ...task,
      priority: value as Task['priority'],
    }));
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTask({
      ...task,
      dueDate: new Date(e.target.value).toISOString(),
    }));
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTask({
      ...task,
      assignee: e.target.value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={task.priority}
              onValueChange={handlePriorityChange}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={task.dueDate.split('T')[0]}
              onChange={handleDueDateChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              value={task.assignee}
              onChange={handleAssigneeChange}
            />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <div className="min-h-[200px] border rounded-md p-3">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}