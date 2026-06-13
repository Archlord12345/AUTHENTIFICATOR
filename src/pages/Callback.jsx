import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading } = useAuth();

  useEffect(() => {
    const status = searchParams.get('status');
    const error = searchParams.get('error');

    // Wait a bit for the AuthContext to process the token
    const timer = setTimeout(() => {
      if (status === 'success') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/?auth_error=' + encodeURIComponent(error || 'Authentication failed'), { replace: true });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <div className="animate-spin mb-4">
          <svg className="w-12 h-12 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-white text-lg">Authentification en cours...</p>
      </div>
    </div>
  );
}
