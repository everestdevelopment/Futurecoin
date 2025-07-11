const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function getToken() {
  return localStorage.getItem('token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginWithTelegram(telegramId: string, username?: string, referralBy?: string) {
  const res = await fetch(`${API_URL}/auth/telegram`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telegramId, username, referralBy })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function getProfile() {
  const res = await fetch(`${API_URL}/user/profile`, {
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Profile fetch failed');
  return res.json();
}

export async function tap() {
  const res = await fetch(`${API_URL}/game/tap`, {
    method: 'POST',
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Tap failed');
  return res.json();
}

export async function rechargeEnergy() {
  const res = await fetch(`${API_URL}/game/energy`, {
    method: 'POST',
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Energy recharge failed');
  return res.json();
}

export async function upgradeBoost() {
  const res = await fetch(`${API_URL}/game/boost`, {
    method: 'POST',
    headers: authHeaders()
  });
  if (!res.ok) throw new Error('Boost upgrade failed');
  return res.json();
}

export async function getLeaderboard() {
  const res = await fetch(`${API_URL}/leaderboard`);
  if (!res.ok) throw new Error('Leaderboard fetch failed');
  return res.json();
}

export async function connectWallet(wallet: string) {
  const res = await fetch(`${API_URL}/wallet/connect`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ wallet })
  });
  if (!res.ok) throw new Error('Wallet connect failed');
  return res.json();
}

export async function claim() {
  const res = await fetch(`${API_URL}/wallet/claim`, {
    method: 'POST',
    headers: authHeaders()
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function getStats() {
  const res = await fetch(`${API_URL}/stats`);
  if (!res.ok) throw new Error('Stats fetch failed');
  return res.json();
}

export async function getClaimDate() {
  const res = await fetch(`${API_URL}/claim-date`);
  if (!res.ok) throw new Error('Claim date fetch failed');
  return res.json();
} 