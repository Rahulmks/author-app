import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'content' | 'article' | 'full';
  className?: string;
}

export default function Container({ 
  children, 
  maxWidth = 'content',
  className = '' 
}: ContainerProps) {
  const maxWidthClass = maxWidth === 'article' 
    ? 'max-w-article' 
    : maxWidth === 'content'
    ? 'max-w-content'
    : 'max-w-full';

  return (
    <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
