
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart3, Briefcase, Cpu, LineChart, Rocket, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Consulting = () => {
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
                <span className="crypto-text-gradient">استشارات استراتيجية</span> للنجاح في الكريبتو
              </h1>
              <p className="text-xl text-white/80 mb-8">
                إرشاد خبير للشركات والمشاريع والأفراد ذوي الملاءة المالية العالية في مجال العملات المشفرة والبلوكتشين.
              </p>
            </div>
          </div>
        </section>
        
        {/* Consulting Overview */}
        <section className="py-16 bg-crypto-dark">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <SectionHeading 
                  title="خدمات استشارية مخصصة" 
                  subtitle="حلول شاملة لتحديات الكريبتو الخاصة بك"
                />
                <p className="text-white/80 mb-6">
                  مع خبرة واسعة في صناعة العملات المشفرة، أقدم خدمات استشارية استراتيجية لمساعدة الشركات والأفراد على التنقل في مشهد الأصول الرقمية المعقد. نهجي الاستشاري مخصص للغاية، مع التركيز على أهدافك وتحدياتك الفريدة.
                </p>
                <p className="text-white/80 mb-6">
                  سواء كنت تطلق مشروعًا جديدًا، أو تدمج تقنية البلوكتشين في عملك، أو تسعى لتحسين محفظة الكريبتو الخاصة بك، أقدم الخبرة والرؤى لمساعدتك على النجاح.
                </p>
                <Button className="crypto-gradient group" asChild>
                  <Link to="/contact">
                    <span className="ml-2">اطلب استشارة</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl-flip" />
                  </Link>
                </Button>
              </div>
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                  alt="Crypto Consulting" 
                  className="rounded-xl shadow-lg object-cover h-[400px] w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Use Cases */}
        <section className="py-16 bg-crypto-super-dark">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="حالات استشارية" 
              subtitle="تطبيقات واقعية لخدمات استشارات الكريبتو الخاصة بي"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-crypto-dark/50 border-white/5 hover:border-crypto/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="bg-crypto/10 p-3 rounded-lg w-fit mb-4">
                    <Rocket className="h-6 w-6 text-crypto" />
                  </div>
                  <CardTitle className="text-white">إطلاق المشاريع</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">
                    توجيه استراتيجي للشركات الناشئة في مجال الكريبتو، بما في ذلك تصميم التوكنوميكس، واستراتيجية الدخول إلى السوق، وبناء المجتمع، والإدراج في البورصات.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-crypto-dark/50 border-white/5 hover:border-crypto/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="bg-crypto/10 p-3 rounded-lg w-fit mb-4">
                    <BarChart3 className="h-6 w-6 text-crypto" />
                  </div>
                  <CardTitle className="text-white">إدارة المحافظ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">
                    استراتيجيات محفظة متطورة للأفراد ذوي الملاءة المالية العالية، بما في ذلك تقييم المخاطر، وخطط التنويع، وتحسين العائد.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-crypto-dark/50 border-white/5 hover:border-crypto/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="bg-crypto/10 p-3 rounded-lg w-fit mb-4">
                    <Briefcase className="h-6 w-6 text-crypto" />
                  </div>
                  <CardTitle className="text-white">تكامل الأعمال</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">
                    مساعدة الشركات على دمج تقنية البلوكتشين، ومدفوعات العملات المشفرة، ووظائف الويب3 في عملياتها الحالية.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-crypto-dark/50 border-white/5 hover:border-crypto/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="bg-crypto/10 p-3 rounded-lg w-fit mb-4">
                    <Users className="h-6 w-6 text-crypto" />
                  </div>
                  <CardTitle className="text-white">بناء المجتمع</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">
                    استراتيجيات لبناء وإشراك مجتمعات الكريبتو، بما في ذلك النمو على تويتر، وإدارة ديسكورد، وهياكل حوافز المجتمع.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-crypto-dark/50 border-white/5 hover:border-crypto/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="bg-crypto/10 p-3 rounded-lg w-fit mb-4">
                    <LineChart className="h-6 w-6 text-crypto" />
                  </div>
                  <CardTitle className="text-white">تحليل السوق</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">
                    تحليل متعمق للسوق، وتحديد الاتجاهات، والبحث التنافسي لإبلاغ قرارات الأعمال والاستثمار الاستراتيجية.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-crypto-dark/50 border-white/5 hover:border-crypto/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="bg-crypto/10 p-3 rounded-lg w-fit mb-4">
                    <Cpu className="h-6 w-6 text-crypto" />
                  </div>
                  <CardTitle className="text-white">الحلول التقنية</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">
                    استشارات تقنية بشأن تطوير العقود الذكية، وعمليات التدقيق الأمني، واختيار البلوكتشين، وتحسين البروتوكول.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-crypto-dark/70 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1497&q=80')] bg-cover bg-center opacity-20 z-[-1]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 crypto-text-gradient">
                دعنا نناقش مشروعك
              </h2>
              <p className="text-white/80 text-lg mb-8">
                كل استشارة تبدأ بفهم احتياجاتك وأهدافك الفريدة. اتصل بي لجدولة مكالمة استكشافية واستكشاف كيف يمكننا العمل معًا.
              </p>
              <Button className="crypto-gradient text-lg p-6" asChild>
                <Link to="/contact">اطلب خدمات استشارية</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Consulting;
