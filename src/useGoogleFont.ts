import { useEffect } from 'react';

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

  function isBrowser() {
    return typeof window !== 'undefined';
  }

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    const normalWeights = options?.weights?.normal || fallbackWeights;
    const italicWeights = options?.weights?.italic || [];

    const link = document.createElement('link');
    link.rel = 'stylesheet';

    const encodedName = encodeURIComponent(name);

    const normalSpec = normalWeights.map(w => `0,${w}`).join(';');
    const italicSpec = italicWeights.map(w => `1,${w}`).join(';');

    const specs = [normalSpec, italicSpec].filter(Boolean).join(';');

    link.href = `https://fonts.googleapis.com/css2?family=${encodedName}:ital,wght@${specs}`;
    
    if (options?.default) {
      link.onload = () => {
          document.body.style.fontFamily = name;
      }
    }

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [name, options]);
};
