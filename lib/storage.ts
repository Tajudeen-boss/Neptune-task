import type { ServiceProvider, SearchQuery } from "@/lib/types";

export interface IStorage {
  // Service Providers
  getServiceProviders(): Promise<ServiceProvider[]>;
  getServiceProvidersByType(serviceType: string): Promise<ServiceProvider[]>;
  getServiceProvidersByLocation(location: string): Promise<ServiceProvider[]>;
  createServiceProvider(provider: Omit<ServiceProvider, 'id'>): Promise<ServiceProvider>;
  
  // Search Queries
  createSearchQuery(query: Omit<SearchQuery, 'id'>): Promise<SearchQuery>;
  getRecentSearches(): Promise<SearchQuery[]>;
}

export class MemStorage implements IStorage {
  private serviceProviders: Map<number, ServiceProvider>;
  private searchQueries: Map<number, SearchQuery>;
  private currentServiceProviderId: number;
  private currentSearchQueryId: number;

  constructor() {
    this.serviceProviders = new Map();
    this.searchQueries = new Map();
    this.currentServiceProviderId = 1;
    this.currentSearchQueryId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Dishwasher repair technicians
    const providers: Omit<ServiceProvider, 'id'>[] = [
      {
        name: "Bay Area Appliance Pros",
        specialties: "Dishwasher & Kitchen Appliance Specialists",
        rating: "4.8",
        reviewCount: 247,
        responseTime: "Same-day service",
        pricing: "$95 diagnostic + parts",
        experience: "15+ years experience",
        warranty: "1-year warranty",
        description: "Professional team specializing in high-end dishwasher repairs. Known for quick diagnostics and transparent pricing. Most repairs completed same day.",
        isLicensed: true,
        isInsured: true,
        neptuneScore: 94,
        location: "San Francisco, CA",
        phone: "(415) 555-0123",
        email: "info@bayareaappliancepros.com",
        website: "www.bayareaappliancepros.com"
      },
      {
        name: "QuickFix Appliance Service",
        specialties: "Emergency & Scheduled Repairs",
        rating: "4.6",
        reviewCount: 189,
        responseTime: "24/7 emergency service",
        pricing: "$85 service call",
        experience: "12+ years experience",
        warranty: "90-day warranty",
        description: "Fast response times and competitive pricing. Specializes in emergency repairs with 24/7 availability. Good for urgent dishwasher issues.",
        isLicensed: true,
        isInsured: true,
        neptuneScore: 89,
        location: "San Francisco, CA",
        phone: "(415) 555-0234",
        email: "service@quickfixappliance.com",
        website: "www.quickfixappliance.com"
      },
      {
        name: "SF Appliance Masters",
        specialties: "Premium Appliance Services",
        rating: "4.7",
        reviewCount: 156,
        responseTime: "Next-day service",
        pricing: "$125 diagnostic fee",
        experience: "20+ years experience",
        warranty: "2-year warranty",
        description: "Premium service with factory certifications for major brands. Higher pricing but excellent warranty coverage and expert technicians.",
        isLicensed: true,
        isInsured: true,
        neptuneScore: 86,
        location: "San Francisco, CA",
        phone: "(415) 555-0345",
        email: "contact@sfappliancemasters.com",
        website: "www.sfappliancemasters.com"
      },
      {
        name: "Golden Gate Repair Co",
        specialties: "All Major Appliance Brands",
        rating: "4.5",
        reviewCount: 203,
        responseTime: "Same-day service",
        pricing: "$90 diagnostic + labor",
        experience: "18+ years experience",
        warranty: "6-month warranty",
        description: "Local family business with extensive experience across all major appliance brands. Competitive pricing and reliable service.",
        isLicensed: true,
        isInsured: true,
        neptuneScore: 82,
        location: "San Francisco, CA",
        phone: "(415) 555-0456",
        email: "info@goldengaterepair.com",
        website: "www.goldengaterepair.com"
      },
      {
        name: "TechFix Appliance Solutions",
        specialties: "Modern Appliance Technology",
        rating: "4.4",
        reviewCount: 134,
        responseTime: "2-day service",
        pricing: "$110 service fee",
        experience: "8+ years experience",
        warranty: "1-year warranty",
        description: "Specializes in newer smart appliances and technology integration. Great for modern dishwashers with advanced features.",
        isLicensed: true,
        isInsured: true,
        neptuneScore: 78,
        location: "San Francisco, CA",
        phone: "(415) 555-0567",
        email: "support@techfixsolutions.com",
        website: "www.techfixsolutions.com"
      },
      {
        name: "Reliable Home Services",
        specialties: "General Appliance Repair",
        rating: "4.3",
        reviewCount: 298,
        responseTime: "Next-day service",
        pricing: "$75 service call",
        experience: "25+ years experience",
        warranty: "90-day warranty",
        description: "Long-established business with competitive rates. Good for basic repairs and maintenance. Large customer base and proven track record.",
        isLicensed: true,
        isInsured: true,
        neptuneScore: 75,
        location: "San Francisco, CA",
        phone: "(415) 555-0678",
        email: "service@reliablehomeservices.com",
        website: "www.reliablehomeservices.com"
      },
      {
        name: "Express Appliance Fix",
        specialties: "Fast Turnaround Repairs",
        rating: "4.2",
        reviewCount: 167,
        responseTime: "Same-day service",
        pricing: "$95 diagnostic fee",
        experience: "10+ years experience",
        warranty: "60-day warranty",
        description: "Focus on quick repairs and fast service. Good for simple fixes but may not handle complex issues as well as specialized providers.",
        isLicensed: true,
        isInsured: true,
        neptuneScore: 72,
        location: "San Francisco, CA",
        phone: "(415) 555-0789",
        email: "info@expressappliancefix.com",
        website: "www.expressappliancefix.com"
      },
      {
        name: "Premium Appliance Care",
        specialties: "High-End Appliance Service",
        rating: "4.6",
        reviewCount: 89,
        responseTime: "Scheduled appointments",
        pricing: "$150 service call",
        experience: "15+ years experience",
        warranty: "18-month warranty",
        description: "Specializes in luxury and high-end appliances. Premium pricing but excellent service quality and extended warranties.",
        isLicensed: true,
        isInsured: true,
        neptuneScore: 85,
        location: "San Francisco, CA",
        phone: "(415) 555-0890",
        email: "service@premiumappliancecare.com",
        website: "www.premiumappliancecare.com"
      }
    ];

    providers.forEach(provider => {
      const id = this.currentServiceProviderId++;
      this.serviceProviders.set(id, { ...provider, id });
    });
  }

