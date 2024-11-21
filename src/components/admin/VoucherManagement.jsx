// components/admin/VoucherManagement.jsx
import { useState, useEffect } from 'react';
import { voucherService } from '../../services/voucher.service';
import { companyService } from '../../services/company.service';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';
import { Loading } from '../shared/Loading';

export const VoucherManagement = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [voucherCount, setVoucherCount] = useState(1);
    const [vouchers, setVouchers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await companyService.getCompanies();
            setCompanies(Array.isArray(response) ? response : []);
        } catch (err) {
            setError('Failed to fetch companies');
        } finally {
            setLoading(false);
        }
    };

    const fetchCompanyVouchers = async (companyId) => {
        if (!companyId) return;
        try {
            const response = await voucherService.getVouchersByCompany(companyId);
            setVouchers(Array.isArray(response) ? response : []);
        } catch (err) {
            setError('Failed to fetch vouchers');
        }
    };

    useEffect(() => {
        if (selectedCompany) {
            fetchCompanyVouchers(selectedCompany);
        }
    }, [selectedCompany]);

    const handleCreateVoucher = async () => {
        if (!selectedCompany) {
            setError('Please select a company');
            return;
        }

        try {
            setLoading(true);
            await voucherService.createVoucher({
                company_id: selectedCompany,
                count: voucherCount
            });
            setSuccess(`Successfully created ${voucherCount} voucher(s)`);
            fetchCompanyVouchers(selectedCompany);
            setVoucherCount(1);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to create voucher');
        } finally {
            setLoading(false);
        }
    };

    const getBadgeColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'used':
                return 'bg-blue-100 text-blue-800';
            case 'invalid':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Voucher Management</h1>

            <Card title="Create Voucher">
                {error && <Alert type="error" message={error} />}
                {success && <Alert type="success" message={success} />}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Select Company
                        </label>
                        <select
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                        >
                            <option value="">Select a company</option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name} ({company.acronym})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Number of Vouchers
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            value={voucherCount}
                            onChange={(e) => setVoucherCount(Math.max(1, parseInt(e.target.value) || 1))}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        />
                    </div>

                    <Button
                        onClick={handleCreateVoucher}
                        disabled={!selectedCompany || loading}
                    >
                        {loading ? 'Creating...' : `Create ${voucherCount} Voucher${voucherCount > 1 ? 's' : ''}`}
                    </Button>
                </div>
            </Card>

            {selectedCompany && (
                <Card title="Company Vouchers">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Voucher Code
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created At
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Used At
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Used By
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {vouchers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                            No vouchers found for this company
                                        </td>
                                    </tr>
                                ) : (
                                    vouchers.map((voucher) => (
                                        <tr key={voucher.id}>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                                                {voucher.code}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeColor(voucher.status)}`}>
                                                    {voucher.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(voucher.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {voucher.used_at ? new Date(voucher.used_at).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {voucher.used_by || '-'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
};