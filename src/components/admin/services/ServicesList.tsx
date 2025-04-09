
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Service } from '@/types/database.types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, CheckCircle, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

const ServicesList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true, nullsLast: true });

      if (error) {
        throw error;
      }

      setServices(data as Service[]);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: 'خطأ في جلب الخدمات',
        description: 'حدث خطأ أثناء محاولة جلب الخدمات، يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDeleteService = async (id: string) => {
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'تم حذف الخدمة بنجاح',
      });
      
      // Update the services list
      setServices(services.filter((service) => service.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: 'خطأ في حذف الخدمة',
        description: 'حدث خطأ أثناء محاولة حذف الخدمة، يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    }
  };

  const updateFeaturedStatus = async (id: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ featured })
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: featured ? 'تم إضافة الخدمة للمميزة' : 'تم إزالة الخدمة من المميزة',
      });
      
      // Update the services list
      setServices(
        services.map((service) =>
          service.id === id ? { ...service, featured } : service
        )
      );
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast({
        title: 'خطأ في تحديث حالة الخدمة',
        description: 'حدث خطأ أثناء محاولة تحديث حالة الخدمة، يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
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
        <h2 className="text-3xl font-bold">إدارة الخدمات</h2>
        <Button asChild>
          <Link to="/admin/services/new">
            <PlusCircle className="ml-2 h-4 w-4" />
            إضافة خدمة جديدة
          </Link>
        </Button>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">لا توجد خدمات حتى الآن</p>
          <Button className="mt-4" asChild>
            <Link to="/admin/services/new">
              <PlusCircle className="ml-2 h-4 w-4" />
              إضافة خدمة جديدة
            </Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-md border glass-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العنوان</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>المدة</TableHead>
                <TableHead>مميزة</TableHead>
                <TableHead>الترتيب</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell>{service.duration || 'غير محدد'}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateFeaturedStatus(service.id, !service.featured)}
                    >
                      {service.featured ? (
                        <Badge className="bg-crypto hover:bg-crypto/80">مميزة</Badge>
                      ) : (
                        <Badge variant="outline">غير مميزة</Badge>
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>{service.display_order !== null ? service.display_order : '-'}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/services/edit/${service.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">تعديل</span>
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">حذف</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>هل أنت متأكد من حذف هذه الخدمة؟</AlertDialogTitle>
                          <AlertDialogDescription>
                            لا يمكن التراجع عن هذا الإجراء. سيتم حذف الخدمة نهائيًا من قاعدة البيانات.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            حذف
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
