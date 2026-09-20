import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import { siteConfig } from '@/lib/navigation';
import { resolveImagePath } from '@/lib/media/resolve-image-path';

/** Home hero: text left / portrait right on desktop, portrait-first stack on mobile. Height fits content only. */
export default function HeroSection() {
  return (
    <section className="pt-8 pb-10 md:pt-12 md:pb-14 lg:pt-16 lg:pb-16">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="order-1 mx-auto w-40 sm:w-48 md:order-2 md:mx-0 md:w-full">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-border-color">
              <Image
                src={resolveImagePath('/images/author/profile.png') ?? '/images/author/profile.png'}
                alt="எழுத்தாளரின் உருவப்படம்"
                fill
                sizes="(min-width: 768px) 40vw, 60vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="order-2 text-center md:order-1 md:text-left">
            <p className="eyebrow mb-4">{siteConfig.authorTitle}</p>
            <h1 className="mb-5 text-4xl font-semibold leading-[1.12] sm:text-5xl lg:text-6xl">
              {siteConfig.authorName}
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-text-secondary md:mx-0 md:text-lg md:leading-9">
              நினைவின் விளிம்பில் நின்று, இடங்களின் மெளனத்தையும் மனிதர்களின் உள் உலகத்தையும்
              பதிவு செய்யும் எழுத்துகள். தமிழ் மற்றும் ஆங்கிலத்தின் இடையே நகரும் இந்த
              தளம், ஒரு படைப்பாளியின் மெதுவான கையெழுத்தைப் போல வடிவமைக்கப்பட்டுள்ளது.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                href="/posts"
                className="ink-link inline-flex items-center text-sm font-medium text-accent"
              >
                எழுத்துகளை வாசிக்க
              </Link>
              <Link
                href="/about"
                className="ink-link inline-flex items-center text-sm font-medium text-text-secondary hover:text-accent"
              >
                எழுத்தாளரை அறிய
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
