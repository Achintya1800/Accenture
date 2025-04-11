"use client"

import { Sidebar } from "@/components/sidebar"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { useState } from "react"

export default function AnalyticsPage() {
  const [activePath, setActivePath] = useState("/analytics")

  return (
    <div className="flex h-screen">
      <Sidebar activePath={activePath} setActivePath={setActivePath} />
      <div className="flex-1 overflow-auto">
        <AnalyticsDashboard />
      </div>
    </div>
  )
}
