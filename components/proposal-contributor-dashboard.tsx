'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchIcon, CheckIcon, SendIcon } from 'lucide-react'

// Define the Task interface
interface Task {
  id: number;
  title: string;
  skillset: string;
  domain: string;
  deadline: string;
  status: string;
}

export function ProposalContributorDashboardComponent() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const tasks: Task[] = [
    { id: 1, title: "Financial Analysis for Tech Startup", skillset: "Finance", domain: "Technology", deadline: "2023-07-15", status: "available" },
    { id: 2, title: "Market Research on Renewable Energy", skillset: "Research", domain: "Energy", deadline: "2023-07-20", status: "available" },
    { id: 3, title: "Risk Assessment for Healthcare Provider", skillset: "Risk Management", domain: "Healthcare", deadline: "2023-07-18", status: "available" },
    { id: 4, title: "Audit Planning for Manufacturing Company", skillset: "Audit", domain: "Manufacturing", deadline: "2023-07-22", status: "accepted" },
    { id: 5, title: "Tax Strategy for Multinational Corporation", skillset: "Tax", domain: "International", deadline: "2023-07-25", status: "submitted" },
  ]

  const filteredTasks = tasks.filter(task => 
    (filter === "all" || task.skillset === filter) &&
    (search === "" || task.title.toLowerCase().includes(search.toLowerCase()) || task.skillset.toLowerCase().includes(search.toLowerCase()))
  )

  const availableTasks = filteredTasks.filter(task => task.status === "available")
  const acceptedTasks = filteredTasks.filter(task => task.status === "accepted")
  const submittedTasks = filteredTasks.filter(task => task.status === "submitted")

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className='max-w-6xl mx-auto'>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#00338D]">Proposal Contributor Dashboard</h1>
      </header>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by skillset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skillsets</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Research">Research</SelectItem>
              <SelectItem value="Risk Management">Risk Management</SelectItem>
              <SelectItem value="Audit">Audit</SelectItem>
              <SelectItem value="Tax">Tax</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="available">
          <TabsList className="mb-4">
            <TabsTrigger value="available">Available Tasks</TabsTrigger>
            <TabsTrigger value="accepted">Accepted Tasks</TabsTrigger>
            <TabsTrigger value="submitted">Submitted Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="available">
            <TaskTable tasks={availableTasks} onSelectTask={setSelectedTask} />
          </TabsContent>
          <TabsContent value="accepted">
            <TaskTable tasks={acceptedTasks} onSelectTask={setSelectedTask} />
          </TabsContent>
          <TabsContent value="submitted">
            <TaskTable tasks={submittedTasks} onSelectTask={setSelectedTask} />
          </TabsContent>
        </Tabs>
      </div>

      <TaskDetailDialog task={selectedTask} onClose={() => setSelectedTask(null)} />
      </div>
    </div>
  )
}

interface TaskTableProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

function TaskTable({ tasks, onSelectTask }: TaskTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task Title</TableHead>
          <TableHead>Skillset</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>{task.skillset}</TableCell>
            <TableCell>{task.domain}</TableCell>
            <TableCell>{task.deadline}</TableCell>
            <TableCell>
              <Badge
                className={
                  task.status === "available" ? "bg-[#0091DA]" :
                  task.status === "accepted" ? "bg-[#483698]" :
                  "bg-[#00A3A1]"
                }
              >
                {task.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="outline" onClick={() => onSelectTask(task)}>View Details</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

interface TaskDetailDialogProps {
  task: Task | null;
  onClose: () => void;
}

function TaskDetailDialog({ task, onClose }: TaskDetailDialogProps) {
  if (!task) return null

  return (
    <Dialog open={!!task} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>
            Task details and actions
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Skillset:</span>
            <span className="col-span-3">{task.skillset}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Domain:</span>
            <span className="col-span-3">{task.domain}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Deadline:</span>
            <span className="col-span-3">{task.deadline}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Status:</span>
            <span className="col-span-3">
              <Badge
                className={
                  task.status === "available" ? "bg-[#0091DA]" :
                  task.status === "accepted" ? "bg-[#483698]" :
                  "bg-[#00A3A1]"
                }
              >
                {task.status}
              </Badge>
            </span>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          {task.status === "available" && (
            <Button className="bg-[#005EB8] hover:bg-[#00338D]">
              <CheckIcon className="mr-2 h-4 w-4" /> Accept Task
            </Button>
          )}
          {task.status === "accepted" && (
            <Button className="bg-[#00A3A1] hover:bg-[#008080]">
              <SendIcon className="mr-2 h-4 w-4" /> Submit Task
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}