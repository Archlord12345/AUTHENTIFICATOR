import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Users, Activity, Globe, Zap, Shield, TrendingUp, Clock, BarChart3,
  ChevronRight, Play, ExternalLink, CheckCircle, XCircle, RefreshCw,
  Monitor, Smartphone, Tablet, Mail, Github, ArrowUpRight, Sparkles
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/stats');
      setStats(response.data);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const getProviderIcon = (provider) => {
    if (provider === 'google') {
      return (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
        <Github className="w-4 h-4 text-white" />
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-sm text-slate-500">Authentifictor Service</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                Derniere MAJ: {formatTime(lastRefresh)}
              </div>
              <button
                onClick={fetchStats}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Actualiser
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && !stats ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-primary animate-pulse"></div>
              <p className="text-slate-500">Chargement des donnees...</p>
            </div>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Users */}
              <div className="group glass rounded-2xl p-6 hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    Actifs
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stats?.totalUsers || 0}</div>
                <div className="text-sm text-slate-500">Utilisateurs inscrits</div>
              </div>

              {/* Total Logins */}
              <div className="group glass rounded-2xl p-6 hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    <ArrowUpRight className="w-3 h-3" />
                    +12%
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stats?.totalLogins || 0}</div>
                <div className="text-sm text-slate-500">Connexions totales</div>
              </div>

              {/* Google Users */}
              <div className="group glass rounded-2xl p-6 hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {stats?.loginsByProvider?.find(p => p.provider === 'google')?._count?.id || 0}
                </div>
                <div className="text-sm text-slate-500">Connexions Google</div>
              </div>

              {/* GitHub Users */}
              <div className="group glass rounded-2xl p-6 hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {stats?.loginsByProvider?.find(p => p.provider === 'github')?._count?.id || 0}
                </div>
                <div className="text-sm text-slate-500">Connexions GitHub</div>
              </div>
            </div>

            {/* Test Panel */}
            <div className="mb-8">
              <div className="glass rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Zone de Test API</h2>
                    <p className="text-sm text-slate-500">Testez les flows d'authentification</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => window.open(`/api/auth/google?app=AdminTest&redirect_uri=${window.location.origin}/admin`, '_blank')}
                    className="group flex items-center justify-between p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all hover-lift"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-slate-900">Google OAuth</div>
                        <div className="text-sm text-slate-500">Tester la connexion Google</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 text-blue-600" />
                      <ExternalLink className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>

                  <button
                    onClick={() => window.open(`/api/auth/github?app=AdminTest&redirect_uri=${window.location.origin}/admin`, '_blank')}
                    className="group flex items-center justify-between p-5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:from-slate-900 hover:to-slate-950 transition-all hover-lift"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Github className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-white">GitHub OAuth</div>
                        <div className="text-sm text-slate-400">Tester la connexion GitHub</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 text-white" />
                      <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Les tests s'ouvrent dans un nouvel onglet et redirigent vers cette page avec le resultat</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Apps Chart */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-slate-600" />
                    <h3 className="text-lg font-bold text-slate-900">Connexions par Application</h3>
                  </div>
                </div>
                {stats?.loginsByApp?.length > 0 ? (
                  <div className="space-y-4">
                    {stats.loginsByApp.map((item, index) => {
                      const maxCount = Math.max(...stats.loginsByApp.map(i => i._count.id));
                      const percentage = (item._count.id / maxCount) * 100;
                      const colors = ['from-blue-500 to-blue-600', 'from-cyan-500 to-cyan-600', 'from-green-500 to-green-600', 'from-orange-500 to-orange-600'];
                      const color = colors[index % colors.length];
                      return (
                        <div key={item.appName} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-700">{item.appName}</span>
                            <span className="text-slate-500">{item._count.id} connexions</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    Aucune donnee disponible
                  </div>
                )}
              </div>

              {/* Providers Breakdown */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-slate-600" />
                    <h3 className="text-lg font-bold text-slate-900">Par Provider</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {(stats?.loginsByProvider || []).map((item) => (
                    <div key={item.provider} className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                      <div className="flex items-center gap-3 mb-3">
                        {getProviderIcon(item.provider)}
                        <span className="font-medium text-slate-900 capitalize">{item.provider}</span>
                      </div>
                      <div className="text-2xl font-bold text-slate-900">{item._count.id}</div>
                      <div className="text-xs text-slate-500 mt-1">connexions</div>
                    </div>
                  ))}
                  {(!stats?.loginsByProvider || stats.loginsByProvider.length === 0) && (
                    <>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 opacity-50">
                        <div className="flex items-center gap-3 mb-3">
                          {getProviderIcon('google')}
                          <span className="font-medium text-slate-900">Google</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">0</div>
                        <div className="text-xs text-slate-500 mt-1">connexions</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 opacity-50">
                        <div className="flex items-center gap-3 mb-3">
                          {getProviderIcon('github')}
                          <span className="font-medium text-slate-900">GitHub</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">0</div>
                        <div className="text-xs text-slate-500 mt-1">connexions</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-600" />
                  <h3 className="text-lg font-bold text-slate-900">Connexions Recentes</h3>
                </div>
              </div>

              {stats?.recentLogins?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Utilisateur</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">App</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Provider</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Statut</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentLogins.map((login) => (
                        <tr key={login.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              {login.user?.avatar ? (
                                <img src={login.user.avatar} alt="" className="w-8 h-8 rounded-full" />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                                  <Mail className="w-4 h-4 text-slate-500" />
                                </div>
                              )}
                              <div>
                                <div className="font-medium text-slate-900">{login.user?.name || 'N/A'}</div>
                                <div className="text-xs text-slate-500">{login.user?.email || 'N/A'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-3 py-1 text-sm rounded-full bg-slate-100 text-slate-700">
                              {login.appName}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {getProviderIcon(login.provider)}
                          </td>
                          <td className="py-4 px-4">
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
                          <td className="py-4 px-4 text-sm text-slate-500">
                            {new Date(login.timestamp).toLocaleString('fr-FR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500">Aucune connexion enregistree</p>
                  <p className="text-sm text-slate-400 mt-2">Utilisez les boutons de test ci-dessus pour simuler une connexion</p>
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
