"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, PlusIcon, XIcon } from "lucide-react"
import { format } from "date-fns"

export function TaskCreationComponent() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [domains, setDomains] = useState<string[]>([])
  const [deadline, setDeadline] = useState<Date | null>(null)

  const skillOptions = ["Data Governance", "Financial Analysis", "Risk Management", "Audit Planning", "Tax Strategy", "Market Research"]
  const domainOptions = ["Technology", "Finance", "Healthcare", "Energy", "Manufacturing", "Retail"]

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

  const handleBroadcast = () => {
    // Here you would implement the logic to broadcast the task
    console.log("Broadcasting task:", { title, description, skills, domains, deadline })
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#00338D]">Create New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">Task Title</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">Task Description</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter detailed task description"
                className="w-full h-32"
              />
            </div>

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
                    selected={deadline}
                    onSelect={setDeadline}
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
              <PlusIcon className="mr-2 h-4 w-4" /> Broadcast Task
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}