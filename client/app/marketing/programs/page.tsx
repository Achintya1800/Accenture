"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { SmartMarketingPrograms } from "@/components/smart-marketing-programs"

export default function SmartMarketingProgramsPage() {
  const [activePath, setActivePath] = useState("/marketing")

  return (
    <div className="flex h-screen">
      <Sidebar activePath={activePath} setActivePath={setActivePath} />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Personalised Marketing</h1>
          <SmartMarketingPrograms />
        </div>
      </div>
    </div>
  )
}
