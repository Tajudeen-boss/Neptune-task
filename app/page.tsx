"use client"

import { useState } from "react"
import { SearchInterface } from "@/components/search-interface"
import { ServiceProviderCard } from "@/components/service-provider-card"
import { NeptuneScoreModal } from "@/components/neptune-score-modal"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import type { SearchResult } from "@/lib/types"

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null)
  const [showAllResults, setShowAllResults] = useState(false)

  const displayedProviders = showAllResults 
    ? searchResults?.providers || []
    : searchResults?.providers.slice(0, 3) || []

  const remainingCount = (searchResults?.providers.length || 0) - displayedProviders.length

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[hsl(207,90%,54%)] to-[hsl(207,90%,44%)] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-slate-900">Neptune Search</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-slate-600 hover:text-slate-900 text-sm font-medium">
                How it works
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 text-sm font-medium">
                For businesses
              </a>
              <Button className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,44%)]">
                Sign up
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchInterface onResults={setSearchResults} />

        {searchResults && (
          <div className="mt-8 space-y-6">
            {/* AI Summary */}
            <Card className="bg-gradient-to-r from-[hsl(207,90%,95%)] to-blue-50 border-[hsl(207,90%,80%)]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[hsl(207,90%,54%)] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">AI Summary</h3>
                    <p className="text-slate-700 leading-relaxed">
                      {searchResults.aiSummary}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Neptune Score Explanation */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">
                    Understanding Neptune Scores
                  </h3>
                  <NeptuneScoreModal />
                </div>
                <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span><strong>Customer Reviews (40%)</strong> - Average rating and review volume</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span><strong>Response Time (25%)</strong> - Booking availability and response speed</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span><strong>Pricing Transparency (20%)</strong> - Clear upfront pricing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span><strong>Credentials (15%)</strong> - Licensing and certifications</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900">
                Top Results ({searchResults.totalCount} found)
              </h3>
              
              <div className="space-y-4">
                {displayedProviders.map((provider) => (
                  <ServiceProviderCard key={provider.id} provider={provider} />
                ))}
              </div>

              {remainingCount > 0 && (
                <div className="text-center pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllResults(true)}
                  >
                    Show {remainingCount} more results
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[hsl(207,90%,54%)] to-[hsl(207,90%,44%)] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Neptune Search</h3>
              </div>
              <p className="text-slate-600 text-sm">
                AI-powered local service provider search with transparent ratings and instant booking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">How it works</a></li>
                <li><a href="#" className="hover:text-slate-900">Neptune Score</a></li>
                <li><a href="#" className="hover:text-slate-900">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">For Business</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">List your business</a></li>
                <li><a href="#" className="hover:text-slate-900">Pricing</a></li>
                <li><a href="#" className="hover:text-slate-900">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Help Center</a></li>
                <li><a href="#" className="hover:text-slate-900">Contact</a></li>
                <li><a href="#" className="hover:text-slate-900">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-8 pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2024 Neptune Search. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}