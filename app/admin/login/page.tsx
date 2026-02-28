"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-md w-full">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="h-24 mb-2">
             <Image 
                src="/assets/logo.svg" 
                alt="H2O Immigration" 
                width={300} 
                height={225}
                className="h-full w-auto object-contain"
                priority
              />
          </div>
          <h1 className="text-2xl font-bold text-primary font-heading mt-2">
            Admin <span className="text-accent">Portal</span>
          </h1>
          <p className="mt-1 text-gray-600 italic">Secure Control Panel</p>
        </div>

        <Card className="p-8 shadow-xl border-t-4 border-primary">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 text-center">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-gray-900"
                placeholder="Admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-gray-900"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
              className="py-4 text-lg font-semibold"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </Button>
          </form>
        </Card>
        
        <div className="text-center mt-8">
          <a href="/" className="text-sm text-gray-500 hover:text-primary transition-colors">
            &larr; Back to Public Site
          </a>
        </div>
      </Container>
    </div>
  );
}
