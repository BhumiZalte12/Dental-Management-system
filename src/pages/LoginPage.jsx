import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect logged-in users to their appropriate dashboards
    if (user) {
      const path = user.role === 'Admin' ? '/admin/dashboard' : '/me';
      navigate(path, { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = (email, password, role) => {
    const success = login(email, password, role);
    if (success) {
      alert('Login successful!');
      const path = role === 'Admin' ? '/admin/dashboard' : '/me';
      navigate(path, { replace: true });
    } else {
      setError('Invalid credentials or role mismatch.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Dental Center Login</h1>
        <LoginForm onSubmit={handleLogin} error={error} />
      </div>
    </div>
  );
}
