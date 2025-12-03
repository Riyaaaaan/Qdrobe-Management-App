import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { ROUTES } from '@/shared/constants';

const Login = lazy(() => import('@/features/auth/components/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('@/features/auth/components/Register').then(m => ({ default: m.Register })));
const Dashboard = lazy(() => import('@/features/dashboard/components/Dashboard').then(m => ({ default: m.Dashboard })));
const Orders = lazy(() => import('@/features/orders/components/Orders').then(m => ({ default: m.Orders })));
const OrderDetails = lazy(() => import('@/features/orders/components/OrderDetails').then(m => ({ default: m.OrderDetails })));
const Earnings = lazy(() => import('@/features/earnings/components/Earnings').then(m => ({ default: m.Earnings })));
const Profile = lazy(() => import('@/features/profile/components/Profile').then(m => ({ default: m.Profile })));
const Navigation = lazy(() => import('@/features/navigation/components/Navigation').then(m => ({ default: m.Navigation })));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="space-y-4 w-full max-w-md p-8">
      <Skeleton className="h-8 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6 mx-auto" />
    </div>
  </div>
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* <Route path={ROUTES.LOGIN} element={<Login />} /> */}
          {/* <Route path={ROUTES.REGISTER} element={<Register />} /> */}
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ORDERS}
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.EARNINGS}
            element={
              <ProtectedRoute>
                <Earnings />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/navigation/:orderId"
            element={
              <ProtectedRoute>
                <Navigation />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

