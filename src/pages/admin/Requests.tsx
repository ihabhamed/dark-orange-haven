
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import RequestsList from '@/components/admin/requests/RequestsList';

const Requests: React.FC = () => {
  return (
    <AdminLayout>
      <RequestsList />
    </AdminLayout>
  );
};

export default Requests;
