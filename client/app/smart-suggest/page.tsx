"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { SmartSuggestContent } from "@/components/smart-suggest-content"

export default function SmartSuggestPage() {
  const [activePath, setActivePath] = useState("/smart-suggest")

  return (
    <div className="flex h-screen">
      <Sidebar activePath={activePath} setActivePath={setActivePath} />
      <SmartSuggestContent />
    </div>
  )
}
