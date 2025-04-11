"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Negotiator } from "@/components/negotiator"

export default function NegotiatorPage() {
  const [activePath, setActivePath] = useState("/ai-negotiator")

  return (
    <div className="flex h-screen">
      <Sidebar activePath={activePath} setActivePath={setActivePath} />
      <Negotiator />
    </div>
  )
}
