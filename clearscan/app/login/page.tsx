'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'tes@gmail.com' && password === 'tesset123321') {
      setError('Idiot.');
    } else {
      router.push('/scan');
    }
  };

  return (
    <main className="h-screen flex items-center justify-center bg-gradient-to-r from-[#FF4267]/25 to-[#5300FF]/25">
      <form onSubmit={handleSubmit} className="bg-[#9370DB] p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-white">Log In</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tes@gmail.com"
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="tesset123321"
          className="w-full mb-5 p-2 border rounded"
          required
        />
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
          Sign In
        </button>
      </form>
    </main>
  );
}