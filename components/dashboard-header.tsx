"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface DashboardHeaderProps {
  year: string
  setYear: (year: string) => void
  aidType: string
  setAidType: (aidType: string) => void
}

export function DashboardHeader({ year, setYear, aidType, setAidType }: DashboardHeaderProps) {
  return (
    <div className="bg-card p-4 border-b">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-3xl font-bold">Dashboard Analysis Map Based</h1>
        </div>
        <div className="flex flex-wrap gap-4">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Years</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>

          <Select value={aidType} onValueChange={setAidType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Aid Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Housing">Housing</SelectItem>
              <SelectItem value="Economic">Economic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
