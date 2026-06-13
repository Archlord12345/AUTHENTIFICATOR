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

    // Exchange code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.NODE_ENV === 'production' 
        ? 'https://authentificator.vercel.app/api/callback/google'
        : 'http://localhost:5173/api/callback/google',
      grant_type: 'authorization_code',
    });

    const { id_token, access_token } = tokenResponse.data;
    
    // Get user info from id_token (it's a JWT) or access_token
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const profile = userInfoResponse.data;

    // Upsert user in DB
    const user = await prisma.user.upsert({
      where: { email: profile.email },
      update: {
        name: profile.name,
        avatar: profile.picture,
      },
      create: {
        email: profile.email,
        name: profile.name,
        avatar: profile.picture,
      },
    });

    // Log the login
    await prisma.loginLog.create({
      data: {
        userId: user.id,
        appName: app,
        provider: 'google',
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
    console.error('Google Callback Error:', error);
    // In case of error, we should ideally still redirect to the client app with a failure status
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
