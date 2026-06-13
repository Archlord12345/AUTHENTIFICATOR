import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Users, Activity, ArrowLeft, RefreshCw, ExternalLink, CheckCircle, XCircle,
  Clock, Mail, Shield, BarChart3, TrendingUp,
  Files, GitBranch, Settings, User, ChevronDown, ChevronRight,
  FileCode, Terminal, Braces
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(true);

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
    <div className="h-screen flex flex-col bg-[#050b18] text-slate-100 overflow-hidden font-sans select-none">
      
      {/* Main IDE Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 1. Activity Bar */}
        <div className="w-14 bg-[#030710] border-r border-blue-950/40 flex flex-col items-center justify-between py-4 flex-shrink-0">
          <div className="flex flex-col items-center gap-6 w-full">
            {/* Logo */}
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/10 mb-2">
              <Shield className="w-4.5 h-4.5 text-white" />
            </div>
            
            {/* Action Icons */}
            <button 
              onClick={() => setExplorerOpen(!explorerOpen)}
              className={`p-2.5 rounded-xl transition-colors relative group ${explorerOpen ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-slate-200'}`}
              title="Explorateur de fichiers"
            >
              <Files className="w-5.5 h-5.5" />
              <span className="absolute left-14 top-2 bg-slate-900 text-xs font-semibold px-2 py-1 rounded shadow-md border border-slate-800 hidden group-hover:block whitespace-nowrap z-50">Explorateur</span>
            </button>
            
            <Link 
              to="/" 
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-200 transition-colors relative group"
              title="Documentation API"
            >
              <FileCode className="w-5.5 h-5.5" />
              <span className="absolute left-14 top-2 bg-slate-900 text-xs font-semibold px-2 py-1 rounded shadow-md border border-slate-800 hidden group-hover:block whitespace-nowrap z-50">API Docs</span>
            </Link>
            
            <button 
              className="p-2.5 rounded-xl text-blue-400 bg-blue-500/10 transition-colors relative group"
              title="Console Admin"
            >
              <Terminal className="w-5.5 h-5.5" />
              <span className="absolute left-14 top-2 bg-slate-900 text-xs font-semibold px-2 py-1 rounded shadow-md border border-slate-800 hidden group-hover:block whitespace-nowrap z-50">Admin Console</span>
            </button>
          </div>
          
          {/* Bottom Icons */}
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="p-2.5 text-slate-500 hover:text-slate-350 cursor-pointer">
              <User className="w-5 h-5" />
            </div>
            <div className="p-2.5 text-slate-500 hover:text-slate-350 cursor-pointer">
              <Settings className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 2. File Explorer Sidebar */}
        {explorerOpen && (
          <div className="w-60 bg-[#090f1d] border-r border-blue-950/20 flex flex-col flex-shrink-0 select-none">
            <div className="px-4 py-3 border-b border-blue-950/10 flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">Explorateur</span>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 font-bold px-1.5 py-0.5 rounded border border-blue-500/20">WORKSPACE</span>
            </div>
            
            {/* File Tree */}
            <div className="flex-1 overflow-y-auto p-2 text-sm">
              <div className="mb-2">
                {/* Project Root Folder */}
                <div className="flex items-center gap-1.5 px-2 py-1.5 text-slate-300 font-bold text-xs">
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                  <span className="tracking-wide">AUTHENTIFICTOR-API</span>
                </div>
                
                {/* Folders */}
                <div className="pl-4 space-y-1">
                  <div className="flex items-center gap-1.5 px-2 py-1 text-slate-400 font-semibold text-xs">
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    <span>src</span>
                  </div>
                  
                  <div className="pl-3 space-y-1">
                    <div className="flex items-center gap-1.5 px-2 py-1 text-slate-400 font-semibold text-xs">
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      <span>pages</span>
                    </div>
                    
                    {/* Files */}
                    <div className="pl-3 space-y-0.5">
                      <Link 
                        to="/" 
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium cursor-pointer"
                      >
                        <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                        <span>Login.jsx</span>
                      </Link>
                      <Link 
                        to="/admin" 
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/10 text-xs font-medium cursor-pointer"
                      >
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span>AdminDashboard.jsx</span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* index.css */}
                  <div className="pl-3.5">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium">
                      <Braces className="w-3.5 h-3.5 text-blue-400" />
                      <span>index.css</span>
                    </div>
                  </div>
                </div>

                {/* schema.prisma */}
                <div className="pl-4 mt-2">
                  <Link 
                    to="/" 
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium"
                  >
                    <Code className="w-3.5 h-3.5 text-yellow-500" />
                    <span>schema.prisma</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Main Editor Window */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#050b18] relative">
          
          {/* Background glow blobs */}
          <div className="glow-blob bg-blue-600/10 top-[20%] left-[10%]"></div>
          <div className="glow-blob bg-cyan-500/5 bottom-[20%] right-[10%]"></div>

          {/* IDE Tabs Bar */}
          <div className="h-10 bg-[#090f1d] border-b border-blue-950/20 flex items-center justify-between px-2 select-none flex-shrink-0">
            <div className="flex items-center gap-1">
              <Link 
                to="/" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800/20 rounded-t-lg text-xs font-medium text-slate-400 hover:text-slate-355 border-r border-blue-950/10"
              >
                <Shield className="w-3.5 h-3.5 text-slate-500" />
                <span>Login.jsx</span>
              </Link>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#050b18] border-t-2 border-blue-500 rounded-t-lg text-xs font-semibold text-blue-300 border-r border-blue-950/20">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>AdminDashboard.jsx</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-1"></span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-slate-500 text-xs font-mono mr-2">
              <span className="bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/30 text-slate-400">PREVIEW MODE</span>
            </div>
          </div>

          {/* Breadcrumbs Bar */}
          <div className="px-6 py-2 bg-[#050c1b]/60 border-b border-blue-950/10 text-xs text-slate-400 flex items-center gap-1.5 select-none flex-shrink-0 font-mono">
            <span>src</span>
            <span>&gt;</span>
            <span>pages</span>
            <span>&gt;</span>
            <span className="text-blue-300 font-semibold">AdminDashboard.jsx</span>
          </div>

          {/* Editor Header Row with title and Refresh Button */}
          <div className="px-6 py-4 bg-[#050b18] border-b border-blue-950/10 flex items-center justify-between select-none flex-shrink-0 relative z-20">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Link>
              <div className="h-4 w-px bg-blue-950/40" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-md shadow-blue-600/10">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-sm text-slate-100 tracking-tight">Console d'administration</span>
              </div>
            </div>
            
            <button
              onClick={() => fetchStats(true)}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 rounded-xl transition-all duration-200 shadow-sm disabled:opacity-50 active:scale-95 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${refreshing ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
          </div>

          {/* Editor Scrollable Panel (Active page content is loaded here) */}
          <div className="flex-1 overflow-y-auto relative z-10 p-6 scroll-smooth">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin mb-4"></div>
                <p className="text-slate-400 font-medium animate-pulse text-xs">Chargement des données...</p>
              </div>
            ) : (
              <>
                {/* Stats Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5 mb-6">
                  <div className="glass-card p-5 rounded-2xl group hover:border-slate-700/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-xs font-bold text-slate-400">Utilisateurs</span>
                      <div className="w-8.5 h-8.5 bg-blue-500/10 text-blue-450 border border-blue-500/20 rounded-xl flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-400" />
                      </div>
                    </div>
                    <div className="text-2xl font-extrabold text-white tracking-tight">
                      {stats?.totalUsers || 0}
                    </div>
                  </div>

                  <div className="glass-card p-5 rounded-2xl group hover:border-slate-700/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-xs font-bold text-slate-400">Connexions</span>
                      <div className="w-8.5 h-8.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl flex items-center justify-center">
                        <Activity className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-2xl font-extrabold text-white tracking-tight">
                      {stats?.totalLogins || 0}
                    </div>
                  </div>

                  <div className="glass-card p-5 rounded-2xl group hover:border-slate-700/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-xs font-bold text-slate-400">Google Auth</span>
                      <div className="w-8.5 h-8.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                        {getProviderIcon('google')}
                      </div>
                    </div>
                    <div className="text-2xl font-extrabold text-white tracking-tight">
                      {stats?.loginsByProvider?.find(p => p.provider === 'google')?._count?.id || 0}
                    </div>
                  </div>

                  <div className="glass-card p-5 rounded-2xl group hover:border-slate-700/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-xs font-bold text-slate-400">GitHub Auth</span>
                      <div className="w-8.5 h-8.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                        {getProviderIcon('github')}
                      </div>
                    </div>
                    <div className="text-2xl font-extrabold text-white tracking-tight">
                      {stats?.loginsByProvider?.find(p => p.provider === 'github')?._count?.id || 0}
                    </div>
                  </div>
                </div>

                {/* Test Section Card */}
                <div className="glass-card p-6.5 rounded-2xl mb-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <h2 className="font-bold text-base text-slate-100">Zone de test OAuth2</h2>
                  </div>
                  <p className="text-xs text-slate-400 mb-5 max-w-xl leading-relaxed">
                    Testez instantanément les flux de redirection OAuth avant de coder leur intégration dans vos propres applications.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <a
                      href={`/api/auth/google?app=AdminTest&redirect_uri=${window.location.origin}/admin`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        {getProviderIcon('google')}
                        <span>Tester avec Google</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </a>
                    <a
                      href={`/api/auth/github?app=AdminTest&redirect_uri=${window.location.origin}/admin`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700/50 shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        {getProviderIcon('github')}
                        <span>Tester avec GitHub</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Apps Stats Card */}
                {stats?.loginsByApp?.length > 0 && (
                  <div className="glass-card p-6.5 rounded-2xl mb-6">
                    <div className="flex items-center gap-2 mb-5">
                      <BarChart3 className="w-5 h-5 text-blue-400" />
                      <h2 className="font-bold text-base text-slate-100">Connexions par application</h2>
                    </div>
                    <div className="space-y-4">
                      {stats.loginsByApp.map((item) => {
                        const maxCount = Math.max(...stats.loginsByApp.map(i => i._count.id));
                        const percentage = maxCount > 0 ? (item._count.id / maxCount) * 100 : 0;
                        return (
                          <div key={item.appName} className="group">
                            <div className="flex items-center justify-between text-xs mb-1.5">
                              <span className="font-bold text-slate-350">{item.appName}</span>
                              <span className="font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md text-[10px] border border-slate-700/30">{item._count.id}</span>
                            </div>
                            <div className="h-2 bg-slate-900/60 rounded-full overflow-hidden border border-blue-900/10 p-0.5">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.3)] transition-all duration-500 group-hover:from-blue-400 group-hover:to-cyan-400"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Recent Logins Table Card */}
                <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-blue-950/20">
                  <div className="flex items-center gap-2.5 p-5 border-b border-blue-950/20 bg-slate-900/10">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <h2 className="font-bold text-base text-slate-100">Connexions récentes</h2>
                  </div>

                  {stats?.recentLogins?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-slate-900/30">
                            <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3 border-b border-blue-950/20">
                              Utilisateur
                            </th>
                            <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3 border-b border-blue-950/20">
                              App
                            </th>
                            <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3 border-b border-blue-950/20">
                              Provider
                            </th>
                            <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3 border-b border-blue-950/20">
                              Statut
                            </th>
                            <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-3 border-b border-blue-950/20">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-950/20">
                          {stats.recentLogins.map((login) => (
                            <tr key={login.id} className="hover:bg-slate-900/15 transition-colors">
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-2.5">
                                  {login.user?.avatar ? (
                                    <img
                                      src={login.user.avatar}
                                      alt=""
                                      className="w-8 h-8 rounded-full border border-blue-900/20 shadow-sm"
                                    />
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-blue-900/20 flex items-center justify-center text-slate-400">
                                      <Mail className="w-4 h-4" />
                                    </div>
                                  )}
                                  <div>
                                    <div className="text-xs font-bold text-slate-100">
                                      {login.user?.name || 'N/A'}
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-0.5">
                                      {login.user?.email || 'N/A'}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-3.5">
                                <span className="inline-flex px-2 py-0.5 text-[10px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded">
                                  {login.appName}
                                </span>
                              </td>
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center border border-blue-900/10">
                                    {getProviderIcon(login.provider)}
                                  </span>
                                  <span className="text-xs font-medium text-slate-300 capitalize">{login.provider}</span>
                                </div>
                              </td>
                              <td className="px-5 py-3.5">
                                {login.status === 'success' ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded">
                                    <span className="w-1.2 h-1.2 rounded-full bg-emerald-400 animate-ping"></span>
                                    Succès
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold bg-rose-500/10 text-rose-450 border border-rose-500/25 rounded">
                                    <span className="w-1.2 h-1.2 rounded-full bg-rose-400"></span>
                                    Échec
                                  </span>
                                )}
                              </td>
                              <td className="px-5 py-3.5 text-xs font-medium text-slate-400">
                                {formatDate(login.timestamp)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Activity className="w-10 h-10 text-slate-650 mx-auto mb-3 animate-pulse" />
                      <p className="text-slate-300 font-bold text-sm">Aucune connexion enregistrée</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                        Utilisez les boutons de test de la zone ci-dessus pour simuler une authentification.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 4. IDE Status Bar */}
      <div className="h-6 bg-[#005fb8] text-white flex items-center justify-between px-3 text-xs flex-shrink-0 font-mono select-none relative z-50">
        <div className="flex items-center gap-3">
          <div className="bg-[#007acc] px-2 h-full flex items-center gap-1 font-bold">
            <GitBranch className="w-3.5 h-3.5" />
            <span>main</span>
          </div>
          <div className="flex items-center gap-1 text-slate-100">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Vercel: Connecté</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-200">
          <span>Ln 320, Col 1</span>
          <span>Espaces: 2</span>
          <span>UTF-8</span>
          <span className="bg-[#007acc] px-2 h-full flex items-center font-bold">React (JSX)</span>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;