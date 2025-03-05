import type { Metadata } from "next";
import VeneerAIUploader from "@/components/veneer-ai-uploader";

export const metadata: Metadata = {
  title: "SmileMatch AI | Veneer Style Recommender",
  description:
    "Upload your smile and get personalized veneer style recommendations",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              SmileMatch AI
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-gray-600 hover:text-cyan-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-cyan-600 transition-colors"
            >
              Veneer Styles
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-cyan-600 transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-cyan-600 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Find Your Perfect Veneer Match
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload a photo of your smile and our AI will analyze your facial
            features to recommend the most suitable veneer styles for you.
          </p>

          <VeneerAIUploader />
        </section>
      </main>

      <footer className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} SmileMatch AI. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            This is a demonstration platform. Please consult with a dental
            professional before making decisions about dental procedures.
          </p>
        </div>
      </footer>
    </div>
  );
}
