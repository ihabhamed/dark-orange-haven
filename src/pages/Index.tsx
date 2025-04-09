
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import SectionHeading from '@/components/SectionHeading';
import { getFeaturedServices } from '@/data/services';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredServices = getFeaturedServices();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* About Me Section */}
        <section className="py-16 bg-crypto-dark">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                  alt="Crypto Expert" 
                  className="rounded-xl shadow-lg object-cover h-[400px] w-full"
                />
              </div>
              <div className="w-full md:w-1/2">
                <SectionHeading 
                  title="من أنا" 
                  subtitle="مرشدك الموثوق في عالم العملات الرقمية المعقد"
                />
                <p className="text-white/80 mb-6">
                  مع أكثر من 7 سنوات من الخبرة في مجال العملات الرقمية، ساعدت المئات من الأفراد والشركات في التعامل مع أسواق العملات المشفرة المتقلبة. تمتد خبرتي من استراتيجيات الاستثمار الأساسية إلى بروتوكولات DeFi المتقدمة والتحليل على السلسلة.
                </p>
                <p className="text-white/80 mb-6">
                  بصفتي متخصصًا معتمدًا من Binance في تقنية البلوكتشين ومساهمًا منتظمًا في منشورات العملات المشفرة الرائدة، أجمع بين المعرفة النظرية والخبرة العملية لمساعدتك في تحقيق أهدافك في عالم الكريبتو.
                </p>
                <Button className="crypto-gradient group" asChild>
                  <Link to="/about">
                    <span className="ml-2">تعرف علي أكثر</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl-flip" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Services */}
        <section className="py-16 bg-crypto-super-dark relative">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-crypto/5 blur-3xl z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeading 
              title="الخدمات المميزة" 
              subtitle="توجيهات خبيرة وتعليم لمساعدتك على النجاح في عالم الكريبتو"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard 
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  duration={service.duration}
                  featured
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button className="crypto-gradient group" asChild>
                <Link to="/services">
                  <span className="ml-2">عرض جميع الخدمات</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl-flip" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-crypto-dark/70 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80')] bg-cover bg-center opacity-20 z-[-1]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 crypto-text-gradient">
                جاهز لتغيير رحلتك في عالم الكريبتو؟
              </h2>
              <p className="text-white/80 text-lg mb-8">
                سواء كنت تبدأ للتو أو تبحث عن تحسين استراتيجيتك، أنا هنا لإرشادك في كل خطوة على الطريق.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="crypto-gradient text-lg p-6" asChild>
                  <Link to="/services">احجز جلسة</Link>
                </Button>
                <Button variant="outline" className="text-lg p-6 bg-transparent border-crypto/70 hover:border-crypto text-white hover:text-crypto" asChild>
                  <Link to="/contact">اطلب استشارة</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
