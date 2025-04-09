
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  duration?: string;
  featured?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  price, 
  duration, 
  featured = false 
}) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:border-crypto/50 ${
      featured ? 'glass-card border-crypto/30' : 'bg-crypto-dark/50 border-white/5'
    }`}>
      <CardHeader className="pb-3">
        <CardTitle className="crypto-text-gradient">{title}</CardTitle>
        {duration && (
          <CardDescription className="text-white/70 mt-1">
            Duration: {duration}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-white/80">{description}</p>
        <div className="mt-4 font-bold text-xl text-crypto">{price}</div>
      </CardContent>
      <CardFooter className="pt-3">
        <Button className="w-full crypto-gradient group">
          <span className="mr-2">Apply Now</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
