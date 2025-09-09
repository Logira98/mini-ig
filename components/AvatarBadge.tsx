'use client';
import type { Avatar } from '@/lib/types';

export default function AvatarBadge({ avatar, size=40 }: { avatar: Avatar; size?: number }) {
  const style = { width: size, height: size };
  if (avatar.kind === 'image') {
    return <img src={avatar.value} alt="avatar" className="rounded-full object-cover bg-mist" style={style as any} />;
  }
  return <div className="rounded-full bg-mist flex items-center justify-center text-lg" style={style as any}>{avatar.value}</div>;
}
