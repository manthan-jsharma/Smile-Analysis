"use client";

import type React from "react";

import { useState } from "react";
import { Upload, Smile, Loader2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import VeneerResults from "@/components/veneer-results";
import { analyzeSmile } from "@/lib/smile-analysis";
import Image from "next/image";

export default function VeneerAIUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image/")) {
      setError("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setResults(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // In a real application, this would call an API endpoint
      // Here we're using a mock function that simulates AI analysis
      const analysisResults = await analyzeSmile(image);
      setResults(analysisResults);
    } catch (err) {
      setError("An error occurred during analysis. Please try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!image ? (
        <Card className="p-6 border-dashed border-2 bg-white">
          <div className="flex flex-col items-center justify-center py-10">
            <Camera className="h-12 w-12 text-cyan-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Upload your smile photo
            </h3>
            <p className="text-sm text-gray-500 mb-6 text-center">
              For best results, upload a front-facing photo with a natural smile
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => document.getElementById("file-upload")?.click()}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Image
              </Button>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="p-6 bg-white">
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-md h-64 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={image || "/placeholder.svg"}
                  alt="Uploaded smile"
                  fill
                  className="object-cover"
                />
              </div>

              {error && (
                <div className="w-full p-3 mb-4 bg-red-50 text-red-600 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                {!results && (
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="bg-cyan-600 hover:bg-cyan-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Smile className="mr-2 h-4 w-4" />
                        Analyze Smile
                      </>
                    )}
                  </Button>
                )}
                <Button variant="outline" onClick={handleReset}>
                  Upload Different Image
                </Button>
              </div>
            </div>
          </Card>

          {results && <VeneerResults results={results} />}
        </div>
      )}
    </div>
  );
}
