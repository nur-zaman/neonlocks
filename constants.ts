import { HairStylePreset } from './types';

export const STYLE_PRESETS: HairStylePreset[] = [
  {
    id: 'blonde-bob',
    name: 'Platinum Bob',
    prompt: 'change the hair to a sleek platinum blonde bob cut, photorealistic',
    category: 'Natural',
  },
  {
    id: 'long-wavy-brunette',
    name: 'Wavy Brunette',
    prompt: 'change the hair to long, voluminous wavy dark brown hair, luxury style',
    category: 'Natural',
  },
  {
    id: 'pixie-pink',
    name: 'Neon Pink Pixie',
    prompt: 'change the hair to a short textured pixie cut dyed vibrant neon pink',
    category: 'Color',
  },
  {
    id: 'silver-fox',
    name: 'Silver Fox',
    prompt: 'change the hair to sophisticated silver grey hair, messy undercut style',
    category: 'Color',
  },
  {
    id: 'cyber-dreads',
    name: 'Cyber Dreads',
    prompt: 'change the hair to futuristic cybernetic dreadlocks with blue LED glowing tips',
    category: 'Creative',
  },
  {
    id: 'rainbow-braids',
    name: 'Rainbow Braids',
    prompt: 'change the hair to long box braids with a rainbow color gradient',
    category: 'Creative',
  },
  {
    id: 'buzz-cut',
    name: 'Clean Buzz',
    prompt: 'change the hair to a very short military buzz cut',
    category: 'Short',
  },
  {
    id: 'afro-volume',
    name: 'Mega Afro',
    prompt: 'change the hair to a large, perfectly shaped natural afro',
    category: 'Natural',
  },
];

export const MAX_IMAGE_SIZE_MB = 4;
