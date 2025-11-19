
import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { MAX_IMAGE_SIZE_MB } from '../constants';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  currentImage: string | null;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, currentImage, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG).');
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setError(`Image size must be less than ${MAX_IMAGE_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageSelected(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  if (currentImage) {
    return (
      <div className="relative w-full h-80 rounded-xl overflow-hidden border border-neon-blue/30 group shadow-[0_0_15px_rgba(0,243,255,0.1)]">
        <img 
          src={currentImage} 
          alt="Original" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={onClear}
            className="bg-red-500/80 hover:bg-red-600 text-white p-3 rounded-full transform hover:scale-110 transition-all backdrop-blur-md shadow-lg"
          >
            <X size={24} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 text-xs text-center text-neon-blue font-mono border-t border-neon-blue/20">
          ORIGINAL SOURCE
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`
        w-full h-80 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer
        flex flex-col items-center justify-center gap-4 p-6 relative overflow-hidden
        ${isDragging 
          ? 'border-neon-blue bg-neon-blue/5 shadow-[inset_0_0_20px_rgba(0,243,255,0.2)] scale-[1.02]' 
          : 'border-white/10 hover:border-neon-blue/50 hover:bg-white/5'
        }
      `}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      
      <div className={`p-5 rounded-full bg-neon-surface border border-white/10 transition-transform duration-500 ${isDragging ? 'scale-110' : 'scale-100'}`}>
        {isDragging ? <Upload className="text-neon-blue w-8 h-8 animate-bounce" /> : <ImageIcon className="text-gray-400 w-8 h-8" />}
      </div>
      
      <div className="text-center z-10">
        <h3 className="text-lg font-bold text-white mb-1">Upload Photo</h3>
        <p className="text-gray-400 text-xs mb-3 max-w-xs mx-auto leading-relaxed">
          Drag & drop or click to browse
        </p>
        <span className="text-[10px] text-gray-600 font-mono border border-gray-800 px-2 py-1 rounded bg-black/20">
          MAX {MAX_IMAGE_SIZE_MB}MB
        </span>
      </div>

      {error && (
        <div className="absolute bottom-4 left-4 right-4 bg-red-900/90 border border-red-500 text-white text-xs p-2 rounded text-center backdrop-blur-sm">
          {error}
        </div>
      )}

      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
      </div>
    </div>
  );
};
