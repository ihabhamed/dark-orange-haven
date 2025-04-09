
export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  price: string;
  duration?: string;
  featured: boolean;
}

export const services: Service[] = [
  {
    id: "coaching",
    title: "One-on-One Coaching",
    description: "Personalized coaching sessions to guide you through the crypto market with expert insights and strategies.",
    fullDescription: "Get personalized guidance from an expert with years of experience in the crypto market. During these one-on-one sessions, I'll help you develop a personalized strategy based on your goals, risk tolerance, and market conditions. Whether you're looking to optimize your portfolio, learn advanced trading techniques, or understand complex DeFi protocols, these sessions are tailored to your specific needs. Includes follow-up support via email for one week after each session.",
    price: "$299 / session",
    duration: "90 minutes",
    featured: true
  },
  {
    id: "beginner-course",
    title: "Beginner Crypto Course",
    description: "A comprehensive introduction to cryptocurrency, blockchain technology, and the fundamentals of digital assets.",
    fullDescription: "This beginner-friendly course covers everything you need to know to start your crypto journey with confidence. From understanding blockchain technology to setting up secure wallets and making your first transactions, this course provides a solid foundation. Topics include: cryptocurrency fundamentals, secure storage solutions, basic trading concepts, risk management, and how to research projects effectively. Includes lifetime access to course materials and a private community for ongoing support.",
    price: "$199",
    duration: "6 weeks",
    featured: true
  },
  {
    id: "advanced-course",
    title: "Advanced Crypto Course",
    description: "Deep dive into advanced crypto strategies, DeFi protocols, yield farming, and technical analysis.",
    fullDescription: "Take your crypto knowledge to the next level with this advanced course designed for those who already understand the basics. Explore complex topics like DeFi yield strategies, cross-chain bridging, automated trading systems, advanced technical analysis, and tokenomics evaluation. Learn how to identify emerging trends before they become mainstream and develop sophisticated strategies for different market conditions. Includes practical exercises, case studies, and personalized feedback on your strategic plans.",
    price: "$499",
    duration: "8 weeks",
    featured: true
  },
  {
    id: "onchain-analysis",
    title: "On-Chain Analysis Course",
    description: "Learn how to read and interpret on-chain data to make informed investment decisions ahead of the market.",
    fullDescription: "On-chain analysis is one of the most powerful tools for gaining an edge in the crypto market. This specialized course teaches you how to extract and interpret blockchain data to identify significant market trends and opportunities before they become apparent through price action. You'll learn how to use advanced tools like Glassnode, Nansen, and Dune Analytics, understand key metrics such as exchange flows and active addresses, and develop strategies based on on-chain signals. Includes access to custom dashboard templates and weekly on-chain analysis sessions.",
    price: "$399",
    duration: "6 weeks",
    featured: true
  },
  {
    id: "consulting",
    title: "Personalized Consulting",
    description: "Strategic consulting for crypto projects, businesses, and high-net-worth individuals navigating the digital asset space.",
    fullDescription: "Custom consulting services for projects, companies, and individuals requiring specialized crypto expertise. Whether you're launching a new token, integrating blockchain into your business, or managing a significant crypto portfolio, I provide tailored strategies and solutions. Services include tokenomics design, go-to-market strategies for crypto projects, investment thesis development, security audits, and custom research reports. Each consulting package is uniquely designed to address your specific challenges and objectives.",
    price: "Custom pricing",
    duration: "Variable",
    featured: false
  }
];

export const getFeaturedServices = (): Service[] => {
  return services.filter(service => service.featured);
};

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};
