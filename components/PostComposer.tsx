'use client';
import { useEffect, useState } from 'react';
import { getCookie } from '@/lib/cookies';
import { storage } from '@/lib/storage';
import type { Post } from '@/lib/types';

export default function PostComposer({ onNew }: { onNew: (p: Post) => void }) {
  const [username, setUsername] = useState<string>('');
  const [text, setText] = useState('');
  const [imgData, setImgData] = useState<string>('');

  useEffect(() => { setUsername(getCookie('sessionUser') || ''); }, []);

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImgData(String(reader.result));
    reader.readAsDataURL(file);
  };

  const post = () => {
    if ((!text.trim() && !imgData) || !username) return;
    const p: Post = {
      id: crypto.randomUUID(),
      author: username,
      text: text.trim(),
      image: imgData || undefined,
      createdAt: Date.now(),
      reactions: { like: [] },
      comments: [],
      shares: 0
    };
    const all = storage.getPosts(username);
    storage.setPosts(username, [p, ...all]);
    setText(''); setImgData('');
    onNew(p);
  };

  return (
    <div className="card sticky top-[4.25rem] z-10 space-y-3">
      <textarea
        value={text}
        onChange={(e)=>setText(e.target.value)}
        className="input min-h-20 w-full"
        placeholder="Share something creative today…"
      />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <label className="badge cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={e=>e.target.files && onFile(e.target.files[0])} />
            + Image
          </label>
          {imgData && <img src={imgData} alt="preview" className="h-12 w-12 rounded-lg object-cover" />}
        </div>
        <button onClick={post} className="btn btn-primary">Post</button>
      </div>
    </div>
  );
}
