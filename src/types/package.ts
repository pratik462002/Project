export type PackageClassification = 'domestic' | 'international';
export type PackageStatus = 'published' | 'draft' | 'archived';

export interface ItineraryDay {
  day: number;
  title: string;
  details: string;
  meals?: string;
  stay?: string;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  classification: PackageClassification;
  status: PackageStatus;
  featured: boolean;
  trending: boolean;
  category: string; // e.g. "Beach & Island", "Hills & Nature", "City & Luxury", "Heritage & Scenic", "Family Tour", "Group Tour"
  shortDescription: string;
  fullDescription: string;
  destinations: string;
  durationNights: number;
  durationDays: number;
  priceAmount: number | null; // null if request quote
  currency: string;
  priceLabel: string; // e.g. "per person + 5% GST", "per person twin sharing", "Request a quote"
  priceValidity?: string;
  departureDates?: string;
  pickupPoints?: string;
  transportDetails?: string;
  accommodationDetails?: string;
  heroImage: string;
  galleryImages: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  faqs?: { question: string; answer: string }[];
  bookingTerms?: string;
  cancellationPolicy?: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PackageFilterState {
  searchQuery: string;
  classification: 'all' | 'domestic' | 'international';
  category: string;
  duration: 'all' | 'short' | 'medium' | 'long'; // short <=4, medium 5-7, long 8+
  priceSort: 'default' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc';
}
