import { z } from "zod";

export const faqSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(3, "Question must be at least 3 characters"),
  answer: z.string().min(5, "Answer must be at least 5 characters"),
  order: z.number().int().default(0),
});

export const localityPageSchema = z.object({
  country: z
    .string()
    .min(1, "Country slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  countryLabel: z.string().min(1, "Country label is required"),
  city: z
    .string()
    .min(1, "City slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  cityLabel: z.string().min(1, "City label is required"),
  district: z
    .string()
    .min(1, "District slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  districtLabel: z.string().min(1, "District label is required"),
  locality: z
    .string()
    .min(1, "Locality slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  localityLabel: z.string().min(1, "Locality label is required"),

  metaTitle: z
    .string()
    .min(5, "Meta title must be at least 5 characters")
    .max(90, "Meta title should not exceed 90 characters"),
  metaDescription: z
    .string()
    .min(10, "Meta description must be at least 10 characters")
    .max(250, "Meta description should not exceed 250 characters"),
  h1: z.string().min(5, "H1 Heading must be at least 5 characters"),
  dek: z.string().nullable().optional(),
  heroImageUrl: z.string().nullable().optional(),
  heroImageAlt: z.string().nullable().optional(),

  bodyHtml: z.string().min(10, "Body content is required"),
  bodyJson: z.any().optional(),

  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  readTime: z.string().default("11 min read"),
  ratingValue: z.number().min(1).max(5).default(4.8),
  reviewCount: z.number().int().min(1).default(210),

  // Locality-specific Quick Price Estimator
  priceGuest: z.string().default("₹250 - ₹500"),
  priceParty: z.string().default("₹1,000 - ₹3,500"),
  priceBridal: z.string().default("₹5,000 - ₹15,000"),
  priceDisclaimer: z.string().default("(Prices vary by travel time/agreed upfront before booking)"),

  faqs: z.array(faqSchema).default([]),
  interlinkIds: z.array(z.string()).default([]),
});


export type LocalityPageFormValues = z.infer<typeof localityPageSchema>;
export type FaqFormValue = z.infer<typeof faqSchema>;
