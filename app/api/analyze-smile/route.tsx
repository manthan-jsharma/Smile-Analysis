import { NextResponse } from "next/server";
import { analyzeSmile } from "@/lib/smile-analysis";

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Call the AI analysis function
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
