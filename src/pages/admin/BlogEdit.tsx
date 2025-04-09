
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogPostForm from '@/components/admin/blog/BlogPostForm';

const BlogEdit: React.FC = () => {
  return (
    <AdminLayout>
      <BlogPostForm />
    </AdminLayout>
  );
};

export default BlogEdit;
