interface NeuralProgressProps {
  progress: number;
}

export default function NeuralProgress({ progress }: NeuralProgressProps) {
  return (
    <div className="relative flex h-48 w-48 items-center justify-center">
      <svg className="h-full w-full -rotate-90 transform">
        <circle
          cx="96"
          cy="96"
          r="88"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="96"
          cy="96"
          r="88"
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 88}`}
          strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold">{progress}%</span>
        <span className="text-sm text-gray-400">Synthesizing</span>
      </div>
    </div>
  );
}
