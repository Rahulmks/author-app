import Container from '@/components/layout/Container';

/** Calm skeleton fade-in — content should arrive the way text settles on a page, not "pop in". */
export default function Loading() {
  return (
    <Container className="py-12 md:py-20">
      <div className="mb-12 max-w-3xl">
        <div className="skeleton mb-4 h-4 w-24" />
        <div className="skeleton mb-5 h-10 w-3/4" />
        <div className="skeleton h-16 w-full" />
      </div>
      <div className="max-w-3xl space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-fade-in space-y-3" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="skeleton aspect-[16/7] w-full" />
            <div className="skeleton h-5 w-2/3" />
            <div className="skeleton h-4 w-full" />
          </div>
        ))}
      </div>
    </Container>
  );
}
