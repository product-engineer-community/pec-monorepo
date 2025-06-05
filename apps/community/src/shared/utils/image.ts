import { revalidateTag } from "next/cache";

/**
 * Generate a proxy URL for an image stored in Supabase
 * @param filePath - The file path from Supabase storage
 * @returns The proxy URL that will serve the cached image
 */
export function getImageProxyUrl(filePath: string): string {
  return `/api/image/${filePath}`;
}

/**
 * Invalidate the image cache for a specific file path
 * @param filePath - The file path to invalidate cache for
 */
export async function invalidateImageCache(filePath?: string): Promise<void> {
  // Revalidate the general images tag to clear all image caches
  revalidateTag('images');
  
  // If a specific file path is provided, you could implement
  // more granular cache invalidation here if needed
  if (filePath) {
    // For now, we invalidate all images, but this could be extended
    // to invalidate specific file caches in the future
    console.log(`Cache invalidated for image: ${filePath}`);
  }
}

/**
 * Check if a given URL is a proxy image URL
 * @param url - The URL to check
 * @returns True if it's a proxy image URL
 */
export function isProxyImageUrl(url: string): boolean {
  return url.startsWith('/api/image/');
}

/**
 * Extract the file path from a proxy image URL
 * @param proxyUrl - The proxy URL
 * @returns The file path or null if not a valid proxy URL
 */
export function extractFilePathFromProxyUrl(proxyUrl: string): string | null {
  if (!isProxyImageUrl(proxyUrl)) {
    return null;
  }
  
  return proxyUrl.replace('/api/image/', '');
}