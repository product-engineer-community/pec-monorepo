import Mux from '@mux/mux-node';
import { NextResponse } from 'next/server';

const MUX_TOKEN_ID = process.env.MUX_TOKEN_ID;
const MUX_TOKEN_SECRET = process.env.MUX_TOKEN_SECRET;

if (!MUX_TOKEN_ID || !MUX_TOKEN_SECRET) {
  console.error('MUX_TOKEN_ID or MUX_TOKEN_SECRET is not set in environment variables.');
}

// Initialize Mux SDK only if tokens are available
// Handlers will check for this and return an error if mux is not initialized.
let mux: Mux | null = null;
if (MUX_TOKEN_ID && MUX_TOKEN_SECRET) {
  mux = new Mux({
    tokenId: MUX_TOKEN_ID,
    tokenSecret: MUX_TOKEN_SECRET,
  });
}

const handleMuxError = (error: unknown, defaultMessage: string = 'An unexpected error occurred.') => {
  let errorMessage = defaultMessage;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }
  console.error(`Mux API Error: ${errorMessage}`, error);
  return NextResponse.json({ error: `Mux API Error: ${errorMessage}` }, { status: 500 });
};

const checkMuxCredentials = () => {
  if (!mux) {
    return NextResponse.json(
      { error: 'Mux SDK not initialized. Missing MUX_TOKEN_ID or MUX_TOKEN_SECRET.' },
      { status: 500 }
    );
  }
  return null;
};

export async function GET(request: Request) {
  const credentialErrorResponse = checkMuxCredentials();
  if (credentialErrorResponse) return credentialErrorResponse;

  try {
    // Ensure mux is not null here, due to the check above.
    // Using a non-null assertion operator (!) for simplicity as checkMuxCredentials handles the null case.
    const assets = await mux!.video.assets.list();
    return NextResponse.json(assets);
  } catch (error) {
    return handleMuxError(error, 'Failed to list Mux assets.');
  }
}

export async function POST(request: Request) {
  const credentialErrorResponse = checkMuxCredentials();
  if (credentialErrorResponse) return credentialErrorResponse;

  try {
    const upload = await mux!.video.uploads.create({
      new_asset_settings: { playback_policy: ['public'] },
      cors_origin: '*', // Be cautious with '*' in production
    });
    return NextResponse.json({ id: upload.id, url: upload.url });
  } catch (error) {
    return handleMuxError(error, 'Failed to create Mux upload URL.');
  }
}

export async function DELETE(request: Request) {
  const credentialErrorResponse = checkMuxCredentials();
  if (credentialErrorResponse) return credentialErrorResponse;

  try {
    const body = await request.json();
    const assetId = body.assetId;

    if (!assetId) {
      return NextResponse.json({ error: 'assetId is required in the request body.' }, { status: 400 });
    }

    if (typeof assetId !== 'string') {
      return NextResponse.json({ error: 'assetId must be a string.' }, { status: 400 });
    }
    
    await mux!.video.assets.delete(assetId);
    return NextResponse.json({ message: `Asset ${assetId} deleted successfully.` }, { status: 200 }); // 204 No Content is also an option if no message body is needed.
  } catch (error: any) {
    // Check for specific Mux error related to not found, if available in SDK, or handle generically
    if (error && error.type === 'not_found') { // This error type is hypothetical, adjust based on actual Mux SDK errors
        return NextResponse.json({ error: `Asset with ID ${error.id_to_delete_or_similar} not found.` }, { status: 404 });
    }
    return handleMuxError(error, 'Failed to delete Mux asset.');
  }
}
