'use client';
import type { Post } from '@/lib/types';
import ReactionBar from './ReactionBar';
import { storage } from '@/lib/storage';
import { useState } from 'react';
import AvatarBadge from './AvatarBadge';

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts)/1000);
  if (s < 60) return `${s}s`; const m = Math.floor(s/60); if (m < 60) return `${m}m`;
  const h = Math.floor(m/60); if (h < 24) return `${h}h`; const d = Math.floor(h/24); return `${d}d`;
}

export default function PostCard({ post: initial }: { post: Post }) {
  const [post, setPost] = useState<Post>(initial);
  const profile = storage.getProfile(post.author);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const addComment = () => {
    if (!commentText.trim()) return;
    const c = { id: crypto.randomUUID(), author: post.author, text: commentText.trim(), createdAt: Date.now() };
    const updated = storage.addComment(post.author, post.id, c);
    if (updated) { setPost(updated); setCommentText(''); setShowComments(true); }
  };

  return (
    <article className="card">
      <header className="mb-2 flex items-center gap-3">
        {profile && <AvatarBadge avatar={profile.avatar} />}
        <div>
          <div className="text-sm font-semibold">{profile?.name ?? post.author}</div>
          <div className="text-xs text-slate-500">{timeAgo(post.createdAt)} ago</div>
        </div>
      </header>
      {post.text && <p className="whitespace-pre-wrap leading-relaxed">{post.text}</p>}
      {post.image && <img src={post.image} alt="post" className="mt-2 w-full rounded-2xl object-cover" />}
      <ReactionBar post={post} onChange={setPost} onToggleComments={()=>setShowComments(v=>!v)} />
      {showComments && (
        <div className="mt-3 space-y-2">
          <div className="flex gap-2">
            <input className="input flex-1" placeholder="Write a comment…" value={commentText} onChange={e=>setCommentText(e.target.value)} />
            <button className="btn btn-primary" onClick={addComment}>Post</button>
          </div>
          <div className="space-y-2">
            {post.comments.map(c => (
              <div key={c.id} className="rounded-xl bg-mist px-3 py-2">
                <div className="text-xs text-slate-500">{new Date(c.createdAt).toLocaleString()}</div>
                <div className="text-sm">{c.text}</div>
              </div>
            ))}
            {post.comments.length===0 && <p className="text-sm text-slate-500">Be the first to comment.</p>}
          </div>
        </div>
      )}
    </article>
  );
}
