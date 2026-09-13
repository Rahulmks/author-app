interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ 
  children, 
  subtitle,
  className = '' 
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${className}`}>
      <p className="section-kicker">Editorial</p>
      <h2 className="mb-3 text-3xl font-semibold md:text-5xl">
        {children}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-lg leading-8 text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
