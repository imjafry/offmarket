import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabaseClient';
import { Switch } from '@/components/ui/switch';

const AdminUsersPage: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const load = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('id, email, username, subscription_type, subscription_expiry, is_active, is_admin, created_at, updated_at')
      .order('created_at', { ascending: false });
    setRows(data || []);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    if (!search) return rows;
    const s = search.toLowerCase();
    return rows.filter(r => [r.email, r.username].some((v: any) => String(v ?? '').toLowerCase().includes(s)));
  }, [rows, search]);

  const toggleAdmin = async (id: string, value: boolean) => {
    await supabase.from('profiles').update({ is_admin: value }).eq('id', id);
    await load();
  };
  const toggleActive = async (id: string, value: boolean) => {
    await supabase.from('profiles').update({ is_active: value }).eq('id', id);
    await load();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Users</h1>
          <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Accounts ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Username</th>
                    <th className="p-2 text-left">Subscription</th>
                    <th className="p-2 text-left">Expiry</th>
                    <th className="p-2 text-left">Active</th>
                    <th className="p-2 text-left">Admin</th>
                    <th className="p-2 text-left">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => (
                    <tr key={r.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{r.email}</td>
                      <td className="p-2">{r.username}</td>
                      <td className="p-2">{r.subscription_type}</td>
                      <td className="p-2">{r.subscription_expiry}</td>
                      <td className="p-2">
                        <Switch checked={!!r.is_active} onCheckedChange={(v) => toggleActive(r.id, !!v)} />
                      </td>
                      <td className="p-2">
                        <Switch checked={!!r.is_admin} onCheckedChange={(v) => toggleAdmin(r.id, !!v)} />
                      </td>
                      <td className="p-2 whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
