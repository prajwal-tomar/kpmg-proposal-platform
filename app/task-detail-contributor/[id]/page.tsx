import TaskDetailContributor from '@/components/task-detail-contributor';

interface TaskDetailPageProps {
  params: {
    id: string;
  };
}

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
  return (
    <div>
      <TaskDetailContributor taskId={params.id} />
    </div>
  );
}
