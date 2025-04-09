
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogPostsList from '@/components/admin/blog/BlogPostsList';

const Blog: React.FC = () => {
  return (
    <AdminLayout>
      <BlogPostsList />
    </AdminLayout>
  );
};

export default Blog;
