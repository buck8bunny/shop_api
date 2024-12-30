import React from 'react';
import AdminUsersTable from '../components/AdminUsersTable';

const AdminPanel = () => (
  <div>
    <h1>Admin Panel</h1>

    <p>Here you can manage users and items.</p>
     <AdminUsersTable />
  </div>
);

export default AdminPanel;