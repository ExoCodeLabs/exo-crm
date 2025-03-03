"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, CheckSquare, DollarSign } from "lucide-react"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { FunnelChart } from "@/components/charts/funnel-chart"
import { KPICard } from "@/components/dashboard/kpi-card"
import { TeamPerformance } from "@/components/dashboard/team-performance"

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 12500, target: 10000, expenses: 8000 },
  { month: "Feb", revenue: 15000, target: 12000, expenses: 8500 },
  { month: "Mar", revenue: 18000, target: 15000, expenses: 9000 },
  { month: "Apr", revenue: 22000, target: 18000, expenses: 10000 },
  { month: "May", revenue: 19000, target: 20000, expenses: 9500 },
  { month: "Jun", revenue: 25000, target: 22000, expenses: 11000 },
  { month: "Jul", revenue: 28000, target: 24000, expenses: 12000 },
  { month: "Aug", revenue: 30000, target: 26000, expenses: 13000 },
  { month: "Sep", revenue: 32000, target: 28000, expenses: 14000 },
  { month: "Oct", revenue: 35000, target: 30000, expenses: 15000 },
  { month: "Nov", revenue: 38000, target: 32000, expenses: 16000 },
  { month: "Dec", revenue: 42000, target: 35000, expenses: 18000 },
]

const leadSourceData = [
  { name: "Website", value: 45, color: "#0078D4" },
  { name: "Referral", value: 25, color: "#00B7C3" },
  { name: "Social Media", value: 15, color: "#5C2D91" },
  { name: "Email", value: 10, color: "#107C10" },
  { name: "Other", value: 5, color: "#FFB900" },
]

const leadFunnelData = [
  { name: "Leads", value: 1000, color: "#0078D4" },
  { name: "Qualified", value: 750, color: "#00B7C3" },
  { name: "Proposals", value: 500, color: "#5C2D91" },
  { name: "Negotiations", value: 300, color: "#107C10" },
  { name: "Closed", value: 150, color: "#FFB900" },
]

const userActivityData = [
  { day: "Mon", logins: 120, actions: 450 },
  { day: "Tue", logins: 140, actions: 520 },
  { day: "Wed", logins: 180, actions: 580 },
  { day: "Thu", logins: 160, actions: 600 },
  { day: "Fri", logins: 150, actions: 550 },
  { day: "Sat", logins: 80, actions: 250 },
  { day: "Sun", logins: 70, actions: 200 },
]

const teamMembers = [
  {
    id: "1",
    name: "John Smith",
    role: "Sales Manager",
    performance: { value: 125000, target: 100000, metric: "Revenue" },
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Senior Sales Rep",
    performance: { value: 95000, target: 80000, metric: "Revenue" },
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "Sales Rep",
    performance: { value: 65000, target: 70000, metric: "Revenue" },
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "Sales Rep",
    performance: { value: 72000, target: 70000, metric: "Revenue" },
  },
  {
    id: "5",
    name: "David Wilson",
    role: "Junior Sales Rep",
    performance: { value: 45000, target: 50000, metric: "Revenue" },
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Add New Customer</Button>
      </div>

      {/* Exo Code Lab Branding */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome to ExoCRM</h2>
              <p className="text-muted-foreground mt-1">
                Developed by <strong>Exo Code Lab</strong>
              </p>
            </div>
            <Button variant="outline">View Documentation</Button>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Customers"
          value="1,248"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true, label: "from last month" }}
        />

        <KPICard
          title="Active Leads"
          value="324"
          icon={<FileText className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true, label: "from last month" }}
        />

        <KPICard
          title="Pending Tasks"
          value="42"
          icon={<CheckSquare className="h-4 w-4" />}
          description="5 due today"
        />

        <KPICard
          title="Revenue"
          value="$24,780"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 18, isPositive: true, label: "from last month" }}
        />
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="sales">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Sales Performance</TabsTrigger>
          <TabsTrigger value="leads">Lead Conversion</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <BarChart
              title="Monthly Revenue"
              description="Revenue vs Target and Expenses"
              data={revenueData}
              xAxisKey="month"
              bars={[
                { key: "revenue", name: "Revenue", color: "#0078D4" },
                { key: "target", name: "Target", color: "#5C2D91" },
                { key: "expenses", name: "Expenses", color: "#E81123" },
              ]}
            />

            <LineChart
              title="Revenue Trend"
              description="Monthly revenue over time"
              data={revenueData}
              xAxisKey="month"
              lines={[
                { key: "revenue", name: "Revenue", color: "#0078D4" },
                { key: "target", name: "Target", color: "#5C2D91", strokeWidth: 1 },
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <PieChart title="Lead Sources" description="Distribution of leads by source" data={leadSourceData} />

            <FunnelChart
              title="Lead Conversion Funnel"
              description="Lead progression through sales stages"
              data={leadFunnelData}
            />
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6 mt-6">
          <LineChart
            title="User Activity"
            description="Daily logins and actions"
            data={userActivityData}
            xAxisKey="day"
            lines={[
              { key: "logins", name: "Logins", color: "#0078D4" },
              { key: "actions", name: "Actions", color: "#00B7C3" },
            ]}
          />
        </TabsContent>

        <TabsContent value="team" className="space-y-6 mt-6">
          <TeamPerformance
            title="Sales Team Performance"
            description="Revenue generated by team members"
            members={teamMembers}
          />
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest CRM activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-4 border-b pb-4 last:border-0">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">New customer added</p>
                  <p className="text-sm text-muted-foreground">John Doe from Acme Inc. was added as a new customer</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

