import { useEffect } from 'react';
import { isBrowser } from './helpers/browser';

const fontWeights = [100,200,300,400,500,600,700,800,900] as const;
type FontWeight = typeof fontWeights[number];

const fallbackWeights: FontWeight[] = [400, 700];

interface Options {
  default?: boolean;
  weights?: {
    normal?: FontWeight[];
    italic?: FontWeight[];
  };
}

export const useGoogleFont = (name: string, options?: Options): void => {
  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const normalWeights = options?.weights?.normal;
    const italicWeights = options?.weights?.italic;

    const link = document.createElement('link');
    link.rel = 'stylesheet';

    const encodedName = encodeURIComponent(name);

    const specs: string[] = [];
    
    if (!normalWeights || normalWeights.length === 0) {
      if (!italicWeights || italicWeights.length === 0) {
        specs.push(...fallbackWeights.map(w => `0,${w}`));
      }
    } else {
      specs.push(...normalWeights.map(w => `0,${w}`));
    }

    if (italicWeights && italicWeights.length > 0) {
      specs.push(...italicWeights.map(w => `1,${w}`));
    }

    link.href = `https://fonts.googleapis.com/css2?family=${encodedName}:ital,wght@${specs.join(';')}`;
    
    const handleLoad = () => {
      if (options?.default) {
        document.body.style.fontFamily = name;
      }
    };

    link.addEventListener('load', handleLoad);
    document.head.appendChild(link);

    return () => {
      link.removeEventListener('load', handleLoad);
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [name, options]);
};