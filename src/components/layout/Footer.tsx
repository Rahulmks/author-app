import Link from 'next/link';
import Container from './Container';
import { navigationItems, siteConfig } from '@/lib/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-border-color py-16">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_0.7fr_0.7fr]">
          <div>
            <p className="eyebrow mb-4">எழுத்தின் வீடு</p>
            <h3 className="mb-4 text-2xl font-semibold">{siteConfig.authorName}</h3>
            <p className="max-w-sm text-sm leading-7 text-text-secondary">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">வழிசெல்</h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="ink-link text-sm text-text-secondary hover:text-accent"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">இணைப்பு</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="ink-link text-sm text-text-secondary hover:text-accent"
                >
                  மின்னஞ்சல்
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-link text-sm text-text-secondary hover:text-accent"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-link text-sm text-text-secondary hover:text-accent"
                >
                  Spotify
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-link text-sm text-text-secondary hover:text-accent"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border-color pt-8">
          <p className="text-center text-sm text-text-secondary">
            © {currentYear} {siteConfig.authorName}. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
          </p>
        </div>
      </Container>
    </footer>
  );
}
