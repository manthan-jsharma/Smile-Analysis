"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Info } from "lucide-react";
import Image from "next/image";

interface VeneerResultsProps {
  results: {
    faceShape: string;
    teethAnalysis: {
      color: string;
      alignment: string;
      size: string;
    };
    recommendedStyles: Array<{
      id: string;
      name: string;
      description: string;
      compatibility: number;
      imageUrl: string;
    }>;
  };
}

export default function VeneerResults({ results }: VeneerResultsProps) {
  return (
    <Card className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Your Smile Analysis Results
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-medium mb-3 text-gray-700">
            Facial Features
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">Face Shape</span>
              <Badge
                variant="outline"
                className="bg-cyan-50 text-cyan-700 border-cyan-200"
              >
                {results.faceShape}
              </Badge>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3 text-gray-700">
            Teeth Analysis
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">Color Shade</span>
              <Badge
                variant="outline"
                className="bg-cyan-50 text-cyan-700 border-cyan-200"
              >
                {results.teethAnalysis.color}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">Alignment</span>
              <Badge
                variant="outline"
                className="bg-cyan-50 text-cyan-700 border-cyan-200"
              >
                {results.teethAnalysis.alignment}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">Size Proportion</span>
              <Badge
                variant="outline"
                className="bg-cyan-50 text-cyan-700 border-cyan-200"
              >
                {results.teethAnalysis.size}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Recommended Veneer Styles
      </h3>

      <Tabs defaultValue={results.recommendedStyles[0].id} className="w-full">
        <TabsList className="w-full justify-start mb-4 overflow-x-auto">
          {results.recommendedStyles.map((style) => (
            <TabsTrigger
              key={style.id}
              value={style.id}
              className="min-w-[120px]"
            >
              {style.name}
              <Badge
                variant="secondary"
                className="ml-2 bg-cyan-100 text-cyan-800"
              >
                {style.compatibility}%
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {results.recommendedStyles.map((style) => (
          <TabsContent key={style.id} value={style.id} className="mt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={style.imageUrl || "/placeholder.svg"}
                  alt={style.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">{style.name}</h4>
                <p className="text-gray-600 mb-4">{style.description}</p>
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium mr-2">
                    Compatibility:
                  </span>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-cyan-600 h-2.5 rounded-full"
                      style={{ width: `${style.compatibility}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {style.compatibility}%
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <Download className="mr-2 h-4 w-4" />
                    Save Results
                  </Button>
                  <Button variant="outline">
                    <Info className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
