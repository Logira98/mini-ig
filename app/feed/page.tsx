import Header from '@/components/Header';
import FeedHeader from '@/components/FeedHeader';
import FeedList from '@/components/FeedList';

export default function FeedPage() {
  return (
    <div className="space-y-4 pt-6">
      <Header />
      <FeedHeader />
      <h2 className="text-lg font-semibold">Your Feeds</h2>
      <FeedList />
    </div>
  );
}
