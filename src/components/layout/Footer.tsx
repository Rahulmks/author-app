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
              {navigationItems.filter((item) => !item.hidden).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="ink-link text-sm text-text-secondary hover:text-accent"
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <ul className="ml-4 mt-2 space-y-2 border-l border-border-color pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="ink-link text-sm text-text-secondary hover:text-accent">
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul className="space-y-2">
              <li><Link href="/about" className="ink-link text-sm text-text-secondary hover:text-accent">அறிமுகம்</Link></li>
              <li><Link href="/contact" className="ink-link text-sm text-text-secondary hover:text-accent">தொடர்பு</Link></li>
            </ul>
            <div className="mt-6 flex items-center gap-4">
              {siteConfig.social.youtube && <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-text-secondary hover:text-accent"><svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg></a>}
              {siteConfig.social.spotify && <a href={siteConfig.social.spotify} target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="text-text-secondary hover:text-accent"><svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.8a10.2 10.2 0 1 0 0 20.4 10.2 10.2 0 0 0 0-20.4Zm4.7 14.7a.8.8 0 0 1-1.1.3c-3-1.8-6.8-2.2-11.3-1.2a.8.8 0 1 1-.3-1.5c4.9-1.1 9.1-.7 12.5 1.3.4.2.5.7.2 1.1Zm1.5-3.1a1 1 0 0 1-1.3.3c-3.4-2.1-8.6-2.7-12.7-1.5a1 1 0 1 1-.6-1.8c4.6-1.4 10.3-.7 14.2 1.7.5.3.6.9.4 1.3Zm.1-3.2C14.2 7.8 8 7.6 4.4 8.7a1.2 1.2 0 1 1-.7-2.3c4.2-1.3 11.1-1 15.3 1.5a1.2 1.2 0 0 1-.7 2.3Z" /></svg></a>}
              {siteConfig.social.instagram && <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-text-secondary hover:text-accent"><svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg></a>}
            </div>
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
