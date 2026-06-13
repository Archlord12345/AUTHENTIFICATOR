import React from 'react';
import { Shield, Code, ArrowRight, CheckCircle, Lock, Zap } from 'lucide-react';

const Login = () => {
  const serviceUrl = window.location.origin;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gray-50">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Authentification Unifiée pour vos <span className="text-blue-600">Ecosystèmes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Le service d'authentification centralisé qui permet à vos applications de partager une session utilisateur sécurisée via Google et GitHub.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#docs" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition">
                Documentation Technique
              </a>
              <a href="/admin" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition">
                Accéder au Panel Admin
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Sécurisé par Design</h3>
              <p className="text-gray-600">Utilise les protocoles OAuth2 et JWT standards de l'industrie pour garantir la protection des données.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Intégration Rapide</h3>
              <p className="text-gray-600">Une simple redirection suffit pour connecter vos applications au service.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Multi-Plateforme</h3>
              <p className="text-gray-600">Fonctionne avec n'importe quel framework web : React, Vue, Angular, ou même du JS pur.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="docs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Guide d'Intégration</h2>
            <p className="text-gray-600 mt-4">Suivez ces étapes pour connecter votre application en moins de 5 minutes.</p>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-6">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4">Initialiser la redirection</h3>
                  <p className="text-gray-600 mb-6">Redirigez l'utilisateur vers notre API d'authentification avec les paramètres requis.</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gray-900 rounded-xl">
                      <p className="text-xs text-blue-400 font-mono mb-2">// Endpoint Google</p>
                      <code className="text-white text-xs break-all">
                        {serviceUrl}/api/auth/google?app=VOTRE_APP&redirect_uri=URL_CALLBACK
                      </code>
                    </div>
                    <div className="p-4 bg-gray-900 rounded-xl">
                      <p className="text-xs text-purple-400 font-mono mb-2">// Endpoint GitHub</p>
                      <code className="text-white text-xs break-all">
                        {serviceUrl}/api/auth/github?app=VOTRE_APP&redirect_uri=URL_CALLBACK
                      </code>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                    <p className="text-sm text-blue-800 font-medium">Paramètres :</p>
                    <ul className="mt-2 text-sm text-blue-700 space-y-1">
                      <li><strong>app</strong> : Le nom public de votre application (affiché dans l'admin).</li>
                      <li><strong>redirect_uri</strong> : L'URL exacte de votre application où l'utilisateur doit être renvoyé.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-6">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4">Traiter le Token JWT</h3>
                  <p className="text-gray-600 mb-6">Après succès, nous renvoyons l'utilisateur vers votre application avec un Token JWT dans l'URL.</p>
                  
                  <div className="bg-gray-900 rounded-xl p-6 mb-6">
                    <p className="text-xs text-gray-400 font-mono mb-4">// Exemple d'URL de retour</p>
                    <code className="text-green-400 text-xs break-all">
                      https://mon-app.com/callback?status=success&app=VOTRE_APP&token=eyJhbGciOiJIUzI1...
                    </code>
                  </div>

                  <div className="bg-amber-50 border-l-4 border-amber-600 p-4">
                    <p className="text-sm text-amber-800 font-medium italic flex items-center">
                      <Lock size={16} className="mr-2" /> Note de Sécurité
                    </p>
                    <p className="mt-2 text-sm text-amber-700">
                      Le token JWT est signé. Vous devez le stocker dans un cookie sécurisé ou dans le localStorage de votre application pour maintenir la session.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start gap-6">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4">Extraire les données</h3>
                  <p className="text-gray-600 mb-6">Décodez le JWT (Base64) pour obtenir les informations de l'utilisateur sans appel API supplémentaire.</p>
                  
                  <div className="bg-gray-900 rounded-xl p-6">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`// Payload du JWT
{
  "id": "clx...",
  "email": "user@gmail.com",
  "name": "Jean Dupont",
  "app": "MonApp",
  "iat": 1718294400,
  "exp": 1718298000
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
      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-gray-500 text-sm">
          © 2026 Authentifictor Service. Propulsé par Vercel & Neon.
        </p>
      </footer>
    </div>
  );
};

export default Login;
