import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ActiveStatusIndicator() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <div className="relative h-3 w-3">
              <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75"></div>
              <div className="relative h-3 w-3 rounded-full bg-green-400"></div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Status: Active</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
