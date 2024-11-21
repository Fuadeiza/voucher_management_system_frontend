// components/admin/Dashboard.jsx
import { useState, useEffect } from 'react';
import { companyService } from '../../services/company.service';
import { voucherService } from '../../services/voucher.service';
import { Card } from '../ui/Card';
import { Loading } from '../shared/Loading';
import { Alert } from '../ui/Alert';

export const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCompanies: 0,
        totalVouchers: 0,
        activeVouchers: 0,
        usedVouchers: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setError('');
                // Get companies
                const companiesResponse = await companyService.getCompanies();
                const companies = Array.isArray(companiesResponse) ? companiesResponse : [];

                // Get vouchers stats
                const voucherStats = await voucherService.getVoucherStats();
                console.log('Voucher stats:', voucherStats); // Debug log

                setStats({
                    totalCompanies: companies.length,
                    totalVouchers: voucherStats.total || 0,
                    activeVouchers: voucherStats.active || 0,
                    usedVouchers: voucherStats.used || 0
                });
            } catch (err) {
                console.error('Error fetching stats:', err);
                setError('Failed to load dashboard statistics');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

            {error && (
                <Alert type="error" message={error} />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900">
                            Total Companies
                        </h3>
                        <p className="mt-2 text-3xl font-semibold text-indigo-600">
                            {stats.totalCompanies}
                        </p>
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900">
                            Total Vouchers
                        </h3>
                        <p className="mt-2 text-3xl font-semibold text-indigo-600">
                            {stats.totalVouchers}
                        </p>
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900">
                            Active Vouchers
                        </h3>
                        <p className="mt-2 text-3xl font-semibold text-green-600">
                            {stats.activeVouchers}
                        </p>
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900">
                            Used Vouchers
                        </h3>
                        <p className="mt-2 text-3xl font-semibold text-blue-600">
                            {stats.usedVouchers}
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};