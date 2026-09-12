'use client';

import { FormEvent, useMemo, useState } from 'react';

type UploadFolder = 'posts' | 'books' | 'podcasts' | 'videos' | 'author' | 'general';

interface UploadResponse {
  objectKey: string;
  publicUrl?: string;
}

export default function AdminMediaUploader() {
  const [folder, setFolder] = useState<UploadFolder>('posts');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const folderHint = useMemo(() => `media/${folder}/`, [folder]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    if (!file) {
      setError('Pick a file first.');
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
        throw new Error(details?.error ?? 'Unable to upload file.');
      }

      const uploadData = (await uploadResponse.json()) as UploadResponse;

      setResult(uploadData);
      setFile(null);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Upload Media</h2>
        <p className="text-sm text-text-secondary">Upload image assets to S3 and copy the returned path into your content forms.</p>
      </div>

      <form className="grid gap-4 rounded-2xl border border-border-color p-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="folder" className="mb-1 block text-sm font-medium text-text-secondary">
            Folder
          </label>
          <select
            id="folder"
            value={folder}
            onChange={(event) => setFolder(event.target.value as UploadFolder)}
            className="w-full rounded-xl border border-border-color bg-paper px-3 py-2"
          >
            <option value="posts">posts</option>
            <option value="books">books</option>
            <option value="podcasts">podcasts</option>
            <option value="videos">videos</option>
            <option value="author">author</option>
            <option value="general">general</option>
          </select>
          <p className="mt-1 text-xs text-text-secondary">Target prefix: {folderHint}</p>
        </div>

        <div>
          <label htmlFor="file" className="mb-1 block text-sm font-medium text-text-secondary">
            File
          </label>
          <input
            id="file"
            type="file"
            required
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="w-full rounded-xl border border-border-color bg-paper px-3 py-2"
          />
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <button type="submit" disabled={uploading} className="btn-primary w-fit">
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {result && (
        <div className="rounded-2xl border border-green-600/40 bg-green-100/50 p-4">
          <p className="mb-2 text-sm font-semibold text-green-900">Upload complete</p>
          <p className="text-sm text-green-900">Storage key: {result.objectKey}</p>
          {result.publicUrl && <p className="text-sm text-green-900">Public path: {result.publicUrl}</p>}
        </div>
      )}
    </div>
  );
}
