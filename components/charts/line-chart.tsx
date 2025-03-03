"use client"

import { useTheme } from "next-themes"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LineChartProps {
  title: string
  description?: string
  data: any[]
  xAxisKey: string
  lines: {
    key: string
    name: string
    color: string
    strokeWidth?: number
  }[]
  height?: number
}

export function LineChart({ title, description, data, xAxisKey, lines, height = 350 }: LineChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
              <XAxis dataKey={xAxisKey} tick={{ fill: isDark ? "#fff" : "#333" }} />
              <YAxis tick={{ fill: isDark ? "#fff" : "#333" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#2B2B2B" : "#fff",
                  color: isDark ? "#fff" : "#333",
                  border: `1px solid ${isDark ? "#444" : "#ddd"}`,
                  borderRadius: "8px",
                }}
              />
              <Legend />
              {lines.map((line) => (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  name={line.name}
                  stroke={line.color}
                  strokeWidth={line.strokeWidth || 2}
                  activeDot={{ r: 8 }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

