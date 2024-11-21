// components/admin/CompanyList.jsx
import { useState, useEffect } from 'react';
import { companyService } from '../../services/company.service';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';
import { Loading } from '../shared/Loading';

export const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCompany, setNewCompany] = useState({ name: '', acronym: '' });

  const fetchCompanies = async () => {
    try {
      const response = await companyService.getCompanies();
      // Check if response is an array
      setCompanies(Array.isArray(response) ? response : []);
      setError('');
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('Failed to fetch companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    try {
      await companyService.createCompany(newCompany);
      setNewCompany({ name: '', acronym: '' });
      setError('');
      // Fetch updated list after creation
      await fetchCompanies();
    } catch (err) {
      console.error('Error creating company:', err);
      setError(err.response?.data?.detail || 'Failed to create company');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Companies</h1>
      
      <Card title="Add New Company">
        {error && <Alert type="error" message={error} />}
        <form onSubmit={handleCreateCompany} className="space-y-4">
          <Input
            label="Company Name"
            value={newCompany.name}
            onChange={(e) => setNewCompany(prev => ({...prev, name: e.target.value}))}
            required
          />
          <Input
            label="Acronym"
            value={newCompany.acronym}
            onChange={(e) => setNewCompany(prev => ({...prev, acronym: e.target.value.toUpperCase()}))}
            required
          />
          <Button type="submit">Add Company</Button>
        </form>
      </Card>

      <Card title="Company List">
        <div className="space-y-4">
          {companies.length === 0 ? (
            <p className="text-gray-500">No companies found</p>
          ) : (
            companies.map((company) => (
              <div key={company.id} className="flex justify-between items-center p-4 border rounded">
                <div>
                  <h3 className="font-medium">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.acronym}</p>
                  <p className="text-xs text-gray-400">Created: {new Date(company.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};