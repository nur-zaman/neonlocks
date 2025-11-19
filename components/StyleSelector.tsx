import React from 'react';
import { STYLE_PRESETS } from '../constants';
import { Sparkles, Wand2 } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyleId: string | null;
  onSelectStyle: (id: string, prompt: string) => void;
  customPrompt: string;
  onCustomPromptChange: (val: string) => void;
  disabled: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedStyleId,
  onSelectStyle,
  customPrompt,
  onCustomPromptChange,
  disabled
}) => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Sparkles className="text-neon-pink w-5 h-5" />
          <span className="neon-text">SELECT PRESET</span>
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {STYLE_PRESETS.map((style) => (
            <button
              key={style.id}
              onClick={() => onSelectStyle(style.id, style.prompt)}
              disabled={disabled}
              className={`
                relative p-4 rounded-lg border text-left transition-all duration-200 group
                flex flex-col justify-between min-h-[100px]
                ${selectedStyleId === style.id 
                  ? 'border-neon-pink bg-neon-pink/10 shadow-[0_0_15px_rgba(188,19,254,0.3)] scale-[1.02]' 
                  : 'border-white/10 bg-neon-surface hover:border-neon-pink/50 hover:bg-white/5'
                }
              `}
            >
              <span className={`text-sm font-bold ${selectedStyleId === style.id ? 'text-white' : 'text-gray-300'}`}>
                {style.name}
              </span>
              <span className="text-[10px] text-gray-500 font-mono uppercase mt-2 border border-gray-800 self-start px-1 rounded">
                {style.category}
              </span>
              
              {/* Active Indicator */}
              {selectedStyleId === style.id && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-neon-pink animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Wand2 className="text-neon-blue w-5 h-5" />
          <span className="neon-text">CUSTOM PROMPT</span>
        </h2>
        <div className="relative group">
          <textarea
            value={customPrompt}
            onChange={(e) => {
              onCustomPromptChange(e.target.value);
              if (selectedStyleId !== 'custom') {
                onSelectStyle('custom', e.target.value);
              }
            }}
            disabled={disabled}
            placeholder="Describe a custom hairstyle... e.g. 'Fiery red mohawk with shaved sides'"
            className={`
              w-full bg-neon-surface border rounded-lg p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 resize-none h-28 transition-all
              ${selectedStyleId === 'custom' ? 'border-neon-blue ring-neon-blue' : 'border-white/10 focus:border-neon-blue'}
            `}
          />
          <div className="absolute bottom-2 right-2 text-[10px] text-gray-600 font-mono pointer-events-none">
            GEMINI 2.5
          </div>
        </div>
      </div>
    </div>
  );
};
