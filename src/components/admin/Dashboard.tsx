
import React from 'react';
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
  // Mock data for frontend-only mode
  const services = 5;
  const blogPosts = 3;
  const requests = 7;
  const pendingRequests = 2;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">لوحة التحكم</h2>
        <p className="text-muted-foreground">نظرة عامة على موقعك والإحصائيات.</p>
        <p className="text-sm text-amber-500 mt-2">وضع الواجهة الأمامية فقط - البيانات وهمية</p>
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
            <CardDescription>وضع الواجهة الأمامية فقط - لا يوجد اتصال بقاعدة البيانات</CardDescription>
          </CardHeader>
          <CardContent>
            <p>هذا نموذج لواجهة المستخدم فقط بدون اتصال بالخلفية:</p>
            <ul className="list-disc mr-6 mt-2 space-y-1">
              <li>جميع البيانات المعروضة هي بيانات وهمية للعرض فقط</li>
              <li>وظائف تسجيل الدخول وإدارة المستخدمين معطلة</li>
              <li>لا يتم حفظ أي تغييرات تقوم بها</li>
              <li>يمكنك استعراض واجهة المستخدم فقط</li>
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
              <div className="rounded-md bg-amber-500/10 p-3 text-amber-500">
                <p className="font-medium">وضع الواجهة الأمامية فقط - لا يتم حفظ أي تغييرات</p>
              </div>
              <div className="rounded-md bg-blue-500/10 p-3 text-blue-500">
                <p className="font-medium">يمكنك استعراض التصميم والواجهة فقط</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
