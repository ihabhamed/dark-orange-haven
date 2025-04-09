
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "فهم استراتيجيات عائد DeFi في 2025",
    excerpt: "دليل شامل لأحدث استراتيجيات استثمار العائد عبر بروتوكولات DeFi المختلفة وكيفية تعظيم العوائد مع إدارة المخاطر.",
    date: "2 أبريل، 2025",
    author: "خبير الكريبتو",
    category: "DeFi",
    image: "https://images.unsplash.com/photo-1639152201720-5e536d254d81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    title: "الدليل النهائي لصيد الإيردروبس",
    excerpt: "تعلم كيفية تحديد المشاريع الواعدة، وضع نفسك في موقع يؤهلك للحصول على الإيردروبس، وتعظيم فرصك في الحصول على توزيعات العملات ذات القيمة.",
    date: "27 مارس، 2025",
    author: "خبير الكريبتو",
    category: "الإيردروبس",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1497&q=80"
  },
  {
    id: 3,
    title: "التحليل على السلسلة: قراءة أوراق الشاي على البلوكتشين",
    excerpt: "كيفية استخدام مقاييس السلسلة للحصول على رؤى في تحركات السوق قبل حدوثها واتخاذ قرارات استثمارية أكثر استنارة.",
    date: "15 مارس، 2025",
    author: "خبير الكريبتو",
    category: "التحليل",
    image: "https://images.unsplash.com/photo-1639152201698-ae0e00a7b09e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
  },
  {
    id: 4,
    title: "حلول التوسع للطبقة الثانية: مقارنة المتنافسين الرئيسيين",
    excerpt: "مقارنة متعمقة لحلول الطبقة الثانية الرائدة بما في ذلك Optimism وArbitrum وzkSync والمزيد. أيها يفوز في سباق التوسع؟",
    date: "3 مارس، 2025",
    author: "خبير الكريبتو",
    category: "التكنولوجيا",
    image: "https://images.unsplash.com/photo-1622538479522-2114d453539d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 5,
    title: "تحليل سوق NFT: ما وراء صور JPEG",
    excerpt: "استكشاف المشهد المتطور للرموز غير القابلة للاستبدال (NFTs) بما يتجاوز الفن الرقمي، بما في ذلك الأصول الحقيقية والألعاب وتطبيقات الهوية.",
    date: "25 فبراير، 2025",
    author: "خبير الكريبتو",
    category: "NFTs",
    image: "https://images.unsplash.com/photo-1645956734458-63944ca12b61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 6,
    title: "دليل المبتدئين لضرائب العملات المشفرة",
    excerpt: "التنقل في عالم ضرائب العملات المشفرة المعقد. ما تحتاج إلى معرفته للبقاء ملتزمًا مع تحسين استراتيجيتك الضريبية.",
    date: "14 فبراير، 2025",
    author: "خبير الكريبتو",
    category: "التعليم",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80"
  }
];

const Blog = () => {
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
                <span className="crypto-text-gradient">رؤى وتحليلات</span> الكريبتو
              </h1>
              <p className="text-xl text-white/80 mb-8">
                مقالات خبيرة عن اتجاهات العملات المشفرة واستراتيجياتها وتحليل السوق لإبقائك على اطلاع.
              </p>
            </div>
          </div>
        </section>
        
        {/* Blog Posts */}
        <section className="py-16 bg-crypto-dark">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="أحدث المقالات" 
              subtitle="ابق على اطلاع بأحدث رؤاي حول العملات المشفرة، وDeFi، وNFTs، والمزيد"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="bg-crypto-super-dark border-white/5 overflow-hidden hover:border-crypto/50 transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-crypto bg-crypto/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center text-white/60 text-xs">
                        <Calendar className="h-3 w-3 ml-1" />
                        {post.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white hover:text-crypto transition-colors">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-0">
                    <div className="flex items-center text-white/60 text-sm">
                      <User className="h-3 w-3 ml-1" />
                      {post.author}
                    </div>
                    <Button variant="ghost" className="p-0 h-auto text-crypto hover:text-crypto-light hover:bg-transparent">
                      <span className="ml-1">إقرأ المزيد</span>
                      <ArrowRight className="h-4 w-4 rtl-flip" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button className="crypto-gradient">
                تحميل المزيد من المقالات
              </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-20 bg-crypto-super-dark">
          <div className="container mx-auto px-4">
            <div className="glass-card p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6 crypto-text-gradient">
                  اشترك في نشرتي الإخبارية
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  احصل على أحدث رؤى العملات المشفرة وتحليلات السوق والنصائح الاستراتيجية مباشرة إلى صندوق الوارد الخاص بك.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="عنوان بريدك الإلكتروني" 
                    className="flex-grow px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-crypto"
                    required
                  />
                  <Button className="crypto-gradient">
                    اشترك
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
