'use client';
import { useEffect, useState } from 'react';
import { getCookie } from '@/lib/cookies';
import { storage } from '@/lib/storage';
import type { Post } from '@/lib/types';
import PostComposer from './PostComposer';
import PostCard from './PostCard';

export default function FeedList() {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const u = getCookie('sessionUser');
    if (u) {
      setUsername(u);
      setPosts(storage.getPosts(u));
    }
  }, []);

  const add = (p: Post) => setPosts((cur) => [p, ...cur]);

  return (
    <div className="space-y-4">
      {username && <PostComposer onNew={add} />}
      {posts.map(p => <PostCard key={p.id} post={p} />)}
      {posts.length === 0 && <p className="text-center text-slate-500">No posts yet. Be the first to share!</p>}
    </div>
  );
}
