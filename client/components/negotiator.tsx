"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface WholesalerData {
  name: string
  items: Record<string, { initial: number; final: number }>
  replyMessage?: string
  shippingCharges?: number
}

interface ItemPrice {
  [wholesaler: string]: number
}

interface ItemData {
  name: string
  prices: ItemPrice
}

export function Negotiator() {
  const [expandedWholesaler, setExpandedWholesaler] = useState<string | null>("Sharma Enterprises")

  // Data for the comparison table
  const items: ItemData[] = [
    {
      name: "Rice",
      prices: { "Gupta Traders": 180, "Singh Brothers": 225, "Sharma Enterprises": 270, "Agarwal Traders": 135 },
    },
    {
      name: "Daal",
      prices: { "Gupta Traders": 270, "Singh Brothers": 337.5, "Sharma Enterprises": 360, "Agarwal Traders": 202.5 },
    },
    {
      name: "Wheat",
      prices: { "Gupta Traders": 360, "Singh Brothers": 450, "Sharma Enterprises": 450, "Agarwal Traders": 270 },
    },
    {
      name: "Refined Oil",
      prices: { "Gupta Traders": 450, "Singh Brothers": 562.5, "Sharma Enterprises": 540, "Agarwal Traders": 337.5 },
    },
    {
      name: "Sugar",
      prices: { "Gupta Traders": 540, "Singh Brothers": 675, "Sharma Enterprises": 630, "Agarwal Traders": 405 },
    },
    {
      name: "Salt",
      prices: { "Gupta Traders": 90, "Singh Brothers": 135, "Sharma Enterprises": 108, "Agarwal Traders": 81 },
    },
    {
      name: "Spices",
      prices: { "Gupta Traders": 180, "Singh Brothers": 225, "Sharma Enterprises": 270, "Agarwal Traders": 135 },
    },
    {
      name: "Tea",
      prices: { "Gupta Traders": 270, "Singh Brothers": 337.5, "Sharma Enterprises": 360, "Agarwal Traders": 202.5 },
    },
    {
      name: "Coffee",
      prices: { "Gupta Traders": 360, "Singh Brothers": 450, "Sharma Enterprises": 450, "Agarwal Traders": 270 },
    },
    {
      name: "Chocolate",
      prices: { "Gupta Traders": 450, "Singh Brothers": 562.5, "Sharma Enterprises": 540, "Agarwal Traders": 337.5 },
    },
  ]

  // Detailed data for each wholesaler
  const wholesalers: WholesalerData[] = [
    {
      name: "Gupta Traders",
      items: {
        Rice: { initial: 180, final: 175 },
        Daal: { initial: 270, final: 260 },
        Wheat: { initial: 360, final: 350 },
        "Refined Oil": { initial: 450, final: 440 },
        Sugar: { initial: 540, final: 530 },
      },
    },
    {
      name: "Singh Brothers",
      items: {
        Rice: { initial: 225, final: 220 },
        Daal: { initial: 337.5, final: 330 },
        Wheat: { initial: 450, final: 440 },
        "Refined Oil": { initial: 562.5, final: 550 },
        Sugar: { initial: 675, final: 660 },
      },
    },
    {
      name: "Sharma Enterprises",
      items: {
        Rice: { initial: 270.0, final: 265 },
        Wheat: { initial: 360.0, final: 353 },
        "Refined Oil": { initial: 450, final: 442 },
        Sugar: { initial: 540.0, final: 530 },
        Daal: { initial: 630.0, final: 618 },
      },
      replyMessage: "Happy shopping with us! Enjoy exclusive offers after negotiation.",
      shippingCharges: 108,
    },
    {
      name: "Agarwal Traders",
      items: {
        Rice: { initial: 135, final: 130 },
        Daal: { initial: 202.5, final: 195 },
        Wheat: { initial: 270, final: 260 },
        "Refined Oil": { initial: 337.5, final: 330 },
        Sugar: { initial: 405, final: 395 },
      },
    },
  ]

  const toggleWholesaler = (name: string) => {
    if (expandedWholesaler === name) {
      setExpandedWholesaler(null)
    } else {
      setExpandedWholesaler(name)
    }
  }

  const calculateTotal = (wholesaler: WholesalerData) => {
    let total = 0
    Object.values(wholesaler.items).forEach((item) => {
      total += item.final
    })
    if (wholesaler.shippingCharges) {
      total += wholesaler.shippingCharges
    }
    return total
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Map placeholder */}
        <div className="mb-6 bg-gray-100 h-40 rounded-lg flex items-center justify-center relative">
          <img
            src="/india-wholesaler-network.png"
            alt="Map showing wholesaler locations"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-600">
            © Mapbox © OpenStreetMap <span className="underline">Improve this map</span>
          </div>
        </div>

        {/* Wholesaler accordions */}
        <div className="space-y-4 mb-6">
          {wholesalers.map((wholesaler) => (
            <div key={wholesaler.name} className="border rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-4 bg-white cursor-pointer"
                onClick={() => toggleWholesaler(wholesaler.name)}
              >
                <h3 className="text-lg font-medium">Wholesaler: {wholesaler.name}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    expandedWholesaler === wholesaler.name ? "rotate-180" : ""
                  }`}
                />
              </div>

              {expandedWholesaler === wholesaler.name && (
                <div className="p-4 bg-white border-t">
                  {wholesaler.replyMessage && <p className="mb-4">Reply Message: {wholesaler.replyMessage}</p>}

                  {Object.entries(wholesaler.items).map(([itemName, prices]) => (
                    <div key={itemName} className="mb-2">
                      <p>
                        {itemName} (initial offer): ₹{prices.initial.toFixed(1)}
                      </p>
                      <p>
                        {itemName} (finaloffer): ₹{prices.final}
                      </p>
                    </div>
                  ))}

                  {wholesaler.shippingCharges && (
                    <p className="mt-4">Shipping Charges: ₹{wholesaler.shippingCharges}</p>
                  )}

                  <p className="mt-4 font-bold">Total Charges: ₹{calculateTotal(wholesaler)}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="px-6 py-2 bg-white rounded border border-gray-300 hover:bg-gray-100 mb-6">Load More</button>

        {/* Negotiation Details Table */}
        <h2 className="text-3xl font-bold mb-4">Negotiation Details Table</h2>
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
                  <td className="border p-3">₹{item.prices["Singh Brothers"]}</td>
                  <td className="border p-3">₹{item.prices["Sharma Enterprises"]}</td>
                  <td className="border p-3">₹{item.prices["Agarwal Traders"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
