import React from 'react';
import { Download, Share2, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ResultViewProps {
  generatedImage: string;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ generatedImage, onReset }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `neonlocks-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
      <div className="relative w-full max-h-[500px] aspect-[3/4] sm:aspect-square rounded-xl overflow-hidden border border-neon-blue/50 shadow-[0_0_30px_rgba(0,243,255,0.2)] bg-black">
        <img 
          src={generatedImage} 
          alt="Generated Result" 
          className="w-full h-full object-contain"
        />
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink via-neon-blue to-neon-purple opacity-80" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-between">
          <div className="space-y-1">
            <p className="text-neon-blue text-xs font-mono tracking-widest">GENERATION COMPLETE</p>
            <p className="text-white text-lg font-bold">New Look Applied</p>
          </div>
          <div className="flex gap-2">
             <button 
               onClick={handleDownload}
               className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
               title="Download"
             >
               <Download size={20} />
             </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8 w-full max-w-md">
        <Button onClick={onReset} variant="secondary" className="flex-1" icon={<RefreshCw size={18} />}>
          TRY AGAIN
        </Button>
        <Button onClick={handleDownload} variant="primary" className="flex-1" icon={<Download size={18} />}>
          DOWNLOAD
        </Button>
      </div>
    </div>
  );
};
