'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckIcon, SendIcon } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// Update the Proposal interface to match your Supabase table structure
interface Proposal {
  id: string;
  title: string;
  description: string;
  skills: string[];
  domains: string[];
  deadline: string;
  tasks: Task[];
  created_at: string;
  status: string; // We'll add this for filtering purposes
  contributor_id: string | null;
}

interface Task {
  id: string;
  title: string;
  description: string;
  skills: string[];
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export function ProposalContributorDashboardComponent() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null)
  const [proposals, setProposals] = useState<Proposal[]>([])

  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchProposals()
  }, [])

  async function fetchProposals() {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
    
    if (error) {
      console.error('Error fetching proposals:', error)
    } else {
      setProposals(data)
    }
  }

  const filteredProposals = proposals.filter(proposal => 
    (filter === "all" || proposal.skills.includes(filter)) &&
    (search === "" || proposal.title.toLowerCase().includes(search.toLowerCase()) || proposal.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase())))
  )

  const availableProposals = filteredProposals.filter(proposal => proposal.status === "available")
  const acceptedProposals = filteredProposals.filter(proposal => proposal.status === "accepted")
  const submittedProposals = filteredProposals.filter(proposal => proposal.status === "submitted")

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
              placeholder="Search proposals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              {/* You might want to dynamically populate this list based on available skills */}
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
            <TabsTrigger value="available">Available Proposals</TabsTrigger>
            <TabsTrigger value="accepted">Accepted Proposals</TabsTrigger>
            <TabsTrigger value="submitted">Submitted Proposals</TabsTrigger>
          </TabsList>
          <TabsContent value="available">
            <ProposalTable proposals={availableProposals} onSelectProposal={setSelectedProposal} />
          </TabsContent>
          <TabsContent value="accepted">
            <ProposalTable proposals={acceptedProposals} onSelectProposal={setSelectedProposal} />
          </TabsContent>
          <TabsContent value="submitted">
            <ProposalTable proposals={submittedProposals} onSelectProposal={setSelectedProposal} />
          </TabsContent>
        </Tabs>
      </div>

      <ProposalDetailDialog 
        proposal={selectedProposal} 
        onClose={() => setSelectedProposal(null)} 
        fetchProposals={fetchProposals}  // Pass fetchProposals function
      />
      </div>
    </div>
  )
}

interface ProposalTableProps {
  proposals: Proposal[];
  onSelectProposal: (proposal: Proposal) => void;
}

function ProposalTable({ proposals, onSelectProposal }: ProposalTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Proposal Title</TableHead>
          <TableHead>Skills</TableHead>
          <TableHead>Domains</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proposals.map((proposal) => (
          <TableRow key={proposal.id}>
            <TableCell className="font-medium">{proposal.title}</TableCell>
            <TableCell>{proposal.skills.join(", ")}</TableCell>
            <TableCell>{proposal.domains.join(", ")}</TableCell>
            <TableCell>{new Date(proposal.deadline).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge
                className={
                  proposal.status === "available" ? "bg-[#0091DA]" :
                  proposal.status === "accepted" ? "bg-[#483698]" :
                  "bg-[#00A3A1]"
                }
              >
                {proposal.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="outline" onClick={() => onSelectProposal(proposal)}>View Details</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

interface ProposalDetailDialogProps {
  proposal: Proposal | null;
  onClose: () => void;
  fetchProposals: () => Promise<void>;  // Add this line
}

function ProposalDetailDialog({ proposal, onClose, fetchProposals }: ProposalDetailDialogProps) {
  const supabase = createClientComponentClient()

  const handleAcceptProposal = async () => {
    if (!proposal) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('proposals')
      .update({ status: 'accepted', contributor_id: user.id })
      .eq('id', proposal.id)

    if (error) {
      console.error('Error accepting proposal:', error)
      // You might want to show an error message to the user here
    } else {
      // Refresh the proposals list
      await fetchProposals()
      onClose()
    }
  }

  if (!proposal) return null;  // Add this line to handle null proposal

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
          <DialogTitle className="text-2xl font-bold text-[#00338D]">{proposal.title}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Proposal details and actions
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Skills</h3>
              <p className="mt-1 text-sm text-gray-900">{proposal.skills.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Domains</h3>
              <p className="mt-1 text-sm text-gray-900">{proposal.domains.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
              <p className="mt-1 text-sm text-gray-900">{new Date(proposal.deadline).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <Badge
                className={`mt-1 ${
                  proposal.status === "available" ? "bg-[#0091DA]" :
                  proposal.status === "accepted" ? "bg-[#483698]" :
                  "bg-[#00A3A1]"
                }`}
              >
                {proposal.status}
              </Badge>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-sm text-gray-900">{proposal.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tasks</h3>
            {tasksArray.length > 0 ? (
              <div className="space-y-4">
                {tasksArray.map((task, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-md font-semibold">{task.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{task.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No tasks available for this proposal.</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          {proposal.status === "available" && (
            <Button 
              className="bg-[#005EB8] hover:bg-[#00338D] text-white"
              onClick={handleAcceptProposal}
            >
              <CheckIcon className="mr-2 h-4 w-4" /> Accept Proposal
            </Button>
          )}
          {proposal.status === "accepted" && (
            <Button className="bg-[#00A3A1] hover:bg-[#008080] text-white">
              <SendIcon className="mr-2 h-4 w-4" /> Submit Proposal
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}