"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

export function AINegotiator() {
  const [activeTab, setActiveTab] = useState<"generators" | "negotiator" | "bestDeal">("generators")
  const [itemNames, setItemNames] = useState<string>("Rice, Flour, wheat")
  const [showQuantities, setShowQuantities] = useState(false)
  const [showTemplate, setShowTemplate] = useState(false)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [messageSent, setMessageSent] = useState(false)

  const handleAddQuantity = () => {
    const items = itemNames
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item)
    const newQuantities: Record<string, number> = {}

    items.forEach((item) => {
      newQuantities[item] = 1
    })

    setQuantities(newQuantities)
    setShowQuantities(true)
  }

  const handleGenerateTemplate = () => {
    setShowTemplate(true)
  }

  const handleSendMessage = () => {
    setMessageSent(true)
  }

  const incrementQuantity = (item: string) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: (prev[item] || 1) + 1,
    }))
  }

  const handleQuantityChange = (item: string, value: string) => {
    const numValue = Number.parseInt(value)
    if (!isNaN(numValue)) {
      setQuantities((prev) => ({
        ...prev,
        [item]: numValue,
      }))
    }
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">AI Negotiator</h1>

        <h2 className="text-3xl font-bold mb-8">Message Generators</h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="itemNames" className="block mb-2 text-lg">
              Enter Item Names (comma-separated):
            </label>
            <textarea
              id="itemNames"
              value={itemNames}
              onChange={(e) => setItemNames(e.target.value)}
              className="w-full p-3 rounded bg-sky-200 border-0 min-h-[100px]"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <button
              onClick={handleAddQuantity}
              className="px-6 py-2 bg-white rounded border border-gray-300 hover:bg-gray-100 w-fit"
            >
              Add Quantity
            </button>

            {showQuantities && (
              <>
                {Object.keys(quantities).map((item) => (
                  <div key={item} className="space-y-2">
                    <label htmlFor={`quantity-${item}`} className="block text-lg">
                      Quantity for {item}:
                    </label>
                    <div className="relative">
                      <input
                        id={`quantity-${item}`}
                        type="text"
                        value={quantities[item]}
                        onChange={(e) => handleQuantityChange(item, e.target.value)}
                        className="w-full p-3 rounded bg-sky-200 border-0"
                      />
                      <button
                        onClick={() => incrementQuantity(item)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl font-bold"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            <button
              onClick={handleGenerateTemplate}
              className="px-6 py-2 bg-white rounded border border-gray-300 hover:bg-gray-100 w-fit"
            >
              Generate Template
            </button>

            {showTemplate && (
              <div className="space-y-2">
                <label htmlFor="messageTemplate" className="block text-lg">
                  Message Template
                </label>
                <textarea
                  id="messageTemplate"
                  className="w-full p-3 rounded bg-sky-200 border-0 min-h-[200px]"
                  value={`Hello,

This is Devansh Assawa, owner of the grocery store. I hope you are doing well.

I am reaching out to inquire about the prices and availability of the following items for restocking:

${Object.entries(quantities)
  .map(([item, quantity]) => `- ${item}: ${quantity} unit${quantity > 1 ? "s" : ""}`)
  .join("\n")}

Please let me know the current rates and if these items are available in the requested quantities. I would also appreciate information about any ongoing discounts or bulk purchase offers.

Looking forward to your response.

Thank you,
Devansh Assawa
Assawa Grocery Store`}
                  readOnly
                />
              </div>
            )}

            <button
              onClick={handleSendMessage}
              className="px-6 py-2 bg-white rounded border border-gray-300 hover:bg-gray-100 w-fit"
            >
              Send Message
            </button>

            {messageSent && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">Message sent successfully!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
