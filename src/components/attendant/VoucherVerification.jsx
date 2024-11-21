// components/attendant/VoucherVerification.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { voucherService } from '../../services/voucher.service';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';

export const VoucherVerification = () => {
  const [code, setCode] = useState('');
  const [voucherInfo, setVoucherInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleVerify = async () => {
    if (!code) return;
    
    setLoading(true);
    setError('');
    setVoucherInfo(null);

    try {
      const response = await voucherService.verifyVoucher(code);
      setVoucherInfo(response);
    } catch (err) {
      setError('Invalid or expired voucher');
    } finally {
      setLoading(false);
    }
  };

  const handleUseVoucher = async () => {
    if (!voucherInfo || voucherInfo.status !== 'active') return;

    setLoading(true);
    try {
      await voucherService.useVoucher(code, user.id);
      setVoucherInfo(prev => ({ ...prev, status: 'used' }));
      setCode('');
    } catch (err) {
      setError('Failed to use voucher');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Verify Voucher</h1>

      <Card>
        <div className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Enter Voucher Code
            </label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter voucher code (e.g., FB-123ABC)"
              className="mt-1"
            />
          </div>

          {error && <Alert type="error" message={error} />}
          
          <Button
            onClick={handleVerify}
            disabled={loading || !code}
            className="w-full"
          >
            {loading ? 'Verifying...' : 'Verify Voucher'}
          </Button>
        </div>

        {voucherInfo && (
          <div className="mt-6 p-4 border rounded-lg">
            <h3 className="font-medium text-lg mb-4">Voucher Information</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Code:</span> {voucherInfo.code}
              </p>
              <p>
                <span className="font-medium">Status:</span>{' '}
                <span className={`px-2 py-1 rounded-full text-sm ${
                  voucherInfo.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {voucherInfo.status}
                </span>
              </p>
              <p>
                <span className="font-medium">Company:</span> {voucherInfo.company}
              </p>
              {voucherInfo.status === 'active' && (
                <Button
                  onClick={handleUseVoucher}
                  disabled={loading}
                  className="mt-4 w-full"
                >
                  Use Voucher
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};