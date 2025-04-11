"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { InventoryManager } from "@/components/inventory-manager"

export default function InventoryPage() {
  const [activePath, setActivePath] = useState("/inventory")

  return (
    <div className="flex h-screen">
      <Sidebar activePath={activePath} setActivePath={setActivePath} />
      <div className="flex-1 overflow-auto">
        <InventoryManager />
      </div>
    </div>
  )
}
