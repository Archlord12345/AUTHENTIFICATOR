# Guide d'utilisation du service Authentifictor

Ce guide vous explique comment intégrer le service d'authentification centralisé (Authentifictor) dans vos autres applications pour gérer les connexions Google et GitHub.

## 1. Principe de fonctionnement
Authentifictor agit comme un serveur d'authentification unique (Identity Provider). 
1. Votre application redirige l'utilisateur vers Authentifictor.
2. L'utilisateur choisit son mode de connexion (Google ou GitHub).
3. Authentifictor redirige l'utilisateur vers votre application avec un jeton sécurisé (**JWT**).

---

## 2. Redirection vers Authentifictor
Pour initier une connexion, construisez une URL et redirigez l'utilisateur vers le service :

### Pour Google
```bash
https://authentifictor-git-main-raveliop12345s-projects.vercel.app/api/auth/google?app=NOM_VOTRE_APP&redirect_uri=URL_CALLBACK
```

### Pour GitHub
```bash
https://authentifictor-git-main-raveliop12345s-projects.vercel.app/api/auth/github?app=NOM_VOTRE_APP&redirect_uri=URL_CALLBACK
```

### Paramètres requis :
*   `app` : Le nom de votre application (pour le suivi dans le panel admin).
*   `redirect_uri` : L'URL complète de votre application où l'utilisateur sera renvoyé après une connexion réussie.
*   `email` (Optionnel pour Google) : Ajoute `&email=user@gmail.com` pour pré-remplir le formulaire de connexion.

---

## 3. Réception de la réponse (Callback)
Une fois authentifié, l'utilisateur est redirigé vers votre `redirect_uri` avec les paramètres suivants dans l'URL :

*   `status` : `success` ou `failure`
*   `app` : Le nom de votre application.
*   `token` : Un **JWT** contenant les données de l'utilisateur (id, email, nom).

**Exemple d'URL reçue par votre application :**
`https://votre-app.com/callback?status=success&app=MonApp&token=eyJhbGciOiJIUzI1...`

---

## 4. Exemple d'implémentation (React)

Voici comment gérer la connexion et la réception du token dans votre application :

### Déclencher la connexion :
```javascript
const handleLogin = (provider) => {
  const serviceUrl = "https://authentifictor-git-main-raveliop12345s-projects.vercel.app";
  const appName = "MonSuperProjet";
  const redirectUri = window.location.origin + "/callback";
  
  window.location.href = `${serviceUrl}/api/auth/${provider}?app=${appName}&redirect_uri=${redirectUri}`;
};
```

### Récupérer le token dans votre composant `/callback` :
```javascript
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const status = searchParams.get('status');
    const token = searchParams.get('token');

    if (status === 'success' && token) {
      localStorage.setItem('auth_token', token);
      navigate('/dashboard'); // Redirection après succès
    } else {
      navigate('/login-failed');
    }
  }, [searchParams, navigate]);

  return <div>Authentification en cours...</div>;
};
```

---

## 5. Sécurité et vérification
*   **Stockage :** Stockez le `token` reçu dans le `localStorage` ou un cookie HttpOnly.
*   **Vérification :** Bien que le JWT soit décodable côté client pour lire le nom/email, votre backend doit idéalement vérifier la signature du token avec votre `JWT_SECRET` pour s'assurer qu'il provient bien d'Authentifictor.
