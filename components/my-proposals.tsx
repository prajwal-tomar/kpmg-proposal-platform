'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckIcon, UploadIcon } from 'lucide-react'
import { Proposal, Task } from './proposal-contributor-dashboard'

export function MyProposalsComponent() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [proposalForUpload, setProposalForUpload] = useState<Proposal | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchMyProposals()
  }, [])

  async function fetchMyProposals() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('contributor_id', user.id)
    
    if (error) {
      console.error('Error fetching proposals:', error)
    } else {
      setProposals(data)
    }
  }

  const handleFileUpload = async (proposal: Proposal) => {
    if (!file || !proposal) return

    const { data, error } = await supabase
      .storage
      .from('proposal-responses')
      .upload(`${proposal.id}/${file.name}`, file)

    if (error) {
      console.error('Error uploading file:', error)
    } else {
      console.log('File uploaded successfully:', data)
      setIsUploadModalOpen(false)
      setProposalForUpload(null)
      setFile(null)
      // You might want to update the proposal status or add a reference to the uploaded file
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className='max-w-6xl mx-auto'>
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#00338D]">My Proposals</h1>
        </header>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proposal Title</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((proposal) => (
              <TableRow key={proposal.id}>
                <TableCell className="font-medium">{proposal.title}</TableCell>
                <TableCell>{proposal.skills.join(", ")}</TableCell>
                <TableCell>{new Date(proposal.deadline).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className={proposal.status === "accepted" ? "bg-[#483698]" : "bg-[#00A3A1]"}>
                    {proposal.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => setSelectedProposal(proposal)} className="mr-2">
                    View Tasks
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setProposalForUpload(proposal)
                    setIsUploadModalOpen(true)
                  }}>
                    Upload Response
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ProposalTasksDialog 
          proposal={selectedProposal} 
          onClose={() => setSelectedProposal(null)}
          onSelectTask={setSelectedTask}
        />

        <TaskDetailDialog
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          fetchProposals={fetchMyProposals}
        />

        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Response for {proposalForUpload?.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="file" className="text-right col-span-1">
                  File
                </label>
                <input
                  id="file"
                  type="file"
                  accept=".docx,.ppt,.pptx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setIsUploadModalOpen(false)
                setProposalForUpload(null)
              }}>
                Cancel
              </Button>
              <Button onClick={() => handleFileUpload(proposalForUpload!)} disabled={!file}>
                Upload
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

interface ProposalTasksDialogProps {
  proposal: Proposal | null;
  onClose: () => void;
  onSelectTask: (task: Task) => void;
}

function ProposalTasksDialog({ proposal, onClose, onSelectTask }: ProposalTasksDialogProps) {
  if (!proposal) return null;

  let tasksArray = [];
  try {
    tasksArray = Array.isArray(proposal.tasks) 
      ? proposal.tasks 
      : (typeof proposal.tasks === 'string' ? JSON.parse(proposal.tasks) : []);
  } catch (error) {
    console.error('Error parsing tasks:', error);
  }

  return (
    <Dialog open={!!proposal} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#00338D]">{proposal.title} Tasks</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          {tasksArray.length > 0 ? (
            tasksArray.map((task: Task) => (
              <Card key={task.id} className="cursor-pointer" onClick={() => onSelectTask(task)}>
                <CardHeader>
                  <CardTitle className="text-md font-semibold">{task.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{task.description.substring(0, 100)}...</p>
                  <Badge className="mt-2">{task.status}</Badge>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No tasks available for this proposal.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface TaskDetailDialogProps {
  task: Task | null;
  onClose: () => void;
  fetchProposals: () => Promise<void>;
}

function TaskDetailDialog({ task, onClose, fetchProposals }: TaskDetailDialogProps) {
  const supabase = createClientComponentClient()
  const [file, setFile] = useState<File | null>(null)

  if (!task) return null;

  const handleAcceptTask = async () => {
    const { error } = await supabase
      .from('tasks')
      .update({ status: 'in_progress' })
      .eq('id', task.id)

    if (error) {
      console.error('Error accepting task:', error)
    } else {
      await fetchProposals()
      onClose()
    }
  }

  const handleFileUpload = async () => {
    if (!file) return

    const { data, error } = await supabase
      .storage
      .from('task-uploads')
      .upload(`${task.id}/${file.name}`, file)

    if (error) {
      console.error('Error uploading file:', error)
    } else {
      console.log('File uploaded successfully:', data)
      // You might want to update the task status or add a reference to the uploaded file
    }
  }

  return (
    <Dialog open={!!task} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#00338D]">{task.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-sm text-gray-900">{task.description}</p>
          </div>
          {task.skills && task.skills.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Skills Required</h3>
              <p className="mt-1 text-sm text-gray-900">{task.skills.join(", ")}</p>
            </div>
          )}
          {task.deadline && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
              <p className="mt-1 text-sm text-gray-900">{new Date(task.deadline).toLocaleDateString()}</p>
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <Badge className="mt-1">{task.status}</Badge>
          </div>
          {task.status === 'pending' && (
            <Button onClick={handleAcceptTask} className="w-full">
              <CheckIcon className="mr-2 h-4 w-4" /> Accept Task
            </Button>
          )}
          {task.status === 'in_progress' && (
            <div>
              <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <Button onClick={handleFileUpload} className="w-full mt-2">
                <UploadIcon className="mr-2 h-4 w-4" /> Upload Work
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}