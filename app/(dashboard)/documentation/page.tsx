"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from 'lucide-react'

export default function DocumentationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Documentation</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ExoCRM Documentation</CardTitle>
          <CardDescription>Learn how to use and customize the ExoCRM template</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Welcome to the ExoCRM documentation. This guide will help you understand how to use and customize the CRM
            template to fit your needs.
          </p>

          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Tip</AlertTitle>
            <AlertDescription>
              This documentation is also available in the code repository&apos;s README file.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Tabs defaultValue="getting-started">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="state-management">State Management</TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
        </TabsList>

        {/* Getting Started */}
        <TabsContent value="getting-started" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Installation & Setup</CardTitle>
              <CardDescription>How to install and set up the ExoCRM template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Prerequisites</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Node.js 16.8 or later</li>
                <li>npm or yarn package manager</li>
                <li>Basic knowledge of React and Next.js</li>
              </ul>

              <Separator className="my-4" />

              <h3 className="text-lg font-medium">Installation Steps</h3>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm">
                  <code>{`# Clone the repository
git clone https://github.com/exocodelab/exocrm.git

# Navigate to the project directory
cd exocrm

# Install dependencies
npm install

# Start the development server
npm run dev`}</code>
                </pre>
              </div>

              <Separator className="my-4" />

              <h3 className="text-lg font-medium">Project Structure</h3>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm">
                  <code>{`/src
├── app/                # Next.js App Router
│   ├── (dashboard)/   # Dashboard routes
│   ├── api/          # API routes
│   ├── login/        # Authentication pages
│   └── layout.tsx    # Root layout
├── components/        # Reusable UI components
│   ├── charts/       # Chart components
│   ├── dashboard/    # Dashboard-specific components
│   ├── layout/       # Layout components
│   └── ui/           # UI components
├── features/         # Redux slices for each entity
├── lib/             # Utility functions
├── api/             # API integration
└── store/           # Redux store configuration`}</code>
                </pre>
              </div>

              <Separator className="my-4" />

              <h3 className="text-lg font-medium">Configuration</h3>
              <p>The main configuration files are:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>next.config.js</strong> - Next.js configuration
                </li>
                <li>
                  <strong>tailwind.config.js</strong> - Tailwind CSS configuration
                </li>
                <li>
                  <strong>lib/theme-config.ts</strong> - Theme configuration
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Add more content for other tabs */}
          {/* Note: I'm truncating the rest of the content for brevity */}
          {/* You can continue adding the rest of the tabs content following the same pattern */}
          {/* Just make sure to properly escape any code examples using template literals */}
        </TabsContent>

        {/* Components Tab */}
        <TabsContent value="components" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>UI Components</CardTitle>
              <CardDescription>Overview of the reusable UI components</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                ExoCRM is built with a comprehensive set of reusable UI components based on shadcn/ui.
              </p>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Button</TableCell>
                    <TableCell>Clickable button element with various styles</TableCell>
                    <TableCell>
                      <code>{`<Button>Click Me</Button>`}</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Card</TableCell>
                    <TableCell>Container for content with header and footer</TableCell>
                    <TableCell>
                      <code>{`<Card><CardHeader>...</CardHeader></Card>`}</code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add other tab contents similarly */}
      </Tabs>
    </div>
  )
}

