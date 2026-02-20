import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { Search } from 'lucide-react';

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const SHORTCUTS: Shortcut[] = [
  { keys: ['Ctrl', 'Shift', 'P'], description: 'Trigger panic protocol', category: 'Security Protocols' },
  { keys: ['Ctrl', 'Shift', 'Q'], description: 'Dismiss panic overlay', category: 'Security Protocols' },
  { keys: ['Ctrl', 'Shift', 'G'], description: 'Toggle ghost mode', category: 'Privacy Features' },
  { keys: ['Ctrl', 'Shift', 'F'], description: 'Toggle FPS counter', category: 'System Commands' },
  { keys: ['?'], description: 'Show keyboard shortcuts', category: 'Navigation' },
  { keys: ['Esc'], description: 'Close modals and overlays', category: 'Navigation' },
];

const CATEGORIES = ['Security Protocols', 'Environment Controls', 'Privacy Features', 'System Commands', 'Navigation'];

export default function HotkeysReferenceModal() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  useKeyboardShortcut(['?'], () => setOpen(true));
  useKeyboardShortcut(['Escape'], () => setOpen(false));

  const filteredShortcuts = SHORTCUTS.filter(shortcut =>
    shortcut.description.toLowerCase().includes(search.toLowerCase()) ||
    shortcut.keys.some(key => key.toLowerCase().includes(search.toLowerCase()))
  );

  const shortcutsByCategory = CATEGORIES.map(category => ({
    category,
    shortcuts: filteredShortcuts.filter(s => s.category === category),
  })).filter(group => group.shortcuts.length > 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl border-white/20 bg-black/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Keyboard Shortcuts</DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search shortcuts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Accordion type="multiple" className="w-full" defaultValue={CATEGORIES}>
          {shortcutsByCategory.map(({ category, shortcuts }) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="text-lg font-semibold">
                {category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {shortcuts.map((shortcut, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                      <span className="text-sm text-gray-300">{shortcut.description}</span>
                      <div className="flex gap-1">
                        {shortcut.keys.map((key, keyIdx) => (
                          <kbd
                            key={keyIdx}
                            className="rounded border border-white/20 bg-white/10 px-2 py-1 text-xs font-semibold text-emerald-400"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-4 text-center text-xs text-gray-500">
          Press <kbd className="rounded border border-white/20 bg-white/10 px-2 py-1 font-semibold">?</kbd> to toggle this panel
        </div>
      </DialogContent>
    </Dialog>
  );
}
