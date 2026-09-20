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
    <section className="py-10 md:py-14">
      <Container>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {quotes.map((quote) => (
            <blockquote
              key={quote}
              className="relative w-[82%] flex-shrink-0 snap-center rounded-2xl border border-border-color/60 bg-paper/40 p-6 sm:w-[65%] md:w-auto md:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute left-4 top-1 font-display text-5xl leading-none text-accent/25 md:text-6xl"
              >
                &ldquo;
              </span>
              <p className="relative text-base leading-8 text-text-secondary md:text-lg md:leading-9">
                {quote}
              </p>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
