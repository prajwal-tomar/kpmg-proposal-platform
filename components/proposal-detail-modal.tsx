import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Task {
  title: string;
  description: string;
  status?: string;
}

interface ProposalDetailModalProps {
  proposal: {
    id: string;
    title: string;
    description: string;
    skills: string[];
    domains: string[];
    deadline: string;
    tasks: Task[] | string;
    created_at: string;
    status: string;
    contributor_id: string;
    contributor_name: string; // Add this line
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProposalDetailModal({ proposal, isOpen, onClose }: ProposalDetailModalProps) {
  // Remove the useState and useEffect hooks for fetching contributor name

  if (!proposal) return null;

  const renderTasks = (tasks: Task[] | string) => {
    let tasksArray: Task[] = [];
    if (typeof tasks === 'string') {
      try {
        tasksArray = JSON.parse(tasks);
      } catch {
        console.error('Failed to parse tasks');
        return null;
      }
    } else {
      tasksArray = tasks;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
        {tasksArray.map((task, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-md font-semibold">{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{task.description}</p>
              {task.status && <Badge className="mt-2">{task.status}</Badge>}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#00338D]">{proposal.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Description</h3>
            <p>{proposal.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {proposal.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Domains</h3>
            <div className="flex flex-wrap gap-2">
              {proposal.domains.map((domain, index) => (
                <Badge key={index} variant="secondary">{domain}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Deadline</h3>
            <p>{new Date(proposal.deadline).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Tasks</h3>
            {renderTasks(proposal.tasks)}
          </div>
          <div>
            <h3 className="font-semibold">Created At</h3>
            <p>{new Date(proposal.created_at).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status</h3>
            <Badge>{proposal.status}</Badge>
          </div>
          <div>
            <h3 className="font-semibold">Contributor ID</h3>
            <p>{proposal.contributor_id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}