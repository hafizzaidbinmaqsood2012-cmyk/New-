export type ScentCategory = 'oud' | 'musk' | 'floral' | 'woody';

export interface ScentNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface BottleSize {
  size: string; // e.g. "50ml", "100ml", "200ml Flacon"
  volume: string;
  price: number;
  inStock: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ProductCharacteristics {
  sillage: 'Intimate' | 'Moderate' | 'Pronounced' | 'Enormous';
  longevity: string;
  season: ('Spring' | 'Summer' | 'Autumn' | 'Winter')[];
  timeOfDay: 'Day' | 'Night' | 'Versatile';
  gender: 'Unisex' | 'Femme' | 'Homme';
  concentration: string; // e.g. "Extrait de Parfum (32%)", "Eau de Parfum (22%)"
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ScentCategory;
  categoryLabel: string;
  price: number;
  sizes: BottleSize[];
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  shortDescription: string;
  fullDescription: string;
  story: string;
  images: string[];
  primaryImage: string;
  notes: ScentNotes;
  characteristics: ProductCharacteristics;
  perfumer: string;
  origin: string;
  inStock: boolean;
  stockQuantity: number;
  reviews: Review[];
}

export interface CartItem {
  id: string; // generated from productId + size
  product: Product;
  selectedSize: BottleSize;
  quantity: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shippingOption: ShippingOption;
  shippingFee: number;
  tax: number;
  total: number;
  customer: CustomerDetails;
  paymentMethod: string;
  paymentDetailsLast4?: string;
  status: 'Confirmed' | 'Preparing' | 'In Transit' | 'Delivered';
  estimatedDeliveryDate: string;
  trackingNumber: string;
  complimentarySamples: string[];
  giftNote?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  memberTier: 'Privilège' | 'Grand Cru' | 'Ambassadeur';
  joinDate: string;
  orders: Order[];
  wishlist: string[]; // product IDs
}
