import { useEffect, useState } from 'react';
import ActiveStatusIndicator from '../common/ActiveStatusIndicator';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  delay: number;
}

const nodes: Node[] = [
  { id: 'sf', x: 15, y: 35, label: 'San Francisco', delay: 0 },
  { id: 'london', x: 48, y: 28, label: 'London', delay: 0.5 },
  { id: 'tokyo', x: 85, y: 32, label: 'Tokyo', delay: 1 },
  { id: 'bangalore', x: 72, y: 48, label: 'Bangalore', delay: 1.5 },
];

export default function GlobalNodeMap() {
  const [activeNodes, setActiveNodes] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      setActiveNodes((prev) => [...prev, randomNode.id]);
      setTimeout(() => {
        setActiveNodes((prev) => prev.filter((id) => id !== randomNode.id));
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Global Node Map</h3>
          <p className="text-sm text-gray-400">Distributed network status</p>
        </div>
        <ActiveStatusIndicator />
      </div>

      <div className="relative h-64 w-full">
        <svg viewBox="0 0 100 60" className="h-full w-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Simplified world map outline */}
          <path
            d="M10,30 Q20,25 30,30 T50,30 Q60,28 70,30 T90,32 M15,40 Q25,38 35,40 T55,42 Q65,40 75,42 T85,45"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
            fill="none"
          />

          {/* Nodes */}
          {nodes.map((node) => {
            const isActive = activeNodes.includes(node.id);
            return (
              <g key={node.id}>
                {isActive && (
                  <>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="3"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="0.5"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="r"
                        from="3"
                        to="8"
                        dur="2s"
                        repeatCount="1"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2s"
                        repeatCount="1"
                      />
                    </circle>
                  </>
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="1.5"
                  fill="#3b82f6"
                  filter="url(#glow)"
                  className={isActive ? 'animate-pulse' : ''}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  fontSize="3"
                  fill="rgba(255,255,255,0.7)"
                  textAnchor="middle"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
