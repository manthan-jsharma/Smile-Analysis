import { OpenAI } from "openai";

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This will automatically use the environment variable
});

export async function analyzeSmile(imageData: string): Promise<any> {
  try {
    // Extract the base64 image data (remove the data:image/jpeg;base64, part)
    const base64Image = imageData.split(",")[1];

    // Use OpenAI's vision model to analyze the image
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview", // Using GPT-4 Vision model
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this smile image for dental veneer recommendations. Provide a JSON response with: faceShape (Oval, Round, Square, Heart, or Diamond), teethAnalysis (with color using dental shade guide A1-D4, alignment, and size), and three recommendedStyles with id, name, description, and compatibility percentage.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    // Get the response text
    const responseText = response.choices[0]?.message?.content || "";

    // Parse the response from the AI model
    try {
      // Find JSON in the response (in case the model adds explanatory text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : responseText;
      const analysisResult = JSON.parse(jsonString);

      // Ensure the result has the expected structure
      return {
        faceShape: analysisResult.faceShape || "Oval",
        teethAnalysis: {
          color: analysisResult.teethAnalysis?.color || "A2",
          alignment: analysisResult.teethAnalysis?.alignment || "Good",
          size: analysisResult.teethAnalysis?.size || "Proportional",
        },
        recommendedStyles: analysisResult.recommendedStyles || [
          {
            id: "natural",
            name: "Natural Look",
            description:
              "These veneers are designed to look like natural teeth with slight imperfections and translucency that mimics real enamel.",
            compatibility: 85,
            imageUrl: "/placeholder.svg?height=300&width=400",
          },
          {
            id: "hollywood",
            name: "Hollywood Smile",
            description:
              "Bright white, perfectly aligned veneers that create a dramatic, camera-ready smile popular among celebrities.",
            compatibility: 75,
            imageUrl: "/placeholder.svg?height=300&width=400",
          },
          {
            id: "minimal",
            name: "Minimal Enhancement",
            description:
              "Subtle veneers that make minor improvements while maintaining most of your natural tooth characteristics.",
            compatibility: 80,
            imageUrl: "/placeholder.svg?height=300&width=400",
          },
        ],
      };
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      throw new Error("Failed to parse AI analysis results");
    }
  } catch (error) {
    console.error("Error analyzing smile:", error);
    throw new Error("Failed to analyze smile image");
  }
}
