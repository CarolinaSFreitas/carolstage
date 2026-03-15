import { createApiRef, DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';

export interface SystemPrompt {
  prompt: string;
  updated_at: string;
}

export interface ChatbotSystemPromptApi {
  getSystemPrompt(): Promise<SystemPrompt>;
  setSystemPrompt(prompt: string): Promise<SystemPrompt>;
}

export const chatbotSystemPromptApiRef = createApiRef<ChatbotSystemPromptApi>({
  id: 'plugin.chatbot.systemprompt.service',
});

export const createChatbotSystemPromptApi = (
  discoveryApi: DiscoveryApi,
  fetchApi: FetchApi,
): ChatbotSystemPromptApi => ({
  async getSystemPrompt(): Promise<SystemPrompt> {
    const baseUrl = await discoveryApi.getBaseUrl('chatbot');
    const response = await fetchApi.fetch(`${baseUrl}/system-prompt`);

    if (!response.ok) {
      throw new Error(`Failed to fetch system prompt: ${response.statusText}`);
    }

    return await response.json();
  },

  async setSystemPrompt(prompt: string): Promise<SystemPrompt> {
    const baseUrl = await discoveryApi.getBaseUrl('chatbot');
    const response = await fetchApi.fetch(`${baseUrl}/system-prompt`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update system prompt: ${response.statusText}`);
    }

    return await response.json();
  },
});