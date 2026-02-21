import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link2, CheckCircle2 } from 'lucide-react';
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
    
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      toast.success('Intelligence link verified');
    }, 1500);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-[#10b981]/30">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Link2 className="h-6 w-6 text-[#10b981]" />
          NEURAL INGEST
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="url"
          placeholder="SECURE_MEETING_LINK"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setIsVerified(false);
          }}
          className="font-mono text-sm border-[#10b981]/30 focus:border-[#10b981]"
        />
        <Button
          onClick={handleVerify}
          disabled={isVerifying || !url}
          className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-semibold"
        >
          {isVerifying ? (
            'VERIFYING...'
          ) : isVerified ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              VERIFIED
            </>
          ) : (
            'VERIFY INTELLIGENCE LINK'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
