
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ServicesList from '@/components/admin/services/ServicesList';

const Services: React.FC = () => {
  return (
    <AdminLayout>
      <ServicesList />
    </AdminLayout>
  );
};

export default Services;
