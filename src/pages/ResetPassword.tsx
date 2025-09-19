import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMsg(error.message);
    else setMsg('Password updated. You can close this tab and login.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <form onSubmit={submit} className="space-y-4 w-full max-w-md">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" required />
        <Button type="submit" disabled={loading}>{loading ? 'Updating…' : 'Update'}</Button>
        {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
