export default function BorderBeam() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
      <div className="absolute inset-0 animate-border-beam bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <style>{`
        @keyframes border-beam {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
        .animate-border-beam {
          animation: border-beam 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
