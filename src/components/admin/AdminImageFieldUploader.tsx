'use client';

import { useMemo, useState } from 'react';

type UploadFolder = 'posts' | 'books' | 'podcasts' | 'videos' | 'events' | 'author' | 'general';

interface UploadResponse {
  objectKey: string;
  publicUrl?: string;
  error?: string;
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
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const details = (await uploadResponse.json().catch(() => null)) as { error?: string } | null;
        throw new Error(details?.error ?? 'Upload failed.');
      }

      const uploadData = (await uploadResponse.json()) as UploadResponse;

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
    <div className="mt-2 rounded-lg border border-line bg-cream p-3">
      <p className="text-xs text-text-secondary">Upload image to {folderHint}</p>
      <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center">
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm md:w-auto"
        />
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="btn-secondary text-sm"
        >
          {uploading ? 'Uploading...' : 'Upload image'}
        </button>
      </div>
      {error && <p className="mt-2 border-l-4 border-sun bg-cream px-3 py-2 text-xs font-semibold text-text-primary">{error}</p>}
      {uploadedPath && <p className="mt-2 border-l-4 border-sky bg-cream px-3 py-2 text-xs font-semibold text-text-primary">Uploaded and applied: {uploadedPath}</p>}
    </div>
  );
}