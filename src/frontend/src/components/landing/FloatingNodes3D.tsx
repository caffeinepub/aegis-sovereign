import { useEffect, useRef } from 'react';

export default function FloatingNodes3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple CSS-based floating animation
    const container = containerRef.current;
    if (!container) return;

    const nodes = container.querySelectorAll('.floating-node');
    
    nodes.forEach((node, index) => {
      const element = node as HTMLElement;
      const delay = index * 0.5;
      element.style.animationDelay = `${delay}s`;
    });
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center">
      {/* Floating geometric shapes using CSS */}
      <div 
        className="floating-node absolute w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 opacity-80 blur-sm"
        style={{ 
          top: '20%', 
          left: '20%',
          animation: 'float 6s ease-in-out infinite'
        }} 
      />
      
      <div 
        className="floating-node absolute w-32 h-32 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 opacity-70 blur-sm rotate-45"
        style={{ 
          top: '60%', 
          right: '20%',
          animation: 'float 8s ease-in-out infinite'
        }} 
      />
      
      <div 
        className="floating-node absolute w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 opacity-75 blur-sm"
        style={{ 
          top: '10%', 
          right: '30%',
          animation: 'float 7s ease-in-out infinite'
        }} 
      />
      
      <div 
        className="floating-node absolute w-28 h-28 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 opacity-80 blur-sm rotate-12"
        style={{ 
          bottom: '20%', 
          left: '30%',
          animation: 'float 9s ease-in-out infinite'
        }} 
      />
      
      <div 
        className="floating-node absolute w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 opacity-70 blur-sm"
        style={{ 
          top: '40%', 
          right: '10%',
          animation: 'float 5s ease-in-out infinite'
        }} 
      />

      {/* Central glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 blur-3xl animate-pulse" />
      </div>
    </div>
  );
}
