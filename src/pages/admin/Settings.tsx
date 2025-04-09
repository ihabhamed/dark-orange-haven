
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import SettingsForm from '@/components/admin/settings/SettingsForm';

const Settings: React.FC = () => {
  return (
    <AdminLayout>
      <SettingsForm />
    </AdminLayout>
  );
};

export default Settings;
