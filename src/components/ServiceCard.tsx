
import React from 'react';
import { ArrowLeft } from 'lucide-react';
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
      <CardHeader className="pb-3 text-right">
        <CardTitle className="crypto-text-gradient">{title}</CardTitle>
        {duration && (
          <CardDescription className="text-white/70 mt-1">
            المدة: {duration}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="text-right">
        <p className="text-white/80">{description}</p>
        <div className="mt-4 font-bold text-xl text-crypto">رسوم الخدمة: {price}</div>
      </CardContent>
      <CardFooter className="pt-3 justify-end">
        <Button className="w-full crypto-gradient group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="mr-2">اطلب الآن</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
