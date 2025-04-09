
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Calendar, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-crypto/5 blur-3xl z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="crypto-text-gradient">من أنا</span>
                </h1>
                <p className="text-xl text-white/80 mb-8">
                  أنا خبير في العملات الرقمية، معلم ومستشار، لدي شغف بمساعدة الآخرين في التنقل في عالم الأصول الرقمية المعقد.
                </p>
                <Button className="crypto-gradient group" asChild>
                  <Link to="/contact">
                    <span className="ml-2">تواصل معي</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl-flip" />
                  </Link>
                </Button>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-crypto to-crypto-light blur-sm"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                    alt="Profile" 
                    className="relative rounded-full h-72 w-72 object-cover border-4 border-crypto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* My Story */}
        <section className="py-16 bg-crypto-dark">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="قصتي" 
              subtitle="كيف أصبحت خبيراً في العملات الرقمية وما الذي يحرك شغفي"
              centered
            />
            
            <div className="max-w-3xl mx-auto">
              <p className="text-white/80 mb-6">
                بدأت رحلتي في عالم العملات الرقمية في عام 2016 عندما اكتشفت البيتكوين لأول مرة وأصبحت مفتوناً بإمكاناته لتحويل النظام المالي العالمي. ما بدأ كاهتمام شخصي تطور بسرعة إلى شغف بدوام كامل حيث غمرت نفسي في تقنية البلوكتشين، واقتصاديات الرموز، وأسواق العملات المشفرة.
              </p>
              <p className="text-white/80 mb-6">
                بعد تجربة ارتفاعات وانخفاضات دورات سوق متعددة، طورت فهماً عميقاً لهذه الصناعة المتقلبة والاستراتيجيات اللازمة للتنقل فيها بنجاح. كان من حسن حظي أن أعمل مع مشاريع رائدة، وتقديم المشورة للعديد من الشركات الناشئة، ومساعدة المئات من الأفراد في بناء محافظ العملات المشفرة الخاصة بهم.
              </p>
              <p className="text-white/80 mb-6">
                اليوم، أركز على مشاركة معرفتي من خلال التدريب الشخصي، والدورات الشاملة، والاستشارات الاستراتيجية. مهمتي هي تمكين الآخرين بالأدوات والمعرفة والثقة التي يحتاجونها للنجاح في عالم العملات المشفرة المتطور باستمرار.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 rtl:space-x-reverse">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-crypto" />
                  <span className="text-white">خبرة أكثر من 7 سنوات</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-crypto" />
                  <span className="text-white">ساعدت أكثر من 300 عميل</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-crypto" />
                  <span className="text-white">معتمد من بينانس</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Expertise */}
        <section className="py-16 bg-crypto-super-dark">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="مجالات خبرتي" 
              subtitle="المجالات التي يمكنني مساعدتك فيها للنجاح"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">DeFi واستراتيجيات العائد</h3>
                <p className="text-white/80">
                  خبير في بروتوكولات التمويل اللامركزي، وزراعة العائد، وتوفير السيولة، وإدارة المخاطر في نظام DeFi البيئي.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">التحليل على السلسلة</h3>
                <p className="text-white/80">
                  ماهر في قراءة بيانات البلوكتشين لتحديد الاتجاهات، وتحركات الحيتان، وفرص السوق قبل أن تصبح سائدة.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">أسواق NFT</h3>
                <p className="text-white/80">
                  على دراية بالأنظمة البيئية للرموز غير القابلة للاستبدال، وطرق التقييم، والاتجاهات الناشئة في المقتنيات الرقمية.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">اقتصاديات الرموز</h3>
                <p className="text-white/80">
                  خبرة في تصميم وتحليل نماذج الاقتصاد الرمزي للاستدامة والنمو وتراكم القيمة.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">أمان العملات المشفرة</h3>
                <p className="text-white/80">
                  التركيز على أفضل ممارسات الأمان الشخصي والمؤسسي لحماية الأصول الرقمية من التهديدات.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">علم نفس السوق</h3>
                <p className="text-white/80">
                  فهم دورات السوق، وتحليل المشاعر، والعوامل النفسية التي تؤثر على أسواق العملات المشفرة.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Partnerships */}
        <section className="py-16 bg-crypto-dark">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="شراكات وتعاونات" 
              subtitle="المنظمات التي عملت معها في مجال العملات المشفرة"
              centered
            />
            
            <div className="flex flex-wrap justify-center items-center gap-12 max-w-4xl mx-auto py-8">
              <div className="bg-white/5 p-6 rounded-xl w-[200px] h-[100px] flex items-center justify-center">
                <img 
                  src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png" 
                  alt="Binance" 
                  className="h-12 opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="bg-white/5 p-6 rounded-xl w-[200px] h-[100px] flex items-center justify-center">
                <img 
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.png" 
                  alt="Ethereum Foundation" 
                  className="h-12 opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="bg-white/5 p-6 rounded-xl w-[200px] h-[100px] flex items-center justify-center">
                <img 
                  src="https://cryptologos.cc/logos/polygon-matic-logo.png" 
                  alt="Polygon" 
                  className="h-12 opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="bg-white/5 p-6 rounded-xl w-[200px] h-[100px] flex items-center justify-center">
                <img 
                  src="https://cryptologos.cc/logos/chainlink-link-logo.png" 
                  alt="Chainlink" 
                  className="h-12 opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-crypto-dark/70 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1509&q=80')] bg-cover bg-center opacity-20 z-[-1]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 crypto-text-gradient">
                هل أنت مستعد لبدء رحلتك في عالم العملات المشفرة؟
              </h2>
              <p className="text-white/80 text-lg mb-8">
                دعنا نعمل معًا لمساعدتك على تحقيق أهدافك في مجال العملات المشفرة، سواء كنت تبدأ للتو أو تتطلع إلى تحسين استراتيجيتك الحالية.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="crypto-gradient" asChild>
                  <Link to="/services">استعرض الخدمات</Link>
                </Button>
                <Button variant="outline" className="bg-transparent border-crypto/70 hover:border-crypto text-white hover:text-crypto" asChild>
                  <Link to="/contact">تواصل معي</Link>
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

export default About;
