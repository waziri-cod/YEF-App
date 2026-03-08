/**
 * Marketplace Data - Products/Services that clients can promote
 */

export type MarketplaceCategory = 'products' | 'services' | 'business';

export interface MarketplaceItem {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: MarketplaceCategory;
  images: string[];
  price?: number;
  currency: string;
  location: string;
  phone: string;
  email?: string;
  rating: number;
  reviews: number;
  views: number;
  status: 'active' | 'paused' | 'sold';
  tags: string[];
  loanApplications?: string[]; // Linked loan IDs that this product/service supports
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketplaceReview {
  id: string;
  itemId: string;
  reviewerId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export const marketplaceCategories = [
  { id: 'products', name: 'Products', description: 'Physical goods for sale' },
  { id: 'services', name: 'Services', description: 'Services offered' },
  { id: 'business', name: 'Business', description: 'Full business/franchise opportunities' },
];

export interface AddMarketplaceItemRequest {
  title: string;
  description: string;
  category: MarketplaceCategory;
  images: string[];
  price?: number;
  location: string;
  phone: string;
  email?: string;
  tags: string[];
}

export default {
  marketplaceCategories,
};
