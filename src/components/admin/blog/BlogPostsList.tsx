
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/database.types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, PlusCircle, Calendar } from 'lucide-react';
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

const BlogPostsList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPosts(data as BlogPost[]);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: 'خطأ في جلب المقالات',
        description: 'حدث خطأ أثناء محاولة جلب مقالات المدونة، يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (id: string) => {
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'تم حذف المقال بنجاح',
      });
      
      // Update the posts list
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: 'خطأ في حذف المقال',
        description: 'حدث خطأ أثناء محاولة حذف المقال، يرجى المحاولة مرة أخرى.',
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
    });
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
        <h2 className="text-3xl font-bold">إدارة المدونة</h2>
        <Button asChild>
          <Link to="/admin/blog/new">
            <PlusCircle className="ml-2 h-4 w-4" />
            إضافة مقال جديد
          </Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">لا توجد مقالات حتى الآن</p>
          <Button className="mt-4" asChild>
            <Link to="/admin/blog/new">
              <PlusCircle className="ml-2 h-4 w-4" />
              إضافة مقال جديد
            </Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-md border glass-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العنوان</TableHead>
                <TableHead>التصنيف</TableHead>
                <TableHead>تاريخ النشر</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    {post.category ? (
                      <Badge variant="outline">{post.category}</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Calendar className="ml-2 h-4 w-4 text-muted-foreground" />
                    {formatDate(post.published_at)}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/blog/edit/${post.id}`}>
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
                          <AlertDialogTitle>هل أنت متأكد من حذف هذا المقال؟</AlertDialogTitle>
                          <AlertDialogDescription>
                            لا يمكن التراجع عن هذا الإجراء. سيتم حذف المقال نهائيًا من قاعدة البيانات.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDeletePost(post.id)}
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

export default BlogPostsList;
