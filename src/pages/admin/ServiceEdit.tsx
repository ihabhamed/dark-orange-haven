
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ServiceForm from '@/components/admin/services/ServiceForm';

const ServiceEdit: React.FC = () => {
  return (
    <AdminLayout>
      <ServiceForm />
    </AdminLayout>
  );
};

export default ServiceEdit;
