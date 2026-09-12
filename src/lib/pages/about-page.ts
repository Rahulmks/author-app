export interface AboutPageContent {
  name: string;
  title?: string;
  biography: string;
  image?: string;
}

export async function getAboutPage(): Promise<AboutPageContent | null> {
  const fallback: AboutPageContent = {
    name: 'எழுத்தாளர்',
    title: 'எழுத்தாளர் • நாவலாசிரியர்',
    biography:
      'நினைவு, மொழி, இடம் ஆகியவற்றின் மெதுவான தொடர்புகளில் எனது எழுத்து உருவாகிறது. வெளிப்படையாகச் சாதாரணமாகத் தோன்றும் தருணங்களுக்குள் மறைந்திருக்கும் உணர்ச்சி அடர்த்தியைக் கவனிக்கிற பார்வையே எனது படைப்புகளின் மையமாக உள்ளது.',
    image: '/images/author/jaya-mohan.jpg',
  };

  if (process.env.S3_BUCKET_NAME && process.env.AWS_REGION) {
    const { getJsonObject } = await import('@/lib/aws/s3-read');
    return (await getJsonObject<AboutPageContent>('pages/about.json')) ?? fallback;
  }

  return fallback;
}
