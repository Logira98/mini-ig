import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mini IG — Next.js Feed',
  description: 'Minimal social feed — Login → Onboarding → Feed',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <main className="mx-auto max-w-xl px-4 pb-16">{children}</main>
      </body>
    </html>
  );
}
