
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { GlobalSetting, HomepageContent } from '@/types/database.types';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface SiteInfo {
  name: string;
  logo: string;
  social: {
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

interface FooterInfo {
  text: string;
  links: Array<{
    title: string;
    url: string;
  }>;
}

interface Visibility {
  hero: boolean;
  services: boolean;
  blog: boolean;
  cta: boolean;
}

const SettingsForm: React.FC = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    name: '',
    logo: '',
    social: {
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: '',
    },
  });
  
  const [footerInfo, setFooterInfo] = useState<FooterInfo>({
    text: '',
    links: [],
  });
  
  const [visibility, setVisibility] = useState<Visibility>({
    hero: true,
    services: true,
    blog: true,
    cta: true,
  });
  
  const [homeContent, setHomeContent] = useState<Record<string, HomepageContent>>({
    hero: {
      id: '',
      key: 'hero',
      title: '',
      subtitle: '',
      visible: true,
      updated_at: '',
    },
    services: {
      id: '',
      key: 'services',
      title: '',
      subtitle: '',
      visible: true,
      updated_at: '',
    },
    cta: {
      id: '',
      key: 'cta',
      title: '',
      subtitle: '',
      visible: true,
      updated_at: '',
    },
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        
        // Fetch global settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('global_settings')
          .select('*');

        if (settingsError) {
          throw settingsError;
        }

        // Process global settings
        if (settingsData) {
          const settings = settingsData as GlobalSetting[];
          
          // Site info
          const siteInfoSetting = settings.find(s => s.key === 'site_info');
          if (siteInfoSetting && siteInfoSetting.value) {
            setSiteInfo(siteInfoSetting.value as SiteInfo);
          }
          
          // Footer info
          const footerSetting = settings.find(s => s.key === 'footer');
          if (footerSetting && footerSetting.value) {
            setFooterInfo(footerSetting.value as FooterInfo);
          }
          
          // Visibility
          const visibilitySetting = settings.find(s => s.key === 'visibility');
          if (visibilitySetting && visibilitySetting.value) {
            setVisibility(visibilitySetting.value as Visibility);
          }
        }
        
        // Fetch homepage content
        const { data: contentData, error: contentError } = await supabase
          .from('homepage_content')
          .select('*');

        if (contentError) {
          throw contentError;
        }

        // Process homepage content
        if (contentData) {
          const contents = contentData as HomepageContent[];
          const contentMap: Record<string, HomepageContent> = {};
          
          contents.forEach(content => {
            contentMap[content.key] = content;
          });
          
          setHomeContent(contentMap);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast({
          title: 'خطأ في جلب الإعدادات',
          description: 'حدث خطأ أثناء محاولة جلب إعدادات الموقع، يرجى المحاولة مرة أخرى.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSiteInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('social.')) {
      const socialKey = name.split('.')[1];
      setSiteInfo(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [socialKey]: value,
        },
      }));
    } else {
      setSiteInfo(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFooterInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFooterInfo(prev => ({
      ...prev,
      text: value,
    }));
  };

  const handleVisibilityChange = (key: keyof Visibility, checked: boolean) => {
    setVisibility(prev => ({
      ...prev,
      [key]: checked,
    }));
    
    // Also update the homepage content visibility
    if (homeContent[key]) {
      setHomeContent(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          visible: checked,
        },
      }));
    }
  };

  const handleHomeContentChange = (key: string, field: string, value: string) => {
    setHomeContent(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const saveSettings = async () => {
    try {
      setIsSaving(true);
      
      // Save site info
      const { error: siteInfoError } = await supabase
        .from('global_settings')
        .update({ value: siteInfo })
        .eq('key', 'site_info');

      if (siteInfoError) {
        throw siteInfoError;
      }
      
      // Save footer info
      const { error: footerError } = await supabase
        .from('global_settings')
        .update({ value: footerInfo })
        .eq('key', 'footer');

      if (footerError) {
        throw footerError;
      }
      
      // Save visibility
      const { error: visibilityError } = await supabase
        .from('global_settings')
        .update({ value: visibility })
        .eq('key', 'visibility');

      if (visibilityError) {
        throw visibilityError;
      }
      
      // Save homepage content
      const homeContentUpdates = Object.values(homeContent).map(content => ({
        id: content.id,
        title: content.title,
        subtitle: content.subtitle,
        visible: content.visible,
      }));
      
      for (const content of homeContentUpdates) {
        const { error: contentError } = await supabase
          .from('homepage_content')
          .update({
            title: content.title,
            subtitle: content.subtitle,
            visible: content.visible,
          })
          .eq('id', content.id);

        if (contentError) {
          throw contentError;
        }
      }
      
      toast({
        title: 'تم حفظ الإعدادات بنجاح',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'خطأ في حفظ الإعدادات',
        description: 'حدث خطأ أثناء محاولة حفظ إعدادات الموقع، يرجى المحاولة مرة أخرى.',
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">إعدادات الموقع</h2>
        <Button onClick={saveSettings} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري الحفظ...
            </>
          ) : (
            <>
              <Save className="ml-2 h-4 w-4" />
              حفظ الإعدادات
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">معلومات الموقع</TabsTrigger>
          <TabsTrigger value="home">الصفحة الرئيسية</TabsTrigger>
          <TabsTrigger value="footer">تذييل الصفحة</TabsTrigger>
          <TabsTrigger value="visibility">إخفاء/إظهار الأقسام</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>معلومات الموقع</CardTitle>
              <CardDescription>
                المعلومات الأساسية للموقع وحسابات التواصل الاجتماعي
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">اسم الموقع</Label>
                <Input
                  id="site-name"
                  name="name"
                  value={siteInfo.name}
                  onChange={handleSiteInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-logo">شعار الموقع</Label>
                <Input
                  id="site-logo"
                  name="logo"
                  value={siteInfo.logo}
                  onChange={handleSiteInfoChange}
                  placeholder="اسم رمز Lucide أو المسار للصورة"
                />
                <p className="text-xs text-muted-foreground">
                  يمكنك استخدام اسم رمز من مكتبة Lucide أو رابط صورة
                </p>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">حسابات التواصل الاجتماعي</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter">تويتر</Label>
                    <Input
                      id="twitter"
                      name="social.twitter"
                      value={siteInfo.social.twitter}
                      onChange={handleSiteInfoChange}
                      placeholder="رابط حساب تويتر"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">فيسبوك</Label>
                    <Input
                      id="facebook"
                      name="social.facebook"
                      value={siteInfo.social.facebook}
                      onChange={handleSiteInfoChange}
                      placeholder="رابط صفحة فيسبوك"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">انستغرام</Label>
                    <Input
                      id="instagram"
                      name="social.instagram"
                      value={siteInfo.social.instagram}
                      onChange={handleSiteInfoChange}
                      placeholder="رابط حساب انستغرام"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">لينكد إن</Label>
                    <Input
                      id="linkedin"
                      name="social.linkedin"
                      value={siteInfo.social.linkedin}
                      onChange={handleSiteInfoChange}
                      placeholder="رابط حساب لينكد إن"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="home">
          <Card>
            <CardHeader>
              <CardTitle>محتوى الصفحة الرئيسية</CardTitle>
              <CardDescription>
                تعديل محتوى الأقسام في الصفحة الرئيسية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">قسم الترحيب (Hero)</h3>
                <div className="space-y-2">
                  <Label htmlFor="hero-title">العنوان الرئيسي</Label>
                  <Input
                    id="hero-title"
                    value={homeContent.hero?.title || ''}
                    onChange={(e) => handleHomeContentChange('hero', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-subtitle">العنوان الفرعي</Label>
                  <Textarea
                    id="hero-subtitle"
                    value={homeContent.hero?.subtitle || ''}
                    onChange={(e) => handleHomeContentChange('hero', 'subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <h3 className="text-lg font-medium">قسم الخدمات</h3>
                <div className="space-y-2">
                  <Label htmlFor="services-title">عنوان القسم</Label>
                  <Input
                    id="services-title"
                    value={homeContent.services?.title || ''}
                    onChange={(e) => handleHomeContentChange('services', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="services-subtitle">وصف القسم</Label>
                  <Textarea
                    id="services-subtitle"
                    value={homeContent.services?.subtitle || ''}
                    onChange={(e) => handleHomeContentChange('services', 'subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <h3 className="text-lg font-medium">قسم الدعوة للتواصل (CTA)</h3>
                <div className="space-y-2">
                  <Label htmlFor="cta-title">عنوان القسم</Label>
                  <Input
                    id="cta-title"
                    value={homeContent.cta?.title || ''}
                    onChange={(e) => handleHomeContentChange('cta', 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta-subtitle">وصف القسم</Label>
                  <Textarea
                    id="cta-subtitle"
                    value={homeContent.cta?.subtitle || ''}
                    onChange={(e) => handleHomeContentChange('cta', 'subtitle', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>تذييل الصفحة</CardTitle>
              <CardDescription>
                نص حقوق النشر ومعلومات أخرى في تذييل الصفحة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="footer-text">نص تذييل الصفحة</Label>
                <Textarea
                  id="footer-text"
                  value={footerInfo.text}
                  onChange={handleFooterInfoChange}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  يظهر هذا النص في أسفل جميع صفحات الموقع
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="visibility">
          <Card>
            <CardHeader>
              <CardTitle>إخفاء/إظهار الأقسام</CardTitle>
              <CardDescription>
                التحكم في ظهور الأقسام المختلفة في الموقع
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-hero" className="text-base">قسم الترحيب (Hero)</Label>
                    <p className="text-sm text-muted-foreground">
                      القسم الرئيسي في أعلى الصفحة الرئيسية
                    </p>
                  </div>
                  <Switch
                    id="show-hero"
                    checked={visibility.hero}
                    onCheckedChange={(checked) => handleVisibilityChange('hero', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-services" className="text-base">قسم الخدمات</Label>
                    <p className="text-sm text-muted-foreground">
                      قسم يعرض الخدمات المميزة في الصفحة الرئيسية
                    </p>
                  </div>
                  <Switch
                    id="show-services"
                    checked={visibility.services}
                    onCheckedChange={(checked) => handleVisibilityChange('services', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-blog" className="text-base">قسم المدونة</Label>
                    <p className="text-sm text-muted-foreground">
                      قسم يعرض أحدث مقالات المدونة في الصفحة الرئيسية
                    </p>
                  </div>
                  <Switch
                    id="show-blog"
                    checked={visibility.blog}
                    onCheckedChange={(checked) => handleVisibilityChange('blog', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-cta" className="text-base">قسم الدعوة للتواصل (CTA)</Label>
                    <p className="text-sm text-muted-foreground">
                      قسم يشجع الزوار على التواصل للاستشارة
                    </p>
                  </div>
                  <Switch
                    id="show-cta"
                    checked={visibility.cta}
                    onCheckedChange={(checked) => handleVisibilityChange('cta', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end">
        <Button onClick={saveSettings} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري الحفظ...
            </>
          ) : (
            <>
              <Save className="ml-2 h-4 w-4" />
              حفظ جميع الإعدادات
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SettingsForm;
