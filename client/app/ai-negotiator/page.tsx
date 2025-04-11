"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AINegotiator } from "@/components/ai-negotiator"

export default function AINegotiatorPage() {
  const [activePath, setActivePath] = useState("/ai-negotiator")

  return (
    <div className="flex h-screen">
      <Sidebar activePath={activePath} setActivePath={setActivePath} />
      <AINegotiator />
    </div>
  )
}
