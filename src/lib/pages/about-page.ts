export interface AboutPageContent {
  name: string;
  title?: string;
  biography: string | string[];
  image?: string;
  awards?: string[];
}

import { resolveImagePath } from '@/lib/media/resolve-image-path';

export async function getAboutPage(): Promise<AboutPageContent | null> {
  const fallback: AboutPageContent = {
    name: 'எழுத்தாளர்',
    title: 'எழுத்தாளர் • நாவலாசிரியர்',
    biography: [
      "எழுத்து மற்றும் திரை இயக்கப்பணிகளில் இயங்கிவருகிறார். அறுபதிற்கும் மேற்பட்ட சிறுகதைகள் வெளியாகியிருக்கிறது. லட்சுமிஹர் எழுதிய முதல் சிறுகதை 'ஆண்ட்ராய்ட் வெர்ஷன்' 2021-ல் யாவரும் இணைய இதழ் வழியாக வெளியானது. அதே ஆண்டில் முதல் சிறுகதைத் தொகுப்பு 'ஸெல்மா சாண்டாவின் அலமாரிப் பூச்சிகள் & பிற கதைகள்' யாவரும் பதிப்பகம் வெளியீடாக வந்தது. 'கிளாஸிக் டச்'; 'டார்லிங்' என பெயர்சூட்டப்பட்ட சித்தாந்தம்'; 'கூத்தொன்று கூடிற்று & பிற கதைகள்' ஆகியவை பிற சிறுகதைத் தொகுப்புகள்.",
      'சமகால உலக சினிமா குறித்தான கட்டுரைத் தொகுப்பு வெளியாகியிருக்கிறது.',
      'இவரின் படைப்புகள் கனலி, வாசகசாலை, யாவரும், குறி, காலச்சுவடு, கல்குதிரை, கணையாழி, வனம், வல்லினம், பதாகை, உயிர் எழுத்து, உயிர்மை, நீலம், கலகம் ஆகிய அச்சு மற்றும் இணைய இதழ்களில் வெளியாகியுள்ளன.',
    ],
    awards: [
      "வாசகசாலையின் 'சிறந்த அறிமுக எழுத்தாளர்' விருது - 2022",
      "சாகித்ய அகாதெமி 'யுவபுரஸ்கார் விருது' - 2025",
    ],
    image: '/images/author/profile.png',
  };

  if (process.env.S3_BUCKET_NAME && process.env.AWS_REGION) {
    const { getJsonObject } = await import('@/lib/aws/s3-read');
    const page = await getJsonObject<AboutPageContent>('pages/about.json');
    if (!page) {
      return fallback;
    }

    return {
      ...fallback,
      ...page,
      awards: page.awards ?? fallback.awards,
      image: resolveImagePath(page.image),
    };
  }

  return fallback;
}
