
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data/blogPosts';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || '1', 10);
  
  // Find the blog post with the matching ID
  const post = blogPosts.find(post => post.id === postId);
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-32">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6 text-white">المقال غير موجود</h1>
            <Button className="crypto-gradient" asChild>
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 ml-2 rtl-flip" />
                العودة إلى المدونة
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32">
        {/* Back Button */}
        <div className="container mx-auto px-4 mb-8">
          <Button variant="ghost" className="text-white hover:text-crypto" asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 ml-2 rtl-flip" />
              العودة إلى المدونة
            </Link>
          </Button>
        </div>
        
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{post.title}</h1>
            
            <div className="flex flex-wrap gap-4 justify-start mb-6 text-white/60">
              <div className="flex items-center">
                <User className="h-4 w-4 ml-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 ml-2" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 ml-2" />
                {post.category}
              </div>
            </div>
          </header>
          
          {/* Featured Image */}
          <div className="mb-10">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto max-h-[500px] object-cover rounded-xl"
            />
          </div>
          
          {/* Article Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/90 leading-relaxed mb-6 text-lg">
              {post.excerpt}
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">مقدمة في موضوع المقال</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              تعتبر العملات المشفرة اليوم من أهم الأدوات الاستثمارية التي تجذب المستثمرين حول العالم. ومع تطور تقنية البلوكتشين وانتشار الوعي بالعملات المشفرة، أصبح من المهم فهم كيفية الاستفادة القصوى من هذه التقنية والفرص التي تقدمها.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">النقاط الرئيسية للموضوع</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              في هذا المقال، سنتناول العديد من النقاط المهمة التي يجب على كل مستثمر في العملات المشفرة معرفتها. من استراتيجيات الاستثمار إلى تحليل السوق، سنقدم لك دليلاً شاملاً يساعدك على اتخاذ قرارات استثمارية أفضل.
            </p>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">تحليل معمق للموضوع</h2>
            <div className="bg-white/5 p-6 rounded-lg mb-6 border border-white/10">
              <p className="text-white/90 leading-relaxed">
                "مع التغيرات المستمرة في سوق العملات المشفرة، يجب على المستثمرين أن يكونوا على دراية بأحدث التطورات والاتجاهات. فهم التقنية الأساسية والعوامل المؤثرة في السوق يساعد على بناء استراتيجية استثمارية ناجحة."
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
              <img 
                src="https://images.unsplash.com/photo-1639152201698-ae0e00a7b09e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80" 
                alt="Crypto Analytics" 
                className="rounded-lg w-full h-[200px] object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1621761825779-5c363860b512?ixlib=rb-4.0.3&auto=format&fit=crop&w=1172&q=80" 
                alt="Blockchain Technology" 
                className="rounded-lg w-full h-[200px] object-cover"
              />
            </div>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">خطوات عملية للتطبيق</h2>
            <ol className="list-decimal pr-6 mb-6 space-y-3 text-white/90">
              <li>تحديد أهدافك الاستثمارية بوضوح قبل البدء</li>
              <li>إجراء بحث مكثف عن المشاريع التي تنوي الاستثمار فيها</li>
              <li>تنويع محفظتك الاستثمارية لتقليل المخاطر</li>
              <li>متابعة أخبار السوق والتحديثات التقنية باستمرار</li>
              <li>استخدام أدوات التحليل الفني والأساسي لاتخاذ قرارات مدروسة</li>
            </ol>
            
            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">الخلاصة</h2>
            <p className="text-white/90 leading-relaxed">
              في النهاية، يعتمد نجاحك في سوق العملات المشفرة على مدى فهمك للتقنية والسوق واستراتيجيتك الاستثمارية. بالمعرفة والتخطيط الجيد، يمكنك تحقيق عوائد جيدة في هذا المجال المثير والمتطور باستمرار.
            </p>
          </div>
        </article>
        
        {/* Related Articles */}
        <section className="container mx-auto px-4 my-16">
          <h3 className="text-2xl font-bold mb-8 text-white">مقالات ذات صلة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts
              .filter(related => related.id !== post.id)
              .slice(0, 3)
              .map(relatedPost => (
                <div key={relatedPost.id} className="bg-crypto-super-dark border border-white/5 rounded-lg overflow-hidden">
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2 text-white hover:text-crypto">
                      <Link to={`/blog/${relatedPost.id}`}>
                        {relatedPost.title}
                      </Link>
                    </h4>
                    <Button variant="ghost" className="p-0 h-auto text-crypto hover:text-crypto-light hover:bg-transparent" asChild>
                      <Link to={`/blog/${relatedPost.id}`}>
                        <span className="ml-1">إقرأ المزيد</span>
                        <ArrowLeft className="h-4 w-4 rtl-flip" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
