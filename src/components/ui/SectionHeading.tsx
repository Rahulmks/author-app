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
    <div className={`section-heading mb-12 ${className}`}>
      <h2 className="text-3xl font-semibold md:text-4xl mb-3">
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
