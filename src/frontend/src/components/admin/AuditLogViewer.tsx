import { useState } from 'react';
import { useGetAuditLog } from '../../hooks/useQueries';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Shield } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuditLogViewer() {
  const { data: logs, isLoading } = useGetAuditLog();
  const [filterAction, setFilterAction] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredLogs = logs?.filter(log => 
    filterAction === 'all' || log.action.includes(filterAction)
  ) || [];

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  const exportCSV = () => {
    const csv = [
      'Timestamp,Action,User,Details,Success',
      ...filteredLogs.map(log => 
        `${new Date(Number(log.timestamp) / 1000000).toISOString()},${log.action},${log.user.toString()},"${log.details}",${log.success}`
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-cyan-400" />
          <div>
            <h2 className="text-xl font-semibold">Audit Logs</h2>
            <p className="text-sm text-gray-400">Security-sensitive action tracking</p>
          </div>
        </div>
        <Button onClick={exportCSV} variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="mb-4 flex gap-3">
        <Select value={filterAction} onValueChange={setFilterAction}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="LOGIN">Authentication</SelectItem>
            <SelectItem value="ROLE">Role Changes</SelectItem>
            <SelectItem value="MEETING">Meeting Access</SelectItem>
            <SelectItem value="PANIC">Panic Protocol</SelectItem>
            <SelectItem value="ADMIN">Admin Panel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedLogs.map((log, idx) => (
            <TableRow key={idx}>
              <TableCell className="text-xs">
                {new Date(Number(log.timestamp) / 1000000).toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-mono text-xs">
                  {log.action}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-xs">
                {log.user.toString().slice(0, 12)}...
              </TableCell>
              <TableCell>
                <Badge variant={log.success ? 'default' : 'destructive'}>
                  {log.success ? 'Success' : 'Failed'}
                </Badge>
              </TableCell>
              <TableCell className="max-w-md truncate text-xs text-gray-400">
                {log.details}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
