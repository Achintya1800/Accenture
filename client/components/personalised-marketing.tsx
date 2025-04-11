"use client"

import { useState } from "react"
import { CustomerSegments } from "./customer-segments"
import SmartMarketingPrograms from "./smart-marketing-programs"

export function PersonalisedMarketing() {
  const [activeTab, setActiveTab] = useState<"segments" | "marketing">("segments")

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Personalised Marketing</h1>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-medium mr-4">Select Tab:</h2>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tab"
                  checked={activeTab === "segments"}
                  onChange={() => setActiveTab("segments")}
                  className="mr-2 h-5 w-5 accent-blue-500"
                />
                <span className="text-lg">Customer Segments</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tab"
                  checked={activeTab === "marketing"}
                  onChange={() => setActiveTab("marketing")}
                  className="mr-2 h-5 w-5 accent-blue-500"
                />
                <span className="text-lg">Smart Marketing Programs</span>
              </label>
            </div>
          </div>
        </div>

        {activeTab === "segments" ? <CustomerSegments /> : <SmartMarketingPrograms />}
      </div>
    </div>
  )
}
