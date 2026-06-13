import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, ArrowRight, CheckCircle, Code, Zap, Lock, 
  Files, GitBranch, Settings, User, ChevronDown, ChevronRight, 
  FileCode, Terminal, HelpCircle, AlertCircle, RefreshCw, Braces
} from 'lucide-react';

const Login = () => {
  const [activeTab, setActiveTab] = useState('google');
  const [explorerOpen, setExplorerOpen] = useState(true);

  const serviceUrl = window.location.origin;

  return (
    <div className="h-screen flex flex-col bg-[#050b18] text-slate-100 overflow-hidden font-sans select-none">
      
      {/* Main IDE Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 1. Activity Bar (Leftmost VS Code style vertical bar) */}
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
            
            <a 
              href="#docs" 
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-200 transition-colors relative group"
              title="Documentation API"
            >
              <FileCode className="w-5.5 h-5.5" />
              <span className="absolute left-14 top-2 bg-slate-900 text-xs font-semibold px-2 py-1 rounded shadow-md border border-slate-800 hidden group-hover:block whitespace-nowrap z-50">API Docs</span>
            </a>
            
            <Link 
              to="/admin" 
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-200 transition-colors relative group"
              title="Console Admin"
            >
              <Terminal className="w-5.5 h-5.5" />
              <span className="absolute left-14 top-2 bg-slate-900 text-xs font-semibold px-2 py-1 rounded shadow-md border border-slate-800 hidden group-hover:block whitespace-nowrap z-50">Admin Console</span>
            </Link>
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
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/10 text-xs font-medium cursor-pointer"
                      >
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span>Login.jsx</span>
                      </Link>
                      <Link 
                        to="/admin" 
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium cursor-pointer"
                      >
                        <div className="w-2 h-2 rounded-full bg-slate-600"></div>
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
                  <a 
                    href="#docs" 
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium"
                  >
                    <Code className="w-3.5 h-3.5 text-yellow-500" />
                    <span>schema.prisma</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Main Editor Window */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#050b18] relative">
          
          {/* Background glow blobs */}
          <div className="glow-blob bg-blue-600/10 top-[10%] left-[20%]"></div>
          <div className="glow-blob bg-cyan-500/5 bottom-[20%] right-[10%]"></div>

          {/* IDE Tabs Bar */}
          <div className="h-10 bg-[#090f1d] border-b border-blue-950/20 flex items-center justify-between px-2 select-none flex-shrink-0">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#050b18] border-t-2 border-blue-500 rounded-t-lg text-xs font-semibold text-blue-300 border-r border-blue-950/20">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Login.jsx</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-1"></span>
              </div>
              <Link 
                to="/admin" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800/20 rounded-t-lg text-xs font-medium text-slate-400 hover:text-slate-350 border-r border-blue-950/10"
              >
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span>AdminDashboard.jsx</span>
              </Link>
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
            <span className="text-blue-300 font-semibold">Login.jsx</span>
          </div>

          {/* Editor Scrollable Panel (Active page content is loaded here) */}
          <div className="flex-1 overflow-y-auto relative z-10 scroll-smooth">
            
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 lg:py-24 bg-dot-grid border-b border-blue-950/20">
              <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold rounded-full mb-8 shadow-sm">
                    <Zap className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                    Plateforme d'authentification unifiée
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 tracking-tight leading-[1.15] mb-6">
                    Authentification OAuth2<br />
                    <span className="shiny-text">centralisée</span> pour vos applications
                  </h1>
                  <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
                    Connectez vos utilisateurs via Google ou GitHub. Obtenez un token JWT sécurisé en une seule redirection. Intégration simple en 5 minutes.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#docs"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 text-sm"
                    >
                      Commencer
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="#test"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white font-semibold rounded-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 text-sm"
                    >
                      Tester l'API
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-16 max-w-5xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card glass-card-hover p-6.5 rounded-2xl">
                  <div className="w-10 h-10 bg-blue-500/10 text-blue-450 border border-blue-500/20 rounded-xl flex items-center justify-center mb-5">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-base text-slate-100 mb-2.5">OAuth 2.0 Standard</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Implémentation sécurisée avec state parameter et PKCE-ready. Tokens JWT signés RS256.
                  </p>
                </div>

                <div className="glass-card glass-card-hover p-6.5 rounded-2xl">
                  <div className="w-10 h-10 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl flex items-center justify-center mb-5">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-100 mb-2.5">Intégration Simple</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Une seule URL de redirection. Pas de SDK requis. Compatible avec tous les frameworks web.
                  </p>
                </div>

                <div className="glass-card glass-card-hover p-6.5 rounded-2xl">
                  <div className="w-10 h-10 bg-blue-650/10 text-blue-400 border border-blue-500/20 rounded-xl flex items-center justify-center mb-5">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-base text-slate-100 mb-2.5">Données Privées</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Vos secrets OAuth restent sur notre serveur sécurisé. Votre application reçoit uniquement le token JWT final.
                  </p>
                </div>
              </div>
            </section>

            {/* API Test Section */}
            <section id="test" className="py-16 bg-slate-950/40 border-y border-slate-900/60 relative">
              <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-10">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight mb-3">
                    Tester l'authentification
                  </h2>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Sélectionnez un fournisseur ci-dessous pour lancer un flux OAuth de test
                  </p>
                </div>

                <div className="max-w-md mx-auto glass-card rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex border-b border-slate-800/80 bg-slate-900/30 p-1">
                    <button
                      onClick={() => setActiveTab('google')}
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                        activeTab === 'google'
                          ? 'text-white bg-slate-800 shadow-sm border border-slate-700/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Google
                    </button>
                    <button
                      onClick={() => setActiveTab('github')}
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                        activeTab === 'github'
                          ? 'text-white bg-slate-800 shadow-sm border border-slate-700/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      GitHub
                    </button>
                  </div>

                  <div className="p-6">
                    {activeTab === 'google' ? (
                      <div>
                        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                          Testez la connexion via Google OAuth. L'utilisateur sera redirigé vers l'écran de connexion sécurisé de Google.
                        </p>
                        <a
                          href={`${serviceUrl}/api/auth/google?app=TestApp&redirect_uri=${serviceUrl}/admin`}
                          className="flex items-center justify-center gap-3 w-full px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-lg shadow-white/5 text-sm"
                        >
                          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Continuer avec Google
                        </a>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                          Testez la connexion via GitHub OAuth. Idéal pour authentifier les développeurs sur votre projet.
                        </p>
                        <a
                          href={`${serviceUrl}/api/auth/github?app=TestApp&redirect_uri=${serviceUrl}/admin`}
                          className="flex items-center justify-center gap-3 w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700/50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-lg shadow-slate-950/20 text-sm"
                        >
                          <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          Continuer avec GitHub
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Documentation Section */}
            <section id="docs" className="py-16 max-w-5xl mx-auto px-6 relative">
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight mb-3">
                  Guide d'intégration
                </h2>
                <p className="text-slate-400 text-sm">
                  Trois étapes simples pour intégrer l'authentification dans votre application
                </p>
              </div>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="glass-card p-6.5 rounded-2xl relative overflow-hidden group hover:border-slate-700/60 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/25 flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-100 text-base mb-1.5">Rediriger vers Authentifictor</h3>
                      <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                        Construisez l'URL d'authentification avec vos paramètres d'application et redirigez l'utilisateur.
                      </p>

                      {/* macOS Style Terminal Card */}
                      <div className="relative rounded-xl overflow-hidden border border-blue-900/30 bg-[#020714] shadow-2xl">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#050c1f] border-b border-blue-900/20">
                          <div className="flex gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 block"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 block"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 block"></span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">Requête HTTP GET</span>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <code className="text-xs text-slate-300 font-mono whitespace-nowrap block">
                            <span className="text-cyan-400">GET</span> {serviceUrl}/api/auth/google
                            <span className="text-slate-550">?</span>
                            <span className="text-blue-400">app</span>=<span className="text-cyan-300">MonApp</span>
                            <span className="text-slate-550">&</span>
                            <span className="text-blue-400">redirect_uri</span>=<span className="text-cyan-300">https://monapp.com/callback</span>
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="glass-card p-6.5 rounded-2xl relative overflow-hidden group hover:border-slate-700/60 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/25 flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-100 text-base mb-1.5">Recevoir le callback</h3>
                      <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                        L'utilisateur revient sur votre application avec le jeton JWT joint dans les paramètres de requête.
                      </p>

                      {/* macOS Style Terminal Card */}
                      <div className="relative rounded-xl overflow-hidden border border-blue-900/30 bg-[#020714] shadow-2xl">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#050c1f] border-b border-blue-900/20">
                          <div className="flex gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 block"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 block"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 block"></span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">Callback URL</span>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <code className="text-xs text-cyan-300 font-mono whitespace-nowrap block">
                            https://monapp.com/callback
                            <span className="text-slate-550">?</span>
                            <span className="text-blue-400">status</span>=<span className="text-cyan-300">success</span>
                            <span className="text-slate-550">&</span>
                            <span className="text-blue-400">token</span>=<span className="text-blue-300">eyJhbGciOiJSUzI1NiIsIn...</span>
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="glass-card p-6.5 rounded-2xl relative overflow-hidden group hover:border-slate-700/60 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/25 flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-100 text-base mb-1.5">Décoder le jeton JWT</h3>
                      <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                        Validez et décodez localement le JWT pour extraire les informations de l'utilisateur.
                      </p>

                      {/* macOS Style Terminal Card */}
                      <div className="relative rounded-xl overflow-hidden border border-blue-900/30 bg-[#020714] shadow-2xl">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#050c1f] border-b border-blue-900/20">
                          <div className="flex gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 block"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 block"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 block"></span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">Payload JWT Décodé</span>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-xs text-slate-300 font-mono leading-relaxed">
{`{
  `}
<span className="text-cyan-300">"id"</span>{`: `}<span className="text-blue-400">"usr_abc123"</span>{`,
  `}
<span className="text-cyan-300">"email"</span>{`: `}<span className="text-blue-400">"user@example.com"</span>{`,
  `}
<span className="text-cyan-300">"name"</span>{`: `}<span className="text-blue-400">"Jean Dupont"</span>{`,
  `}
<span className="text-cyan-300">"app"</span>{`: `}<span className="text-blue-400">"MonApp"</span>
{`}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#030712]/50 border-t border-blue-950/20 py-8 relative z-10">
              <div className="max-w-5xl mx-auto px-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6.5 h-6.5 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-slate-450">Authentifictor</span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    Propulsé par Vercel & Neon Database
                  </p>
                </div>
              </div>
            </footer>

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
          <span>Ln 286, Col 1</span>
          <span>Espaces: 2</span>
          <span>UTF-8</span>
          <span className="bg-[#007acc] px-2 h-full flex items-center font-bold">React (JSX)</span>
        </div>
      </div>

    </div>
  );
};

export default Login;