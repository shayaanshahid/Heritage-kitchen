"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push('/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid credentials.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'w-full px-4 py-3 rounded-lg text-sm border outline-none transition-all font-sans'
    + ' bg-white text-[#1e2215] placeholder:text-[#7a8060]'
    + ' border-[rgba(107,124,74,0.25)] focus:border-[#6b7c4a]'
    + ' focus:shadow-[0_0_0_3px_rgba(107,124,74,0.12)]';

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#f5ede0' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex flex-col items-center leading-none mb-6">
            <span className="font-serif font-bold text-4xl" style={{ color: '#4a5e32' }}>Heritage</span>
            <span className="text-[9px] tracking-[5px] uppercase mt-0.5" style={{ color: '#6b7c4a' }}>Kitchen</span>
          </div>
          <p className="text-sm" style={{ color: '#7a8060' }}>Staff portal — sign in to continue</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(107,124,74,0.15)',
            boxShadow: '0 8px 40px rgba(74,94,50,0.12)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-widest" style={{ color: '#4a5e32' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@heritagekitchen.be"
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-widest" style={{ color: '#4a5e32' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputCls}
              />
            </div>

            {error && (
              <div
                className="p-3 rounded-lg text-sm text-center"
                style={{ background: 'rgba(180,70,70,0.08)', color: '#c05050', border: '1px solid rgba(180,70,70,0.2)' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-medium text-sm tracking-wide transition-all hover:-translate-y-0.5 disabled:opacity-60 mt-2"
              style={{
                background: 'linear-gradient(135deg, #6b7c4a, #4a5e32)',
                color: '#e8d9b5',
                boxShadow: '0 2px 16px rgba(74,94,50,0.25)',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#7a8060' }}>
          <a href="/" className="transition-colors hover:underline" style={{ color: '#6b7c4a' }}>
            ← Back to Heritage Kitchen
          </a>
        </p>
      </div>
    </div>
  );
}
