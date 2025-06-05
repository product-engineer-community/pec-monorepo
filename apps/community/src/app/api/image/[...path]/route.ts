import { getSupabaseServerClient } from "@packages/supabase";
import { unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Cache function for image data
const getCachedImageData = unstable_cache(
  async (path: string) => {
    const supabase = await getSupabaseServerClient();
    
    const { data, error } = await supabase.storage
      .from('uploads')
      .download(path);

    if (error) {
      throw new Error(`Failed to download image: ${error.message}`);
    }

    // Convert blob to buffer
    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Get content type from the file extension
    const contentType = getContentType(path);
    
    return {
      buffer,
      contentType
    };
  },
  ['image-cache'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['images']
  }
);

function getContentType(filePath: string): string {
  const extension = filePath.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'image/jpeg';
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const imagePath = params.path.join('/');
    
    if (!imagePath) {
      return new NextResponse('Image path is required', { status: 400 });
    }

    const { buffer, contentType } = await getCachedImageData(imagePath);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, immutable',
        'CDN-Cache-Control': 'public, max-age=31536000',
        'Vercel-CDN-Cache-Control': 'public, max-age=31536000'
      }
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Image not found', { status: 404 });
  }
}