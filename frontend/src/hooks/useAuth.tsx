import { useState, useEffect } from 'react';
import { loginWithTelegram, getProfile } from '@/lib/api';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    getProfile()
      .then((res) => {
        setUser(res.user);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const login = async (telegramId: string, username?: string, referralBy?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginWithTelegram(telegramId, username, referralBy);
      localStorage.setItem('token', res.token);
      setUser(res.user);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, error, login, logout };
} 