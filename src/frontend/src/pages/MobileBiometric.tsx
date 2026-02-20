import { useState } from 'react';
import BiometricScanner from '../components/mobile/BiometricScanner';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function MobileBiometric() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div className="flex items-center gap-4 border-b border-white/10 p-4">
        <button
          onClick={() => navigate({ to: '/remote' })}
          className="rounded-lg p-2 hover:bg-white/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Biometric Authentication</h1>
      </div>

      <BiometricScanner />
    </div>
  );
}
