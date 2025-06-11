import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const serviceProviders = pgTable("service_providers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialties: text("specialties").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviewCount: integer("review_count").notNull(),
  responseTime: text("response_time").notNull(),
  pricing: text("pricing").notNull(),
  experience: text("experience").notNull(),
  warranty: text("warranty").notNull(),
  description: text("description").notNull(),
  isLicensed: boolean("is_licensed").notNull().default(true),
  isInsured: boolean("is_insured").notNull().default(true),
  neptuneScore: integer("neptune_score").notNull(),
  location: text("location").notNull(),
  phone: text("phone"),
  email: text("email"),
  website: text("website")
});

export const searchQueries = pgTable("search_queries", {
  id: serial("id").primaryKey(),
  query: text("query").notNull(),
  processedQuery: text("processed_query"),
  serviceType: text("service_type"),
  location: text("location"),
  resultCount: integer("result_count").notNull().default(0)
});

export const insertServiceProviderSchema = createInsertSchema(serviceProviders).omit({
  id: true
});

export const insertSearchQuerySchema = createInsertSchema(searchQueries).omit({
  id: true
});

export type ServiceProvider = typeof serviceProviders.$inferSelect;
export type InsertServiceProvider = z.infer<typeof insertServiceProviderSchema>;
export type SearchQuery = typeof searchQueries.$inferSelect;
export type InsertSearchQuery = z.infer<typeof insertSearchQuerySchema>;

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
