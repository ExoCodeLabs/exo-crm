import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface TeamMember {
  id: string
  name: string
  role: string
  avatar?: string
  performance: {
    value: number
    target: number
    metric: string
  }
}

interface TeamPerformanceProps {
  title: string
  description?: string
  members: TeamMember[]
}

export function TeamPerformance({ title, description, members }: TeamPerformanceProps) {
  // Sort members by performance value (descending)
  const sortedMembers = [...members].sort((a, b) => b.performance.value - a.performance.value)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        {sortedMembers.map((member, index) => {
          const progressPercentage = (member.performance.value / member.performance.target) * 100

          return (
            <div key={member.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground">
                    {index + 1}
                  </div>
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {member.performance.value.toLocaleString()} {member.performance.metric}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Target: {member.performance.target.toLocaleString()}
                  </div>
                </div>
              </div>
              <Progress value={progressPercentage > 100 ? 100 : progressPercentage} className="h-2" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

