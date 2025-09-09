'use client';
import { FormEvent, useState } from 'react';
import { setCookie } from '@/lib/cookies';
import { storage } from '@/lib/storage';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) return setError('Please fill both fields');
    setCookie('sessionUser', username, 7);
    const profile = storage.getProfile(username);
    window.location.href = profile ? '/feed' : '/onboarding';
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-4">
      <div className="space-y-2">
        <label className="label">Username</label>
        <input className="input" value={username} onChange={e=>setUsername(e.target.value)} placeholder="yourname" />
      </div>
      <div className="space-y-2">
        <label className="label">Password</label>
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn btn-primary w-full" type="submit">Login</button>
    </form>
  );
}
