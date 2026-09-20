export interface SiteSettings {
  siteName: string;
  authorName: string;
  description?: string;
  email?: string;
  socialLinks?: {
    youtube?: string;
    spotify?: string;
    instagram?: string;
    facebook?: string;
    x?: string;
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const fallback: SiteSettings = {
    siteName: 'Author Website',
    authorName: 'லட்சுமிஹர்',
    description: 'கதைகள், கட்டுரைகள், நினைவுகளின் மெளனம்.',
    email: '',
    socialLinks: {
      youtube: '',
      spotify: '',
      instagram: '',
    },
  };

  if (process.env.S3_BUCKET_NAME && process.env.AWS_REGION) {
    const { getJsonObject } = await import('@/lib/aws/s3-read');
    return (await getJsonObject<SiteSettings>('pages/settings.json')) ?? fallback;
  }

  return fallback;
}
