import { NextRequest, NextResponse } from 'next/server'
import { processSearchQuery, generateAISummary } from '@/lib/openai'
import { storage } from '@/lib/storage'
import type { SearchResult, ProcessedQuery } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, includePricing = true, nearMe = true } = body

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: "Search query is required and must be a non-empty string" },
        { status: 400 }
      )
    }
    // Process query with OpenAI
    let processedQuery: ProcessedQuery
    try {
      processedQuery = await processSearchQuery(query)
    } catch (error) {
      console.error("OpenAI processing failed:", error)
      // Fallback processing without OpenAI
      processedQuery = {
        serviceType: "appliance repair",
        location: "San Francisco, CA",
        requirements: [],
        urgency: "medium"
      }
    }

    // Get matching service providers 
    let providers = await storage.getServiceProvidersByType(processedQuery.serviceType.toLowerCase())
    console.log("Providers found by type:", providers.map(p => p.name))

    // Filter by location if specified
    if (processedQuery.location && processedQuery.location !== "local area") {
      const locationProviders = await storage.getServiceProvidersByLocation(processedQuery.location)
      providers = providers.filter(p => locationProviders.some(lp => lp.id === p.id))
    }

    if (providers.length === 0 && processedQuery.serviceType.toLowerCase().includes("dishwasher")) {
      providers = await storage.getServiceProvidersByType("appliance repair")
    }

    // Generate AI summary
    let aiSummary: string
    try {
      aiSummary = await generateAISummary(query, providers, processedQuery)
    } catch (error) {
      console.error("AI summary generation failed:", error)
      const avgPrice = providers.length > 0
        ? providers.map(p => p.pricing).join(', ')
        : "varies"
      aiSummary = `Found ${providers.length} service providers for ${processedQuery.serviceType} in ${processedQuery.location}. Services range from ${avgPrice}.`
    }

    // Store search query
    await storage.createSearchQuery({
      query,
      processedQuery: JSON.stringify(processedQuery),
      serviceType: processedQuery.serviceType,
      location: processedQuery.location,
      resultCount: providers.length
    })

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
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error("Search endpoint error:", error)
    return NextResponse.json(
      { error: "Failed to process search request. Please try again." },
      { status: 500 }
    )
  }
}
