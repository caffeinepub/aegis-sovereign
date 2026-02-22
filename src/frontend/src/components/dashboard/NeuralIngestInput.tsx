import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link2, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function NeuralIngestInput() {
  const [url, setUrl] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async () => {
    if (!url) {
      toast.error('Please enter a meeting link');
      return;
    }

    try {
      new URL(url);
    } catch {
      toast.error('Invalid URL format');
      return;
    }

    setIsVerifying(true);
    
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      toast.success('Intelligence link verified');
    }, 1500);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-100">
            <Link2 className="h-5 w-5 text-blue-600" />
          </div>
          Neural Ingest
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="url"
            placeholder="Enter secure meeting link..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setIsVerified(false);
            }}
            className="flex-1 h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button
            onClick={handleVerify}
            disabled={isVerifying || !url}
            className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            {isVerifying ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : isVerified ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Verified
              </>
            ) : (
              'Verify Link'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
