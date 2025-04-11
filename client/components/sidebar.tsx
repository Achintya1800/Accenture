"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronUp, ChevronDown } from "lucide-react"

interface SidebarProps {
  activePath: string
  setActivePath: (path: string) => void
}

export function Sidebar({ activePath, setActivePath }: SidebarProps) {
  const router = useRouter()
  const [showSmartSuggestTabs, setShowSmartSuggestTabs] = useState(false)
  const [showMarketingTabs, setShowMarketingTabs] = useState(false)
  const [showNegotiatorTabs, setShowNegotiatorTabs] = useState(false)
  const [selectedSmartSuggestTab, setSelectedSmartSuggestTab] = useState("Selling")
  const [selectedMarketingTab, setSelectedMarketingTab] = useState("Customer Segments")
  const [selectedCampaignStrategy, setSelectedCampaignStrategy] = useState("Occasions")
  const [selectedNegotiatorTab, setSelectedNegotiatorTab] = useState("Message Generators")

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "AINegotiator", path: "/ai-negotiator" },
    { name: "AnalyticsPage", path: "/analytics" },
    { name: "ModifyInventory", path: "/inventory" },
    { name: "PersonalisedMarketing", path: "/marketing" },
    { name: "SkAI", path: "/skai" },
    { name: "SmartSuggest", path: "/smart-suggest" },
  ]

  const handleClick = (path: string, name: string) => {
    setActivePath(path)

    // Handle SmartSuggest tabs
    if (name === "SmartSuggest") {
      setShowSmartSuggestTabs(!showSmartSuggestTabs)
      setShowMarketingTabs(false)
      setShowNegotiatorTabs(false)
      router.push(path)
    }
    // Handle PersonalisedMarketing tabs
    else if (name === "PersonalisedMarketing") {
      setShowMarketingTabs(!showMarketingTabs)
      setShowSmartSuggestTabs(false)
      setShowNegotiatorTabs(false)
      router.push(path)
    }
    // Handle AINegotiator tabs
    else if (name === "AINegotiator") {
      setShowNegotiatorTabs(!showNegotiatorTabs)
      setShowSmartSuggestTabs(false)
      setShowMarketingTabs(false)
      router.push(path)
    } else {
      setShowSmartSuggestTabs(false)
      setShowMarketingTabs(false)
      setShowNegotiatorTabs(false)
      router.push(path)
    }
  }

  const handleSmartSuggestTabClick = (tab: string) => {
    setSelectedSmartSuggestTab(tab)

    // Navigate to the appropriate page based on the selected tab
    if (tab === "Inventory") {
      router.push("/smart-inventory")
    } else if (tab === "Selling") {
      router.push("/smart-suggest")
    } else if (tab === "Buying") {
      router.push("/smart-buying")
    }
  }

  const handleMarketingTabClick = (tab: string) => {
    setSelectedMarketingTab(tab)

    // Navigate to the appropriate page based on the selected tab
    if (tab === "Customer Segments") {
      router.push("/marketing/segments")
    } else if (tab === "Smart Marketing Programs") {
      router.push("/marketing/programs")
    }
  }

  const handleNegotiatorTabClick = (tab: string) => {
    setSelectedNegotiatorTab(tab)

    // Navigate to the appropriate page based on the selected tab
    if (tab === "Message Generators") {
      router.push("/ai-negotiator")
    } else if (tab === "Negotiator") {
      router.push("/ai-negotiator/negotiator")
    } else if (tab === "Best Deal") {
      router.push("/ai-negotiator/best-deal")
    }
  }

  const handleCampaignStrategyClick = (strategy: string) => {
    setSelectedCampaignStrategy(strategy)
  }

  // Check if we're on specific pages and show appropriate tabs
  useEffect(() => {
    if (window.location.pathname === "/smart-buying") {
      setShowSmartSuggestTabs(true)
      setSelectedSmartSuggestTab("Buying")
    } else if (window.location.pathname === "/smart-inventory") {
      setShowSmartSuggestTabs(true)
      setSelectedSmartSuggestTab("Inventory")
    } else if (window.location.pathname === "/marketing/segments") {
      setShowMarketingTabs(true)
      setSelectedMarketingTab("Customer Segments")
    } else if (window.location.pathname === "/marketing/programs") {
      setShowMarketingTabs(true)
      setSelectedMarketingTab("Smart Marketing Programs")
    } else if (window.location.pathname === "/ai-negotiator") {
      setShowNegotiatorTabs(true)
      setSelectedNegotiatorTab("Message Generators")
    } else if (window.location.pathname === "/ai-negotiator/negotiator") {
      setShowNegotiatorTabs(true)
      setSelectedNegotiatorTab("Negotiator")
    } else if (window.location.pathname === "/ai-negotiator/best-deal") {
      setShowNegotiatorTabs(true)
      setSelectedNegotiatorTab("Best Deal")
    }
  }, [])

  return (
    <div className="h-full w-[336px] bg-gradient-to-b from-sky-300 to-sky-400 flex flex-col">
      <div className="flex-1">
        <nav className="flex flex-col p-6">
          {menuItems.map((item) => (
            <div key={item.name} className="mb-4">
              <button
                onClick={() => handleClick(item.path, item.name)}
                className={`text-black/70 hover:text-black px-4 py-2 text-lg text-left w-full ${
                  activePath === item.path ? "font-medium" : ""
                }`}
              >
                {item.name}
              </button>

              {/* Dropdown for AINegotiator */}
              {item.name === "AINegotiator" && showNegotiatorTabs && (
                <div className="mt-2">
                  <div
                    className="flex justify-center border-t border-b border-sky-300/30 py-2 cursor-pointer"
                    onClick={() => setShowNegotiatorTabs(!showNegotiatorTabs)}
                  >
                    {showNegotiatorTabs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>

                  <div className="bg-sky-300 p-4">
                    <h3 className="mb-3 text-lg">Select Tab:</h3>
                    <div className="space-y-2">
                      {["Message Generators", "Negotiator", "Best Deal"].map((tab) => (
                        <div key={tab} className="flex items-center">
                          <input
                            type="radio"
                            id={tab.replace(/\s+/g, "")}
                            name="negotiatorTab"
                            checked={selectedNegotiatorTab === tab}
                            onChange={() => handleNegotiatorTabClick(tab)}
                            className="mr-2 h-5 w-5 accent-blue-500"
                          />
                          <label htmlFor={tab.replace(/\s+/g, "")} className="text-lg">
                            {tab}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Dropdown for PersonalisedMarketing */}
              {item.name === "PersonalisedMarketing" && showMarketingTabs && (
                <div className="mt-2">
                  <div
                    className="flex justify-center border-t border-b border-sky-300/30 py-2 cursor-pointer"
                    onClick={() => setShowMarketingTabs(!showMarketingTabs)}
                  >
                    {showMarketingTabs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>

                  <div className="bg-sky-300 p-4">
                    <h3 className="mb-3 text-lg">Select Tab:</h3>
                    <div className="space-y-2">
                      {["Customer Segments", "Smart Marketing Programs"].map((tab) => (
                        <div key={tab} className="flex items-center">
                          <input
                            type="radio"
                            id={tab.replace(/\s+/g, "")}
                            name="marketingTab"
                            checked={selectedMarketingTab === tab}
                            onChange={() => handleMarketingTabClick(tab)}
                            className="mr-2 h-5 w-5 accent-blue-500"
                          />
                          <label htmlFor={tab.replace(/\s+/g, "")} className="text-lg">
                            {tab}
                          </label>
                        </div>
                      ))}
                    </div>

                    {selectedMarketingTab === "Smart Marketing Programs" && (
                      <div className="mt-4">
                        <h3 className="mb-3 text-lg">Choose campaign strategy</h3>
                        <div className="space-y-2">
                          {["Occasions", "Deadstock", "Retention"].map((strategy) => (
                            <div key={strategy} className="flex items-center">
                              <input
                                type="radio"
                                id={strategy}
                                name="campaignStrategy"
                                checked={selectedCampaignStrategy === strategy}
                                onChange={() => handleCampaignStrategyClick(strategy)}
                                className="mr-2 h-5 w-5 accent-blue-500"
                              />
                              <label htmlFor={strategy} className="text-lg">
                                {strategy}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Dropdown for SmartSuggest */}
              {item.name === "SmartSuggest" && showSmartSuggestTabs && (
                <div className="mt-2">
                  <div
                    className="flex justify-center border-t border-b border-sky-300/30 py-2 cursor-pointer"
                    onClick={() => setShowSmartSuggestTabs(!showSmartSuggestTabs)}
                  >
                    {showSmartSuggestTabs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>

                  <div className="bg-sky-300 p-4">
                    <h3 className="mb-3 text-lg">Choose a tab</h3>
                    <div className="space-y-2">
                      {["Selling", "Inventory", "Buying"].map((tab) => (
                        <div key={tab} className="flex items-center">
                          <input
                            type="radio"
                            id={tab}
                            name="smartSuggestTab"
                            checked={selectedSmartSuggestTab === tab}
                            onChange={() => handleSmartSuggestTabClick(tab)}
                            className="mr-2 h-5 w-5 accent-blue-500"
                          />
                          <label htmlFor={tab} className="text-lg">
                            {tab}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-sky-300/30 p-4 flex items-center">
        <span className="text-black/70 text-xl">&lt;</span>
        <div className="flex-1 flex justify-center">
          <span className="text-black/70 text-xl">^</span>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-5xl font-bold text-white mb-4">Sky</h1>
        <p className="text-xl font-medium text-black/80">For small businesses, Sky is the limit!</p>
      </div>
    </div>
  )
}
