import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  avatarSrc: string;
  name: string;
  title: string;
  quote: string;
}

export default function TestimonialCard({ avatarSrc, name, title, quote }: TestimonialCardProps) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/10">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-emerald-500/30">
            <AvatarImage src={avatarSrc} alt={name} />
            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-cyan-500 text-white">
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold text-white">{name}</h4>
            <p className="text-sm text-gray-400">{title}</p>
          </div>
        </div>
        <div className="mb-4 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
          ))}
        </div>
        <blockquote className="text-gray-300 italic leading-relaxed">"{quote}"</blockquote>
      </CardContent>
    </Card>
  );
}
