
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Service } from '@/types/database.types';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    full_description: '',
    price: '',
    old_price: '',
    duration: '',
    discount_badge: '',
    featured: false,
    display_order: null,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchService = async () => {
        try {
          setIsLoading(true);
          const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('id', id)
            .single();

          if (error) {
            throw error;
          }

          setFormData(data as Service);
        } catch (error) {
          console.error('Error fetching service:', error);
          toast({
            title: 'خطأ في جلب بيانات الخدمة',
            description: 'حدث خطأ أثناء محاولة جلب بيانات الخدمة، يرجى المحاولة مرة أخرى.',
            variant: 'destructive',
          });
          navigate('/admin/services');
        } finally {
          setIsLoading(false);
        }
      };

      fetchService();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleNumberChange = (name: string, value: string) => {
    const numValue = value === '' ? null : parseInt(value, 10);
    setFormData((prev) => ({ ...prev, [name]: numValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Make sure required fields are filled
      if (!formData.title || !formData.description || !formData.price) {
        toast({
          title: 'حقول مطلوبة',
          description: 'يرجى ملء جميع الحقول المطلوبة.',
          variant: 'destructive',
        });
        setIsSaving(false);
        return;
      }

      if (isEditMode) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', id);

        if (error) {
          throw error;
        }

        toast({
          title: 'تم تحديث الخدمة بنجاح',
        });
      } else {
        // Create new service
        const { error } = await supabase
          .from('services')
          .insert([formData]);

        if (error) {
          throw error;
        }

        toast({
          title: 'تم إضافة الخدمة بنجاح',
        });
      }

      // Navigate back to services list
      navigate('/admin/services');
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: isEditMode ? 'خطأ في تحديث الخدمة' : 'خطأ في إضافة الخدمة',
        description: 'حدث خطأ أثناء محاولة حفظ الخدمة، يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/services')}
          className="ml-2"
        >
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة
        </Button>
        <h2 className="text-3xl font-bold">
          {isEditMode ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
        </h2>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>معلومات الخدمة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان الخدمة *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف مختصر *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                required
              />
              <p className="text-xs text-muted-foreground">
                وصف قصير يظهر في بطاقة الخدمة
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_description">الوصف الكامل</Label>
              <Textarea
                id="full_description"
                name="full_description"
                value={formData.full_description || ''}
                onChange={handleChange}
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                وصف مفصل للخدمة يظهر في صفحة التفاصيل
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">السعر *</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  مثال: 299 دولار / للجلسة
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="old_price">السعر القديم</Label>
                <Input
                  id="old_price"
                  name="old_price"
                  value={formData.old_price || ''}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  اتركه فارغاً إذا لم يكن هناك خصم
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">المدة</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration || ''}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  مثال: 90 دقيقة، 6 أسابيع
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount_badge">نص شارة الخصم</Label>
                <Input
                  id="discount_badge"
                  name="discount_badge"
                  value={formData.discount_badge || ''}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  مثال: خصم 30%، عرض محدود
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="display_order">ترتيب العرض</Label>
                <Input
                  id="display_order"
                  name="display_order"
                  type="number"
                  value={formData.display_order === null ? '' : formData.display_order}
                  onChange={(e) => handleNumberChange('display_order', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  الرقم الأقل يظهر أولاً، اتركه فارغاً للترتيب التلقائي
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-8 space-y-0">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
                />
                <Label htmlFor="featured" className="mr-2">عرض في الصفحة الرئيسية</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/services')}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="ml-2 h-4 w-4" />
                  {isEditMode ? 'تحديث الخدمة' : 'حفظ الخدمة'}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ServiceForm;
