"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { BestDeal } from "@/components/best-deal"

export default function BestDealPage() {
  const [activePath, setActivePath] = useState("/ai-negotiator")

  return (
    <div className="flex h-screen">
      <Sidebar activePath={activePath} setActivePath={setActivePath} />
      <BestDeal />
    </div>
  )
}
