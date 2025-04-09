
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-crypto/5 blur-3xl z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="crypto-text-gradient">دليلك لاكتشاف عالم العملات الرقمية</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            تدريب متخصص، استشارات مخصصة، ودورات تعليمية شاملة لمساعدتك على النجاح في رحلتك مع العملات الرقمية.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="crypto-gradient text-lg p-6 group" asChild>
              <Link to="/services">
                <span className="ml-2">استعرض الخدمات</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl-flip" />
              </Link>
            </Button>
            <Button variant="outline" className="text-lg p-6 bg-transparent border-crypto/70 hover:border-crypto text-white hover:text-crypto" asChild>
              <Link to="/contact">تواصل معي</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="bg-crypto/10 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-crypto" />
              </div>
              <div className="text-right">
                <h3 className="font-medium text-white">دورات متخصصة</h3>
                <p className="text-white/70 text-sm">تعليم شامل للعملات الرقمية</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="bg-crypto/10 p-3 rounded-lg">
                <Users className="h-6 w-6 text-crypto" />
              </div>
              <div className="text-right">
                <h3 className="font-medium text-white">تدريب شخصي</h3>
                <p className="text-white/70 text-sm">توجيه مخصص لتحقيق أهدافك</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="bg-crypto/10 p-3 rounded-lg">
                <Zap className="h-6 w-6 text-crypto" />
              </div>
              <div className="text-right">
                <h3 className="font-medium text-white">استشارات استراتيجية</h3>
                <p className="text-white/70 text-sm">حلول للمشاريع والأعمال</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
