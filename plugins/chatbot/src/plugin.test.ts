import { chatbotPlugin } from './plugin';

describe('chatbot', () => {
  it('should export plugin', () => {
    expect(chatbotPlugin).toBeDefined();
  });
});
