// Updated API route to use the new OpenAI implementation

import { NextResponse } from "next/server";
import { analyzeSmile, mockAnalyzeSmile } from "@/lib/smile-analysis";

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Check if we have an OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.warn("No OpenAI API key found, using mock data");
      // Use mock function if no API key is available
      const results = await mockAnalyzeSmile(image);
      return NextResponse.json({ results });
    }

    // Call the AI analysis function with the real OpenAI implementation
    const results = await analyzeSmile(image);

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error in smile analysis API:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
