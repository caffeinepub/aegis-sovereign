import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
}

const initialTeamMembers: TeamMember[] = [
  { id: '1', name: 'Sarah Chen', role: 'Admin', initials: 'SC' },
  { id: '2', name: 'Marcus Rodriguez', role: 'User', initials: 'MR' },
  { id: '3', name: 'Emily Watson', role: 'User', initials: 'EW' },
  { id: '4', name: 'David Kim', role: 'Guest', initials: 'DK' },
];

export default function ActiveIdentitiesCard() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);

  const handleRevoke = (id: string, name: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
    toast.success(`Access revoked for ${name}`);
  };

  return (
    <Card className="bg-white shadow-md rounded-lg border border-gray-200 h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#001529]">Active Identities</CardTitle>
        <p className="text-sm text-gray-500">{teamMembers.length} team members</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-[#1890FF]">
                  <AvatarFallback className="bg-[#1890FF]/10 text-[#1890FF] font-semibold text-sm">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-[#001529]">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
              <Button
                onClick={() => handleRevoke(member.id, member.name)}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
              >
                Revoke
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
