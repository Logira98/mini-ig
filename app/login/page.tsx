import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="space-y-4 pt-6">
      <Header />
      <h1 className="text-2xl font-bold text-center">Welcome back</h1>
      <p className="text-slate-600 text-center">Login to continue to your creative feed.</p>
      <LoginForm />
    </div>
  );
}
