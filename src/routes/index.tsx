import { Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../components/Dashboard';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Profile from '../components/Profile';
import ActivityForm from '../components/activities/ActivityForm';
import AdminDashboard from '../components/admin/AdminDashboard';
import HealthAdvice from '../components/health/HealthAdvice';
import Worldometer from '../components/worldometer';
import PrivateRoute from '../components/auth/PrivateRoute';
import AdminRoute from '../components/auth/AdminRoute';

export const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </PrivateRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <Layout>
          <Profile />
        </Layout>
      </PrivateRoute>
    )
  },
  {
    path: '/activities',
    element: (
      <PrivateRoute>
        <Layout>
          <Activities />
        </Layout>
      </PrivateRoute>
    )
  },
  {
    path: '/activity',
    element: (
      <PrivateRoute>
        <Layout>
          <ActivityForm />
        </Layout>
      </PrivateRoute>
    )
  },
  {
    path: '/health-advice',
    element: (
      <PrivateRoute>
        <Layout>
          <HealthAdvice />
        </Layout>
      </PrivateRoute>
    )
  },
  {
    path: '/worldometer',
    element: (
      <PrivateRoute>
        <Layout>
          <Worldometer />
        </Layout>
      </PrivateRoute>
    )
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminRoute>
          <Layout>
            <AdminDashboard />
          </Layout>
        </AdminRoute>
      </PrivateRoute>
    )
  }
];