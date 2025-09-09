import Header from '@/components/Header';
import OnboardingForm from '@/components/OnboardingForm';

export default function OnboardingPage() {
  return (
    <div className="space-y-4 pt-6">
      <Header />
      <h1 className="text-2xl font-bold">Set up your profile</h1>
      <p className="text-slate-600">Choose an emoji or upload an image for your profile picture.</p>
      <OnboardingForm />
    </div>
  );
}
