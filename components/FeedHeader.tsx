'use client';
import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import { getCookie } from '@/lib/cookies';
import AvatarBadge from './AvatarBadge';
import EditProfileModal from './EditProfileModal';
import type { Profile } from '@/lib/types';

export default function FeedHeader() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    const u = getCookie('sessionUser');
    if (u) setProfile(storage.getProfile(u));
  },[]);

  return (
    <div className="card flex items-center gap-3">
      {profile && <AvatarBadge avatar={profile.avatar} size={56} />}
      <div className="flex-1">
        <div className="font-semibold">{profile?.name}</div>
        <div className="text-sm text-slate-600">@{profile?.username}</div>
        {profile?.bio && <div className="text-sm mt-1">{profile.bio}</div>}
      </div>
      <button className="btn" onClick={()=>setOpen(true)}>Edit profile</button>
      <EditProfileModal open={open} onClose={()=>setOpen(false)} onSaved={(p)=>setProfile(p)} />
    </div>
  );
}
