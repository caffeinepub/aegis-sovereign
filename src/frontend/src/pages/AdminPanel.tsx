import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield, User } from 'lucide-react';
import AuditLogViewer from '../components/admin/AuditLogViewer';
import SystemHealthMonitor from '../components/admin/SystemHealthMonitor';

export default function AdminPanel() {
  const { data: userProfile, isLoading } = useGetCallerUserProfile();
  const { identity } = useInternetIdentity();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-gray-400">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const currentPrincipal = identity?.getPrincipal().toString() || 'Unknown';

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-gray-400">User management and system administration</p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-3">
              <Shield className="h-8 w-8 text-emerald-400" />
              <div>
                <h2 className="text-xl font-semibold">User Management</h2>
                <p className="text-sm text-gray-400">View and manage user roles</p>
              </div>
            </div>

            <div className="mb-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
              <p className="text-sm text-yellow-400">
                <strong>Note:</strong> Full user listing functionality requires backend implementation. Currently
                showing your own profile as an example.
              </p>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Principal ID</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-xs">
                    {currentPrincipal.slice(0, 20)}...{currentPrincipal.slice(-8)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{userProfile?.name || 'Unknown'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-gradient-to-r from-emerald-500 to-cyan-500">
                      ADMIN
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <AuditLogViewer />
        </TabsContent>

        <TabsContent value="health">
          <SystemHealthMonitor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
