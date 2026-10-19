import { getTranslations } from 'next-intl/server';
import Container from '@/components/layout/Container';

interface AwardsStripProps {
  awards: string[];
}

/** Splits a "text - YYYY" award entry into a prominent year and its description. */
function splitAward(award: string) {
  const match = award.match(/-\s*(\d{4})\s*$/);
  if (!match || match.index === undefined) {
    return { year: '', text: award };
  }
  return { year: match[1], text: award.slice(0, match.index).trim() };
}

export default async function AwardsStrip({ awards }: AwardsStripProps) {
  if (!awards.length) {
    return null;
  }
  const t = await getTranslations('home');

  return (
    <section className="on-surface border-y border-line bg-cream py-6 md:py-8">
      <Container>
        <p className="eyebrow mb-4 text-center md:text-left">{t('awards')}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {awards.map((award) => {
            const { year, text } = splitAward(award);
            return (
              <div
                key={award}
                className="card flex items-start gap-4 p-4 md:p-5"
              >
                <svg
                  aria-hidden="true"
                  className="mt-1 h-6 w-6 flex-shrink-0 text-highlight"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 2z" />
                </svg>
                <div>
                  {year && (
                    <span className="block font-display text-2xl font-bold text-highlight md:text-3xl">
                      {year}
                    </span>
                  )}
                  <p className="mb-0 mt-1 text-sm leading-relaxed text-text-secondary md:text-base">
                    {text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
