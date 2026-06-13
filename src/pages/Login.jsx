import React, { useState, useEffect } from 'react';
import { Shield, Code, ArrowRight, Zap, Lock, Globe, Sparkles, ChevronRight, Terminal, Users } from 'lucide-react';

const Login = () => {
  const [visibleSection, setVisibleSection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setVisibleSection(1), 200);
    return () => clearTimeout(timer);
  }, []);

  const serviceUrl = "https://authentifictor-git-main-raveliop12345s-projects.vercel.app";

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-800">Authentifictor</span>
                <span className="hidden sm:inline ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">v2.0</span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <a href="#docs" className="text-slate-600 hover:text-blue-600 text-sm font-medium transition-colors px-3 py-2">
                Documentation
              </a>
              <a href="/admin" className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all-smooth shadow-lg shadow-slate-900/20">
                <Terminal className="w-4 h-4" />
                Admin Panel
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${visibleSection >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Platforme d'authentification unifiee
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Authentification centralisee
              <br />
              <span className="gradient-text">pour vos ecosystems</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Connectez toutes vos applications avec une authentification unique securisee via Google et GitHub. Integration rapide, JWT integre, dashboard admin inclus.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <a href="#docs" className="group inline-flex items-center justify-center px-8 py-4 rounded-xl gradient-primary text-white text-lg font-semibold shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 hover-lift transition-all-smooth">
                Commencer l'integration
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/admin" className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white border-2 border-slate-200 text-slate-700 text-lg font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all-smooth hover-lift">
                Voir le Dashboard
              </a>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-slate-900">2+</div>
                <div className="text-sm text-slate-500 mt-1">Providers OAuth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-slate-900">5min</div>
                <div className="text-sm text-slate-500 mt-1">Temps d'integration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-slate-900">100%</div>
                <div className="text-sm text-slate-500 mt-1">JWT Securise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Pourquoi choisir Authentifictor?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Une solution complete d'authentification centralisee, concu pour les ecosystems modernes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 - Security */}
            <div className="group glass rounded-2xl p-6 hover-lift card-shine">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Securite par design</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                OAuth2 et JWT standards de l'industrie pour une protection maximale des donnees
              </p>
            </div>

            {/* Feature 2 - Speed */}
            <div className="group glass rounded-2xl p-6 hover-lift card-shine">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Integration rapide</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Une simple redirection suffit pour connecter vos applications au service
              </p>
            </div>

            {/* Feature 3 - Multi-platform */}
            <div className="group glass rounded-2xl p-6 hover-lift card-shine">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-5 shadow-lg shadow-green-500/25 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Multi-plateforme</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Compatible avec React, Vue, Angular, ou du JavaScript pur sans framework
              </p>
            </div>

            {/* Feature 4 - Analytics */}
            <div className="group glass rounded-2xl p-6 hover-lift card-shine">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-5 shadow-lg shadow-orange-500/25 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Dashboard admin</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Suivi des connexions en temps reel et statistiques detaillees par application
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section className="py-20 sm:py-32 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Providers OAuth integres
            </h2>
            <p className="text-lg text-slate-600">
              Connectez vos utilisateurs via leurs comptes Google ou GitHub
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Google Provider */}
            <div className="group glass rounded-2xl p-8 hover-lift border border-transparent hover:border-blue-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 via-yellow-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Google OAuth</h3>
                  <span className="text-sm text-slate-500">Connexion instantanee</span>
                </div>
              </div>
              <p className="text-slate-600 mb-6">
                Authentification via compte Google avec recuperation automatique du profil utilisateur
              </p>
              <div className="flex gap-3">
                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">OAuth 2.0</span>
                <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Profil inclus</span>
              </div>
            </div>

            {/* GitHub Provider */}
            <div className="group glass rounded-2xl p-8 hover-lift border border-transparent hover:border-slate-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">GitHub OAuth</h3>
                  <span className="text-sm text-slate-500">Pour les developpeurs</span>
                </div>
              </div>
              <p className="text-slate-600 mb-6">
                Connexion via GitHub avec acces aux emails et au profil public de l'utilisateur
              </p>
              <div className="flex gap-3">
                <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">OAuth 2.0</span>
                <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">Email scope</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="docs" className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-medium mb-6">
              <Code className="w-4 h-4" />
              Guide d'integration
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Integrez en quelques minutes
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Suivez ces etapes pour connecter votre application en moins de 5 minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Step 1 */}
            <div className="group glass rounded-2xl p-6 sm:p-8 hover-lift">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/25">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Initialiser la redirection</h3>
                  <p className="text-slate-600 mb-6">
                    Redirigez l'utilisateur vers notre API d'authentification avec les parametres requis :
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative group/code">
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-blue-500 rounded text-xs text-white font-medium">Google</div>
                      <div className="bg-slate-900 rounded-xl p-4 pt-10 overflow-x-auto">
                        <code className="text-slate-300 text-xs break-all font-mono">
                          {serviceUrl}/api/auth/google?app=NOM_APP&redirect_uri=URL
                        </code>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-slate-700 rounded text-xs text-white font-medium">GitHub</div>
                      <div className="bg-slate-900 rounded-xl p-4 pt-10 overflow-x-auto">
                        <code className="text-slate-300 text-xs break-all font-mono">
                          {serviceUrl}/api/auth/github?app=NOM_APP&redirect_uri=URL
                        </code>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li><span className="font-semibold text-blue-700">app</span> — Nom de votre application</li>
                      <li><span className="font-semibold text-blue-700">redirect_uri</span> — URL de retour apres auth</li>
                      <li><span className="font-semibold text-blue-700">email</span> — (optionnel) Pre-remplit l'email</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group glass rounded-2xl p-6 sm:p-8 hover-lift">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/25">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Recevoir le token JWT</h3>
                  <p className="text-slate-600 mb-6">
                    Apres authentification, l'utilisateur est redirige vers votre URL avec le token JWT :
                  </p>

                  <div className="bg-slate-900 rounded-xl p-5 overflow-x-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-slate-400 font-mono">URL de retour</span>
                    </div>
                    <code className="text-green-400 text-xs font-mono break-all">
                      https://mon-app.com/callback?status=success&app=NOM_APP&token=eyJhbGciOiJI...
                    </code>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div className="text-sm text-amber-800">
                        <span className="font-semibold">Securite:</span> Stockez le JWT dans un cookie HttpOnly ou localStorage pour maintenir la session.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group glass rounded-2xl p-6 sm:p-8 hover-lift">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/25">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Decoder le token</h3>
                  <p className="text-slate-600 mb-6">
                    Decodez le JWT (Base64) pour obtenir les informations utilisateur :
                  </p>

                  <div className="bg-slate-900 rounded-xl p-5 overflow-x-auto">
                    <pre className="text-xs text-slate-300 font-mono">{`{
  "id": "clx...",
  "email": "utilisateur@exemple.com",
  "name": "Jean Dupont",
  "app": "MonApp",
  "iat": 1718294400,
  "exp": 1718298000
}`}</pre>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg">id — Unique identifier</span>
                    <span className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg">email — User email</span>
                    <span className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg">name — Display name</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative glass rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Pret a commencer?
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
              Connectez vos applications maintenant avec une authentification securisee et centralisee
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#docs" className="group inline-flex items-center justify-center px-8 py-4 rounded-xl gradient-primary text-white text-lg font-semibold shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 hover-lift transition-all-smooth">
                Lire la documentation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/admin" className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-900 text-white text-lg font-semibold shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover-lift transition-all-smooth">
                Admin Dashboard
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-700">Authentifictor</span>
            </div>
            <p className="text-sm text-slate-500">
              2026 Authentifictor Service. Propulse par Vercel & Neon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
