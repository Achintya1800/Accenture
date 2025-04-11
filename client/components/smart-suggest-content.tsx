"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Play, Volume2, MoreVertical } from "lucide-react"

export function SmartSuggestContent() {
  // State for initial view and content generation
  const [isGenerating, setIsGenerating] = useState(true)
  const [showInsights, setShowInsights] = useState(false)
  const [language, setLanguage] = useState("English")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [itemName, setItemName] = useState("")
  const [costPrice, setCostPrice] = useState("0.01")
  const [sellPrice, setSellPrice] = useState("0.01")
  const [quantity, setQuantity] = useState("0")

  // State for audio player
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioDuration, setAudioDuration] = useState(82) // 1:22 in seconds

  // Language options
  const languages = ["English", "Hindi", "Bengali"]

  // Simulate AI generating content
  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        setIsGenerating(false)
        setShowInsights(true)
      }, 5000) // 5 seconds delay to simulate AI generation
      return () => clearTimeout(timer)
    }
  }, [isGenerating])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" + secs : secs}`
  }

  const selectLanguage = (lang: string) => {
    setLanguage(lang)
    setShowLanguageDropdown(false)
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Age, Gender and Category-wise Sales Distribution</h1>

        <div className="mb-6">
          <label htmlFor="language" className="block mb-2 text-lg">
            Select Language
          </label>
          <div className="relative">
            <div
              className="w-full p-3 rounded bg-sky-200 border-0 flex justify-between items-center cursor-pointer"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <span>{language}</span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </div>
            {showLanguageDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
                {languages.map((lang) => (
                  <div
                    key={lang}
                    className={`p-3 cursor-pointer ${
                      lang === language ? "bg-white" : lang === "Hindi" ? "bg-sky-200" : "bg-white"
                    } hover:bg-sky-100`}
                    onClick={() => selectLanguage(lang)}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {isGenerating ? (
          // Initial view with loading animation
          <>
            <div className="flex items-center mb-6 text-gray-600">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-3"></div>
              <p>AI is generating your content. This can take a while sometimes...</p>
            </div>

            <div className="space-y-4">
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
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl font-bold">+</button>
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
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl font-bold">+</button>
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
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl font-bold">+</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Insights view with audio player
          <>
            <h2 className="text-xl mb-4">Play the Audio</h2>

            <div className="bg-gray-100 rounded-lg p-4 mb-10">
              <div className="flex items-center">
                <button onClick={handlePlayPause} className="mr-3" aria-label={isPlaying ? "Pause" : "Play"}>
                  <Play size={20} />
                </button>
                <span className="mr-3 text-sm">
                  {formatTime(currentTime)} / {formatTime(audioDuration)}
                </span>
                <div className="flex-1 h-1 bg-gray-300 mx-3 rounded-full">
                  <div
                    className="h-1 bg-gray-500 rounded-full"
                    style={{ width: `${(currentTime / audioDuration) * 100}%` }}
                  ></div>
                </div>
                <button className="mx-3" aria-label="Volume">
                  <Volume2 size={20} />
                </button>
                <button aria-label="More options">
                  <MoreVertical size={20} />
                </button>
              </div>
              <audio
                ref={audioRef}
                onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              >
                <source src="/sample-audio.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>

            <div className="border-t border-b py-6 my-6">
              <div className="bg-white p-6 rounded-lg">
                <p className="mb-4">
                  Based on the category data, we can generate the following insights and suggestions:
                </p>

                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <p className="font-medium">Most popular items in each category:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>
                        <p>
                          Protein Supplements: It seems that Protein Supplements are the most popular items based on the
                          number of contributions made in this category.
                        </p>
                      </li>
                      <li>
                        <p>
                          Grocery: Grocery items are also popular among the contributors, as there are a significant
                          number of contributions made in this category.
                        </p>
                      </li>
                      <li>
                        <p>
                          Stationery: Stationery items have comparatively fewer contributions, indicating that they may
                          not be as popular as Protein Supplements or Grocery items.
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p className="font-medium">Contribution amount of each category to the total revenue:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>
                        <p>
                          Protein Supplements: This category contributes 35% of the total revenue/amount. It seems to be
                          a significant contributor to the overall revenue.
                        </p>
                      </li>
                      <li>
                        <p>
                          Grocery: Grocery items contribute 45% of the total revenue, making it the highest contributing
                          category.
                        </p>
                      </li>
                      <li>
                        <p>
                          Stationery: Stationery items contribute 20% of the total revenue, indicating a lesser
                          contribution compared to Protein Supplements and Grocery items.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
