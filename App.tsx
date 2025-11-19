
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { ResultView } from './components/ResultView';
import { Button } from './components/Button';
import { generateHairStyle } from './services/geminiService';
import { AppState } from './types';
import { ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    originalImage: null,
    generatedImage: null,
    isGenerating: false,
    selectedStyleId: null,
    customPrompt: '',
    error: null,
  });

  // Handle Image Upload
  const handleImageSelected = useCallback((base64: string) => {
    setState(prev => ({ 
      ...prev, 
      originalImage: base64, 
      generatedImage: null,
      error: null 
    }));
  }, []);

  // Handle Style Selection
  const handleSelectStyle = useCallback((id: string, prompt: string) => {
    setState(prev => ({ 
      ...prev, 
      selectedStyleId: id,
      customPrompt: id === 'custom' ? prev.customPrompt : prompt
    }));
  }, []);

  // Handle Custom Prompt Change
  const handleCustomPromptChange = useCallback((val: string) => {
    setState(prev => ({ ...prev, customPrompt: val }));
  }, []);

  // Clear Image
  const handleClear = useCallback(() => {
    setState({
      originalImage: null,
      generatedImage: null,
      isGenerating: false,
      selectedStyleId: null,
      customPrompt: '',
      error: null,
    });
  }, []);

  // Reset Result only
  const handleResetResult = useCallback(() => {
    setState(prev => ({ ...prev, generatedImage: null }));
  }, []);

  // Generate Image
  const handleGenerate = async () => {
    if (!state.originalImage || !state.customPrompt) return;

    setState(prev => ({ ...prev, isGenerating: true, error: null }));

    try {
      const resultImage = await generateHairStyle(state.originalImage, state.customPrompt);
      setState(prev => ({ ...prev, generatedImage: resultImage }));
    } catch (error) {
      console.error("Generation failed", error);
      let errorMessage = "Something went wrong with the AI connection.";
      if (error instanceof Error) {
        errorMessage = error.message;
        if (error.message.includes("API Key")) {
          errorMessage = "API Key configuration error. Please check setup.";
        }
      }
      setState(prev => ({ ...prev, error: errorMessage }));
    } finally {
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const canGenerate = !!state.originalImage && !!state.customPrompt && !state.isGenerating;

  return (
    <div className="min-h-screen bg-[#05050a] text-white selection:bg-neon-pink selection:text-white flex flex-col font-sans">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-[1600px]">
        
        {/* Error Banner */}
        {state.error && (
          <div className="mb-8 p-4 rounded border border-red-500/50 bg-red-900/20 flex items-center gap-3 text-red-200 animate-pulse">
            <AlertCircle className="shrink-0" />
            <p>{state.error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: Inputs & Controls */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            
            {/* Step 1: Image */}
            <div className="glass-panel p-5 rounded-2xl relative border-l-4 border-l-neon-blue">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-neon-blue rounded-lg flex items-center justify-center font-bold text-black shadow-[0_0_10px_#00f3ff] z-10 border border-white/20">1</div>
              <ImageUploader 
                currentImage={state.originalImage} 
                onImageSelected={handleImageSelected}
                onClear={handleClear}
              />
            </div>

            {/* Step 2: Style */}
            <div className={`glass-panel p-5 rounded-2xl relative transition-all duration-300 border-l-4 border-l-neon-pink ${!state.originalImage ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
               <div className="absolute -top-3 -left-3 w-8 h-8 bg-neon-pink rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_10px_#bc13fe] z-10 border border-white/20">2</div>
               <StyleSelector 
                 selectedStyleId={state.selectedStyleId}
                 onSelectStyle={handleSelectStyle}
                 customPrompt={state.customPrompt}
                 onCustomPromptChange={handleCustomPromptChange}
                 disabled={!state.originalImage || state.isGenerating}
               />
            </div>

            {/* Action Button */}
            <div className={`transition-all duration-300 ${!state.originalImage ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}>
               <Button 
                 onClick={handleGenerate} 
                 disabled={!canGenerate}
                 isLoading={state.isGenerating}
                 className="w-full text-lg py-4 shadow-[0_0_20px_rgba(0,243,255,0.15)] hover:shadow-[0_0_30px_rgba(0,243,255,0.4)]"
               >
                  GENERATE NEW LOOK
                  <ArrowRight className="ml-2 w-5 h-5" />
               </Button>
            </div>
          </div>

          {/* RIGHT PANEL: Result / Preview */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className={`
              w-full h-full min-h-[600px] lg:min-h-[800px] glass-panel p-4 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500
              ${state.generatedImage 
                ? 'border-neon-blue/50 bg-black/40 shadow-[0_0_40px_rgba(0,243,255,0.1)]' 
                : 'border-white/5 bg-neon-surface/30'}
            `}>
              
              {/* Background Grid for empty state */}
              {!state.generatedImage && (
                 <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
                 </div>
              )}

              {state.generatedImage ? (
                <ResultView 
                  generatedImage={state.generatedImage} 
                  onReset={handleResetResult}
                />
              ) : (
                <div className="text-center text-gray-500 z-10 max-w-md mx-auto">
                   {state.isGenerating ? (
                      <div className="flex flex-col items-center gap-6 p-8 rounded-xl bg-black/20 backdrop-blur-sm border border-white/5">
                        <div className="w-20 h-20 relative">
                          <div className="absolute inset-0 border-4 border-neon-blue/20 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-neon-pink animate-pulse" />
                          </div>
                        </div>
                        <div className="space-y-2">
                           <h3 className="text-white font-bold text-xl tracking-wide animate-pulse">DESIGNING HAIR...</h3>
                           <p className="text-sm font-mono text-neon-blue">AI IS PROCESSING YOUR IMAGE</p>
                        </div>
                      </div>
                   ) : (
                     <div className="flex flex-col items-center opacity-40">
                       <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center mb-6 bg-white/5">
                         <Sparkles size={48} />
                       </div>
                       <h3 className="text-xl font-semibold text-white mb-2">Ready to Create</h3>
                       <p className="text-gray-400">Upload an image and select a style on the left to see the magic happen here.</p>
                     </div>
                   )}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