  async getServiceProviders(): Promise<ServiceProvider[]> {
    return Array.from(this.serviceProviders.values());
  }

  async getServiceProvidersByType(serviceType: string): Promise<ServiceProvider[]> {
    const allProviders = Array.from(this.serviceProviders.values());
    const keywords = serviceType.toLowerCase().split(' ');
    
    return allProviders.filter(provider => {
      const searchText = `${provider.name} ${provider.specialties} ${provider.description}`.toLowerCase();
      return keywords.some(keyword => searchText.includes(keyword));
    }).sort((a, b) => b.neptuneScore - a.neptuneScore);
  }

  async getServiceProvidersByLocation(location: string): Promise<ServiceProvider[]> {
    const allProviders = Array.from(this.serviceProviders.values());
    return allProviders.filter(provider => 
      provider.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  async createServiceProvider(insertProvider: Omit<ServiceProvider, 'id'>): Promise<ServiceProvider> {
    const id = this.currentServiceProviderId++;
    const provider: ServiceProvider = { ...insertProvider, id };
    this.serviceProviders.set(id, provider);
    return provider;
  }

  async createSearchQuery(insertQuery: Omit<SearchQuery, 'id'>): Promise<SearchQuery> {
    const id = this.currentSearchQueryId++;
    const query: SearchQuery = { ...insertQuery, id };
    this.searchQueries.set(id, query);
    return query;
  }

  async getRecentSearches(): Promise<SearchQuery[]> {
    return Array.from(this.searchQueries.values()).slice(-10);
  }
}

export const storage = new MemStorage();