"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, EditIcon, PlusIcon, XIcon } from "lucide-react"
import { format } from "date-fns"
import { supabase } from "@/lib/supabase"
import { toast } from 'react-toastify';

export function TaskCreationComponent() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [domains, setDomains] = useState<string[]>([])
  const [deadline, setDeadline] = useState<Date | null>(null)

  const skillOptions = ["Data Governance", "Financial Analysis", "Risk Management", "Audit Planning", "Tax Strategy", "Market Research"]
  const domainOptions = ["Technology", "Finance", "Healthcare", "Energy", "Manufacturing", "Retail"]

  useEffect(() => {
    const channel = supabase.channel('public:notifications')
    
    channel
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications'
      }, (payload) => {
        console.log('New notification:', payload.new)
        // Here you can update the UI to show the new notification
        // For example, you could use a toast notification
        toast.info(payload.new.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill])
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill))
  }

  const handleAddDomain = (domain: string) => {
    if (!domains.includes(domain)) {
      setDomains([...domains, domain])
    }
  }

  const handleRemoveDomain = (domain: string) => {
    setDomains(domains.filter(d => d !== domain))
  }

  const handleBroadcast = async () => {
    try {
      const { error } = await supabase
        .from('proposals')
        .insert({
          title,
          description,
          skills,
          domains,
          deadline,
          tasks: JSON.stringify(tasks),
          status: 'available'
        })
        .select()

      if (error) throw error

      console.log('Proposal broadcasted:', {
        title,
        description,
        skills,
        domains,
        deadline,
        tasks
      });

      toast.success("Proposal broadcasted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset form fields after successful broadcast
      setTitle("")
      setDescription("")
      setSkills([])
      setDomains([])
      setDeadline(null)
      setTasks([])

    } catch (error) {
      console.error('Error broadcasting proposal:', error)
      toast.error("There was an error saving your proposal. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  const [tasks, setTasks] = useState<{ title: string; description: string }[]>([])
  const [taskTitle, setTaskTitle] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [selectedTask, setSelectedTask] = useState<{ title: string; description: string } | null>(null)
  const [editingTask, setEditingTask] = useState<{ title: string; description: string; index: number } | null>(null)

  const handleUpdateTask = (index: number) => {
    if (editingTask) {
      const updatedTasks = tasks.map((task, i) => (i === index ? { title: editingTask.title, description: editingTask.description } : task))
      setTasks(updatedTasks)
      setEditingTask(null)
    }
  }

  const handleAddTask = () => {
    if (taskTitle && taskDescription) {
      setTasks([...tasks, { title: taskTitle, description: taskDescription }])
      setTaskTitle("")
      setTaskDescription("")
    }
  }

  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#00338D]">Create New Proposal</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">Proposal Title</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter proposal title"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">Proposal Description</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter detailed proposal description"
                className="w-full h-32"
              />
            </div>

            <div className="space-y-2 pl-6">
              <label className="text-sm font-medium text-gray-700">Add Tasks</label>
              <div className="space-y-2">
              <Input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Task title"
                className="w-full"
              />
              <Textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Task description"
                className="w-full h-20"
              />
              <Button type="button" onClick={handleAddTask} className="bg-[#005EB8] hover:bg-[#00338D] text-white">
                <PlusIcon className="mr-2 h-4 w-4" /> Add Task
              </Button>
              </div>
              <div className="space-y-2 mt-4">
              {tasks.map((task, index) => (
                <Card key={index} className="bg-[#0091DA] p-2 cursor-pointer rounded-md" onClick={() => setSelectedTask(task)}>
                <div className="flex justify-between items-center text-white">
                  <h4 className="text-sm font-bold">{task.title}</h4>
                  <div className="flex space-x-2">
                  <button type="button" onClick={(e) => { e.stopPropagation(); setEditingTask({ ...task, index }); }} className="text-white">
                    <EditIcon className="h-5 w-5" />
                  </button>
                  <button type="button" onClick={(e) => { e.stopPropagation(); handleRemoveTask(index); }} className="text-red-500">
                    <XIcon className="h-5 w-5" />
                  </button>
                  </div>
                </div>
                </Card>
              ))}
              </div>
            </div>

            {editingTask && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#00338D]">Edit Task</h3>
                <button onClick={() => setEditingTask(null)} className="text-gray-500 hover:text-gray-700">
                  <XIcon className="h-6 w-6" />
                </button>
                </div>
                <div className="space-y-4">
                <Input
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  placeholder="Task title"
                  className="w-full"
                />
                <Textarea
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  placeholder="Task description"
                  className="w-full h-20"
                />
                <Button
                  type="button"
                  onClick={() => handleUpdateTask(editingTask.index)}
                  className="w-full bg-[#005EB8] hover:bg-[#00338D] text-white"
                >
                  Update Task
                </Button>
                </div>
              </div>
              </div>
            )}

            {selectedTask && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#00338D]">{selectedTask.title}</h3>
                <button onClick={() => setSelectedTask(null)} className="text-gray-500 hover:text-gray-700">
                  <XIcon className="h-6 w-6" />
                </button>
                </div>
                <p className="text-gray-700">{selectedTask.description}</p>
                <Button onClick={() => setSelectedTask(null)} className="mt-4 bg-[#005EB8] hover:bg-[#00338D] text-white">
                Close
                </Button>
              </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Skills Required</label>
              <Select onValueChange={handleAddSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Select required skills" />
                </SelectTrigger>
                <SelectContent>
                  {skillOptions.map((skill) => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-[#0091DA] text-white">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)} className="ml-2 text-white">
                      <XIcon className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Domain Knowledge Required</label>
              <Select onValueChange={handleAddDomain}>
                <SelectTrigger>
                  <SelectValue placeholder="Select required domains" />
                </SelectTrigger>
                <SelectContent>
                  {domainOptions.map((domain) => (
                    <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {domains.map((domain) => (
                  <Badge key={domain} variant="secondary" className="bg-[#483698] text-white">
                    {domain}
                    <button onClick={() => handleRemoveDomain(domain)} className="ml-2 text-white">
                      <XIcon className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Deadline</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!deadline && "text-neutral-500 dark:text-neutral-400"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : "Select deadline"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={deadline || undefined}
                    onSelect={(date) => setDeadline(date || null)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              type="button"
              onClick={handleBroadcast}
              className="w-full bg-[#005EB8] hover:bg-[#00338D] text-white"
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Broadcast Proposal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}