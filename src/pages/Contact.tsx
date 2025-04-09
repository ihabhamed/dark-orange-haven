
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
                <span className="crypto-text-gradient">Get in Touch</span>
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Have questions? Looking for consulting or coaching services? I'm here to help!
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
                  title="Contact Information" 
                  subtitle="Feel free to reach out through any of these channels"
                />
                
                <div className="space-y-6 mt-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-crypto/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-crypto" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Email</h3>
                      <p className="text-white/70">contact@example.com</p>
                      <p className="text-white/50 text-sm mt-1">For general inquiries and business opportunities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-crypto/10 p-3 rounded-lg">
                      <Send className="h-6 w-6 text-crypto" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Telegram</h3>
                      <p className="text-white/70">@cryptoexpert</p>
                      <p className="text-white/50 text-sm mt-1">For quick questions and direct messaging</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-crypto/10 p-3 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-crypto" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Social Media</h3>
                      <p className="text-white/70">Twitter: @cryptoexpert</p>
                      <p className="text-white/50 text-sm mt-1">For updates, insights, and public discussions</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 p-6 glass-card rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-white">Typical Response Time</h3>
                  <p className="text-white/80">
                    I typically respond to all inquiries within 24-48 hours during business days. For urgent matters, please indicate in the subject line.
                  </p>
                </div>
              </div>
              
              <div className="w-full lg:w-2/3">
                <SectionHeading 
                  title="Send Me a Message" 
                  subtitle="Use the form below to send a direct message"
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
              title="Frequently Asked Questions" 
              subtitle="Common questions about contacting and working with me"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">How do I book a coaching session?</h3>
                <p className="text-white/80">
                  You can book a coaching session by filling out the contact form or sending an email with your preferred dates and times. I'll respond with confirmation and payment details.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">Do you offer refunds?</h3>
                <p className="text-white/80">
                  For courses, I offer a 7-day money-back guarantee if you're not satisfied. Coaching sessions can be rescheduled with 48 hours notice but are non-refundable.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">How do consulting projects work?</h3>
                <p className="text-white/80">
                  Consulting projects begin with a free discovery call to understand your needs. I then prepare a custom proposal with scope, timeline, and pricing for your approval.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">Can I get custom services?</h3>
                <p className="text-white/80">
                  Yes, I offer custom services tailored to your specific needs. Contact me with details about what you're looking for, and we can discuss a personalized solution.
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
