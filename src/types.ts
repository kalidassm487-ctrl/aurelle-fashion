export interface Product {
  id: string;
  name: string;
  category: 'Women' | 'Men' | 'Accessories';
  subcategory: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  collection: string;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export type View = 'home' | 'shop' | 'product' | 'collection' | 'lookbook' | 'about';
