import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Minimize2, Maximize2, X } from 'lucide-react';

export default function VideoWelcomeWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Card
      className={`fixed z-50 overflow-hidden border-emerald-500/30 bg-black/90 backdrop-blur-xl shadow-2xl shadow-emerald-500/20 transition-all duration-300 ${
        isMinimized
          ? 'bottom-4 right-4 h-16 w-16'
          : 'bottom-4 right-4 h-[240px] w-[360px] md:h-[280px] md:w-[420px]'
      }`}
    >
      {!isMinimized ? (
        <div className="relative h-full w-full">
          {/* Video Thumbnail */}
          <div className="relative h-full w-full">
            <img
              src="/assets/generated/video-operator-thumb.dim_320x180.png"
              alt="Operator Welcome"
              className="h-full w-full object-cover"
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="rounded-full bg-emerald-500/20 p-4 backdrop-blur-sm">
                  <Play className="h-12 w-12 text-emerald-500" />
                </div>
              </div>
            )}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-2 h-2 w-48 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-1/3 animate-pulse bg-emerald-500" />
                  </div>
                  <p className="text-sm text-gray-300">Welcome to AXON Sovereign...</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-8 w-8 p-0 text-white hover:bg-emerald-500/20 hover:text-emerald-500"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <span className="text-xs text-gray-400">Operator Briefing</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMinimized(true)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/10"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsVisible(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-red-500/20 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-full w-full bg-gradient-to-br from-emerald-500 to-cyan-500 p-0 hover:from-emerald-600 hover:to-cyan-600"
        >
          <Maximize2 className="h-6 w-6 text-white" />
        </Button>
      )}
    </Card>
  );
}
