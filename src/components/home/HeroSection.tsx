import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import Container from '@/components/layout/Container';
import { resolveImagePath } from '@/lib/media/resolve-image-path';

/** Home hero: text left / portrait right on desktop, portrait-first stack on mobile. Height fits content only. */
export default async function HeroSection() {
  const t = await getTranslations();
  return (
    <section className="pt-8 pb-10 md:pt-12 md:pb-14 lg:pt-16 lg:pb-16">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="order-1 mx-auto w-40 sm:w-48 md:order-2 md:mx-0 md:w-full">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-border-color">
              <Image
                src={resolveImagePath('/images/author/profile.png') ?? '/images/author/profile.png'}
                alt={t('home.heroPortraitAlt')}
                fill
                sizes="(min-width: 768px) 40vw, 60vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="order-2 text-center md:order-1 md:text-left">
            <p className="eyebrow mb-4">{t('brand.title')}</p>
            <h1 className="mb-5 text-4xl font-semibold leading-[1.12] sm:text-5xl lg:text-6xl">
              {t('brand.name')}
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-text-secondary md:mx-0 md:text-lg md:leading-9">
              {t('home.heroBody')}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                href="/posts"
                className="ink-link inline-flex items-center text-sm font-medium text-accent"
              >
                {t('home.readWritings')}
              </Link>
              <Link
                href="/about"
                className="ink-link inline-flex items-center text-sm font-medium text-text-secondary hover:text-accent"
              >
                {t('home.meetAuthor')}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
