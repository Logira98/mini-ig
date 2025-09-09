import type { Post, Profile, Reaction, Comment } from './types';

const POSTS_KEY = (u: string) => `miniig:posts:${u}`;
const PROFILE_KEY = (u: string) => `miniig:profile:${u}`;

const safeParse = <T,>(raw: string | null, fallback: T): T => {
  try { return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; }
};

export const storage = {
  getProfile(username: string): Profile | null {
    if (typeof window === 'undefined') return null;
    return safeParse<Profile | null>(localStorage.getItem(PROFILE_KEY(username)), null);
  },
  setProfile(p: Profile) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(PROFILE_KEY(p.username), JSON.stringify(p));
  },
  getPosts(username: string): Post[] {
    if (typeof window === 'undefined') return [];
    return safeParse<Post[]>(localStorage.getItem(POSTS_KEY(username)), []);
  },
  setPosts(username: string, posts: Post[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(POSTS_KEY(username), JSON.stringify(posts));
  },
  toggleReaction(username: string, post: Post, r: Reaction): Post {
    const set = new Set(post.reactions[r]);
    if (set.has(username)) set.delete(username); else set.add(username);
    return { ...post, reactions: { ...post.reactions, [r]: Array.from(set) } };
  },
  addComment(owner: string, postId: string, c: Comment): Post | null {
    const list = storage.getPosts(owner);
    const idx = list.findIndex(p => p.id === postId);
    if (idx < 0) return null;
    list[idx] = { ...list[idx], comments: [...list[idx].comments, c] };
    storage.setPosts(owner, list);
    return list[idx];
  },
  addShare(owner: string, postId: string): Post | null {
    const list = storage.getPosts(owner);
    const idx = list.findIndex(p => p.id === postId);
    if (idx < 0) return null;
    list[idx] = { ...list[idx], shares: (list[idx].shares ?? 0) + 1 };
    storage.setPosts(owner, list);
    return list[idx];
  }
};
