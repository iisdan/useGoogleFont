import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useGoogleFont } from './useGoogleFont';

jest.mock('./helpers/browser', () => ({
  isBrowser: jest.fn()
}));

import { isBrowser } from './helpers/browser';

describe('useGoogleFont', () => {
  let mockLink: HTMLLinkElement;
  let createElementSpy: jest.SpyInstance;
  let appendChildSpy: jest.SpyInstance;
  let removeChildSpy: jest.SpyInstance;
  let containsSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    (isBrowser as jest.Mock).mockReturnValue(true);

    mockLink = document.createElement('link');
    
    createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(mockLink);
    appendChildSpy = jest.spyOn(document.head, 'appendChild').mockReturnValue(mockLink);
    removeChildSpy = jest.spyOn(document.head, 'removeChild').mockReturnValue(mockLink);
    containsSpy = jest.spyOn(document.head, 'contains').mockReturnValue(true);

    document.body.style.fontFamily = '';
  });

  afterEach(() => {
    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
    containsSpy.mockRestore();
  });

  it('adds font link with default weights', () => {
    renderHook(() => useGoogleFont('Roboto'));
    expect(mockLink.href).toBe('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700');
    expect(mockLink.rel).toBe('stylesheet');
    expect(createElementSpy).toHaveBeenCalledWith('link');
    expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
  });

  it('adds font link with custom weights', () => {
    renderHook(() => useGoogleFont('Roboto', {
      weights: {
        normal: [300, 500],
        italic: [400]
      }
    }));
    expect(mockLink.href).toBe('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,500;1,400');
    expect(createElementSpy).toHaveBeenCalledWith('link');
    expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
  });

  it('sets default font family', () => {
    renderHook(() => useGoogleFont('Roboto', { default: true }));
    mockLink.dispatchEvent(new Event('load'));
    expect(document.body.style.fontFamily).toBe('Roboto');
  });

  it('handles font names with spaces', () => {
    renderHook(() => useGoogleFont('Open Sans'));
    expect(mockLink.href).toBe('https://fonts.googleapis.com/css2?family=Open%20Sans:ital,wght@0,400;0,700');
    expect(createElementSpy).toHaveBeenCalledWith('link');
    expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
  });

  it('handles empty weight arrays', () => {
    renderHook(() => useGoogleFont('Roboto', {
      weights: {
        normal: [],
        italic: []
      }
    }));
    expect(mockLink.href).toBe('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700');
    expect(createElementSpy).toHaveBeenCalledWith('link');
    expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
  });

  it('handles only italic weights', () => {
    renderHook(() => useGoogleFont('Roboto', {
      weights: {
        italic: [300, 400]
      }
    }));
    expect(mockLink.href).toBe('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,300;1,400');
    expect(createElementSpy).toHaveBeenCalledWith('link');
    expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
  });

  it('cleans up on unmount', () => {
    const { unmount } = renderHook(() => useGoogleFont('Roboto'));
    unmount();
    expect(removeChildSpy).toHaveBeenCalledWith(mockLink);
  });
}); 