
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ConsultationRequest } from '@/types/database.types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Trash2, CheckCircle, XCircle, Mail } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const RequestsList: React.FC = () => {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('consultation_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setRequests(data as ConsultationRequest[]);
    } catch (error) {
      console.error('Error fetching consultation requests:', error);
      toast({
        title: 'خطأ في جلب طلبات الاستشارات',
        description: 'حدث خطأ أثناء محاولة جلب طلبات الاستشارات، يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDeleteRequest = async (id: string) => {
    try {
      const { error } = await supabase.from('consultation_requests').delete().eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'تم حذف الطلب بنجاح',
      });
      
      // Update the requests list
      setRequests(requests.filter((request) => request.id !== id));
    } catch (error) {
      console.error('Error deleting consultation request:', error);
      toast({
        title: 'خطأ في حذف الطلب',
        description: 'حدث خطأ أثناء محاولة حذف الطلب، يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    }
  };

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('consultation_requests')
        .update({ status })
        .eq('id', id);

      if (error) {
        throw error;
      }

      const statusMessages = {
        pending: 'معلق',
        processed: 'تمت المعالجة',
        completed: 'مكتمل',
        cancelled: 'ملغي',
      };

      toast({
        title: `تم تحديث حالة الطلب إلى "${statusMessages[status as keyof typeof statusMessages]}"`,
      });
      
      // Update the requests list
      setRequests(
        requests.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error('Error updating request status:', error);
      toast({
        title: 'خطأ في تحديث حالة الطلب',
        description: 'حدث خطأ أثناء محاولة تحديث حالة الطلب، يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500 hover:bg-amber-600">معلق</Badge>;
      case 'processed':
        return <Badge className="bg-blue-500 hover:bg-blue-600">تمت المعالجة</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">مكتمل</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600">ملغي</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
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
        <h2 className="text-3xl font-bold">طلبات الاستشارات</h2>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">لا توجد طلبات استشارة حتى الآن</p>
        </div>
      ) : (
        <div className="rounded-md border glass-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الخدمة</TableHead>
                <TableHead>اسم العميل</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>تاريخ الطلب</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.service_name || 'غير محدد'}</TableCell>
                  <TableCell className="font-medium">{request.name}</TableCell>
                  <TableCell>
                    <a 
                      href={`mailto:${request.email}`} 
                      className="text-crypto hover:underline flex items-center"
                    >
                      <Mail className="ml-1 h-4 w-4" />
                      {request.email}
                    </a>
                  </TableCell>
                  <TableCell>{formatDate(request.created_at)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(request)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">عرض</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>تفاصيل طلب الاستشارة</DialogTitle>
                          <DialogDescription>
                            طلب مقدم بتاريخ {formatDate(selectedRequest?.created_at || '')}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedRequest && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-2">
                              <p className="text-left font-medium col-span-1">الخدمة:</p>
                              <p className="col-span-3">{selectedRequest.service_name || 'غير محدد'}</p>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                              <p className="text-left font-medium col-span-1">اسم العميل:</p>
                              <p className="col-span-3">{selectedRequest.name}</p>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                              <p className="text-left font-medium col-span-1">البريد الإلكتروني:</p>
                              <p className="col-span-3">{selectedRequest.email}</p>
                            </div>
                            {selectedRequest.phone && (
                              <div className="grid grid-cols-4 items-center gap-2">
                                <p className="text-left font-medium col-span-1">رقم الهاتف:</p>
                                <p className="col-span-3" dir="ltr">{selectedRequest.phone}</p>
                              </div>
                            )}
                            {selectedRequest.message && (
                              <div className="grid grid-cols-4 items-start gap-2">
                                <p className="text-left font-medium col-span-1">الرسالة:</p>
                                <p className="col-span-3 whitespace-pre-wrap">{selectedRequest.message}</p>
                              </div>
                            )}
                            <div className="grid grid-cols-4 items-center gap-2">
                              <p className="text-left font-medium col-span-1">الحالة:</p>
                              <div className="col-span-3">
                                <Select
                                  defaultValue={selectedRequest.status}
                                  onValueChange={(value) => updateRequestStatus(selectedRequest.id, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">معلق</SelectItem>
                                    <SelectItem value="processed">تمت المعالجة</SelectItem>
                                    <SelectItem value="completed">مكتمل</SelectItem>
                                    <SelectItem value="cancelled">ملغي</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              if (selectedRequest) {
                                window.location.href = `mailto:${selectedRequest.email}?subject=بخصوص طلب الاستشارة - ${selectedRequest.service_name || 'استشارة'}`;
                              }
                            }}
                          >
                            <Mail className="ml-2 h-4 w-4" />
                            مراسلة العميل
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateRequestStatus(request.id, 'completed')}
                      disabled={request.status === 'completed'}
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="sr-only">إكمال</span>
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
                          <AlertDialogTitle>هل أنت متأكد من حذف هذا الطلب؟</AlertDialogTitle>
                          <AlertDialogDescription>
                            لا يمكن التراجع عن هذا الإجراء. سيتم حذف الطلب نهائيًا من قاعدة البيانات.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDeleteRequest(request.id)}
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

export default RequestsList;
