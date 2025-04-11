"use client"

import { useState } from "react"

interface ItemPrice {
  [wholesaler: string]: number
}

interface ItemData {
  name: string
  prices: ItemPrice
}

export function BestDeal() {
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Data for the comparison table
  const items: ItemData[] = [
    {
      name: "Rice",
      prices: { "Gupta Traders": 177, "Singh Brothers": 220, "Sharma Enterprises": 220, "Agarwal Traders": 130 },
    },
    {
      name: "Daal",
      prices: { "Gupta Traders": 270, "Singh Brothers": 330, "Sharma Enterprises": 330, "Agarwal Traders": 202 },
    },
    {
      name: "Wheat",
      prices: { "Gupta Traders": 360, "Singh Brothers": 435, "Sharma Enterprises": 440, "Agarwal Traders": 270 },
    },
    {
      name: "Refined Oil",
      prices: { "Gupta Traders": 450, "Singh Brothers": 562.5, "Sharma Enterprises": 500, "Agarwal Traders": 335.5 },
    },
    {
      name: "Sugar",
      prices: { "Gupta Traders": 525, "Singh Brothers": 670, "Sharma Enterprises": 600, "Agarwal Traders": 405 },
    },
    {
      name: "Salt",
      prices: { "Gupta Traders": 90, "Singh Brothers": 130, "Sharma Enterprises": 100, "Agarwal Traders": 80 },
    },
    {
      name: "Spices",
      prices: { "Gupta Traders": 180, "Singh Brothers": 225, "Sharma Enterprises": 270, "Agarwal Traders": 125 },
    },
    {
      name: "Tea",
      prices: { "Gupta Traders": 270, "Singh Brothers": 325, "Sharma Enterprises": 360, "Agarwal Traders": 200 },
    },
    {
      name: "Coffee",
      prices: { "Gupta Traders": 360, "Singh Brothers": 450, "Sharma Enterprises": 450, "Agarwal Traders": 225 },
    },
    {
      name: "Chocolate",
      prices: { "Gupta Traders": 445, "Singh Brothers": 560, "Sharma Enterprises": 530, "Agarwal Traders": 300 },
    },
  ]

  const handleFinaliseDeals = () => {
    setShowConfirmation(true)
    setTimeout(() => {
      setShowConfirmation(false)
    }, 3000)
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Best Deal Table</h2>

        {/* Best Deal Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-sky-200">
                <th className="border p-3 text-left"></th>
                <th className="border p-3 text-left">Items</th>
                <th className="border p-3 text-left">Gupta Traders</th>
                <th className="border p-3 text-left">Singh Brothers</th>
                <th className="border p-3 text-left">Sharma Enterprises</th>
                <th className="border p-3 text-left">Agarwal Traders</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="border p-3">{index}</td>
                  <td className="border p-3">{item.name}</td>
                  <td className="border p-3">₹{item.prices["Gupta Traders"]}</td>
                  <td className="border p-3">
                    ₹
                    {typeof item.prices["Singh Brothers"] === "number"
                      ? item.prices["Singh Brothers"].toFixed(item.prices["Singh Brothers"] % 1 === 0 ? 0 : 2)
                      : item.prices["Singh Brothers"]}
                  </td>
                  <td className="border p-3">₹{item.prices["Sharma Enterprises"]}</td>
                  <td className="border p-3">
                    ₹
                    {typeof item.prices["Agarwal Traders"] === "number"
                      ? item.prices["Agarwal Traders"].toFixed(item.prices["Agarwal Traders"] % 1 === 0 ? 0 : 2)
                      : item.prices["Agarwal Traders"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-start">
          <button onClick={handleFinaliseDeals} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Finalise Deals
          </button>
        </div>

        {showConfirmation && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
            Deals finalised successfully! Orders have been placed with the best vendors.
          </div>
        )}
      </div>
    </div>
  )
}
