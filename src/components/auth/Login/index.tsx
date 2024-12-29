import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import LoginForm from './LoginForm';
import { LoginFormData } from './types';
import { handleLoginError } from '../../../utils/errorHandling';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      setLoading(true);
      await auth?.login(data.email, data.password);
      navigate('/');
    } catch (err) {
      setError(handleLoginError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <LoginForm onSubmit={handleSubmit} error={error} loading={loading} />
    </div>
  );
}