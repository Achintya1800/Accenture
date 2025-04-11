"use client"
import { useRouter } from "next/navigation"

interface MainContentProps {
  activePath: string
  setActivePath: (path: string) => void
}

export function MainContent({ activePath, setActivePath }: MainContentProps) {
  const router = useRouter()

  const menuItems = [
    { name: "Home", path: "/", emoji: "🏠" },
    { name: "AINegotiator", path: "/ai-negotiator", emoji: "💲" },
    { name: "AnalyticsPage", path: "/analytics", emoji: "📊" },
    { name: "ModifyInventory", path: "/inventory", emoji: "🏢" },
    { name: "PersonalisedMarketing", path: "/marketing", emoji: "🧠" },
    { name: "SmartSuggest", path: "/smart-suggest", emoji: "📢" },
  ]

  const handleClick = (path: string) => {
    setActivePath(path)
    router.push(path)
  }

  return (
    <div className="flex-1 p-6">
      <div className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleClick(item.path)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-left ${
              activePath === item.path ? "bg-sky-100" : ""
            }`}
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-lg">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
