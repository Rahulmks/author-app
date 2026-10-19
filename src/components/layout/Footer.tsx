import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import Container from './Container';
import { navigationItems, siteConfig } from '@/lib/navigation';

export default async function Footer() {
  const t = await getTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border-color py-12 md:py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
          <div>
            <Link href="/" className="font-display text-2xl text-text-primary hover:text-accent">
              {t('brand.name')}
            </Link>
            <p className="eyebrow mt-3 mb-3">{t('brand.title')}</p>
            <p className="mb-0 max-w-sm text-sm leading-7 text-text-secondary">{t('brand.tagline')}</p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-4">{t('footer.contacts')}</p>
            <ul className="grid gap-2 text-sm text-text-secondary">
              <li><Link href="/about" className="hover:text-accent">{t('nav.about')}</Link></li>
              {navigationItems.slice(1, 5).map((item) => (
                <li key={item.href}><Link href={item.href} className="hover:text-accent">{t(`nav.${item.key}`)}</Link></li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">{t('footer.online')}</p>
            <div className="flex items-center gap-2">
              {siteConfig.social.youtube ? (
                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-11 w-11 items-center justify-center text-text-secondary hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg>
                </a>
              ) : (
                <span aria-label="YouTube" title="YouTube link not configured" className="flex h-11 w-11 items-center justify-center text-text-secondary/60">
                  <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg>
                </span>
              )}
              {siteConfig.social.spotify ? (
                <a href={siteConfig.social.spotify} target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="flex h-11 w-11 items-center justify-center text-text-secondary hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.8a10.2 10.2 0 1 0 0 20.4 10.2 10.2 0 0 0 0-20.4Zm4.7 14.7a.8.8 0 0 1-1.1.3c-3-1.8-6.8-2.2-11.3-1.2a.8.8 0 1 1-.3-1.5c4.9-1.1 9.1-.7 12.5 1.3.4.2.5.7.2 1.1Zm1.5-3.1a1 1 0 0 1-1.3.3c-3.4-2.1-8.6-2.7-12.7-1.5a1 1 0 1 1-.6-1.8c4.6-1.4 10.3-.7 14.2 1.7.5.3.6.9.4 1.3Zm.1-3.2C14.2 7.8 8 7.6 4.4 8.7a1.2 1.2 0 1 1-.7-2.3c4.2-1.3 11.1-1 15.3 1.5a1.2 1.2 0 0 1-.7 2.3Z" /></svg>
                </a>
              ) : (
                <span aria-label="Spotify" title="Spotify link not configured" className="flex h-11 w-11 items-center justify-center text-text-secondary/60">
                  <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.8a10.2 10.2 0 1 0 0 20.4 10.2 10.2 0 0 0 0-20.4Zm4.7 14.7a.8.8 0 0 1-1.1.3c-3-1.8-6.8-2.2-11.3-1.2a.8.8 0 1 1-.3-1.5c4.9-1.1 9.1-.7 12.5 1.3.4.2.5.7.2 1.1Zm1.5-3.1a1 1 0 0 1-1.3.3c-3.4-2.1-8.6-2.7-12.7-1.5a1 1 0 1 1-.6-1.8c4.6-1.4 10.3-.7 14.2 1.7.5.3.6.9.4 1.3Zm.1-3.2C14.2 7.8 8 7.6 4.4 8.7a1.2 1.2 0 1 1-.7-2.3c4.2-1.3 11.1-1 15.3 1.5a1.2 1.2 0 0 1-.7 2.3Z" /></svg>
                </span>
              )}
              {siteConfig.social.instagram ? (
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center text-text-secondary hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>
                </a>
              ) : (
                <span aria-label="Instagram" title="Instagram link not configured" className="flex h-11 w-11 items-center justify-center text-text-secondary/60">
                  <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border-color pt-5 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p className="mb-0">© {currentYear} {t('brand.name')}. {t('footer.rights')}</p>
          <Link href="/about" className="hover:text-accent">{t('footer.aboutLink')}</Link>
        </div>
      </Container>
    </footer>
  );
}
