"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"

export default function Home() {
  const [activePath, setActivePath] = useState("/")

  return (
    <div className="flex h-screen">
      <Sidebar activePath={activePath} setActivePath={setActivePath} />
      <MainContent activePath={activePath} setActivePath={setActivePath} />
    </div>
  )
}
