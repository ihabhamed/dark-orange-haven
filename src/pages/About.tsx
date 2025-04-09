
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
                  <span className="crypto-text-gradient">About Me</span>
                </h1>
                <p className="text-xl text-white/80 mb-8">
                  I'm a cryptocurrency expert, educator, and consultant with a passion for helping others navigate the complex world of digital assets.
                </p>
                <Button className="crypto-gradient group" asChild>
                  <Link to="/contact">
                    <span className="mr-2">Get in Touch</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              title="My Story" 
              subtitle="How I became a crypto expert and what drives my passion"
              centered
            />
            
            <div className="max-w-3xl mx-auto">
              <p className="text-white/80 mb-6">
                My journey in crypto began in 2016 when I first discovered Bitcoin and became fascinated by its potential to transform the global financial system. What started as a personal interest quickly evolved into a full-time passion as I immersed myself in blockchain technology, tokenomics, and crypto markets.
              </p>
              <p className="text-white/80 mb-6">
                After experiencing the highs and lows of multiple market cycles, I've developed a deep understanding of this volatile industry and the strategies needed to navigate it successfully. I've been fortunate to work with leading projects, advise numerous startups, and help hundreds of individuals build their crypto portfolios.
              </p>
              <p className="text-white/80 mb-6">
                Today, I focus on sharing my knowledge through personalized coaching, comprehensive courses, and strategic consulting. My mission is to empower others with the tools, knowledge, and confidence they need to succeed in the ever-evolving world of cryptocurrency.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-crypto" />
                  <span className="text-white">7+ Years Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-crypto" />
                  <span className="text-white">300+ Clients Helped</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-crypto" />
                  <span className="text-white">Binance Certified</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Expertise */}
        <section className="py-16 bg-crypto-super-dark">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="My Expertise" 
              subtitle="Areas where I can help you succeed"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">DeFi & Yield Strategies</h3>
                <p className="text-white/80">
                  Expert in decentralized finance protocols, yield farming, liquidity provision, and risk management in the DeFi ecosystem.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">On-Chain Analysis</h3>
                <p className="text-white/80">
                  Skilled at reading blockchain data to identify trends, whale movements, and market opportunities before they become mainstream.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">NFT Markets</h3>
                <p className="text-white/80">
                  Knowledgeable about non-fungible token ecosystems, valuation methods, and emerging trends in digital collectibles.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">Tokenomics</h3>
                <p className="text-white/80">
                  Experienced in designing and analyzing token economic models for sustainability, growth, and value accrual.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">Crypto Security</h3>
                <p className="text-white/80">
                  Focused on personal and institutional security best practices to protect digital assets from threats.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">Market Psychology</h3>
                <p className="text-white/80">
                  Understanding of market cycles, sentiment analysis, and psychological factors affecting crypto markets.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Partnerships */}
        <section className="py-16 bg-crypto-dark">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="Partnerships & Collaborations" 
              subtitle="Organizations I've worked with in the crypto space"
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
                Ready to Start Your Crypto Journey?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Let's work together to help you achieve your goals in the crypto space, whether you're just starting out or looking to optimize your existing strategy.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="crypto-gradient" asChild>
                  <Link to="/services">Explore Services</Link>
                </Button>
                <Button variant="outline" className="bg-transparent border-crypto/70 hover:border-crypto text-white hover:text-crypto" asChild>
                  <Link to="/contact">Contact Me</Link>
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
