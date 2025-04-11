"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { PersonalisedMarketing } from "@/components/personalised-marketing"

export default function MarketingPage() {
  const [activePath, setActivePath] = useState("/marketing")

  return (
    <div className="flex h-screen">
      <Sidebar activePath={activePath} setActivePath={setActivePath} />
      <PersonalisedMarketing />
    </div>
  )
}
