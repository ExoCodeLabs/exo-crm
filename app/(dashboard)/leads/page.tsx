"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Plus, MoreHorizontal } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data
const initialColumns = {
  new: {
    id: "new",
    title: "New Leads",
    leadIds: ["1", "2"],
  },
  contacted: {
    id: "contacted",
    title: "Contacted",
    leadIds: ["3"],
  },
  qualified: {
    id: "qualified",
    title: "Qualified",
    leadIds: ["4"],
  },
  proposal: {
    id: "proposal",
    title: "Proposal",
    leadIds: ["5"],
  },
  negotiation: {
    id: "negotiation",
    title: "Negotiation",
    leadIds: ["6"],
  },
  closed: {
    id: "closed",
    title: "Closed Won",
    leadIds: ["7"],
  },
  lost: {
    id: "lost",
    title: "Closed Lost",
    leadIds: ["8"],
  },
}

const initialLeads = {
  "1": { id: "1", name: "John Smith", company: "Acme Inc", value: 5000, status: "new" },
  "2": { id: "2", name: "Sarah Johnson", company: "XYZ Corp", value: 7500, status: "new" },
  "3": { id: "3", name: "Michael Brown", company: "123 Industries", value: 10000, status: "contacted" },
  "4": { id: "4", name: "Emily Davis", company: "Tech Solutions", value: 15000, status: "qualified" },
  "5": { id: "5", name: "David Wilson", company: "Global Systems", value: 25000, status: "proposal" },
  "6": { id: "6", name: "Jessica Taylor", company: "Innovative Inc", value: 50000, status: "negotiation" },
  "7": { id: "7", name: "Robert Miller", company: "Prime Corp", value: 30000, status: "closed" },
  "8": { id: "8", name: "Amanda White", company: "Apex Solutions", value: 20000, status: "lost" },
}

const columnOrder = ["new", "contacted", "qualified", "proposal", "negotiation", "closed", "lost"]

export default function LeadsPage() {
  const [columns, setColumns] = useState(initialColumns)
  const [leads, setLeads] = useState(initialLeads)
  const { toast } = useToast()

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item was dropped back in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Get source and destination columns
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]

    // If moving within the same column
    if (sourceColumn.id === destColumn.id) {
      const newLeadIds = Array.from(sourceColumn.leadIds)
      newLeadIds.splice(source.index, 1)
      newLeadIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...sourceColumn,
        leadIds: newLeadIds,
      }

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      })
      return
    }

    // Moving from one column to another
    const sourceLeadIds = Array.from(sourceColumn.leadIds)
    sourceLeadIds.splice(source.index, 1)
    const newSourceColumn = {
      ...sourceColumn,
      leadIds: sourceLeadIds,
    }

    const destLeadIds = Array.from(destColumn.leadIds)
    destLeadIds.splice(destination.index, 0, draggableId)
    const newDestColumn = {
      ...destColumn,
      leadIds: destLeadIds,
    }

    // Update the lead's status
    const updatedLead = {
      ...leads[draggableId],
      status: destination.droppableId,
    }

    setColumns({
      ...columns,
      [newSourceColumn.id]: newSourceColumn,
      [newDestColumn.id]: newDestColumn,
    })

    setLeads({
      ...leads,
      [draggableId]: updatedLead,
    })

    toast({
      title: "Lead Status Updated",
      description: `${leads[draggableId].name} moved to ${destColumn.title}`,
    })
  }

  const handleAddLead = (data: any) => {
    toast({
      title: "Lead Added",
      description: "New lead has been added successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Leads Pipeline</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>Fill in the details to add a new lead to your pipeline.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Acme Inc" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="(555) 123-4567" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="value">Value ($)</Label>
                  <Input id="value" type="number" placeholder="10000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="new">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Lead</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Add any additional notes here..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => handleAddLead({})}>Add Lead</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto pb-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4" style={{ minWidth: "max-content" }}>
            {columnOrder.map((columnId) => {
              const column = columns[columnId]
              const columnLeads = column.leadIds.map((leadId) => leads[leadId])

              return (
                <div key={column.id} className="w-72 flex-shrink-0">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle>{column.title}</CardTitle>
                        <div className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                          {column.leadIds.length}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-3">
                      <Droppable droppableId={column.id}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[200px]">
                            {columnLeads.map((lead, index) => (
                              <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-2 rounded-md border bg-card p-3"
                                  >
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <h3 className="font-medium">{lead.name}</h3>
                                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                                        <div className="mt-2 text-sm font-medium">${lead.value.toLocaleString()}</div>
                                      </div>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="-mt-1 -mr-1">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem>View Details</DropdownMenuItem>
                                          <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

