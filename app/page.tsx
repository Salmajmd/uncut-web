'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { createClient, User } from '@supabase/supabase-js';

// --- Supabase client (public keys) ---
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type Counters = Record<string, number>;

export default function Page() {
  // --- AUTH ---
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
      setLoadingUser(false);
    };
    getUser();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const firstName = useMemo(() => {
    const full = user?.user_metadata?.full_name as string | undefined;
    return full?.split(' ')?.[0] || 'Creator';
  }, [user]);

  // --- CONTENT TYPES + COUNTERS ---
  const contentTypes = [
    { id: 'ig-reel', name: 'Instagram Reel', color: 'border-pink-500' },
    { id: 'ig-story', name: 'Instagram Story', color: 'border-purple-500' },
    { id: 'tiktok', name: 'TikTok', color: 'border-black' },
    { id: 'linkedin', name: 'LinkedIn', color: 'border-blue-600' },
    { id: 'youtube', name: 'YouTube', color: 'border-red-500' },
    { id: 'threads', name: 'Threads', color: 'border-gray-800' },
  ] as const;

  const [content, setContent] = useState<Counters>({
    'ig-reel': 0,
    'ig-story': 0,
    tiktok: 0,
    linkedin: 0,
    youtube: 0,
    threads: 0,
  });

  const bump = (id: keyof typeof content) => {
    setContent((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const total = useMemo(
    () => Object.values(content).reduce((a, b) => a + b, 0),
    [content]
  );

  if (loadingUser) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-100">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white p-4 border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-cyan-500">UNCUT</h1>
            <p className="text-sm text-slate-600">Hi {firstName} 👋</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-600">
              Total created today: <span className="font-semibold">{total}</span>
            </div>
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Content Creation */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-6">📱 Content Creation</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => bump(type.id)}
                className={`rounded-2xl border-2 ${type.color} p-4 text-left hover:bg-slate-50 transition`}
                aria-label={`Add one ${type.name}`}
              >
                <div className="text-sm text-slate-500">{type.name}</div>
                <div className="text-2xl font-bold">{content[type.id]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">📊 Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {contentTypes.map((type) => (
              <div
                key={type.id}
                className="rounded-2xl border p-4 bg-slate-50 flex items-center justify-between"
              >
                <span className="text-slate-600">{type.name}</span>
                <span className="text-lg font-semibold">{content[type.id]}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right text-slate-700">
            Total: <span className="font-bold">{total}</span>
          </div>
        </div>

        {/* Tips (no apostrophes in text to avoid ESLint rule) */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-2">💡 Quick Tips</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Batch record two or three short videos at once.</li>
            <li>Keep hooks tight and clear in the first two seconds.</li>
            <li>Cross post with slight tweaks for each platform.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
