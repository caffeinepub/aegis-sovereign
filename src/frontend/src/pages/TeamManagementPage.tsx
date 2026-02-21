import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ActiveIdentitiesCard from '@/components/dashboard/ActiveIdentitiesCard';

export default function TeamManagementPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#001529]">Team Management</h1>
          <p className="text-gray-600 mt-2">Manage your team members and their access levels</p>
        </div>

        <ActiveIdentitiesCard />
      </div>
    </div>
  );
}
