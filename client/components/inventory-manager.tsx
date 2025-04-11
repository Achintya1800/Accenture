"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import Image from "next/image"

interface InventoryItem {
  id: string
  skuId: string
  name: string
  buyPrice: number
  sellPrice: number
  quantity: number
  addedDatetime: string
}

export function InventoryManager() {
  const [scanWithBarcode, setScanWithBarcode] = useState(false)
  const [skuId, setSkuId] = useState("")
  const [itemName, setItemName] = useState("")
  const [costPrice, setCostPrice] = useState("0.01")
  const [sellPrice, setSellPrice] = useState("0.01")
  const [quantity, setQuantity] = useState("0")

  // Sample inventory items
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: "1",
      skuId: "PER1007",
      name: "",
      buyPrice: 390.0,
      sellPrice: 410.0,
      quantity: 170,
      addedDatetime: "2024-01-17 03:49:33",
    },
    {
      id: "2",
      skuId: "PER1005",
      name: "Hair Oil",
      buyPrice: 246.0,
      sellPrice: 300.0,
      quantity: 130,
      addedDatetime: "2024-02-03 23:58:36",
    },
  ])

  const handleAddModifyItem = () => {
    // Implementation would go here
    alert("Item added/modified")
  }

  const handleRemoveItem = (skuId: string) => {
    setInventoryItems(inventoryItems.filter((item) => item.skuId !== skuId))
  }

  const incrementValue = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue)) {
      setter((numValue + 0.01).toFixed(2))
    }
  }

  const incrementQuantity = () => {
    const numValue = Number.parseInt(quantity)
    if (!isNaN(numValue)) {
      setQuantity((numValue + 1).toString())
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Inventory Management System - Modify Inventory</h1>

      <div className="mb-6">
        <Image src="/generic-barcode.png" alt="Barcode" width={260} height={140} className="mb-4" />

        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="scanBarcode"
            checked={scanWithBarcode}
            onChange={() => setScanWithBarcode(!scanWithBarcode)}
            className="mr-2 h-5 w-5"
          />
          <label htmlFor="scanBarcode" className="text-lg">
            Scan with Barcode
          </label>
        </div>

        <p className="mb-4 text-gray-600">Barcode scanning is {scanWithBarcode ? "enabled" : "disabled"}.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="skuId" className="block mb-1 text-lg">
            Enter SKU ID:
          </label>
          <input
            id="skuId"
            type="text"
            value={skuId}
            onChange={(e) => setSkuId(e.target.value)}
            className="w-full p-3 rounded bg-sky-200 border-0"
          />
        </div>

        <div>
          <label htmlFor="itemName" className="block mb-1 text-lg">
            Enter Item Name:
          </label>
          <input
            id="itemName"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full p-3 rounded bg-sky-200 border-0"
          />
        </div>

        <div>
          <label htmlFor="costPrice" className="block mb-1 text-lg">
            Enter Cost Price:
          </label>
          <div className="relative">
            <input
              id="costPrice"
              type="text"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              className="w-full p-3 rounded bg-sky-200 border-0"
            />
            <button
              onClick={() => incrementValue(setCostPrice, costPrice)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl font-bold"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="sellPrice" className="block mb-1 text-lg">
            Enter Sell Price:
          </label>
          <div className="relative">
            <input
              id="sellPrice"
              type="text"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              className="w-full p-3 rounded bg-sky-200 border-0"
            />
            <button
              onClick={() => incrementValue(setSellPrice, sellPrice)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl font-bold"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="quantity" className="block mb-1 text-lg">
            Enter Quantity:
          </label>
          <div className="relative">
            <input
              id="quantity"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-3 rounded bg-sky-200 border-0"
            />
            <button
              onClick={incrementQuantity}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl font-bold"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleAddModifyItem}
            className="px-6 py-2 bg-gray-200 rounded border border-gray-300 hover:bg-gray-300"
          >
            Add/Modify Item
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-4xl font-bold mb-6">Existing Items in Inventory</h2>

        <div className="space-y-8">
          {inventoryItems.map((item) => (
            <div key={item.id} className="border-b pb-4">
              {item.name && <p className="text-lg mb-2">Item Name: {item.name}</p>}
              <p className="text-lg mb-2">SKU ID: {item.skuId}</p>
              <p className="text-lg mb-2">Buy Price: ₹{item.buyPrice.toFixed(2)}</p>
              <p className="text-lg mb-2">Sell Price: ₹{item.sellPrice.toFixed(2)}</p>
              <p className="text-lg mb-2">Quantity: {item.quantity}</p>
              <p className="text-lg mb-4">Added Datetime: {item.addedDatetime}</p>

              <button
                onClick={() => handleRemoveItem(item.skuId)}
                className="px-4 py-2 bg-gray-200 rounded border border-gray-300 hover:bg-gray-300"
              >
                Remove Item {item.skuId}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
