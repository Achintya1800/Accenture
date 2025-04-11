const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyASrg6Kp6P3rMUCzoiqSc40jCo_jmI4xfE";

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(apiKey);

router.post('/suggest', async (req, res) => {
    try {
        const { selected_month, selected_language } = req.body;
        
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        // Create the prompt text
        const promptText = `
        As the professional inventory analyst for Assawa grocery stores, create a structured, professional alert (120-150 words) for the month of ${selected_month} with specific restocking recommendations to maximize profits.
        CRITICAL: Dont start with saying "OKAY,here is the message" , JUST RETURN THE MESSAGE . Dont start with "here is the alert" . USE ONE LINE SPACING BETWEEN EACH ITEM. USE NUMBERS with prefix as "-" FOR THE every new item.
Your response must follow this exact format:
1. Start with a brief seasonal overview (1-2 sentences with relevant emojis)
2. List exactly 5 high-priority items to stock, each formatted as follows:
   • [Item Name] (in bold)
   • Why: (in italics) Brief explanation of seasonal demand factors
   • Recommended Increase: Specific percentage (15-40%)
   • Stock By: Specific date before peak demand

3. Include a brief professional closing note with actionable advice


IMPORTANT : Dont use any other formatting other than the one mentioned above.Dont inlcude anything else in the message.

Consider these factors in your recommendations:
- Regional Indian festivals and holidays during ${selected_month}
- Seasonal weather patterns and their effect on consumption
- Historical sales patterns and cultural significance
- Local food traditions and seasonal specialties

Make your response visually engaging with appropriate emojis, bullet points, and formatting while maintaining a professional tone. Respond in ${selected_language} language.`;
        
        // Generate content
        const result = await model.generateContent({
            contents: [{
                parts: [{ text: promptText }]
            }]
        });
        
        const response = await result.response;
        const text = response.text();
        
        res.status(200).json({ message: text });
        
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Failed to generate message.' });
    }
});

router.post('/market', async (req, res) => {
  const {
    targetOccasion,
    campaignStrategy,
    messageTone,
    customInstructions,
    messageLength
  } = req.body;

  if (!targetOccasion || !campaignStrategy || !messageTone || !messageLength) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Generate a marketing message with the following parameters:
- Occasion: ${targetOccasion}
- Strategy: ${campaignStrategy}
- Tone: ${messageTone}
- Length: ${messageLength}
- Additional Instructions: ${customInstructions || 'None'}

As Ramesh Assava, assistant at Assawa grocery store, create a personalized ${messageLength}-word marketing message for ${targetOccasion} that is polite and exciting. The message should be culturally appropriate for the occasion and include relevant emojis to enhance engagement.Dont use hashtags .
Bold text wherever requried. 
`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    });

    // Get the response from the result
    const response = await result.response;
    const generatedText = response.text();
    
    return res.status(200).json({ 
      generatedMessage: generatedText,
      success: true
    });
  } catch (error) {
    console.error('Error generating marketing message:', error);
    
    return res.status(500).json({ 
      error: 'Failed to generate marketing message',
      details: error.message,
      success: false
    });
  }
});

module.exports = router;