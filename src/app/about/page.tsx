import Image from 'next/image';
import Container from '@/components/layout/Container';
import { getAboutPage } from '@/lib/pages/about-page';
import { resolveImagePath } from '@/lib/media/resolve-image-path';
import { quotes } from '@/data/quotes';

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <Container className="py-8 md:py-12">
      <div className="grid items-start gap-8 md:grid-cols-[280px_1fr] max-w-4xl mx-auto">
        <div className="w-full max-w-[280px] mx-auto space-y-4">
          <div className="border border-border-color/60 p-2.5 rounded-lg bg-paper/20">
            <div className="relative aspect-[4/5] overflow-hidden rounded bg-paper">
              <Image
                src={resolveImagePath(about?.image) ?? resolveImagePath('/images/author/profile.png') ?? '/images/author/profile.png'}
                alt={about?.name || 'எழுத்தாளரின் உருவப்படம்'}
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>

        <div className="border-l-2 border-accent pl-5 md:pl-8">
          <p className="eyebrow mb-2 text-xs tracking-widest text-accent">
            எழுத்தாளர் குறித்து
          </p>
          <h1 className="mb-4 text-2xl font-semibold leading-snug md:text-4xl">
            {about?.title || 'நினைவின் எல்லையிலும் நிலத்தின் அடியொலியிலும் இருந்து எழுதுதல்.'}
          </h1>

          <div className="space-y-4 text-base md:text-lg leading-relaxed text-text-secondary">
            {(Array.isArray(about?.biography) ? about.biography : about?.biography ? [about.biography] : []).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {about?.awards && (
            <div className="mt-8 border-t border-border-color pt-6">
              <h2 className="mb-3 text-xl font-semibold">விருதுகள்</h2>
              <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-text-secondary">
                {about.awards.map((award) => <li key={award}>{award}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-4 border-t border-border-color pt-8 md:grid-cols-3">
        {quotes.map((quote) => (
          <blockquote key={quote} className="pull-quote text-base leading-8 text-text-secondary">
            {quote}
          </blockquote>
        ))}
      </div>

    </Container>
  );
}
