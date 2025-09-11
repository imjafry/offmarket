import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Mail,
  Phone,
  Calendar,
  CheckSquare,
  Square,
  UserPlus,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

// Mock data
const users = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@example.ch',
    phone: '+41 79 123 45 67',
    status: 'active',
    subscriptionType: 'premium',
    joinDate: '2024-01-10',
    lastActive: '2024-01-20',
    propertiesViewed: 12,
    inquiries: 3,
    subscriptionExpiry: '2024-07-10',
    avatar: '/user-avatar-1.jpg'
  },
  {
    id: '2',
    name: 'Pierre Martin',
    email: 'pierre.martin@example.ch',
    phone: '+41 78 987 65 43',
    status: 'active',
    subscriptionType: 'basic',
    joinDate: '2024-01-08',
    lastActive: '2024-01-19',
    propertiesViewed: 8,
    inquiries: 1,
    subscriptionExpiry: '2024-04-08',
    avatar: '/user-avatar-2.jpg'
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@example.ch',
    phone: '+41 76 555 44 33',
    status: 'expired',
    subscriptionType: 'premium',
    joinDate: '2023-12-15',
    lastActive: '2024-01-05',
    propertiesViewed: 25,
    inquiries: 7,
    subscriptionExpiry: '2024-01-15',
    avatar: '/user-avatar-3.jpg'
  },
  {
    id: '4',
    name: 'Jean-Claude Favre',
    email: 'jc.favre@example.ch',
    phone: '+41 79 444 33 22',
    status: 'suspended',
    subscriptionType: 'premium',
    joinDate: '2023-11-20',
    lastActive: '2024-01-10',
    propertiesViewed: 45,
    inquiries: 12,
    subscriptionExpiry: '2024-05-20',
    avatar: '/user-avatar-4.jpg'
  }
];

