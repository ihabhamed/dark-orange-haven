
import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  centered = false 
}) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : 'text-right'}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        <span className="crypto-text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-white/70 text-lg max-w-3xl mr-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
