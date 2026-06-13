import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Title, Text, Metric, Grid, Col, Flex, TabGroup, TabList, Tab, TabPanels, TabPanel, BarChart } from '@tremor/react';
import { Users, Activity, Globe, Zap, Shield } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const Github = LucideIcons.Github || LucideIcons.GitHub;

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-center">Chargement des données...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de Bord Authentifictor</h1>

      {/* KPI Cards */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6 mb-8">
        <Card>
          <Flex alignItems="start">
            <Text>Utilisateurs Totaux</Text>
            <Users size={18} className="text-blue-600" />
          </Flex>
          <Metric>{stats.totalUsers}</Metric>
        </Card>
        <Card>
          <Flex alignItems="start">
            <Text>Connexions Totales</Text>
            <Activity size={18} className="text-green-600" />
          </Flex>
          <Metric>{stats.totalLogins}</Metric>
        </Card>
      </Grid>

      {/* API Tester */}
      <Card className="mb-8">
        <Flex className="mb-6">
          <Title className="flex items-center gap-2 text-orange-600">
            <Zap size={20} /> Zone de Test API
          </Title>
        </Flex>
        <Grid numItems={1} numItemsMd={2} className="gap-4">
          <button onClick={() => window.open(`/api/auth/google?app=AdminTest&redirect_uri=${window.location.origin}/admin`, '_blank')} className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2">
            <Globe size={16} /> Tester Google Auth
          </button>
          <button onClick={() => window.open(`/api/auth/github?app=AdminTest&redirect_uri=${window.location.origin}/admin`, '_blank')} className="p-4 bg-gray-900 text-white rounded-lg hover:bg-black flex items-center justify-center gap-2">
            <Github size={16} /> Tester Github Auth
          </button>
        </Grid>
      </Card>

      {/* Charts */}
      <Card>
        <Title>Activités par Application</Title>
        <BarChart
          className="mt-6"
          data={stats.loginsByApp.map(item => ({ name: item.appName, "Connexions": item._count.id }))}
          index="name"
          categories={["Connexions"]}
          colors={["blue"]}
        />
      </Card>
    </div>
  );
};

export default AdminDashboard;
