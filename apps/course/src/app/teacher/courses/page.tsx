'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import MuxPlayer from '@mux/mux-player-react';

// Define a basic Asset type, aligning with what Mux API might return and what we need.
// For a more robust solution, this could be shared or generated from an OpenAPI spec if Mux provides one.
interface MuxAsset {
  id: string;
  status?: string;
  playback_ids?: Array<{ id: string; policy: 'public' | 'signed' }>;
  created_at?: string;
  // Add other properties you expect to use, e.g., name, duration, aspect_ratio
}

interface MuxUploadResponse {
  id: string;
  url: string;
  // Potentially other fields like timeout, etc.
}


export default function TeacherCoursesPage() {
  const [assets, setAssets] = useState<MuxAsset[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);


  // Function to fetch assets
  const fetchAssets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/mux-assets');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch assets: ${response.statusText}`);
      }
      const data = await response.json();
      // Ensure data is an array, as mux.video.assets.list() returns an array of Asset objects
      // Mux SDK v8 returns { data: Asset[], ... } for list operations.
      // If your API route returns the raw array, this is fine.
      // If it returns the object with a 'data' property, you'd use data.data
      setAssets(Array.isArray(data) ? data : (data.data || []));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setAssets([]); // Clear assets on error
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to fetch assets on mount
  useEffect(() => {
    fetchAssets();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setError(null); // Clear previous errors
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // 1. Get direct upload URL from our API
      const uploadUrlResponse = await fetch('/api/mux-assets', { method: 'POST' });
      if (!uploadUrlResponse.ok) {
        const errorData = await uploadUrlResponse.json();
        throw new Error(errorData.error || `Failed to get upload URL: ${uploadUrlResponse.statusText}`);
      }
      const { url: directUploadUrl, id: uploadId }: MuxUploadResponse = await uploadUrlResponse.json();
      
      if (!directUploadUrl) {
        throw new Error('Did not receive a valid upload URL.');
      }

      // 2. Upload the file directly to Mux using the signed URL (PUT request)
      // Using XMLHttpRequest for progress tracking, as Fetch API doesn't support it out-of-the-box for uploads
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', directUploadUrl, true);
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setUploadProgress(percentComplete);
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            // Mux processes the asset after upload. This might take time.
            // The asset won't be 'ready' immediately.
            // We can inform the user and refresh assets.
            resolve();
          } else {
            reject(new Error(`Direct upload failed: ${xhr.statusText} - ${xhr.responseText}`));
          }
        };
        xhr.onerror = () => {
          reject(new Error('Direct upload failed due to a network error.'));
        };
        xhr.send(selectedFile);
      });
      
      alert(`File uploaded successfully (Upload ID: ${uploadId}). Mux is now processing the video. It may take a few moments to appear as 'ready'.`);
      setSelectedFile(null); // Clear selection
      // Refresh assets after a short delay to give Mux time to start processing
      setTimeout(fetchAssets, 3000); // Adjust delay as needed or implement polling for 'ready' status

    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
      setUploadProgress(null);
    }
  };

  const handleDelete = async (assetId: string) => {
    if (!confirm(`Are you sure you want to delete asset ${assetId}?`)) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/mux-assets', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assetId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to delete asset: ${response.statusText}`);
      }
      alert('Asset deleted successfully.');
      fetchAssets(); // Refresh asset list
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Course Video Management</h1>

      {error && <p style={{ color: 'red', border: '1px solid red', padding: '10px' }}>Error: {error}</p>}
      {isLoading && <p>Loading...</p>}

      <section style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee' }}>
        <h2>Upload New Video</h2>
        <input type="file" accept="video/*" onChange={handleFileChange} disabled={isLoading} />
        <button onClick={handleUpload} disabled={!selectedFile || isLoading} style={{ marginLeft: '10px', padding: '10px 15px' }}>
          {isLoading && uploadProgress !== null ? `Uploading... ${uploadProgress.toFixed(0)}%` : 'Upload Video'}
        </button>
        {uploadProgress !== null && (
          <div style={{ width: '100%', backgroundColor: '#f0f0f0', marginTop: '10px' }}>
            <div style={{ width: `${uploadProgress}%`, backgroundColor: 'green', height: '10px', textAlign: 'center', color: 'white' }}>
              {uploadProgress.toFixed(0)}%
            </div>
          </div>
        )}
      </section>

      <section>
        <h2>Uploaded Videos</h2>
        {assets.length === 0 && !isLoading && <p>No videos uploaded yet.</p>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {assets.map(asset => (
            <li key={asset.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0 }}><strong>ID:</strong> {asset.id}</p>
                <p style={{ margin: '5px 0' }}><strong>Status:</strong> {asset.status || 'N/A'}</p>
                <p style={{ margin: '5px 0' }}><strong>Created:</strong> {asset.created_at ? new Date(asset.created_at).toLocaleString() : 'N/A'}</p>
                {asset.playback_ids && asset.playback_ids[0] && asset.status === 'ready' && (
                  <div style={{ marginTop: '10px', maxWidth: '320px' }}>
                    <MuxPlayer
                      playbackId={asset.playback_ids[0].id}
                      streamType="on-demand"
                      metadata={{ video_id: asset.id, video_title: `Asset ${asset.id}` }}
                    />
                  </div>
                )}
                 {asset.status === 'processing' && <p><em>Video is processing...</em></p>}
                 {asset.status === 'errored' && <p style={{color: 'orange'}}><em>Video processing failed.</em></p>}
              </div>
              <button onClick={() => handleDelete(asset.id)} disabled={isLoading} style={{ padding: '8px 12px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
