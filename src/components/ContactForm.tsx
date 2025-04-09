
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-white/90 block">
            Name
          </label>
          <Input
            id="name"
            placeholder="Your name"
            required
            className="bg-white/5 border-white/10 focus:border-crypto text-white"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-white/90 block">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Your email address"
            required
            className="bg-white/5 border-white/10 focus:border-crypto text-white"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-white/90 block">
          Subject
        </label>
        <Input
          id="subject"
          placeholder="What's this about?"
          required
          className="bg-white/5 border-white/10 focus:border-crypto text-white"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-white/90 block">
          Message
        </label>
        <Textarea
          id="message"
          placeholder="Your message..."
          required
          className="bg-white/5 border-white/10 focus:border-crypto text-white min-h-[150px]"
        />
      </div>
      <Button type="submit" className="crypto-gradient w-full md:w-auto">
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
