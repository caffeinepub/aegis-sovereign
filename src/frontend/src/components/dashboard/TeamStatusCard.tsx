import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface TeamMember {
  name: string;
  status: 'active' | 'idle';
}

const mockTeam: TeamMember[] = [
  { name: 'Alex Carter', status: 'active' },
  { name: 'Jordan Lee', status: 'active' },
  { name: 'Morgan Blake', status: 'idle' },
  { name: 'Casey Rivera', status: 'active' },
];

export default function TeamStatusCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Users className="h-5 w-5 text-emerald-500" />
          Team Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockTeam.map((member) => (
            <div key={member.name} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{member.name}</span>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    member.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground'
                  }`}
                />
                <span className="text-xs text-muted-foreground capitalize">{member.status}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
