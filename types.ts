
export interface HairStylePreset {
  id: string;
  name: string;
  prompt: string;
  category: 'Natural' | 'Color' | 'Creative' | 'Short';
}

export interface AppState {
  originalImage: string | null; // base64
  generatedImage: string | null; // base64
  isGenerating: boolean;
  selectedStyleId: string | null;
  customPrompt: string;
  error: string | null;
}

export type GenerationConfig = {
  image: string; // base64
  prompt: string;
};
