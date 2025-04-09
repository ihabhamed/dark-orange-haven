
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NonAdminMessageProps {
  email?: string;
}

export const NonAdminMessage: React.FC<NonAdminMessageProps> = ({ email }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl crypto-text-gradient">حساب غير مصرح</CardTitle>
        <CardDescription>ليس لديك صلاحيات الوصول للوحة التحكم</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <UserCheck className="h-4 w-4 ml-2" />
          <AlertDescription>
            أنت مسجل الدخول كـ {email}، لكن هذا الحساب ليس لديه صلاحيات المسؤول.
            يرجى التواصل مع مسؤول الموقع للحصول على الصلاحيات المناسبة.
          </AlertDescription>
        </Alert>
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => navigate('/')}
        >
          العودة للموقع الرئيسي
        </Button>
      </CardContent>
    </Card>
  );
};
