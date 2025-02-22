# Kanban Board Application

A modern, responsive Kanban board built with Next.js, featuring drag-and-drop task management, dark mode support, and real-time filtering capabilities.

## Features

- **Drag and Drop**: Intuitive task management across different status columns
- **Dark Mode**: Full dark mode support with system preference detection
- **Priority Filtering**: Filter tasks by priority (High, Medium, Low)
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Instant UI updates when moving or modifying tasks
- **Task Management**: Add, edit, and delete tasks with ease

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS with shadcn/ui components
- **Drag and Drop**: dnd-kit
- **Data Fetching**: TanStack Query (React Query)
- **Theme**: next-themes for dark mode support

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd kanban-board
```

2. Install dependencies:
```bash
npm install
```

3. Install shadcn/ui components:
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── board.tsx
│   │   ├── column.tsx
│   │   ├── task-card.tsx
│   │   └── task-modal.tsx
│   ├── add-task-dialog.tsx
│   ├── theme-toggle.tsx
│   └── providers.tsx
├── lib/
│   ├── store/
│   │   ├── store.ts
│   │   └── taskSlice.ts
│   └── utils.ts
└── types/
    └── index.ts
```

## Key Features Explained

### Task Management
- Create new tasks with title, priority, due date, and assignee
- Edit task details through a modal interface
- Delete tasks with a confirmation dialog
- Drag and drop tasks between status columns

### Filtering
- Filter tasks by priority level
- Clear filters to view all tasks
- Real-time filtering without page reload

### Theme Support
- Light and dark mode support
- System preference detection
- Persistent theme selection

### Responsive Design
- Mobile-friendly interface
- Horizontal scrolling for columns on smaller screens
- Touch support for drag and drop
