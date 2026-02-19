import BentoCard from '../components/layout/BentoCard';
import ConnectionLog from '../components/sync/ConnectionLog';
import { QrCode } from 'lucide-react';

export default function DeviceSync() {
  const pairingUrl = `${window.location.origin}/remote`;

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Device Synchronization</h1>
        <p className="text-gray-400">Pair your mobile device for tactical remote control</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BentoCard>
          <div className="flex flex-col items-center p-8">
            <h3 className="mb-6 text-lg font-semibold">Mobile Pairing</h3>
            <div className="relative mb-6">
              <img
                src="/assets/generated/qr-frame.dim_512x512.png"
                alt="QR Frame"
                className="h-64 w-64"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <QrCode className="h-48 w-48 text-white" />
              </div>
            </div>
            <p className="mb-2 text-center text-sm text-gray-400">Scan with your mobile device</p>
            <code className="rounded bg-white/10 px-3 py-1 text-xs">{pairingUrl}</code>
          </div>
        </BentoCard>

        <BentoCard>
          <ConnectionLog />
        </BentoCard>
      </div>
    </div>
  );
}
