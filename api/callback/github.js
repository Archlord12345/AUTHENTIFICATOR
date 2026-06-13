import axios from 'axios';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ error: 'Missing code or state' });
  }

  try {
    const { app, redirect_uri } = JSON.parse(Buffer.from(state, 'base64').toString());

    // Exchange code for access token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: process.env.NODE_ENV === 'production' 
        ? 'https://authentificator.vercel.app/api/callback/github'
        : 'http://localhost:5173/api/callback/github',
    }, {
      headers: { Accept: 'application/json' }
    });

    const { access_token } = tokenResponse.data;

    // Get user profile
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const profile = userResponse.data;

    // GitHub doesn't always provide a public email, might need to fetch it separately
    let email = profile.email;
    if (!email) {
      const emailsResponse = await axios.get('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      const primaryEmail = emailsResponse.data.find(e => e.primary && e.verified);
      email = primaryEmail ? primaryEmail.email : emailsResponse.data[0].email;
    }

    // Upsert user in DB
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name: profile.name || profile.login,
        avatar: profile.avatar_url,
      },
      create: {
        email,
        name: profile.name || profile.login,
        avatar: profile.avatar_url,
      },
    });

    // Log the login
    await prisma.loginLog.create({
      data: {
        userId: user.id,
        appName: app,
        provider: 'github',
        status: 'success',
      },
    });

    // Create JWT for the client app
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, app },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Redirect back to client app
    const finalRedirectUrl = new URL(redirect_uri);
    finalRedirectUrl.searchParams.append('status', 'success');
    finalRedirectUrl.searchParams.append('app', app);
    finalRedirectUrl.searchParams.append('token', token);

    res.redirect(finalRedirectUrl.toString());

  } catch (error) {
    console.error('GitHub Callback Error:', error);
    try {
      const { redirect_uri, app } = JSON.parse(Buffer.from(state, 'base64').toString());
      const finalRedirectUrl = new URL(redirect_uri);
      finalRedirectUrl.searchParams.append('status', 'failure');
      finalRedirectUrl.searchParams.append('app', app);
      return res.redirect(finalRedirectUrl.toString());
    } catch (e) {
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
}
