export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductReview {
  id: string;
  username: string;
  rating: number;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: ProductImage;
  rating: number;
  tags: string[];
  reviews: ProductReview[];
}

export interface ApiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ContactFormData {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  fullName?: string;
  subject?: string;
  email?: string;
  message?: string;
}
