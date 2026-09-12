'use client';

import { useMemo, useState } from 'react';

type UploadFolder = 'posts' | 'books' | 'podcasts' | 'videos' | 'author' | 'general';

interface UploadResponse {
  uploadUrl: string;
  objectKey: string;
  publicUrl?: string;
}

interface AdminImageFieldUploaderProps {
  folder: UploadFolder;
  onUploaded: (path: string) => void;
}

export default function AdminImageFieldUploader({ folder, onUploaded }: AdminImageFieldUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);

  const folderHint = useMemo(() => `media/${folder}/`, [folder]);

  const handleUpload = async () => {
    setError(null);
    setUploadedPath(null);

    if (!file) {
      setError('Choose an image first.');
      return;
    }

    setUploading(true);

    try {
      const urlResponse = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || 'application/octet-stream',
          folder,
        }),
      });

      if (!urlResponse.ok) {
        const details = (await urlResponse.json().catch(() => null)) as { error?: string } | null;
        throw new Error(details?.error ?? 'Unable to prepare upload.');
      }

      const uploadData = (await urlResponse.json()) as UploadResponse;

      const putResponse = await fetch(uploadData.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type || 'application/octet-stream',
        },
        body: file,
      });

      if (!putResponse.ok) {
        throw new Error('Image upload failed.');
      }

      const resolvedPath = uploadData.publicUrl ?? uploadData.objectKey;
      onUploaded(resolvedPath);
      setUploadedPath(resolvedPath);
      setFile(null);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Unable to upload image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-2 rounded-xl border border-border-color/70 bg-paper/60 p-3">
      <p className="text-xs text-text-secondary">Upload image to {folderHint}</p>
      <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center">
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="w-full rounded-xl border border-border-color bg-paper px-3 py-2 text-sm md:w-auto"
        />
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="rounded-xl border border-border-color px-3 py-2 text-sm"
        >
          {uploading ? 'Uploading...' : 'Upload image'}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
      {uploadedPath && <p className="mt-2 text-xs text-green-800">Uploaded and applied: {uploadedPath}</p>}
    </div>
  );
}