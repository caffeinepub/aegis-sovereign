import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ActiveStatusIndicator from '../common/ActiveStatusIndicator';

interface EmotionData {
  time: string;
  joy: number;
  surprise: number;
  fear: number;
  disgust: number;
  anger: number;
  sadness: number;
  neutral: number;
}

const EMOTIONS = [
  { key: 'joy', color: '#eab308', name: 'Joy' },
  { key: 'surprise', color: '#06b6d4', name: 'Surprise' },
  { key: 'fear', color: '#a855f7', name: 'Fear' },
  { key: 'disgust', color: '#10b981', name: 'Disgust' },
  { key: 'anger', color: '#ef4444', name: 'Anger' },
  { key: 'sadness', color: '#3b82f6', name: 'Sadness' },
  { key: 'neutral', color: '#6b7280', name: 'Neutral' },
];

export default function EmotionTracker() {
  const [data, setData] = useState<EmotionData[]>([]);
  const [visibleEmotions, setVisibleEmotions] = useState<Set<string>>(
    new Set(EMOTIONS.map(e => e.key))
  );

  useEffect(() => {
    const generateData = () => {
      const newData: EmotionData[] = [];
      for (let i = 0; i <= 10; i++) {
        const emotions = {
          joy: Math.random() * 30,
          surprise: Math.random() * 20,
          fear: Math.random() * 15,
          disgust: Math.random() * 10,
          anger: Math.random() * 10,
          sadness: Math.random() * 15,
          neutral: 0,
        };
        
        const total = Object.values(emotions).reduce((a, b) => a + b, 0);
        emotions.neutral = Math.max(0, 100 - total);
        
        newData.push({
          time: `${i}:00`,
          ...emotions,
        });
      }
      setData(newData);
    };

    generateData();
    const interval = setInterval(generateData, 6000);
    return () => clearInterval(interval);
  }, []);

  const toggleEmotion = (emotion: string) => {
    setVisibleEmotions(prev => {
      const next = new Set(prev);
      if (next.has(emotion)) {
        next.delete(emotion);
      } else {
        next.add(emotion);
      }
      return next;
    });
  };

  return (
    <div className="relative h-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Emotion Tracker</h3>
          <p className="text-sm text-gray-400">Real-time participant emotion analysis</p>
        </div>
        <ActiveStatusIndicator />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#000',
              border: '1px solid #333',
              borderRadius: '8px',
            }}
          />
          <Legend
            onClick={(e) => toggleEmotion(e.dataKey as string)}
            wrapperStyle={{ cursor: 'pointer' }}
          />
          {EMOTIONS.map(emotion => (
            visibleEmotions.has(emotion.key) && (
              <Area
                key={emotion.key}
                type="monotone"
                dataKey={emotion.key}
                stackId="1"
                stroke={emotion.color}
                fill={emotion.color}
                fillOpacity={0.6}
                name={emotion.name}
              />
            )
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
