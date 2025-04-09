
import React from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin, Twitter, Mail, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-crypto-dark border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Bitcoin className="h-6 w-6 text-crypto" />
              <span className="text-xl font-bold crypto-text-gradient">CryptoExpert</span>
            </div>
            <p className="text-white/70 mb-4">
              Providing expert crypto guidance, education, and consulting services to help you navigate the complex world of digital assets.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-white/70 hover:text-crypto transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="mailto:contact@example.com" className="text-white/70 hover:text-crypto transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
              <a href="https://t.me/username" className="text-white/70 hover:text-crypto transition-colors" aria-label="Telegram">
                <Send size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-crypto transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-crypto transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/consulting" className="text-white/70 hover:text-crypto transition-colors">Consulting</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-crypto transition-colors">About Me</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-white/70 hover:text-crypto transition-colors">Blog</Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-crypto transition-colors">Crypto Guides</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-crypto transition-colors">Market Analysis</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-crypto transition-colors">Airdrops</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-white/70">
                <Link to="/contact" className="text-white/70 hover:text-crypto transition-colors">Contact Form</Link>
              </li>
              <li className="text-white/70">contact@example.com</li>
              <li className="text-white/70">@cryptoexpert</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} CryptoExpert. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
