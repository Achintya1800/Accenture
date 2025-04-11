"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { SmartBuying } from "@/components/smart-buying"

export default function SmartBuyingPage() {
  const [activePath, setActivePath] = useState("/smart-suggest")

  return (
    <div className="flex h-screen">
      <Sidebar activePath={activePath} setActivePath={setActivePath} />
      <SmartBuying />
    </div>
  )
}
