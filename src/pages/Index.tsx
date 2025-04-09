
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
                  title="About Me" 
                  subtitle="Your trusted guide in the complex world of cryptocurrency"
                />
                <p className="text-white/80 mb-6">
                  With over 7 years of experience in the cryptocurrency space, I've helped hundreds of individuals and businesses navigate the volatile crypto markets. My expertise spans from basic investment strategies to advanced DeFi protocols and on-chain analysis.
                </p>
                <p className="text-white/80 mb-6">
                  As a Binance-certified blockchain professional and regular contributor to leading crypto publications, I bring both theoretical knowledge and practical experience to help you achieve your crypto goals.
                </p>
                <Button className="crypto-gradient group" asChild>
                  <Link to="/about">
                    <span className="mr-2">Learn More About Me</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              title="Featured Services" 
              subtitle="Expert guidance and education to help you thrive in the crypto space"
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
                  <span className="mr-2">View All Services</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                Ready to Transform Your Crypto Journey?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Whether you're just starting out or looking to optimize your strategy, I'm here to guide you every step of the way.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="crypto-gradient text-lg p-6" asChild>
                  <Link to="/services">Book a Session</Link>
                </Button>
                <Button variant="outline" className="text-lg p-6 bg-transparent border-crypto/70 hover:border-crypto text-white hover:text-crypto" asChild>
                  <Link to="/contact">Request a Consultation</Link>
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
