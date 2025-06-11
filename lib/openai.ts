import OpenAI from "openai"
import type { ProcessedQuery, ServiceProvider } from "@/lib/types"

export const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
})

export async function processSearchQuery(query: string): Promise<ProcessedQuery> {
  try {
    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a search query processor for local services. Extract key information from natural language queries and return structured data in JSON format.

Return JSON with these fields:
- serviceType: The type of service being requested (e.g., "dishwasher repair", "plumbing", "HVAC")
- location: The location mentioned in the query
- requirements: Array of specific requirements mentioned (e.g., "same-day service", "emergency", "licensed")
- urgency: Level of urgency ("low", "medium", "high", "emergency")`
        },
        {
          role: "user",
          content: query
        }
      ],
      response_format: { type: "json_object" }
    })

    const result = JSON.parse(response.choices[0].message.content || "{}")

    return {
      serviceType: result.serviceType || "general service",
      location: result.location || "local area",
      requirements: result.requirements || [],
      urgency: result.urgency || "medium"
    }
  } catch (error) {
    console.error("Error processing search query:", error)
    throw new Error("Failed to process search query with AI")
  }
}

export async function generateAISummary(
  query: string,
  providers: ServiceProvider[],
  processedQuery: ProcessedQuery
): Promise<string> {
  try {
    if (providers.length === 0) {
      return `We couldn't find any exact matches for "${processedQuery.serviceType}" in ${processedQuery.location}. You might try a nearby city or broader category like "appliance repair".`
    }

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that summarizes search results for local services. 
Provide a concise, helpful summary that includes:
- Number of providers found  
- Average pricing range
- Common response times
- Key recommendations

Keep it under 3 sentences and focus on the most relevant information for the user.`
        },
        {
          role: "user",
          content: `Query: "${query}"
Service Type: ${processedQuery.serviceType}
Location: ${processedQuery.location}
Found ${providers.length} providers

Provider details:
${providers
  .slice(0, 5)
  .map(
    (p) =>
      `- ${p.name}: ${p.rating}/5 stars, ${p.pricing}, ${p.responseTime}`
  )
  .join("\n")}`
        }
      ]
    })

    return response.choices[0].message.content || "Search results found based on your query."
  } catch (error) {
    console.error("Error generating AI summary:", error)
    return `Found ${providers.length} service providers matching your search criteria with various pricing and availability options.`
  }
}
