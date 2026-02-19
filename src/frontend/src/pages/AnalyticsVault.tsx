import { useGetAllMeetings } from '../hooks/useQueries';
import BentoCard from '../components/layout/BentoCard';
import MeetingLogCard from '../components/analytics/MeetingLogCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Lock } from 'lucide-react';

export default function AnalyticsVault() {
  const { data: meetings, isLoading } = useGetAllMeetings();

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Analytics & Vault</h1>
        <p className="text-gray-400">Encrypted meeting logs and intelligence reports</p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : meetings && meetings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingLogCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <BentoCard>
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Lock className="mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold">No Meetings Yet</h3>
            <p className="text-gray-400">Start a meeting from the Command Center to see analytics here</p>
          </div>
        </BentoCard>
      )}
    </div>
  );
}
