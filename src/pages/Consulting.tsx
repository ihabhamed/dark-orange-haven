
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
                <span className="crypto-text-gradient">Strategic Consulting</span> For Crypto Success
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Expert guidance for businesses, projects, and high-net-worth individuals in the cryptocurrency and blockchain space.
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
                  title="Tailored Consulting Services" 
                  subtitle="Comprehensive solutions for your specific crypto challenges"
                />
                <p className="text-white/80 mb-6">
                  With extensive experience in the crypto industry, I provide strategic consulting services to help businesses and individuals navigate the complex digital asset landscape. My consulting approach is highly personalized, focusing on your unique goals and challenges.
                </p>
                <p className="text-white/80 mb-6">
                  Whether you're launching a new project, integrating blockchain technology into your business, or seeking to optimize your crypto portfolio, I offer the expertise and insights to help you succeed.
                </p>
                <Button className="crypto-gradient group" asChild>
                  <Link to="/contact">
                    <span className="mr-2">Request a Consultation</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
              title="Consulting Use Cases" 
              subtitle="Real-world applications of my crypto consulting services"
              centered
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-crypto-dark/50 border-white/5 hover:border-crypto/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="bg-crypto/10 p-3 rounded-lg w-fit mb-4">
                    <Rocket className="h-6 w-6 text-crypto" />
                  </div>
                  <CardTitle className="text-white">Project Launches</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">
                    Strategic guidance for crypto startups, including tokenomics design, go-to-market strategy, community building, and exchange listings.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-crypto-dark/50 border-white/5 hover:border-crypto/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="bg-crypto/10 p-3 rounded-lg w-fit mb-4">
                    <BarChart3 className="h-6 w-6 text-crypto" />
                  </div>
                  <CardTitle className="text-white">Portfolio Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">
                    Sophisticated portfolio strategies for high-net-worth individuals, including risk assessment, diversification plans, and yield optimization.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-crypto-dark/50 border-white/5 hover:border-crypto/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="bg-crypto/10 p-3 rounded-lg w-fit mb-4">
                    <Briefcase className="h-6 w-6 text-crypto" />
                  </div>
                  <CardTitle className="text-white">Business Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">
                    Helping businesses integrate blockchain technology, cryptocurrency payments, and web3 functionalities into their existing operations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-crypto-dark/50 border-white/5 hover:border-crypto/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="bg-crypto/10 p-3 rounded-lg w-fit mb-4">
                    <Users className="h-6 w-6 text-crypto" />
                  </div>
                  <CardTitle className="text-white">Community Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">
                    Strategies to build and engage crypto communities, including Twitter growth, Discord management, and community incentive structures.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-crypto-dark/50 border-white/5 hover:border-crypto/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="bg-crypto/10 p-3 rounded-lg w-fit mb-4">
                    <LineChart className="h-6 w-6 text-crypto" />
                  </div>
                  <CardTitle className="text-white">Market Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">
                    In-depth market analysis, trend identification, and competitive research to inform strategic business and investment decisions.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-crypto-dark/50 border-white/5 hover:border-crypto/50 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="bg-crypto/10 p-3 rounded-lg w-fit mb-4">
                    <Cpu className="h-6 w-6 text-crypto" />
                  </div>
                  <CardTitle className="text-white">Technical Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80">
                    Technical advisement on smart contract development, security audits, blockchain selection, and protocol optimization.
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
                Let's Discuss Your Project
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Every consultation begins with understanding your unique needs and objectives. Contact me to schedule a discovery call and explore how we can work together.
              </p>
              <Button className="crypto-gradient text-lg p-6" asChild>
                <Link to="/contact">Request Consulting Services</Link>
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
