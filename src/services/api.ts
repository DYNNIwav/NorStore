import { ApiResponse, Product } from '@/types';

const API_BASE = 'https://v2.api.noroff.dev';

/**
 * Fetch all products from the Noroff online-shop API.
 * @returns Array of products
 */
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/online-shop`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }

  const result: ApiResponse<Product[]> = await response.json();
  return result.data;
}

/**
 * Fetch a single product by its unique ID.
 * @param id The product UUID
 * @returns Product details
 */
export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE}/online-shop/${id}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product (${id}): ${response.status} ${response.statusText}`);
  }

  const result: ApiResponse<Product> = await response.json();
  return result.data;
}
