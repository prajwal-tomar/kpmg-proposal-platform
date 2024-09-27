'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Clock, Upload } from 'lucide-react';

export default function TaskDetailContributor() {
  const [taskAccepted, setTaskAccepted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  // Mock task data (replace with actual data fetching logic)
  const task = {
    title: "Market Research Analysis",
    description: "Conduct a comprehensive market research analysis for the Q3 proposal, focusing on emerging trends in the tech industry.",
    skills: ["Market Research", "Data Analysis", "Report Writing"],
    deadline: "2023-08-15",
    steps: [
      { id: 1, description: "Review existing market reports", completed: false },
      { id: 2, description: "Conduct competitor analysis", completed: false },
      { id: 3, description: "Identify key market trends", completed: false },
      { id: 4, description: "Draft initial findings", completed: false },
      { id: 5, description: "Finalize and submit report", completed: false }
    ]
  };

  const handleAcceptTask = () => {
    setTaskAccepted(true);
    // Add logic to notify the system that the task has been accepted
  };

  const handleStepToggle = (stepId: number) => {
    const updatedSteps = task.steps.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );
    task.steps = updatedSteps;
    const completedSteps = updatedSteps.filter(step => step.completed).length;
    setProgress((completedSteps / updatedSteps.length) * 100);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
    // Add logic to handle file upload to server
  };

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
            <div className="mb-4">
              <strong>Skills Required:</strong>
              <ul className="list-disc list-inside">
                {task.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            {!taskAccepted && (
              <Button 
                className="bg-[#00A3A1] hover:bg-[#008C8A] text-white"
                onClick={handleAcceptTask}
              >
                Accept Task
              </Button>
            )}
          </CardContent>
        </Card>

        {taskAccepted && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-[#005EB8]">Progress Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-4" />
                {task.steps.map((step) => (
                  <div key={step.id} className="flex items-center space-x-2 mb-2">
                    <Checkbox 
                      id={`step-${step.id}`} 
                      checked={step.completed}
                      onCheckedChange={() => handleStepToggle(step.id)}
                    />
                    <Label htmlFor={`step-${step.id}`}>{step.description}</Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#005EB8]">Upload Deliverables</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="file-upload" className="block mb-2">Select file to upload:</Label>
                <div className="flex items-center space-x-4">
                  <Input 
                    id="file-upload" 
                    type="file" 
                    onChange={handleFileUpload}
                    className="flex-grow"
                  />
                  <Button className="bg-[#005EB8] hover:bg-[#00338D] text-white">
                    <Upload className="w-4 h-4 mr-2" /> Upload
                  </Button>
                </div>
                {file && <p className="mt-2 text-sm text-gray-600">Selected file: {file.name}</p>}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
