
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/database.types';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

const BlogPostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image_url: '',
    author: 'خبير الكريبتو', // Default author
    published_at: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchPost = async () => {
        try {
          setIsLoading(true);
          const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();

          if (error) {
            throw error;
          }

          // Format the date for the input
          const post = data as BlogPost;
          post.published_at = format(new Date(post.published_at), "yyyy-MM-dd'T'HH:mm");
          
          setFormData(post);
          
          if (post.image_url) {
            setImagePreview(post.image_url);
          }
        } catch (error) {
          console.error('Error fetching blog post:', error);
          toast({
            title: 'خطأ في جلب بيانات المقال',
            description: 'حدث خطأ أثناء محاولة جلب بيانات المقال، يرجى المحاولة مرة أخرى.',
            variant: 'destructive',
          });
          navigate('/admin/blog');
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return formData.image_url || null;
    
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `blog/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, imageFile);
      
      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'خطأ في رفع الصورة',
        description: 'حدث خطأ أثناء محاولة رفع الصورة، يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Make sure required fields are filled
      if (!formData.title || !formData.excerpt || !formData.content) {
        toast({
          title: 'حقول مطلوبة',
          description: 'يرجى ملء جميع الحقول المطلوبة.',
          variant: 'destructive',
        });
        setIsSaving(false);
        return;
      }

      // Upload image if selected
      const imageUrl = await uploadImage();
      
      // Prepare data for submission
      const postData = { 
        ...formData, 
        image_url: imageUrl,
        // Convert published_at to ISO string
        published_at: new Date(formData.published_at || '').toISOString()
      };

      if (isEditMode) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);

        if (error) {
          throw error;
        }

        toast({
          title: 'تم تحديث المقال بنجاح',
        });
      } else {
        // Create new post
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (error) {
          throw error;
        }

        toast({
          title: 'تم إضافة المقال بنجاح',
        });
      }

      // Navigate back to blog posts list
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: isEditMode ? 'خطأ في تحديث المقال' : 'خطأ في إضافة المقال',
        description: 'حدث خطأ أثناء محاولة حفظ المقال، يرجى المحاولة مرة أخرى.',
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
          onClick={() => navigate('/admin/blog')}
          className="ml-2"
        >
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة
        </Button>
        <h2 className="text-3xl font-bold">
          {isEditMode ? 'تعديل المقال' : 'إضافة مقال جديد'}
        </h2>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>معلومات المقال</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان المقال *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">ملخص المقال *</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={2}
                required
              />
              <p className="text-xs text-muted-foreground">
                ملخص قصير يظهر في قائمة المقالات
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">محتوى المقال *</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={15}
                required
              />
              <p className="text-xs text-muted-foreground">
                يمكنك استخدام صيغة Markdown لتنسيق المحتوى
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">التصنيف</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="published_at">تاريخ النشر</Label>
                <Input
                  id="published_at"
                  name="published_at"
                  type="datetime-local"
                  value={formData.published_at}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">الكاتب</Label>
              <Input
                id="author"
                name="author"
                value={formData.author || 'خبير الكريبتو'}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">صورة المقال</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image')?.click()}
                >
                  <ImageIcon className="ml-2 h-4 w-4" />
                  {imageFile ? 'تغيير الصورة' : 'اختيار صورة'}
                </Button>
                {(imageFile || formData.image_url) && (
                  <span className="text-sm text-muted-foreground">
                    {imageFile ? imageFile.name : 'الصورة الحالية'}
                  </span>
                )}
              </div>
              {imagePreview && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-1">معاينة الصورة:</p>
                  <img
                    src={imagePreview}
                    alt="معاينة"
                    className="max-w-xs max-h-40 rounded-md object-cover"
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/blog')}
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
                  {isEditMode ? 'تحديث المقال' : 'نشر المقال'}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default BlogPostForm;
