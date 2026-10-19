import Container from '@/components/layout/Container';

interface QuoteGridProps {
  quotes: string[];
}

/** 3-column grid on desktop, horizontal scroll-snap row on mobile. */
export default function QuoteGrid({ quotes }: QuoteGridProps) {
  if (!quotes.length) {
    return null;
  }

  return (
    <section className="py-8 md:py-14">
      <Container>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-8 pt-1 md:grid md:grid-cols-3 md:overflow-visible md:p-0">
          {quotes.map((quote) => (
            <blockquote
              key={quote}
              className="card relative w-[82%] flex-shrink-0 snap-center p-6 sm:w-[65%] md:w-auto md:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute left-4 top-1 font-display text-5xl leading-none text-text-secondary opacity-30 md:text-6xl"
              >
                &ldquo;
              </span>
              <p className="relative mb-0 text-base leading-8 text-text-secondary md:text-lg md:leading-9">
                {quote}
              </p>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