export const AccountManagement: React.FC = () => {
  const { t } = useTranslation();
  const { sendSubscriptionExpiryNotification, sendSubscriptionExpiredNotification } = useNotifications();
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const [sortKey, setSortKey] = useState<'name' | 'status' | 'subscriptionType' | 'lastActive' | 'subscriptionExpiry'>('lastActive');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesSubscription = subscriptionFilter === 'all' || user.subscriptionType === subscriptionFilter;
    
    return matchesSearch && matchesStatus && matchesSubscription;
  });

  // Debounce search input
  React.useEffect(() => {
    const id = setTimeout(() => setSearchQuery(searchInput), 300);
    return () => clearTimeout(id);
  }, [searchInput]);

  const sortedUsers = React.useMemo(() => {
    const arr = [...filteredUsers];
    arr.sort((a: any, b: any) => {
      const aVal = (a as any)[sortKey] ?? '';
      const bVal = (b as any)[sortKey] ?? '';
      if (sortKey === 'lastActive' || sortKey === 'subscriptionExpiry') {
        const aDate = new Date(aVal).getTime();
        const bDate = new Date(bVal).getTime();
        return sortDir === 'asc' ? aDate - bDate : bDate - aDate;
      }
      return sortDir === 'asc' ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });
    return arr;
  }, [filteredUsers, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / pageSize));
  const paginatedUsers = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedUsers.slice(start, start + pageSize);
  }, [sortedUsers, currentPage, pageSize]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, subscriptionFilter, pageSize]);

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on users:`, selectedUsers);
    // Implement bulk actions
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 flex items-center"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 flex items-center"><XCircle className="h-3 w-3 mr-1" />Expired</Badge>;
      case 'suspended':
        return <Badge className="bg-orange-100 text-orange-800 flex items-center"><AlertTriangle className="h-3 w-3 mr-1" />Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSubscriptionBadge = (type: string) => {
    switch (type) {
      case 'premium':
        return <Badge className="bg-purple-100 text-purple-800">Premium</Badge>;
      case 'basic':
        return <Badge className="bg-blue-100 text-blue-800">Basic</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const isSubscriptionExpiring = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const checkAndSendExpiryNotifications = () => {
    let expired = 0;
    let expiring = 0;
    users.forEach(user => {
      const expiry = new Date(user.subscriptionExpiry);
      const now = new Date();
      const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry <= 0) {
        // Subscription expired
        expired += 1;
        sendSubscriptionExpiredNotification(user.email, { quiet: true });
      } else if (daysUntilExpiry <= 7) {
        // Expiring in 7 days or less
        expiring += 1;
        sendSubscriptionExpiryNotification(user.email, daysUntilExpiry, { quiet: true });
      }
    });
    // Show a single summary toast
    const message = t('language') === 'fr' 
      ? `Notifications envoyées: ${expired} expirées, ${expiring} expirant bientôt`
      : `Notifications sent: ${expired} expired, ${expiring} expiring soon`;
    // Use the same app toast utility
    const { toast } = require('@/hooks/use-toast');
    toast({ title: t('language') === 'fr' ? 'Vérification terminée' : 'Check complete', description: message });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('admin.accounts.title')}
            </h1>
            <p className="text-gray-600">
              {t('language') === 'fr' 
                ? 'Gérez les comptes utilisateurs et leurs abonnements'
                : 'Manage user accounts and their subscriptions'
              }
            </p>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline"
              onClick={checkAndSendExpiryNotifications}
            >
              <Mail className="h-4 w-4 mr-2" />
              {t('language') === 'fr' ? 'Vérifier les abonnements' : 'Check Subscriptions'}
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              {t('language') === 'fr' ? 'Envoyer un email' : 'Send Email'}
            </Button>
            <Link to="/admin/accounts/new">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <UserPlus className="h-4 w-4 mr-2" />
                {t('admin.accounts.add')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">
                    {users.filter(u => u.status === 'active').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Premium Users</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {users.filter(u => u.subscriptionType === 'premium').length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {users.filter(u => isSubscriptionExpiring(u.subscriptionExpiry)).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={t('language') === 'fr' ? 'Rechercher des utilisateurs...' : 'Search users...'}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Subscription" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {t('language') === 'fr' ? 'Filtres' : 'Filters'}
                </Button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-blue-900">
                      {selectedUsers.length} {t('language') === 'fr' ? 'utilisateurs sélectionnés' : 'users selected'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction('extend')}
                    >
                      {t('language') === 'fr' ? 'Prolonger l\'abonnement' : 'Extend Subscription'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction('suspend')}
                    >
                      {t('language') === 'fr' ? 'Suspendre' : 'Suspend'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction('delete')}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {t('language') === 'fr' ? 'Supprimer' : 'Delete'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t('language') === 'fr' ? 'Liste des utilisateurs' : 'Users List'}
            </CardTitle>
            <CardDescription>
              {filteredUsers.length} {t('language') === 'fr' ? 'utilisateurs trouvés' : 'users found'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">
                      <Checkbox
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => { setSortKey('name'); setSortDir(prev => sortKey === 'name' ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'); }}>User</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => { setSortKey('status'); setSortDir(prev => sortKey === 'status' ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'); }}>Status</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => { setSortKey('subscriptionType'); setSortDir(prev => sortKey === 'subscriptionType' ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'); }}>Subscription</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => { setSortKey('lastActive'); setSortDir(prev => sortKey === 'lastActive' ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'); }}>Activity</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => { setSortKey('subscriptionExpiry'); setSortDir(prev => sortKey === 'subscriptionExpiry' ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'); }}>Expiry</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => handleSelectUser(user.id)}
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {user.email}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Phone className="h-3 w-3 mr-1" />
                              {user.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="p-4">
                        {getSubscriptionBadge(user.subscriptionType)}
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Eye className="h-3 w-3 mr-1" />
                            {user.propertiesViewed} {t('language') === 'fr' ? 'vues' : 'views'}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.inquiries} {t('language') === 'fr' ? 'demandes' : 'inquiries'}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900">
                            {user.subscriptionExpiry}
                          </div>
                          {isSubscriptionExpiring(user.subscriptionExpiry) && (
                            <Badge className="bg-orange-100 text-orange-800 text-xs">
                              {t('language') === 'fr' ? 'Expire bientôt' : 'Expires soon'}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/accounts/${user.id}`} className="flex items-center">
                                <Eye className="h-4 w-4 mr-2" />
                                {t('language') === 'fr' ? 'Voir le profil' : 'View Profile'}
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              {t('language') === 'fr' ? 'Modifier' : 'Edit'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              {t('language') === 'fr' ? 'Envoyer un email' : 'Send Email'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-orange-600">
                              <Clock className="h-4 w-4 mr-2" />
                              {t('language') === 'fr' ? 'Prolonger l\'abonnement' : 'Extend Subscription'}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t('language') === 'fr' ? 'Supprimer' : 'Delete'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                {t('language') === 'fr' 
                  ? `Affichage de ${(currentPage - 1) * pageSize + 1} à ${Math.min(currentPage * pageSize, sortedUsers.length)} sur ${sortedUsers.length} résultats`
                  : `Showing ${(currentPage - 1) * pageSize + 1} to ${Math.min(currentPage * pageSize, sortedUsers.length)} of ${sortedUsers.length} results`
                }
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">{t('language') === 'fr' ? `Page ${currentPage} sur ${totalPages}` : `Page ${currentPage} of ${totalPages}`}</span>
                <Select value={String(pageSize)} onValueChange={(v) => setPageSize(parseInt(v))}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 / page</SelectItem>
                    <SelectItem value="20">20 / page</SelectItem>
                    <SelectItem value="50">50 / page</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                    {t('language') === 'fr' ? 'Précédent' : 'Previous'}
                  </Button>
                  <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
                    {t('language') === 'fr' ? 'Suivant' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Bulk Delete Confirmation */}
        <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('language') === 'fr' ? 'Supprimer les utilisateurs sélectionnés ?' : 'Delete selected users?'}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('language') === 'fr' ? 'Cette action est irréversible.' : 'This action cannot be undone.'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('language') === 'fr' ? 'Annuler' : 'Cancel'}</AlertDialogCancel>
              <AlertDialogAction onClick={() => setShowBulkDeleteDialog(false)}>{t('language') === 'fr' ? 'Supprimer' : 'Delete'}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </AdminLayout>
  );
};
