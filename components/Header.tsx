import React from 'react';
import { Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-6 sm:px-12 flex items-center justify-between border-b border-white/5 bg-[#05050a]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="relative">
          <div className="absolute inset-0 bg-neon-pink blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Zap className="w-8 h-8 text-white relative z-10 transform -skew-x-12 group-hover:scale-110 transition-transform" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter text-white leading-none">
            NEON<span className="text-neon-blue">LOCKS</span>
          </h1>
          <span className="text-[10px] text-gray-400 font-mono tracking-widest">AI HAIR STUDIO</span>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-4">
        <span className="px-3 py-1 rounded-full border border-neon-blue/30 text-neon-blue text-xs font-mono bg-neon-blue/5">
          POWERED BY NANO BANANA
        </span>
      </div>
    </header>
  );
};
