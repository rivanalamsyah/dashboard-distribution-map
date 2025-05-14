"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Coins, BookOpen, GraduationCap } from "lucide-react"

interface MetricsCardsProps {
  metrics: {
    totalCollected: number
    programsRun: number
    peopleAssisted: number
    topProgram: string
  }
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    })
      .format(value)
      .replace("IDR", "Rp")
  }

  return (
    <div className="space-y-4">
      <Card className="bg-primary-foreground border-primary">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary rounded-full p-3">
              <Coins className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-lg font-medium">Total Zakat Collected</p>
              <p className="text-3xl font-bold">{formatCurrency(metrics.totalCollected)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-amber-950 border-amber-600">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-amber-600 rounded-full p-3">
              <BookOpen className="h-6 w-6 text-amber-950" />
            </div>
            <div>
              <p className="text-lg font-medium">Programs Run</p>
              <p className="text-3xl font-bold">{metrics.programsRun}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-teal-950 border-teal-600">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-teal-600 rounded-full p-3">
              <GraduationCap className="h-6 w-6 text-teal-950" />
            </div>
            <div>
              <p className="text-lg font-medium">Mustahik Assisted</p>
              <p className="text-3xl font-bold">{metrics.peopleAssisted.toLocaleString()} people</p>
              <p className="text-sm mt-1">Top Program: {metrics.topProgram}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
