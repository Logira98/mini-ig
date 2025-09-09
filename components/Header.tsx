'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deleteCookie, getCookie } from '@/lib/cookies';

export default function Header() {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => setUser(getCookie('sessionUser')), []);

  return (
    <header className="sticky top-0 z-10 -mx-4 mb-4 bg-mist/70 backdrop-blur supports-[backdrop-filter]:bg-mist/60">
      <div className="mx-auto max-w-xl px-4 py-3 flex items-center justify-between">
        <Link href="/feed" className="text-xl font-extrabold tracking-tight">mini<span className="text-ink/60">IG</span></Link>
        {user && (
          <button
            className="text-sm link"
            onClick={() => { deleteCookie('sessionUser'); location.href = '/login'; }}
          >Logout</button>
        )}
      </div>
    </header>
  );
}
