import '@testing-library/jest-dom';

// Create a root element for React Testing Library
const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Create a proper mock link element
const mockLink = document.createElement('link');
Object.defineProperty(mockLink, 'href', {
  get() {
    return this._href || '';
  },
  set(value) {
    this._href = value;
  }
});

// Mock document.createElement to track link creation
const originalCreateElement = document.createElement.bind(document);
jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
  if (tagName === 'link') {
    return mockLink;
  }
  return originalCreateElement(tagName);
});

// Mock document.head.appendChild
jest.spyOn(document.head, 'appendChild').mockImplementation(() => mockLink);

// Mock document.head.removeChild
jest.spyOn(document.head, 'removeChild').mockImplementation(() => mockLink);

// Mock document.head.contains
jest.spyOn(document.head, 'contains').mockImplementation(() => true);

// Reset document.body.style.fontFamily after each test
afterEach(() => {
  document.body.style.fontFamily = '';
});

// Export mockLink for use in tests
export { mockLink }; 