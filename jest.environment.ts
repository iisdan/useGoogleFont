import JSDOMEnvironment from 'jest-environment-jsdom';
import { TextEncoder, TextDecoder } from 'util';

class CustomEnvironment extends JSDOMEnvironment {
  constructor(config: any, context: any) {
    super(config, context);
  }

  async setup(): Promise<void> {
    await super.setup();
    
    if (typeof this.global.TextEncoder === 'undefined') {
      this.global.TextEncoder = TextEncoder;
      this.global.TextDecoder = TextDecoder;
    }
  }
}

export default CustomEnvironment; 