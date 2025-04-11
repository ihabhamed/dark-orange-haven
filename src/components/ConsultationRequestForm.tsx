
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { Service } from '@/types/database.types';

interface ConsultationRequestFormProps {
  service?: Service;
}

const ConsultationRequestForm: React.FC<ConsultationRequestFormProps> = ({ service }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Make sure required fields are filled
      if (!formData.name || !formData.email) {
        toast();
        setIsSubmitting(false);
        return;
      }

      const requestData = {
        ...formData,
        service_id: service?.id,
        service_name: service?.title,
        status: 'pending',
      };

      const { error } = await supabase
        .from('consultation_requests')
        .insert([requestData]);

      if (error) {
        throw error;
      }

      toast();

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting consultation request:', error);
      toast();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">الاسم *</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="أدخل اسمك الكامل"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">البريد الإلكتروني *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="example@email.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">رقم الهاتف</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="رقم هاتفك (اختياري)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">الرسالة</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="اكتب رسالتك أو استفسارك هنا..."
        />
      </div>

      <Button type="submit" className="w-full crypto-gradient" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            جاري الإرسال...
          </>
        ) : (
          'إرسال الطلب'
        )}
      </Button>
    </form>
  );
};

export default ConsultationRequestForm;
