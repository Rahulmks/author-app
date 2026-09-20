import Link from 'next/link';
import Container from '@/components/layout/Container';
import { siteConfig } from '@/lib/navigation';

export default function ContactPage() {
  return (
    <Container className="py-12 md:py-20">
      <div className="paper-panel max-w-2xl rounded-[2rem] p-7 md:p-10">
        <p className="eyebrow mb-4">
          தொடர்பு
        </p>
        <h1 className="mb-5 text-4xl font-semibold md:text-5xl">
          எழுதுங்கள்
        </h1>
        <p className="mb-8 text-lg leading-8 text-text-secondary">
          இலக்கியத் தொடர்புகள், உரையாடல் அழைப்புகள், இணைப்பு முயற்சிகள் அல்லது ஒரு அன்பான வணக்கத்திற்காக.
        </p>

        {(siteConfig.email || siteConfig.social.youtube || siteConfig.social.instagram) && (
          <div className="space-y-4 text-lg">
            {siteConfig.email && <p>மின்னஞ்சல்: <a href={`mailto:${siteConfig.email}`} className="ink-link text-accent">{siteConfig.email}</a></p>}
            {siteConfig.social.youtube && <p>YouTube: <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="ink-link text-accent">YouTube</a></p>}
            {siteConfig.social.instagram && <p>Instagram: <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="ink-link text-accent">Instagram</a></p>}
          </div>
        )}
      </div>
    </Container>
  );
}
