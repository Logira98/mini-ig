'use client';
import { FormEvent, useEffect, useState } from 'react';
import { getCookie } from '@/lib/cookies';
import { storage } from '@/lib/storage';
import EmojiGrid from './EmojiGrid';
import type { Avatar, Profile } from '@/lib/types';

export default function OnboardingForm() {
  const [username, setUsername] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [mode, setMode] = useState<'emoji'|'image'>('emoji');
  const [emoji, setEmoji] = useState('😀');
  const [imgData, setImgData] = useState<string>('');

  useEffect(() => {
    const u = getCookie('sessionUser');
    setUsername(u);
  }, []);

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImgData(String(reader.result));
    reader.readAsDataURL(file);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username) return;
    const avatar: Avatar = mode==='emoji' ? { kind: 'emoji', value: emoji } : { kind: 'image', value: imgData };
    const profile: Profile = { username, name: name || username, bio, avatar };
    storage.setProfile(profile);
    window.location.href = '/feed';
  };

  if (!username) return null;

  return (
    <form onSubmit={onSubmit} className="card space-y-4">
      <div className="space-y-2">
        <label className="label">Display Name</label>
        <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <label className="label">Bio</label>
        <textarea className="input min-h-24" value={bio} onChange={e=>setBio(e.target.value)} placeholder="Say something about you…" />
      </div>
      <div className="flex gap-3">
        <button type="button" className={`badge ${mode==='emoji'?'ring-2 ring-ink/20':''}`} onClick={()=>setMode('emoji')}>Emoji</button>
        <button type="button" className={`badge ${mode==='image'?'ring-2 ring-ink/20':''}`} onClick={()=>setMode('image')}>Image</button>
      </div>
      {mode==='emoji' ? (
        <EmojiGrid value={emoji} onPick={setEmoji} />
      ) : (
        <div className="space-y-2">
          <input type="file" accept="image/*" onChange={e=>e.target.files && onFile(e.target.files[0])} />
          {imgData && <img src={imgData} alt="preview" className="h-24 w-24 rounded-full object-cover" />}
        </div>
      )}
      <button className="btn btn-primary w-full" type="submit">Continue to Feed</button>
    </form>
  );
}
