
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import ContactForm from '@/components/ContactForm';
import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
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
                <span className="crypto-text-gradient">تواصل معنا</span>
              </h1>
              <p className="text-xl text-white/80 mb-8">
                هل لديك أسئلة؟ تبحث عن خدمات استشارية أو تدريبية؟ أنا هنا للمساعدة!
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Form */}
        <section className="py-16 bg-crypto-dark">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="w-full lg:w-1/3">
                <SectionHeading 
                  title="معلومات التواصل" 
                  subtitle="لا تتردد في التواصل من خلال أي من هذه القنوات"
                />
                
                <div className="space-y-6 mt-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-crypto/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-crypto" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">البريد الإلكتروني</h3>
                      <p className="text-white/70">contact@example.com</p>
                      <p className="text-white/50 text-sm mt-1">للاستفسارات العامة وفرص الأعمال</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-crypto/10 p-3 rounded-lg">
                      <Send className="h-6 w-6 text-crypto" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">تيليجرام</h3>
                      <p className="text-white/70">@cryptoexpert</p>
                      <p className="text-white/50 text-sm mt-1">للأسئلة السريعة والمراسلة المباشرة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-crypto/10 p-3 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-crypto" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">وسائل التواصل الاجتماعي</h3>
                      <p className="text-white/70">تويتر: @cryptoexpert</p>
                      <p className="text-white/50 text-sm mt-1">للتحديثات والرؤى والمناقشات العامة</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 p-6 glass-card rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-white">وقت الاستجابة النموذجي</h3>
                  <p className="text-white/80">
                    عادة ما أرد على جميع الاستفسارات في غضون 24-48 ساعة خلال أيام العمل. للأمور العاجلة، يرجى الإشارة إلى ذلك في سطر الموضوع.
                  </p>
                </div>
              </div>
              
              <div className="w-full lg:w-2/3">
                <SectionHeading 
                  title="أرسل لي رسالة" 
                  subtitle="استخدم النموذج أدناه لإرسال رسالة مباشرة"
                />
                
                <div className="glass-card p-6 md:p-8 rounded-xl">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="py-16 bg-crypto-super-dark">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="الأسئلة الشائعة" 
              subtitle="أسئلة شائعة حول التواصل والعمل معي"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">كيف أحجز جلسة تدريبية؟</h3>
                <p className="text-white/80">
                  يمكنك حجز جلسة تدريبية عن طريق ملء نموذج الاتصال أو إرسال بريد إلكتروني بالتواريخ والأوقات المفضلة لديك. سأرد بتأكيد وتفاصيل الدفع.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">هل تقدم استرداد الأموال؟</h3>
                <p className="text-white/80">
                  بالنسبة للدورات، أقدم ضمان استرداد الأموال لمدة 7 أيام إذا لم تكن راضيًا. يمكن إعادة جدولة جلسات التدريب بإشعار قبل 48 ساعة ولكنها غير قابلة للاسترداد.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">كيف تعمل مشاريع الاستشارات؟</h3>
                <p className="text-white/80">
                  تبدأ مشاريع الاستشارات بمكالمة استكشافية مجانية لفهم احتياجاتك. ثم أقوم بإعداد اقتراح مخصص مع النطاق والجدول الزمني والتسعير للحصول على موافقتك.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">هل يمكنني الحصول على خدمات مخصصة؟</h3>
                <p className="text-white/80">
                  نعم، أقدم خدمات مخصصة مصممة لتلبية احتياجاتك المحددة. اتصل بي مع تفاصيل حول ما تبحث عنه، ويمكننا مناقشة حل مخصص.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
