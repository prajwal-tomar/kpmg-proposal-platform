import { Suspense } from 'react';
import TaskDetailCoordinator from '@/components/task-detail-coordinator';

async function getTaskDetail(id: string) {
  // Fetch task data here
  // This is just a mock implementation
  return {
    title: "Financial Analysis",
    description: "Conduct a comprehensive financial analysis for the Q3 proposal.",
    skills: ["Finance", "Data Analysis"],
    deadline: "2023-07-15",
    status: "in-progress",
    contributors: [
      { name: "Alice Johnson", department: "Finance" },
      { name: "Bob Smith", department: "Accounting" },
    ]
  };
}

export default async function TaskDetailPage({ params }: { params: { id: string } }) {
  const task = await getTaskDetail(params.id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaskDetailCoordinator task={task} />
    </Suspense>
  );
}