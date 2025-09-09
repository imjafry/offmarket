import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  DollarSign,
  MapPin,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/admin/AdminLayout';

// Properties Chart Component
const PropertiesChart: React.FC = () => {
  const chartData = [
    { month: 'Jan', properties: 2 },
    { month: 'Feb', properties: 4 },
    { month: 'Mar', properties: 3 },
    { month: 'Apr', properties: 6 },
    { month: 'May', properties: 5 },
    { month: 'Jun', properties: 8 },
    { month: 'Jul', properties: 7 },
    { month: 'Aug', properties: 9 },
    { month: 'Sep', properties: 6 },
    { month: 'Oct', properties: 8 },
    { month: 'Nov', properties: 10 },
    { month: 'Dec', properties: 12 }
  ];

  const maxValue = Math.max(...chartData.map(d => d.properties));
  const minValue = Math.min(...chartData.map(d => d.properties));

  return (
    <div className="w-full h-full p-4">
      <div className="flex items-end justify-between h-full space-x-1">
        {chartData.map((data, index) => {
          const height = ((data.properties - minValue) / (maxValue - minValue)) * 100;
          return (
            <motion.div 
              key={index} 
              className="flex flex-col items-center flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-full bg-gray-200 rounded-t-sm relative" style={{ height: '200px' }}>
                <motion.div 
                  className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm transition-all duration-500 hover:from-purple-700 hover:to-purple-500 cursor-pointer"
                  style={{ height: `${height}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <div className="text-xs text-gray-600 mt-2 font-medium">
                {data.month}
              </div>
              <div className="text-xs text-gray-500">
                {data.properties}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Mock data
const stats = [
  {
    title: 'Total Properties',
    value: '30',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Building2,
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Active Users',
    value: '1,234',
    change: '+8%',
    changeType: 'positive' as const,
    icon: Users,
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Total Views',
    value: '45,678',
    change: '+23%',
    changeType: 'positive' as const,
    icon: Eye,
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Revenue',
    value: 'CHF 2.4M',
    change: '+15%',
    changeType: 'positive' as const,
    icon: DollarSign,
    color: 'from-orange-500 to-orange-600'
  }
];

const recentProperties = [
  {
    id: '1',
    title: 'Appartement 4.5 pièces - Lausanne Centre',
    status: 'available',
    price: 'CHF 2\'800\'000',
    views: 45,
    date: '2024-01-15'
  },
  {
    id: '2',
    title: 'Villa individuelle - Cologny',
    status: 'sold',
    price: 'CHF 4\'200\'000',
    views: 78,
    date: '2024-01-14'
  },
  {
    id: '3',
    title: 'Loft moderne - Genève',
    status: 'rented',
    price: 'CHF 1\'950\'000',
    views: 32,
    date: '2024-01-13'
  }
];

const recentUsers = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@example.ch',
    status: 'active',
    joinDate: '2024-01-10',
    propertiesViewed: 12
  },
  {
    id: '2',
    name: 'Pierre Martin',
    email: 'pierre.martin@example.ch',
    status: 'active',
    joinDate: '2024-01-08',
    propertiesViewed: 8
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@example.ch',
    status: 'expired',
    joinDate: '2023-12-15',
    propertiesViewed: 25
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'available':
      return <Badge className="bg-green-100 text-green-800">Available</Badge>;
    case 'sold':
      return <Badge className="bg-red-100 text-red-800">Sold</Badge>;
    case 'rented':
      return <Badge className="bg-orange-100 text-orange-800">Rented</Badge>;
    case 'active':
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    case 'expired':
      return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('admin.dashboard.title')}
            </h1>
            <p className="text-gray-600">
              {t('language') === 'fr' 
                ? 'Vue d\'ensemble de votre plateforme immobilière'
                : 'Overview of your real estate platform'
              }
            </p>
          </div>
          <div className="flex space-x-3">
            <Link to="/admin/properties/new">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                {t('admin.properties.add')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-1">
                        {stat.changeType === 'positive' ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          {t('language') === 'fr' ? 'vs mois dernier' : 'vs last month'}
                        </span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Properties Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                {t('language') === 'fr' ? 'Propriétés par mois' : 'Properties by Month'}
              </CardTitle>
              <CardDescription>
                {t('language') === 'fr' ? 'Évolution du nombre de propriétés ajoutées' : 'Evolution of properties added'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <PropertiesChart />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                {t('language') === 'fr' ? 'Actions rapides' : 'Quick Actions'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/admin/properties/new" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('admin.properties.add')}
                </Button>
              </Link>
              <Link to="/admin/accounts/new" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  {t('admin.accounts.add')}
                </Button>
              </Link>
              <Link to="/admin/properties" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Building2 className="h-4 w-4 mr-2" />
                  {t('language') === 'fr' ? 'Gérer les propriétés' : 'Manage Properties'}
                </Button>
              </Link>
              <Link to="/admin/accounts" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  {t('language') === 'fr' ? 'Gérer les comptes' : 'Manage Accounts'}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Properties and Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Properties */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-green-600" />
                  {t('language') === 'fr' ? 'Propriétés récentes' : 'Recent Properties'}
                </CardTitle>
                <CardDescription>
                  {t('language') === 'fr' ? 'Dernières propriétés ajoutées' : 'Latest properties added'}
                </CardDescription>
              </div>
              <Link to="/admin/properties">
                <Button variant="ghost" size="sm">
                  {t('language') === 'fr' ? 'Voir tout' : 'View all'}
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProperties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {property.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500">{property.price}</span>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Eye className="h-3 w-3 mr-1" />
                          {property.views}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(property.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  {t('language') === 'fr' ? 'Utilisateurs récents' : 'Recent Users'}
                </CardTitle>
                <CardDescription>
                  {t('language') === 'fr' ? 'Nouveaux utilisateurs inscrits' : 'Newly registered users'}
                </CardDescription>
              </div>
              <Link to="/admin/accounts">
                <Button variant="ghost" size="sm">
                  {t('language') === 'fr' ? 'Voir tout' : 'View all'}
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {t('language') === 'fr' ? 'Inscrit le' : 'Joined'} {user.joinDate}
                        </span>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Building2 className="h-3 w-3 mr-1" />
                          {user.propertiesViewed} {t('language') === 'fr' ? 'vues' : 'views'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(user.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};
