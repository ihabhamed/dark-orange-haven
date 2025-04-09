
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  duration?: string;
  featured?: boolean;
  discountBadge?: string;
  oldPrice?: string;
  priceNote?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  price, 
  duration, 
  featured = false,
  discountBadge,
  oldPrice,
  priceNote
}) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:border-crypto/50 ${
      featured ? 'glass-card border-crypto/30' : 'bg-crypto-dark/50 border-white/5'
    }`}>
      <CardHeader className="pb-3 text-right relative">
        {discountBadge && (
          <Badge variant="destructive" className="absolute top-3 right-3 bg-red-600 hover:bg-red-700">
            {discountBadge}
          </Badge>
        )}
        <CardTitle className="crypto-text-gradient">{title}</CardTitle>
        {duration && (
          <CardDescription className="text-white/70 mt-1">
            المدة: {duration}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="text-right">
        <p className="text-white/80 mb-4">{description}</p>
        
        <div className="mt-4 text-center py-3 border-t border-b border-white/10">
          {oldPrice && (
            <div className="text-white/60 line-through text-sm mb-1">{oldPrice}</div>
          )}
          <div className="font-bold text-2xl text-crypto">رسوم الخدمة: {price}</div>
          {priceNote && (
            <div className="text-white/60 text-xs mt-2">{priceNote}</div>
          )}
        </div>
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
