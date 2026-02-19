import { useCallback, useState } from 'react';
import { Upload, FileAudio } from 'lucide-react';
import { toast } from 'sonner';

export default function VocalDropZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith('audio/'));

    if (droppedFiles.length > 0) {
      setFiles(droppedFiles);
      toast.success(`${droppedFiles.length} audio file(s) uploaded`);
    } else {
      toast.error('Please upload audio files only');
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all ${
        isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-white/20 bg-white/5'
      }`}
    >
      {files.length === 0 ? (
        <>
          <Upload className="mb-4 h-12 w-12 text-gray-400" />
          <p className="mb-2 text-sm font-medium">Drag & drop audio files here</p>
          <p className="text-xs text-gray-400">Supports MP3, WAV, M4A formats</p>
        </>
      ) : (
        <div className="w-full space-y-2 p-4">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
              <FileAudio className="h-5 w-5 text-blue-400" />
              <div className="flex-1">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
