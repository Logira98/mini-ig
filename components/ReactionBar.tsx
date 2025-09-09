'use client';
import { storage } from '@/lib/storage';
import type { Post } from '@/lib/types';
import { getCookie } from '@/lib/cookies';
import { useEffect, useState } from 'react';

export default function ReactionBar({ post, onChange, onToggleComments }:{ post: Post; onChange:(p:Post)=>void; onToggleComments:()=>void }) {
  const [me, setMe] = useState('');
  useEffect(()=>{ setMe(getCookie('sessionUser') || ''); },[]);

  const like = () => {
    if (!me) return;
    const updated = storage.toggleReaction(me, post, 'like');
    const list = storage.getPosts(post.author);
    const idx = list.findIndex(x => x.id === post.id);
    if (idx >= 0) { list[idx] = updated; storage.setPosts(post.author, list); }
    onChange(updated);
  };

  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Mini IG post', text: post.text || '', url: location.href }); } catch {}
    } else if (navigator.clipboard) {
      try { await navigator.clipboard.writeText(post.text || ''); } catch {}
    }
    const updated = storage.addShare(post.author, post.id);
    if (updated) onChange(updated);
  };

  const likeCount = post.reactions.like.length;
  return (
    <div className="mt-3 flex gap-3 text-sm">
      <button onClick={like} className={`rounded-xl border px-3 py-1 ${me && post.reactions.like.includes(me) ? 'bg-ink text-white':'bg-white text-ink'} border-slate-200`}>❤️ {likeCount>0 && <span className="opacity-70 ml-1">{likeCount}</span>}</button>
      <button onClick={onToggleComments} className="rounded-xl border px-3 py-1 bg-white text-ink border-slate-200">💬 {post.comments.length>0 && <span className="opacity-70 ml-1">{post.comments.length}</span>}</button>
      <button onClick={share} className="rounded-xl border px-3 py-1 bg-white text-ink border-slate-200">🔗 {post.shares>0 && <span className="opacity-70 ml-1">{post.shares}</span>}</button>
    </div>
  );
}
