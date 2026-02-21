import { useGetAllMeetingLogs } from '../hooks/useQueries';
import BentoCard from '../components/layout/BentoCard';
import IntelSessionCard from '../components/vault/IntelSessionCard';
import SubscriptionTiers from '../components/vault/SubscriptionTiers';
import { Skeleton } from '@/components/ui/skeleton';
import { Lock } from 'lucide-react';

export default function AnalyticsVault() {
  const { data: meetings, isLoading } = useGetAllMeetingLogs();

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#10b981]">SECURE VAULT</h1>
        <p className="text-gray-400">INGEST SESSION INTEL ARCHIVE</p>
      </div>

      {/* Subscription Tiers Section */}
      <SubscriptionTiers />

      {/* Meeting Logs Section */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : meetings && meetings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <IntelSessionCard key={meeting.title} session={meeting} />
          ))}
        </div>
      ) : (
        <BentoCard>
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Lock className="mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold">No Intel Sessions Yet</h3>
            <p className="text-gray-400">Start ingesting intelligence from the Command Center</p>
          </div>
        </BentoCard>
      )}
    </div>
  );
}
