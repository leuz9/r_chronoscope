import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import RegisterForm from './RegisterForm';
import { RegisterFormData } from './types';
import { handleRegisterError } from '../../../utils/errorHandling';

export default function Register() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await auth?.register(data.email, data.password);
      navigate('/');
    } catch (err) {
      setError(handleRegisterError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      <RegisterForm onSubmit={handleSubmit} error={error} loading={loading} />
    </div>
  );
}