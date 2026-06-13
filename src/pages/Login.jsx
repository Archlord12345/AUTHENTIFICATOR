import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, BookOpen, LayoutDashboard, CheckCircle, Code, Zap, Lock } from 'lucide-react';

const Login = () => {
  const [activeTab, setActiveTab] = useState('google');

  const serviceUrl = window.location.origin;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Authentifictor</span>
            </Link>
            <div className="flex items-center gap-4">
              <a
                href="#docs"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Documentation
              </a>
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-6">
              <Zap className="w-3.5 h-3.5" />
              Platforme d'authentification unifiee
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Authentification OAuth2 centralisee pour vos applications
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Connectez vos utilisateurs via Google ou GitHub. Obtenez un token JWT securise en une seule redirect. Integration en 5 minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#docs"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Commencer
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#test"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Tester l'API
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">OAuth 2.0 Standard</h3>
              <p className="text-sm text-gray-600">
                Implementation securisee avec state parameter et PKCE-ready. Tokens JWT signes RS256.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Integration Simple</h3>
              <p className="text-sm text-gray-600">
                Une seule URL de redirection. Pas de SDK requis. Compatible avec tous les frameworks.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Donnees Privees</h3>
              <p className="text-sm text-gray-600">
                Vos secrets OAuth restent sur notre serveur. Votre app recoit uniquement le token JWT.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* API Test Section */}
      <section id="test" className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Tester l'authentification
            </h2>
            <p className="text-gray-600">
              Cliquez sur un provider pour lancer un flow OAuth de test
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('google')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'google'
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Google
              </button>
              <button
                onClick={() => setActiveTab('github')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'github'
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                GitHub
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'google' ? (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Testez la connexion via Google OAuth. L'utilisateur sera redirige vers Google pour s'authentifier.
                  </p>
                  <a
                    href={`${serviceUrl}/api/auth/google?app=TestApp&redirect_uri=${serviceUrl}/admin`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                  <p className="text-sm text-gray-600 mb-4">
                    Testez la connexion via GitHub OAuth. Ideal pour les applications developpeurs.
                  </p>
                  <a
                    href={`${serviceUrl}/api/auth/github?app=TestApp&redirect_uri=${serviceUrl}/admin`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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

      {/* Documentation */}
      <section id="docs" className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Guide d'integration
            </h2>
            <p className="text-gray-600">
              Trois etapes pour integrer l'authentification dans votre application
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  1
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-2">Rediriger vers Authentifictor</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Construisez l'URL d'authentification et redirigez l'utilisateur.
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300 font-mono">
                      GET {serviceUrl}/api/auth/google?app=MonApp&redirect_uri=https://monapp.com/callback
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-2">Recevoir le callback</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    L'utilisateur est redirige vers votre application avec le token JWT.
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <code className="text-sm text-green-400 font-mono">
                      https://monapp.com/callback?status=success&token=eyJhbGci...
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-2">Decoder le token</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Le JWT contient les informations de l'utilisateur.
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300 font-mono">
{`{
  "id": "usr_abc123",
  "email": "user@example.com",
  "name": "Jean Dupont",
  "app": "MonApp"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-gray-600">Authentifictor</span>
            </div>
            <p className="text-sm text-gray-500">
              Powered by Vercel & Neon
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
