"use client"

import { useTheme } from "next-themes"
import {
  BarChart as RechartsFunnelChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FunnelChartProps {
  title: string
  description?: string
  data: {
    name: string
    value: number
    color: string
  }[]
  height?: number
}

export function FunnelChart({ title, description, data, height = 350 }: FunnelChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Transform data for horizontal bar chart to simulate funnel
  const transformedData = [
    {
      name: "Funnel",
      ...data.reduce(
        (acc, item) => {
          acc[item.name] = item.value
          return acc
        },
        {} as Record<string, number>,
      ),
    },
  ]

  // Sort data by value to create funnel effect
  const sortedKeys = data.sort((a, b) => b.value - a.value).map((item) => item.name)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsFunnelChart
              layout="vertical"
              data={transformedData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
              <XAxis type="number" tick={{ fill: isDark ? "#fff" : "#333" }} />
              <YAxis dataKey="name" type="category" tick={{ fill: isDark ? "#fff" : "#333" }} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#2B2B2B" : "#fff",
                  color: isDark ? "#fff" : "#333",
                  border: `1px solid ${isDark ? "#444" : "#ddd"}`,
                  borderRadius: "8px",
                }}
              />
              <Legend />
              {sortedKeys.map((key, index) => {
                const item = data.find((d) => d.name === key)
                return <Bar key={key} dataKey={key} fill={item?.color} radius={[0, 4, 4, 0]} />
              })}
            </RechartsFunnelChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

