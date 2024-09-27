'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Clock } from 'lucide-react';

interface Task {
  title: string;
  description: string;
  skills: string[];
  deadline: string;
  status: 'in-progress' | 'completed' | 'pending';
  contributors: { name: string; department: string }[];
}

function getStatusColor(status: Task['status']) {
  switch (status) {
    case 'in-progress': return 'bg-[#0091DA]';
    case 'completed': return 'bg-[#00A3A1]';
    case 'pending': return 'bg-[#483698]';
    default: return 'bg-gray-500';
  }
}

interface TaskDetailProps {
  task: Task;
}

export default function TaskDetailCoordinator({ task }: TaskDetailProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#00338D] mb-8">Task Details</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-[#005EB8]">{task.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{task.description}</p>
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 mr-2 text-[#005EB8]" />
              <span>Deadline: {task.deadline}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {task.skills.map((skill, index) => (
                <Badge key={index} className="bg-[#470A68]">{skill}</Badge>
              ))}
            </div>
            <Badge className={`${getStatusColor(task.status)} text-white`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </Badge>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-[#005EB8]">Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            {task.contributors.map((contributor, index) => (
              <div key={index} className="flex items-center mb-4 last:mb-0">
                <User className="w-8 h-8 mr-4 text-[#00338D]" />
                <div>
                  <p className="font-semibold">{contributor.name}</p>
                  <p className="text-sm text-gray-600">{contributor.department}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-[#005EB8] hover:bg-[#00338D] text-white">
            Submit Feedback
          </Button>
        </div>
      </div>
    </div>
  );
}
