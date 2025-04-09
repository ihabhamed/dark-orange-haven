
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-crypto/5 blur-3xl z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="crypto-text-gradient">خدماتنا المميزة</span> في عالم الكريبتو
              </h1>
              <p className="text-xl text-white/80 mb-8">
                من جلسات التدريب الفردية إلى الدورات الشاملة، نقدم مجموعة متنوعة من الخدمات المصممة لمساعدتك على النجاح في رحلتك مع العملات الرقمية.
              </p>
            </div>
          </div>
        </section>
        
        {/* All Services */}
        <section className="py-16 bg-crypto-dark">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="الخدمات المتاحة" 
              subtitle="توجيهات وتعليم متخصص لمساعدتك على النجاح في عالم العملات الرقمية"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard 
                  key={service.id}
                  title={service.title}
                  description={service.fullDescription || service.description}
                  price={service.price}
                  duration={service.duration}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-crypto-super-dark">
          <div className="container mx-auto px-4">
            <div className="glass-card p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6 crypto-text-gradient">
                  غير متأكد من الخدمة المناسبة لك؟
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  دعنا نناقش احتياجاتك الخاصة ونجد الحل المثالي لمساعدتك في تحقيق أهدافك في مجال العملات الرقمية.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button className="crypto-gradient" asChild>
                    <Link to="/contact">احجز استشارة مجانية</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
