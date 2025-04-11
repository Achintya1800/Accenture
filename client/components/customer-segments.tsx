"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function CustomerSegments() {
  const [segment, setSegment] = useState("Young Adults")
  const [showSegmentDropdown, setShowSegmentDropdown] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  // Segment options
  const segments = ["Young Adults", "Seniors", "Families", "Students"]

  const selectSegment = (seg: string) => {
    setSegment(seg)
    setShowSegmentDropdown(false)
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Customer Segments</h2>

      <div className="mb-6">
        <label htmlFor="segment" className="block mb-2 text-lg">
          Select Customer Segment:
        </label>
        <div className="relative">
          <div
            className="w-full p-3 rounded bg-sky-200 border-0 flex justify-between items-center cursor-pointer"
            onClick={() => setShowSegmentDropdown(!showSegmentDropdown)}
          >
            <span>{segment}</span>
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </div>
          {showSegmentDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
              {segments.map((seg) => (
                <div
                  key={seg}
                  className={`p-3 cursor-pointer ${seg === segment ? "bg-white" : "bg-white"} hover:bg-sky-100`}
                  onClick={() => selectSegment(seg)}
                >
                  {seg}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="px-4 py-2 bg-sky-200 rounded border border-sky-300 hover:bg-sky-300"
      >
        Show Details
      </button>

      {showDetails && (
        <div className="mt-6 border rounded p-4">
          <h3 className="text-xl font-bold mb-4">Segment Details</h3>
          <p>Details for the {segment} segment would be displayed here.</p>
        </div>
      )}
    </div>
  )
}
