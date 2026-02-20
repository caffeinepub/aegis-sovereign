import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface FileData {
  name: string;
  securityLevel: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Archived' | 'Pending';
  owner: string;
}

const files: FileData[] = [
  { name: 'Q4_Financial_Report.pdf', securityLevel: 'High', status: 'Active', owner: 'Alex Rivera' },
  { name: 'Product_Roadmap_2024.docx', securityLevel: 'Medium', status: 'Active', owner: 'Sarah Chen' },
  { name: 'Client_Database_Backup.sql', securityLevel: 'High', status: 'Active', owner: 'Michael Torres' },
  { name: 'Marketing_Strategy.pptx', securityLevel: 'Low', status: 'Archived', owner: 'Emma Wilson' },
  { name: 'Security_Audit_Log.csv', securityLevel: 'High', status: 'Active', owner: 'Alex Rivera' },
  { name: 'Employee_Handbook.pdf', securityLevel: 'Medium', status: 'Pending', owner: 'HR Department' },
];

export default function RecentFilesTable() {
  const getSecurityBadge = (level: string) => {
    const variants = {
      High: 'bg-red-100 text-red-700 border-red-200',
      Medium: 'bg-amber-100 text-amber-700 border-amber-200',
      Low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };
    return variants[level as keyof typeof variants] || variants.Low;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      Archived: 'bg-slate-100 text-slate-700 border-slate-200',
      Pending: 'bg-amber-100 text-amber-700 border-amber-200',
    };
    return variants[status as keyof typeof variants] || variants.Pending;
  };

  return (
    <Card className="bg-white border-slate-200 shadow-sm rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-900">Recent Files</CardTitle>
        <p className="text-sm text-slate-600">Latest documents in your vault</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-700">Name</TableHead>
                <TableHead className="font-semibold text-slate-700">Security Level</TableHead>
                <TableHead className="font-semibold text-slate-700">Status</TableHead>
                <TableHead className="font-semibold text-slate-700">Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file, index) => (
                <TableRow key={index} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium text-slate-900">{file.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getSecurityBadge(file.securityLevel)}>
                      {file.securityLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadge(file.status)}>
                      {file.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">{file.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
