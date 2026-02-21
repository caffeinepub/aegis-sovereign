import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserX } from 'lucide-react';
import { toast } from 'sonner';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'idle';
}

const initialTeam: TeamMember[] = [
  { id: '1', name: 'Alex Carter', email: 'alex@axon.io', status: 'active' },
  { id: '2', name: 'Jordan Lee', email: 'jordan@axon.io', status: 'active' },
  { id: '3', name: 'Morgan Blake', email: 'morgan@axon.io', status: 'idle' },
  { id: '4', name: 'Casey Rivera', email: 'casey@axon.io', status: 'active' },
];

export default function TeamManagement() {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);

  const handleRevokeAccess = (memberId: string, memberName: string) => {
    setTeam((prev) => prev.filter((member) => member.id !== memberId));
    toast.success(`Access revoked for ${memberName}`);
  };

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Users className="h-5 w-5 text-emerald-500" />
          Team Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {team.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background border border-border hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className={`h-2 w-2 rounded-full flex-shrink-0 ${
                    member.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRevokeAccess(member.id, member.name)}
                className="text-red-500 hover:text-red-400 hover:bg-red-500/10 flex-shrink-0"
              >
                <UserX className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
