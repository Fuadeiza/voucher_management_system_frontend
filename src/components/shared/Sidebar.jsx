import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const adminLinks = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/companies', label: 'Companies' },
    { to: '/admin/vouchers', label: 'Vouchers' },
  ];

  const attendantLinks = [
    { to: '/attendant', label: 'Dashboard' },
    { to: '/attendant/verify', label: 'Verify Voucher' },
  ];

  const links = user?.role === 'admin' ? adminLinks : attendantLinks;

  return (
    <div className="w-64 bg-gray-800 min-h-screen p-4">
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`block px-4 py-2 rounded-md ${
              location.pathname === link.to
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
