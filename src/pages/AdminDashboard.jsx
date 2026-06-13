import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Users, Activity, ArrowLeft, RefreshCw, ExternalLink, CheckCircle, XCircle,
  Clock, Mail, Shield, BarChart3, TrendingUp
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      const response = await axios.get('/api/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getProviderIcon = (provider) => {
    if (provider === 'google') {
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Link>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Admin Dashboard</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => fetchStats(true)}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Chargement...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Utilisateurs</span>
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats?.totalUsers || 0}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Connexions</span>
                  <Activity className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats?.totalLogins || 0}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Google</span>
                  {getProviderIcon('google')}
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats?.loginsByProvider?.find(p => p.provider === 'google')?._count?.id || 0}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">GitHub</span>
                  {getProviderIcon('github')}
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats?.loginsByProvider?.find(p => p.provider === 'github')?._count?.id || 0}
                </div>
              </div>
            </div>

            {/* Test Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Zone de test</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Testez les flows OAuth avant de les integrer dans votre application.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href={`/api/auth/google?app=AdminTest&redirect_uri=${window.location.origin}/admin`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getProviderIcon('google')}
                    <span className="font-medium text-gray-900">Tester Google</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
                <a
                  href={`/api/auth/github?app=AdminTest&redirect_uri=${window.location.origin}/admin`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getProviderIcon('github')}
                    <span className="font-medium">Tester GitHub</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
              </div>
            </div>

            {/* Apps Stats */}
            {stats?.loginsByApp?.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                  <h2 className="font-semibold text-gray-900">Connexions par application</h2>
                </div>
                <div className="space-y-4">
                  {stats.loginsByApp.map((item) => {
                    const maxCount = Math.max(...stats.loginsByApp.map(i => i._count.id));
                    const percentage = maxCount > 0 ? (item._count.id / maxCount) * 100 : 0;
                    return (
                      <div key={item.appName}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">{item.appName}</span>
                          <span className="text-gray-500">{item._count.id}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent Logins */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-2 p-6 border-b border-gray-200">
                <Clock className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Connexions recentes</h2>
              </div>

              {stats?.recentLogins?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                          Utilisateur
                        </th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                          App
                        </th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                          Provider
                        </th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                          Statut
                        </th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {stats.recentLogins.map((login) => (
                        <tr key={login.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {login.user?.avatar ? (
                                <img
                                  src={login.user.avatar}
                                  alt=""
                                  className="w-8 h-8 rounded-full"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                  <Mail className="w-4 h-4 text-gray-500" />
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {login.user?.name || 'N/A'}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {login.user?.email || 'N/A'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                              {login.appName}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {getProviderIcon(login.provider)}
                              <span className="text-sm text-gray-600 capitalize">{login.provider}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {login.status === 'success' ? (
                              <span className="inline-flex items-center gap-1 text-sm text-green-700">
                                <CheckCircle className="w-4 h-4" />
                                Succes
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-sm text-red-600">
                                <XCircle className="w-4 h-4" />
                                Echec
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatDate(login.timestamp)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Activity className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Aucune connexion enregistree</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Utilisez les boutons de test ci-dessus
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;