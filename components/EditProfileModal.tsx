'use client';
import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import { getCookie } from '@/lib/cookies';
import EmojiGrid from './EmojiGrid';
import type { Avatar, Profile } from '@/lib/types';

export default function EditProfileModal({ open, onClose, onSaved }:{ open:boolean; onClose:()=>void; onSaved:(p:Profile)=>void }) {
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [mode, setMode] = useState<'emoji'|'image'>('emoji');
  const [emoji, setEmoji] = useState('😀');
  const [imgData, setImgData] = useState<string>('');

  useEffect(()=>{
    const u = getCookie('sessionUser') || '';
    setUsername(u);
    const p = storage.getProfile(u);
    if (p) {
      setName(p.name); setBio(p.bio || '');
      if (p.avatar.kind === 'emoji') { setMode('emoji'); setEmoji(p.avatar.value); }
      else { setMode('image'); setImgData(p.avatar.value); }
    }
  },[open]);

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImgData(String(reader.result));
    reader.readAsDataURL(file);
  };

  const save = () => {
    if (!username) return;
    const avatar: Avatar = mode==='emoji' ? { kind:'emoji', value:emoji || '😀' } : { kind:'image', value: imgData };
    const profile: Profile = { username, name: name || username, bio, avatar };
    storage.setProfile(profile);
    onSaved(profile);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-20 grid place-items-center bg-black/20 p-4">
      <div className="card w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Edit Profile</h3>
          <button className="text-sm link" onClick={onClose}>Close</button>
        </div>
        <div className="space-y-2">
          <label className="label">Display Name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="label">Bio</label>
          <textarea className="input min-h-24" value={bio} onChange={e=>setBio(e.target.value)} />
        </div>
        <div className="flex gap-3">
          <button className={`badge ${mode==='emoji'?'ring-2 ring-ink/20':''}`} onClick={()=>setMode('emoji')}>Emoji</button>
          <button className={`badge ${mode==='image'?'ring-2 ring-ink/20':''}`} onClick={()=>setMode('image')}>Image</button>
        </div>
        {mode==='emoji' ? (
          <EmojiGrid value={emoji} onPick={setEmoji} />
        ) : (
          <div className="space-y-2">
            <input type="file" accept="image/*" onChange={e=>e.target.files && onFile(e.target.files[0])} />
            {imgData && <img src={imgData} alt="preview" className="h-24 w-24 rounded-full object-cover" />}
          </div>
        )}
        <button className="btn btn-primary w-full" onClick={save}>Save</button>
      </div>
    </div>
  );
}
