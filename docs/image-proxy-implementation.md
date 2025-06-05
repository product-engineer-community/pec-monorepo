# Image Proxy Implementation with Next.js Caching

## Overview

This implementation replaces signed URLs with a proxying approach for serving uploaded images from Supabase storage, utilizing Next.js caching for optimal performance.

## Key Components

### 1. Upload API (`apps/community/src/app/api/upload/image/route.ts`)
- Handles image uploads to Supabase storage
- Returns proxy URLs instead of direct storage URLs
- Uses the `getImageProxyUrl()` utility for consistent URL generation

### 2. Image Proxy API (`apps/community/src/app/api/image/[...path]/route.ts`)
- Serves images through a proxy endpoint
- Implements `unstable_cache` for efficient caching
- Supports multiple image formats (JPEG, PNG, GIF, WebP, SVG)
- Cache configuration:
  - **Revalidation**: 1 hour (3600 seconds)
  - **CDN Cache**: 1 year for long-term caching
  - **Cache Tags**: `['images']` for bulk invalidation

### 3. Upload Service (`apps/community/src/shared/api/upload/image/index.ts`)
- Uploads images to Supabase storage bucket 'uploads'
- Generates unique filenames with timestamp and random string
- Returns file path for proxy URL generation

### 4. Image Utilities (`apps/community/src/shared/utils/image.ts`)
- `getImageProxyUrl(filePath)`: Generate proxy URLs
- `invalidateImageCache(filePath?)`: Clear image caches
- `isProxyImageUrl(url)`: Check if URL is a proxy URL
- `extractFilePathFromProxyUrl(proxyUrl)`: Extract file path from proxy URL

## Benefits

### Performance
- **Server-side caching**: Images are cached using Next.js `unstable_cache`
- **CDN optimization**: Long-term caching headers for CDN
- **Reduced bandwidth**: Cached responses minimize Supabase storage requests

### Security
- **Controlled access**: All image requests go through the application
- **No direct storage URLs**: Prevents direct access to Supabase storage
- **Consistent URLs**: Same URL format regardless of storage backend

### Scalability
- **Cache invalidation**: Programmatic cache clearing via tags
- **Format detection**: Automatic content-type detection
- **Error handling**: Graceful handling of missing images

## Usage

### Uploading Images
```typescript
const formData = new FormData();
formData.append('image', file);

const response = await fetch('/api/upload/image', {
  method: 'POST',
  body: formData,
});

const { url } = await response.json();
// url will be something like: /api/image/images/1703123456789-abc123def456.jpg
```

### Using Image URLs
```tsx
// The returned URL can be used directly in img tags
<img src={url} alt="Uploaded image" />
```

### Cache Management
```typescript
import { invalidateImageCache } from '@/src/shared/utils/image';

// Invalidate all image caches
await invalidateImageCache();

// Invalidate cache for specific image
await invalidateImageCache('images/specific-file.jpg');
```

## Configuration

### Supabase Storage
- **Bucket**: `uploads`
- **File structure**: `images/{timestamp}-{random}.{extension}`
- **Cache control**: 3600 seconds on upload

### Cache Settings
- **Application cache**: 1 hour revalidation
- **CDN cache**: 1 year for public caching
- **Cache tags**: `['images']` for group invalidation

## File Structure
```
apps/community/src/
├── app/api/
│   ├── image/[...path]/route.ts          # Image proxy endpoint
│   └── upload/image/route.ts             # Upload endpoint
├── shared/
│   ├── api/upload/image/index.ts         # Upload service
│   └── utils/image.ts                    # Image utilities
```

## Migration Notes

- **Before**: Used signed URLs (or placeholder URLs)
- **After**: Uses proxy URLs with caching
- **Breaking changes**: Image URLs now start with `/api/image/`
- **Backward compatibility**: Consider URL migration if needed