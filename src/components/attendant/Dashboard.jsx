import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../ui/Card';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Attendant Dashboard</h1>
      <Card>
        <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}</h2>
        <p>Use the sidebar menu to verify and process vouchers.</p>
      </Card>
    </div>
  );
};