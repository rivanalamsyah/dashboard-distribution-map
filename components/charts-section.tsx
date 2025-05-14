"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface ChartsSectionProps {
  data: any[]
}

export function ChartsSection({ data }: ChartsSectionProps) {
  // Prepare data for charts
  const programData = data.reduce(
    (acc, item) => {
      const program = item.program
      if (!acc[program]) {
        acc[program] = { name: program, value: 0 }
      }
      acc[program].value += item.amount
      return acc
    },
    {} as Record<string, { name: string; value: number }>
  )

  const programChartData = Object.values(programData)

  // Monthly trend data
  const monthlyData = data.reduce(
    (acc, item) => {
      const month = new Date(item.date).getMonth()
      if (!acc[month]) {
        acc[month] = {
          name: new Date(2024, month, 1).toLocaleString("default", { month: "short" }),
          collected: 0,
          distributed: 0,
        }
      }
      acc[month].collected += item.amount
      acc[month].distributed += item.distributed || 0
      return acc
    },
    {} as Record<number, { name: string; collected: number; distributed: number }>
  )

  const monthlyChartData = Object.values(monthlyData).sort((a, b) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months.indexOf(a.name) - months.indexOf(b.name)
  })

  // Region data
  const regionData = data.reduce(
    (acc, item) => {
      const region = item.region
      if (!acc[region]) {
        acc[region] = { name: region, amount: 0, beneficiaries: 0 }
      }
      acc[region].amount += item.amount
      acc[region].beneficiaries += item.beneficiaries
      return acc
    },
    {} as Record<string, { name: string; amount: number; beneficiaries: number }>
  )

  const regionChartData = Object.values(regionData).sort((a, b) => b.amount - a.amount)

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <Tabs defaultValue="distribution">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Zakat Analysis</h2>
        <TabsList>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="distribution" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribution by Program</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer
                config={{
                  value: {
                    label: "Amount",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={programChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {programChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Program Effectiveness</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer
                config={{
                  amount: {
                    label: "Amount (Billions)",
                    color: "hsl(var(--chart-1))",
                  },
                  beneficiaries: {
                    label: "Beneficiaries",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={programChartData.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="value" name="Amount" fill="var(--color-amount)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="trends" className="mt-0 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Collection and Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[600px]">
            <ChartContainer
              config={{
                collected: {
                  label: "Collected",
                  color: "hsl(var(--chart-1))",
                },
                distributed: {
                  label: "Distributed",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="collected" stroke="var(--color-collected)" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="distributed" stroke="var(--color-distributed)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="regions" className="mt-0 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Zakat by Region</CardTitle>
          </CardHeader>
          <CardContent className="h-[600px]">
            <ChartContainer
              config={{
                amount: {
                  label: "Amount",
                  color: "hsl(var(--chart-1))",
                },
                beneficiaries: {
                  label: "Beneficiaries",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="amount" name="Amount" fill="var(--color-amount)" />
                  <Bar dataKey="beneficiaries" name="Beneficiaries" fill="var(--color-beneficiaries)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
