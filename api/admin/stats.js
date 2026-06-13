import { prisma } from '../lib/prisma.js';

export default async function handler(req, res) {
  // Simple protection: only allow GET and maybe check a secret or admin email
  // In a real app, you'd verify a JWT here
  
  try {
    const totalUsers = await prisma.user.count();
    const totalLogins = await prisma.loginLog.count();
    
    const recentLogins = await prisma.loginLog.findMany({
      take: 10,
      orderBy: { timestamp: 'desc' },
      include: { user: true }
    });

    const loginsByApp = await prisma.loginLog.groupBy({
      by: ['appName'],
      _count: {
        id: true
      }
    });

    const loginsByProvider = await prisma.loginLog.groupBy({
      by: ['provider'],
      _count: {
        id: true
      }
    });

    res.status(200).json({
      totalUsers,
      totalLogins,
      recentLogins,
      loginsByApp,
      loginsByProvider
    });
  } catch (error) {
    console.error('Admin Stats Error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
