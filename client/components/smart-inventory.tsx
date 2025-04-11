"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export function SmartInventory() {
  const [isGenerating, setIsGenerating] = useState(true)
  const [language, setLanguage] = useState("English")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [expireExpanded, setExpireExpanded] = useState(false)
  const [stockExpanded, setStockExpanded] = useState(false)

  // Simulate AI generating content
  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        setIsGenerating(false)
        setExpireExpanded(true)
      }, 3000) // 3 seconds delay to simulate AI generation
      return () => clearTimeout(timer)
    }
  }, [isGenerating])

  // Language options
  const languages = ["English", "Hindi", "Bengali"]

  const selectLanguage = (lang: string) => {
    setLanguage(lang)
    setShowLanguageDropdown(false)
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Smart Inventory Management</h1>

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

        <div className="border-t border-b py-6 my-6">
          <h2 className="text-2xl font-bold mb-6">The following items needs your immediate attention!</h2>
        </div>

        {isGenerating ? (
          <div className="flex items-center mb-6 text-gray-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-3"></div>
            <p>AI is generating your content. This can take a while sometimes...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Items that are going to Expire */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-4 bg-white cursor-pointer"
                onClick={() => setExpireExpanded(!expireExpanded)}
              >
                <h3 className="text-lg font-medium">Items that are going to Expire</h3>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${expireExpanded ? "rotate-180" : ""}`}
                />
              </div>
              {expireExpanded && (
                <div className="p-6 bg-yellow-50">
                  <h4 className="text-xl font-medium text-olive-700 mb-4">Deodorant Inventory Insights</h4>

                  <ol className="list-decimal pl-6 space-y-6">
                    <li>
                      <p className="font-medium text-olive-700">Implement a Flash Sale:</p>
                      <p className="text-olive-700">
                        Given the Deodorant's approaching expiry in 30 days, a proactive approach involves initiating a
                        flash sale. By offering a discount ranging between 15-25%, interest in the product can be
                        elevated, encouraging faster turnover. Such a strategy not only mitigates potential losses but
                        also leverages the predicted demand surge. This action aligns with preserving the 5% profit
                        margin by aiming for volume sales instead of higher per-item profit.
                      </p>
                    </li>
                    <li>
                      <p className="font-medium text-olive-700">Bundle Offers:</p>
                      <p className="text-olive-700">
                        Creating bundle offers that pair the Deodorant with products of longer shelf life or high demand
                        items could attract more customers. Suggesting a 10-20% discount on the total price of bundled
                        items is another method to increase sales volume without significantly reducing the profit
                        margin. This approach encourages customers to perceive more value, making them more likely to
                        purchase.
                      </p>
                    </li>
                    <li>
                      <p className="font-medium text-olive-700">Loyalty Program Incentives:</p>
                      <p className="text-olive-700">
                        Leveraging the loyalty program by offering the Deodorant as a reward for reaching a certain
                        point threshold can enhance customer engagement and sales. Suggest incorporating the product
                        into the loyalty program with a limited-time offer, incentivizing increased spending among
                        existing customers to clear out the inventory before expiry.
                      </p>
                    </li>
                  </ol>

                  <p className="font-medium text-olive-700 mt-6">Analysis:</p>
                  <p className="text-olive-700">
                    The profit margin of 18% provides a cushion to implement discount strategies without immediate loss.
                    The imminent expiry within 10 days necessitates swift action to prevent complete loss of value for
                    these items. Leveraging the insight about increased demand for winter-related products can be
                    pivotal in positioning the Hair Oil more attractively to consumers, particularly when combined with
                    targeted promotional strategies like bundling and flash sales.
                  </p>

                  <h4 className="text-xl font-medium text-olive-700 mt-8 mb-4">Hair Oil</h4>
                  <ol className="list-decimal pl-6 space-y-6">
                    <li>
                      <p className="font-medium text-olive-700">Launch a Flash Sale Online and In-Store:</p>
                      <p className="text-olive-700">
                        Execute a time-sensitive flash sale that prominently features the Hair Oil. Target both online
                        and in-store shoppers to maximize reach. The limited-time nature of a flash sale creates a sense
                        of urgency among consumers, encouraging quicker purchases. Additionally, this strategy can
                        attract new customers and potentially increase overall store traffic.
                      </p>
                    </li>
                  </ol>

                  <p className="font-medium text-olive-700 mt-6">Analysis:</p>
                  <p className="text-olive-700 mb-6">
                    The profit margin of 18% provides a cushion to implement discount strategies without immediate loss.
                    The imminent expiry within 10 days necessitates swift action to prevent complete loss of value for
                    these items. Leveraging the insight about increased demand for winter-related products can be
                    pivotal in positioning the Hair Oil more attractively to consumers, particularly when combined with
                    targeted promotional strategies like bundling and flash sales.
                  </p>

                  <p className="text-olive-700 mb-4">
                    For Light Bulbs, with an expiry date set at 45 days, there are no immediate steps required regarding
                    discounts for addressing expiration concerns since the product's expiry timeframe does not fall
                    below the critical 30-day threshold. Given this scenario, it's pertinent to highlight:
                  </p>

                  <ol className="list-decimal pl-6 space-y-6">
                    <li>
                      <p className="font-medium text-olive-700">No Immediate Discount Required:</p>
                      <p className="text-olive-700">
                        Since the Light Bulbs have an expiry period that isn't within the next 30 days, there's no
                        necessity to implement a discount based on expiration urgency. Maintaining current pricing can
                        help in maximizing profit margins, which is crucial given the mentioned profit percentage of 7.
                      </p>
                    </li>
                    <li>
                      <p className="font-medium text-olive-700">Profit Analysis:</p>
                      <p className="text-olive-700">
                        With a profit percentage standing at 7, it indicates a moderate margin. It's essential to
                        preserve this profitability for as long as possible without resorting to discounts that could
                        prematurely erode these margins. Keeping an eye on inventory turnover rate will ensure Light
                        Bulbs sell through at an acceptable pace without necessitating price reductions.
                      </p>
                    </li>
                    <li>
                      <p className="font-medium text-olive-700">Seasonal Price Monitoring:</p>
                      <p className="text-olive-700">
                        Despite there being no direct action needed concerning discounts due to expiry concerns, the
                        insight to monitor prices for seasonal items could be relevant. If Light Bulbs fall into
                        seasonal or cyclic demand variations, adjusting prices to remain competitive or capitalizing on
                        peak seasons through strategic pricing could enhance sales without compromising on profit
                        margins.
                      </p>
                    </li>
                  </ol>

                  <p className="text-olive-700 mt-6">
                    In summary, for Light Bulbs with an expiry of 45 days and a profit percentage of 7, the recommended
                    approach includes maintaining current pricing strategies while being vigilant about market trends
                    and demand cycles that might influence pricing decisions or stock turnover rates in the near future.
                  </p>
                </div>
              )}
            </div>

            {/* Items that are going out of Stock */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-4 bg-white cursor-pointer"
                onClick={() => setStockExpanded(!stockExpanded)}
              >
                <h3 className="text-lg font-medium">Items that are going out of Stock</h3>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${stockExpanded ? "rotate-180" : ""}`}
                />
              </div>
              {stockExpanded && (
                <div className="p-6 bg-yellow-50">
                  {/* Content for out of stock items would go here */}
                  <p className="text-olive-700">
                    Content for items going out of stock would be displayed here when expanded.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <button className="px-6 py-2 bg-gray-200 rounded border border-gray-300 hover:bg-gray-300">
                Show More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
