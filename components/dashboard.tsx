"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { MapView } from "@/components/map-view"
import { MetricsCards } from "@/components/metrics-cards"
import { ChartsSection } from "@/components/charts-section"
import { FileUpload } from "@/components/file-upload"
import { DataTable } from "@/components/data-table"
import { initialData } from "@/lib/data"
import { SidebarInset } from "@/components/ui/sidebar"

export function Dashboard() {
  const [data, setData] = useState(initialData)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [year, setYear] = useState<string>("2024")
  const [aidType, setAidType] = useState<string>("All")

  const handleDataUpload = (newData: any) => {
    setData(newData)
  }

  const filteredData = data.filter((item) => {
    return (
      (year === "All" || item.year === year) &&
      (aidType === "All" || item.aidType === aidType) &&
      (!selectedRegion || item.region === selectedRegion)
    )
  })

  const metrics = {
    totalCollected: filteredData.reduce((sum, item) => sum + item.amount, 0),
    programsRun: new Set(filteredData.map((item) => item.program)).size,
    peopleAssisted: filteredData.reduce((sum, item) => sum + item.beneficiaries, 0),
    topProgram: getTopProgram(filteredData),
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <SidebarInset>
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader
            year={year}
            setYear={setYear}
            aidType={aidType}
            setAidType={setAidType}
          />
          <div className="flex-1 overflow-auto p-4 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-card rounded-lg shadow">
                <MapView
                  data={filteredData}
                  selectedRegion={selectedRegion}
                  setSelectedRegion={setSelectedRegion}
                />
              </div>
              <div className="space-y-4">
                <MetricsCards metrics={metrics} />
                <FileUpload onUpload={handleDataUpload} />
              </div>
            </div>
            <ChartsSection data={filteredData} />
            <DataTable data={filteredData} />
          </div>
        </div>
      </SidebarInset>
    </div>
  )
}

function getTopProgram(data: any[]) {
  const programCounts = data.reduce(
    (acc, item) => {
      acc[item.program] = (acc[item.program] || 0) + item.amount
      return acc
    },
    {} as Record<string, number>,
  )

  let topProgram = ""
  let maxAmount = 0

  Object.entries(programCounts).forEach(([program, amount]) => {
    if (amount > maxAmount) {
      maxAmount = amount
      topProgram = program
    }
  })

  return topProgram
}
