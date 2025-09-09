import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
  const cookieStore = cookies();
  const user = cookieStore.get('sessionUser');
  if (user?.value) redirect('/feed'); else redirect('/login');
}
