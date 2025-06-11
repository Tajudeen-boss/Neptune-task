import { apiRequest } from "./queryClient";
import type { SearchResult } from "@shared/schema";

export interface SearchRequest {
  query: string;
  includePricing?: boolean;
  nearMe?: boolean;
}

export async function searchServices(request: SearchRequest): Promise<SearchResult> {
  const response = await apiRequest("POST", "/api/search", request);
  return response.json();
}

export async function getServiceProviders() {
  const response = await apiRequest("GET", "/api/providers");
  return response.json();
}

export async function getRecentSearches() {
  const response = await apiRequest("GET", "/api/recent-searches");
  return response.json();
}
