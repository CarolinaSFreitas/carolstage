import { createApiRef, DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';

export enum ChatRole {
    USER = 'user',
    ASSISTANT = 'assistant',
    SYSTEM = 'system',
}

export interface ChatMessage {
    role: ChatRole;
    content: string;
}

export interface ChatbotApi {
    sendMessage(messages: ChatMessage[]): Promise<string>;
}

export const chatbotApiRef = createApiRef<ChatbotApi>({
    id: 'plugin.chatbot.service',
});

export const createChatbotApi = (
    discoveryApi: DiscoveryApi, //serve pra isolar a chamada do proxy, evitando hardcode de URL
    fetchApi: FetchApi,
): ChatbotApi => ({

    async sendMessage(messages: ChatMessage[]): Promise<string> {
        const baseUrl = await discoveryApi.getBaseUrl('proxy'); //rota que repassa pro OpenAI, definida no app-config.yaml
        const response = await fetchApi.fetch(`${baseUrl}/openai/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'gpt-3.5-turbo', messages, max_tokens: 200 }),
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content ?? 'Erro na resposta';
    },

});