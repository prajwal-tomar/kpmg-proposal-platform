'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusIcon, FilterIcon, CheckIcon, ClockIcon, AlertTriangleIcon } from 'lucide-react'
import Link from 'next/link';

interface Task {
  id: number;
  title: string;
  skillset: string;
  deadline: string;
  status: string;
}

interface Contributor {
  id: number;
  name: string;
  avatar: string;
  skillset: string;
}

export function ProposalCoordinatorDashboardComponent() {
  const [filter, setFilter] = useState("all")

  const tasks: Task[] = [
    { id: 1, title: "Financial Analysis", skillset: "Finance", deadline: "2023-07-15", status: "in-progress" },
    { id: 2, title: "Market Research", skillset: "Research", deadline: "2023-07-20", status: "pending" },
    { id: 3, title: "Risk Assessment", skillset: "Risk Management", deadline: "2023-07-18", status: "completed" },
  ]

  const contributors: Contributor[] = [
    { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40", skillset: "Finance" },
    { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40", skillset: "Research" },
    { id: 3, name: "Charlie Brown", avatar: "/placeholder.svg?height=40&width=40", skillset: "Risk Management" },
  ]

  const filteredTasks = filter === "all" ? tasks : tasks.filter(task => task.skillset === filter)

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className='max-w-6xl mx-auto'>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#00338D]">Proposal Coordinator Dashboard</h1>
        <Link href="/new-proposal">
        <Button className="bg-[#005EB8] hover:bg-[#00338D]">
          <PlusIcon className="mr-2 h-4 w-4" /> Create New Proposal Task
        </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Accepted</CardTitle>
            <CheckIcon className="h-4 w-4 text-[#00A3A1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Pending</CardTitle>
            <ClockIcon className="h-4 w-4 text-[#0091DA]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Overdue</CardTitle>
            <AlertTriangleIcon className="h-4 w-4 text-[#483698]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#00338D]">Current Tasks</h2>
          <div className="flex items-center space-x-2">
            <FilterIcon className="h-4 w-4 text-[#005EB8]" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by skillset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skillsets</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
                <SelectItem value="Risk Management">Risk Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task Title</TableHead>
              <TableHead>Skillset</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <Link key={task.id} href={`/task-detail/${task.id}`} passHref legacyBehavior>
                <TableRow className="cursor-pointer hover:bg-gray-100 transition-colors">
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.skillset}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        task.status === "completed" ? "bg-[#00A3A1]" :
                        task.status === "in-progress" ? "bg-[#0091DA]" :
                        "bg-[#483698]"
                      }
                    >
                      {task.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-[#00338D] mb-4">Contributor Responses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contributors.map((contributor) => (
            <Card key={contributor.id}>
              <CardContent className="flex items-center space-x-4 py-4">
                <Avatar>
                  <AvatarImage src={contributor.avatar} alt={contributor.name} />
                  <AvatarFallback>{contributor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{contributor.name}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{contributor.skillset}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      </div>
      
    </div>
  )
}