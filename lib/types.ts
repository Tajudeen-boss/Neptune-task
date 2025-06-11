export interface ServiceProvider {
  id: number;
  name: string;
  specialties: string;
  rating: string;
  reviewCount: number;
  responseTime: string;
  pricing: string;
  experience: string;
  warranty: string;
  description: string;
  isLicensed: boolean;
  isInsured: boolean;
  neptuneScore: number;
  location: string;
  phone: string | null;
  email: string | null;
  website: string | null;
}

export interface SearchQuery {
  id: number;
  query: string;
  processedQuery: string | null;
  serviceType: string | null;
  location: string | null;
  resultCount: number;
}

export interface SearchResult {
  aiSummary: string;
  providers: ServiceProvider[];
  totalCount: number;
  methodology: {
    customerReviews: number;
    responseTime: number;
    pricingTransparency: number;
    credentials: number;
  };
}

export interface ProcessedQuery {
  serviceType: string;
  location: string;
  requirements: string[];
  urgency: string;
}

export interface SearchRequest {
  query: string;
  includePricing?: boolean;
  nearMe?: boolean;
}