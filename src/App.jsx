// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './components/auth/Login';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/shared/Layout';

// Admin Components
import { Dashboard as AdminDashboard } from './components/admin/Dashboard';
import { CompanyList } from './components/admin/CompanyList';
import { VoucherManagement } from './components/admin/VoucherManagement';

// Attendant Components
import { Dashboard as AttendantDashboard } from './components/attendant/Dashboard';
import { VoucherVerification } from './components/attendant/VoucherVerification';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin']}>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/companies"
            element={
              <ProtectedRoute roles={['admin']}>
                <Layout>
                  <CompanyList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vouchers"
            element={
              <ProtectedRoute roles={['admin']}>
                <Layout>
                  <VoucherManagement />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Attendant Routes */}
          <Route
            path="/attendant"
            element={
              <ProtectedRoute roles={['attendant']}>
                <Layout>
                  <AttendantDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendant/verify"
            element={
              <ProtectedRoute roles={['attendant']}>
                <Layout>
                  <VoucherVerification />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;