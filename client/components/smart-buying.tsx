"use client"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { ChevronDown, Play, Volume2, MoreVertical } from "lucide-react"

export function SmartBuying() {
  const [language, setLanguage] = useState("English")
  const [month, setMonth] = useState("February")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showMonthDropdown, setShowMonthDropdown] = useState(false)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioDuration, setAudioDuration] = useState(123)

  const [tableData, setTableData] = useState<{ item: string; percentage: string; date: string }[]>([])
  const [suggestionMessage, setSuggestionMessage] = useState("")

  const languages = ["English", "Hindi", "Bengali"]
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/ai/suggest", {
        selected_language: language,
        selected_month: month,
      })

      let rawMessage = response.data.message || ""

      const formattedMessage = rawMessage
        .replace(/ - /g, '<br/><br/>- ')                       // New line before items
        .replace(/\*{1,2}([^*]+)\*{1,2}/g, "<b>$1</b>")        // Bold *text*
        .replace(/\n/g, "<br/>")                              // Preserve line breaks

      setSuggestionMessage(formattedMessage)

      // Sample table data
      setTableData([
        { item: "Seasonal Fruits", percentage: "15%", date: "15th of month" },
        { item: "Festival Sweets", percentage: "25%", date: "10th of month" },
        { item: "Weather-appropriate Items", percentage: "20%", date: "5th of month" },
      ])
    } catch (error) {
      console.error("Error fetching smart buying suggestions:", error)
      setTableData([])
    }
  }

  useEffect(() => {
    fetchData()
  }, [language, month])

  const selectLanguage = (lang: string) => {
    setLanguage(lang)
    setShowLanguageDropdown(false)
  }

  const selectMonth = (m: string) => {
    setMonth(m)
    setShowMonthDropdown(false)
  }

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

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Smart Buying Suggestions</h1>

        {/* Language Dropdown */}
        <div className="mb-6">
          <label className="block mb-2 text-lg">Select Language</label>
          <div className="relative">
            <div
              className="w-full p-3 rounded bg-sky-200 flex justify-between items-center cursor-pointer"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <span>{language}</span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </div>
            {showLanguageDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                {languages.map((lang) => (
                  <div
                    key={lang}
                    className="p-3 cursor-pointer hover:bg-sky-100"
                    onClick={() => selectLanguage(lang)}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Month Dropdown */}
        <div className="mb-6">
          <label className="block mb-2 text-lg">Select Month:</label>
          <div className="relative">
            <div
              className="w-full p-3 rounded bg-sky-200 flex justify-between items-center cursor-pointer"
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            >
              <span>{month}</span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </div>
            {showMonthDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                {months.map((m) => (
                  <div
                    key={m}
                    className="p-3 cursor-pointer hover:bg-sky-100"
                    onClick={() => selectMonth(m)}
                  >
                    {m}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Display AI Generated Message */}
        {suggestionMessage && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-xl mb-3">Suggestion for {month}</h2>
            <div dangerouslySetInnerHTML={{ __html: suggestionMessage }} />
          </div>
        )}

        {/* Audio Player */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Play the Audio</h2>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center">
              <button onClick={handlePlayPause} className="mr-3">
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
              <button className="mx-3">
                <Volume2 size={20} />
              </button>
              <button>
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
        </div>

        {/* Table */}
        <div className="border-t border-b py-6 my-6"></div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Item Name</th>
                <th className="border p-3 text-left">Recommended % Increase in Stock</th>
                <th className="border p-3 text-left">Date Before Increase</th>
              </tr>
            </thead>
            <tbody>
              {tableData && Array.isArray(tableData) && tableData.map((row: any, index: number) => (
                <tr key={index} className="border-b">
                  <td className="border p-3">{row.item}</td>
                  <td className="border p-3">{row.percentage}</td>
                  <td className="border p-3">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
