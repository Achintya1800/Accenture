import { useState } from 'react';
import axios from 'axios';
import { ChevronDown } from 'lucide-react';

function CampaignMessageGenerator() {
  const [targetOccasion, setTargetOccasion] = useState('Diwali: 2025-11-04');
  const [campaignStrategy, setCampaignStrategy] = useState('Occasions');
  const [messageTone, setMessageTone] = useState('Friendly');
  const [showToneDropdown, setShowToneDropdown] = useState(false);
  const [customInstructions, setCustomInstructions] = useState('');
  const [messageLength, setMessageLength] = useState(100);
  const [personalizeEach, setPersonalizeEach] = useState(false);
  const [useDefaultPoster, setUseDefaultPoster] = useState(false);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIPoster, setShowAIPoster] = useState(false);
  const [uploadedPoster, setUploadedPoster] = useState<File | null>(null);

  const tones = ["Friendly", "Professional", "Casual", "Formal", "Enthusiastic", "Excited", "Emotional"];

  const customers = [
    {
      id: 0,
      name: "Aarav Patel",
      description: "Male, Old-Aged, Working Unmarried",
      language: "Hindi",
      points: 410,
      contact: "9876543210",
    },
    {
      id: 1,
      name: "Kavya Sharma",
      description: "Female, Adults, Young College Student",
      language: "English",
      points: 471,
      contact: "9123456780",
    },
  ];

  const selectTone = (tone: string): void => {
    setMessageTone(tone);
    setShowToneDropdown(false);
  };

  const handleDefaultPosterChange = (checked: boolean): void => {
    setUseDefaultPoster(checked);
    setShowAIPoster(checked);
  };

  const handlePosterUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedPoster(file);
    }
  };

  const handleGenerateMessage = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post('http://localhost:4000/api/ai/market', {
        targetOccasion,
        campaignStrategy,
        messageTone,
        customInstructions,
        messageLength,
        personalizeEach,
      });
      const rawMessage = response.data.generatedMessage || '';
      const formattedMessage = rawMessage
        .replace(/ - /g, '<br/><br/>- ')
        .replace(/\*{1,2}([^*]+)\*{1,2}/g, "<b>$1</b>")
        .replace(/\n/g, "<br/>");

      setGeneratedMessage(formattedMessage);
    } catch (error) {
      console.error('Error generating message:', error);
      setGeneratedMessage('Failed to generate message. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">Smart Marketing Campaign</h2>

      {/* Occasion Selection */}
      <div className="mb-6">
        <p className="mb-2 text-lg">Choose the target occasion for campaign</p>
        <div className="space-y-2">
          {["Women's Day: 2025-03-08", "Diwali: 2025-11-04", "Christmas: 2025-12-25"].map((occasion) => (
            <label key={occasion} className="flex items-center">
              <input
                type="radio"
                name="occasion"
                checked={targetOccasion === occasion}
                onChange={() => setTargetOccasion(occasion)}
                className="mr-2 h-5 w-5 accent-blue-500"
              />
              <span className="text-lg">{occasion}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Customer Details */}
      <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
        <div
          className="flex justify-between items-center p-4 bg-white cursor-pointer"
          onClick={() => setShowCustomerDetails(!showCustomerDetails)}
        >
          <h3 className="text-lg font-medium">Customer Details</h3>
          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform ${showCustomerDetails ? "rotate-180" : ""}`}
          />
        </div>
        {showCustomerDetails && (
          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">#</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Preferred Language</th>
                  <th className="border p-2">Loyalty Points</th>
                  <th className="border p-2">Contact</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td className="border p-2">{c.id}</td>
                    <td className="border p-2">{c.name}</td>
                    <td className="border p-2">{c.description}</td>
                    <td className="border p-2">{c.language}</td>
                    <td className="border p-2">{c.points}</td>
                    <td className="border p-2">{c.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Campaign Strategy */}
      <div className="mb-6">
        <p className="mb-2 text-lg">Choose campaign strategy</p>
        {["Occasions", "Storytelling", "Urgency"].map((strategy) => (
          <label key={strategy} className="flex items-center mb-1">
            <input
              type="radio"
              name="strategy"
              checked={campaignStrategy === strategy}
              onChange={() => setCampaignStrategy(strategy)}
              className="mr-2 h-5 w-5 accent-blue-500"
            />
            <span className="text-lg">{strategy === "Urgency" ? "Urgency + CTA" : strategy}</span>
          </label>
        ))}
      </div>

      {/* Message Tone */}
      <div className="mb-6">
        <label className="block mb-2 text-lg">Set Message Tone:</label>
        <div className="relative">
          <div
            className="w-full p-3 rounded bg-sky-200 flex justify-between items-center cursor-pointer"
            onClick={() => setShowToneDropdown(!showToneDropdown)}
          >
            <span>{messageTone}</span>
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </div>
          {showToneDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
              {tones.map((tone) => (
                <div
                  key={tone}
                  className="p-3 hover:bg-sky-100 cursor-pointer"
                  onClick={() => selectTone(tone)}
                >
                  {tone}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom Instructions */}
      <div className="mb-6">
        <label className="block mb-2 text-lg">Add Custom Instructions:</label>
        <textarea
          value={customInstructions}
          onChange={(e) => setCustomInstructions(e.target.value)}
          className="w-full p-3 rounded bg-sky-200 min-h-[100px]"
          placeholder="Add any specific instructions for your marketing message"
        />
      </div>

      {/* Additional Options */}
      <div className="mb-6 space-y-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={personalizeEach}
            onChange={() => setPersonalizeEach(!personalizeEach)}
            className="mr-2 h-5 w-5"
          />
          Personalize each Message
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={useDefaultPoster}
            onChange={(e) => handleDefaultPosterChange(e.target.checked)}
            className="mr-2 h-5 w-5"
          />
          Use Default AI-generated Poster
        </label>
      </div>

      {/* Poster Upload */}
      {!useDefaultPoster && (
        <div className="mb-6">
          <label className="block mb-2 text-lg">Add Custom Posters (Image or PDF):</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handlePosterUpload}
            className="w-full p-3 bg-sky-100 rounded"
          />
          {uploadedPoster && <p className="mt-2 text-sm">Uploaded: {uploadedPoster.name}</p>}
        </div>
      )}
      {/* Generated Message Output */}
      {generatedMessage && (
        <div className="mt-8 p-4 bg-white rounded border border-gray-300">
          <h3 className="text-xl font-semibold mb-2">Generated Message:</h3>
          <div dangerouslySetInnerHTML={{ __html: generatedMessage }} />
        </div>
      )}

      {/* Generate Message */}
      <button
        onClick={handleGenerateMessage}
        disabled={isGenerating}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-lg font-semibold"
      >
        {isGenerating ? 'Generating...' : 'Generate Marketing Message'}
      </button>

      
    </div>
  );
}

export default CampaignMessageGenerator;
