
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
    title: "Understanding DeFi Yield Strategies in 2025",
    excerpt: "A comprehensive guide to the latest yield farming strategies across different DeFi protocols and how to maximize returns while managing risk.",
    date: "April 2, 2025",
    author: "Crypto Expert",
    category: "DeFi",
    image: "https://images.unsplash.com/photo-1639152201720-5e536d254d81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Airdrop Hunting",
    excerpt: "Learn how to identify promising projects, position yourself for airdrops, and maximize your chances of receiving valuable token distributions.",
    date: "March 27, 2025",
    author: "Crypto Expert",
    category: "Airdrops",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1497&q=80"
  },
  {
    id: 3,
    title: "On-Chain Analysis: Reading the Blockchain Tea Leaves",
    excerpt: "How to use on-chain metrics to gain insights into market movements before they happen and make more informed investment decisions.",
    date: "March 15, 2025",
    author: "Crypto Expert",
    category: "Analysis",
    image: "https://images.unsplash.com/photo-1639152201698-ae0e00a7b09e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
  },
  {
    id: 4,
    title: "Layer 2 Scaling Solutions: Comparing the Top Contenders",
    excerpt: "An in-depth comparison of leading Layer 2 solutions including Optimism, Arbitrum, zkSync, and more. Which ones are winning the scaling race?",
    date: "March 3, 2025",
    author: "Crypto Expert",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1622538479522-2114d453539d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 5,
    title: "NFT Market Analysis: Beyond the JPEG",
    excerpt: "Exploring the evolving landscape of NFTs beyond digital art, including real-world assets, gaming, and identity applications.",
    date: "February 25, 2025",
    author: "Crypto Expert",
    category: "NFTs",
    image: "https://images.unsplash.com/photo-1645956734458-63944ca12b61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 6,
    title: "The Beginner's Guide to Crypto Taxes",
    excerpt: "Navigating the complex world of cryptocurrency taxation. What you need to know to stay compliant while optimizing your tax strategy.",
    date: "February 14, 2025",
    author: "Crypto Expert",
    category: "Education",
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
                <span className="crypto-text-gradient">Crypto Insights</span> & Analysis
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Expert articles on cryptocurrency trends, strategies, and market analysis to keep you informed.
              </p>
            </div>
          </div>
        </section>
        
        {/* Blog Posts */}
        <section className="py-16 bg-crypto-dark">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="Latest Articles" 
              subtitle="Stay updated with my latest insights on cryptocurrency, DeFi, NFTs, and more"
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
                        <Calendar className="h-3 w-3 mr-1" />
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
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </div>
                    <Button variant="ghost" className="p-0 h-auto text-crypto hover:text-crypto-light hover:bg-transparent">
                      <span className="mr-1">Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button className="crypto-gradient">
                Load More Articles
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
                  Subscribe to My Newsletter
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Get the latest crypto insights, market analysis, and strategic advice delivered directly to your inbox.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-crypto"
                    required
                  />
                  <Button className="crypto-gradient">
                    Subscribe
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
