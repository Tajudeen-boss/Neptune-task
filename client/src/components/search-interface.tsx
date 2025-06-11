import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, CheckCircle, Clock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { searchServices, type SearchRequest } from "@/lib/api";
import type { SearchResult } from "@shared/schema";

interface SearchInterfaceProps {
  onResults: (results: SearchResult) => void;
}

export function SearchInterface({ onResults }: SearchInterfaceProps) {
  const [query, setQuery] = useState("");
  const [includePricing, setIncludePricing] = useState(true);
  const [nearMe, setNearMe] = useState(true);

  const searchMutation = useMutation({
    mutationFn: (request: SearchRequest) => searchServices(request),
    onSuccess: (data) => {
      onResults(data);
    },
    onError: (error) => {
      console.error("Search failed:", error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    searchMutation.mutate({
      query: query.trim(),
      includePricing,
      nearMe
    });
  };

  const sampleQueries = [
    "Who are the best-rated dishwasher repair technicians in San Francisco, CA and what do they charge?",
    "Find me reliable plumbers near downtown Oakland with same-day service",
    "Which HVAC contractors in San Jose offer 24/7 emergency service?",
    "Best electricians in Berkeley for ceiling fan installation under $200"
  ];

  const handleSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Find local service providers with AI-powered search
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Ask questions in natural language and get comprehensive results from multiple sources, 
          complete with our Neptune Score rating system.
        </p>
      </div>

      {/* Search Form */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything... e.g., 'Who are the best-rated dishwasher repair technicians in San Francisco, CA and what do they charge?'"
                className="resize-none min-h-[100px] pr-16"
                maxLength={500}
                disabled={searchMutation.isPending}
              />
              <div className="absolute bottom-3 right-3">
                <span className="text-xs text-slate-400">
                  {query.length}/500
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includePricing"
                    checked={includePricing}
                    onCheckedChange={(checked) => setIncludePricing(!!checked)}
                    disabled={searchMutation.isPending}
                  />
                  <label htmlFor="includePricing" className="text-sm text-slate-600">
                    Include pricing info
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nearMe"
                    checked={nearMe}
                    onCheckedChange={(checked) => setNearMe(!!checked)}
                    disabled={searchMutation.isPending}
                  />
                  <label htmlFor="nearMe" className="text-sm text-slate-600">
                    Near me
                  </label>
                </div>
              </div>
              <Button
                type="submit"
                disabled={!query.trim() || searchMutation.isPending}
                className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,44%)]"
              >
                {searchMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Search
              </Button>
            </div>
          </form>

          {/* Sample Queries */}
          {!searchMutation.isPending && query.length === 0 && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-3">Try these sample queries:</p>
              <div className="space-y-2">
                {sampleQueries.map((sampleQuery, index) => (
                  <button
                    key={index}
                    onClick={() => handleSampleQuery(sampleQuery)}
                    className="block w-full text-left text-sm text-[hsl(207,90%,54%)] hover:text-[hsl(207,90%,44%)] hover:underline"
                  >
                    "{sampleQuery}"
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loading State */}
      {searchMutation.isPending && (
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Loader2 className="w-6 h-6 animate-spin text-[hsl(207,90%,54%)]" />
              <span className="text-slate-600">Searching across multiple sources...</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Processing your query with AI</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin text-[hsl(207,90%,54%)]" />
                <span>Searching repair services database</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Collecting pricing information</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {searchMutation.isError && (
        <Card className="shadow-lg border-red-200">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-red-500 mb-2">Search Failed</div>
              <p className="text-sm text-slate-600">
                Unable to process your search request. Please check your connection and try again.
              </p>
              <Button
                onClick={() => searchMutation.reset()}
                variant="outline"
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
