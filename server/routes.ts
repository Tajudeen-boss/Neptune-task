import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { processSearchQuery, generateAISummary } from "./openai";
import type { SearchResult, ProcessedQuery } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Search endpoint
  app.post("/api/search", async (req, res) => {
    try {
      const { query, includePricing = true, nearMe = true } = req.body;
      
      if (!query || typeof query !== 'string' || query.trim().length === 0) {
        return res.status(400).json({ 
          error: "Search query is required and must be a non-empty string" 
        });
      }

      // Process query with OpenAI
      let processedQuery: ProcessedQuery;
      try {
        processedQuery = await processSearchQuery(query);
      } catch (error) {
        console.error("OpenAI processing failed:", error);
        // Fallback processing without OpenAI
        processedQuery = {
          serviceType: "appliance repair",
          location: "San Francisco, CA",
          requirements: [],
          urgency: "medium"
        };
      }

      // Get matching service providers
      let providers = await storage.getServiceProvidersByType(processedQuery.serviceType);
      
      // Filter by location if specified
      if (processedQuery.location && processedQuery.location !== "local area") {
        const locationProviders = await storage.getServiceProvidersByLocation(processedQuery.location);
        providers = providers.filter(p => locationProviders.some(lp => lp.id === p.id));
      }

      // Generate AI summary
      let aiSummary: string;
      try {
        aiSummary = await generateAISummary(query, providers, processedQuery);
      } catch (error) {
        console.error("AI summary generation failed:", error);
        const avgPrice = providers.length > 0 
          ? providers.map(p => p.pricing).join(', ')
          : "varies";
        aiSummary = `Found ${providers.length} service providers for ${processedQuery.serviceType} in ${processedQuery.location}. Services range from ${avgPrice} with various response times available.`;
      }

      // Store search query
      await storage.createSearchQuery({
        query,
        processedQuery: JSON.stringify(processedQuery),
        serviceType: processedQuery.serviceType,
        location: processedQuery.location,
        resultCount: providers.length
      });

      const result: SearchResult = {
        aiSummary,
        providers: providers.slice(0, 20), // Limit to top 20 results
        totalCount: providers.length,
        methodology: {
          customerReviews: 40,
          responseTime: 25,
          pricingTransparency: 20,
          credentials: 15
        }
      };

      res.json(result);

    } catch (error) {
      console.error("Search endpoint error:", error);
      res.status(500).json({ 
        error: "Failed to process search request. Please try again." 
      });
    }
  });

  // Get all service providers endpoint
  app.get("/api/providers", async (req, res) => {
    try {
      const providers = await storage.getServiceProviders();
      res.json(providers);
    } catch (error) {
      console.error("Get providers error:", error);
      res.status(500).json({ 
        error: "Failed to retrieve service providers" 
      });
    }
  });

  // Get recent searches endpoint
  app.get("/api/recent-searches", async (req, res) => {
    try {
      const searches = await storage.getRecentSearches();
      res.json(searches);
    } catch (error) {
      console.error("Get recent searches error:", error);
      res.status(500).json({ 
        error: "Failed to retrieve recent searches" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
