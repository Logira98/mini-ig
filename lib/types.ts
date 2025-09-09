export type Reaction = 'like';
export type Avatar = { kind: 'emoji' | 'image'; value: string };
export type Profile = {
  username: string;
  name: string;
  bio?: string;
  avatar: Avatar;
};

export type Comment = {
  id: string;
  author: string;
  text: string;
  createdAt: number;
};

export type Post = {
  id: string;
  author: string;
  text: string;
  image?: string;
  createdAt: number;
  reactions: Record<Reaction, string[]>; // usernames who reacted
  comments: Comment[];
  shares: number;
};
