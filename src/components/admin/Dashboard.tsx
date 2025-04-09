
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart4, Users, FileText, MessageSquare } from 'lucide-react';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}> = ({ title, value, description, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-full bg-crypto/10 p-1 text-crypto">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const [services, setServices] = useState(0);
  const [blogPosts, setBlogPosts] = useState(0);
  const [requests, setRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Count services
        const { count: servicesCount, error: servicesError } = await supabase
          .from('services')
          .select('*', { count: 'exact', head: true });

        if (servicesError) throw servicesError;
        setServices(servicesCount || 0);

        // Count blog posts
        const { count: blogCount, error: blogError } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true });

        if (blogError) throw blogError;
        setBlogPosts(blogCount || 0);

        // Count all requests
        const { count: requestsCount, error: requestsError } = await supabase
          .from('consultation_requests')
          .select('*', { count: 'exact', head: true });

        if (requestsError) throw requestsError;
        setRequests(requestsCount || 0);

        // Count pending requests
        const { count: pendingCount, error: pendingError } = await supabase
          .from('consultation_requests')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        if (pendingError) throw pendingError;
        setPendingRequests(pendingCount || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">لوحة التحكم</h2>
        <p className="text-muted-foreground">نظرة عامة على موقعك والإحصائيات.</p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="إجمالي الخدمات"
          value={services}
          description="عدد الخدمات المعروضة في الموقع"
          icon={<BarChart4 className="h-4 w-4" />}
        />
        <StatCard
          title="منشورات المدونة"
          value={blogPosts}
          description="عدد مقالات المدونة المنشورة"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title="إجمالي الطلبات"
          value={requests}
          description="عدد طلبات الاستشارات المستلمة"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="طلبات معلقة"
          value={pendingRequests}
          description="عدد الطلبات التي تنتظر المراجعة"
          icon={<MessageSquare className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>مرحبًا بك في لوحة التحكم</CardTitle>
            <CardDescription>من هنا يمكنك إدارة جميع محتويات موقعك</CardDescription>
          </CardHeader>
          <CardContent>
            <p>يمكنك من خلال لوحة التحكم:</p>
            <ul className="list-disc mr-6 mt-2 space-y-1">
              <li>إدارة الخدمات وتعديلها</li>
              <li>إضافة وتحرير مقالات المدونة</li>
              <li>متابعة طلبات الاستشارات الواردة</li>
              <li>تعديل إعدادات الموقع وتخصيصه</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ملاحظات سريعة</CardTitle>
            <CardDescription>معلومات مهمة للمسؤول</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRequests > 0 && (
                <div className="rounded-md bg-amber-500/10 p-3 text-amber-500">
                  <p className="font-medium">يوجد {pendingRequests} طلب استشارة بانتظار المراجعة</p>
                </div>
              )}
              <div className="rounded-md bg-blue-500/10 p-3 text-blue-500">
                <p className="font-medium">تذكر تحديث محتوى الموقع بانتظام لتحسين تجربة المستخدم</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
