"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { SmartInventory } from "@/components/smart-inventory"

export default function SmartInventoryPage() {
  const [activePath, setActivePath] = useState("/smart-suggest")

  return (
    <div className="flex h-screen">
      <Sidebar activePath={activePath} setActivePath={setActivePath} />
      <SmartInventory />
    </div>
  )
}
