import {
  Header,
  Page,
  Content,
  HeaderLabel,
} from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { Box, CircularProgress, Divider, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useState } from 'react';
import { chatbotApiRef, ChatMessage, ChatRole } from '../../apis/ChatbotAPI';

const SYSTEM_PROMPT = `Você é um assistente para desenvolvedores. Stack: React, TypeScript, Node.js`;

type ChatMsg = { role: 'user' | 'bot'; content: string };

export const ChatbotComponent = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [loading, setLoading] = useState(false);
  const chatbotApi = useApi(chatbotApiRef);

  const sendQuestion = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();

    setChat(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const messages: ChatMessage[] = [
        { role: ChatRole.SYSTEM, content: SYSTEM_PROMPT },
        ...[...chat, { role: 'user', content: userMsg }].map(msg => ({
          role: msg.role === 'user' ? ChatRole.USER : ChatRole.ASSISTANT,
          content: msg.content
        }))
      ];

      const response = await chatbotApi.sendMessage(messages);
      setChat(prev => [...prev, { role: 'bot', content: response }]);
    } catch {
      setChat(prev => [...prev, { role: 'bot', content: 'Erro. Tente novamente.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page themeId="chatbot">
      <Header title="Chatbot" subtitle="Pergunte sobre tecnologia">
        <HeaderLabel label="Status" value="Online" />
      </Header>

      <Content>
        <Box flexDirection="column" alignItems="center" height="90vh">
          <Paper style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column' }}>

            <Box flex={1} style={{ overflowY: 'auto', marginBottom: 8 }}>
              {chat.length === 0 && (
                <Typography color="textSecondary" align="center" style={{ marginTop: 40 }}>
                  Como posso ajudar?
                </Typography>
              )}

              {chat.map((msg, idx) => (
                <Box
                  key={idx}
                  display="flex"
                  flexDirection="column"
                  alignItems={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                >
                  <Box
                    style={{
                      background: msg.role === 'user' ? '#1976d2' : '#e0e0e0',
                      color: msg.role === 'user' ? '#fff' : '#333',
                      borderRadius: 16,
                      padding: '8px 14px',
                      margin: '4px 0'
                    }}
                  >
                    {msg.content}
                  </Box>
                </Box>
              ))}

              {loading && (
                <Box display="flex" justifyContent="center" mt={2}>
                  <CircularProgress size={24} />
                </Box>
              )}
            </Box>

            <Divider />

            <Box display="flex" mt={1}>
              <TextField
                placeholder="Digite sua pergunta"
                value={input}
                disabled={loading}
                fullWidth
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !loading && sendQuestion()}
              />

              <IconButton
                color="primary"
                disabled={loading || !input.trim()}
                onClick={sendQuestion}
              >
                <SendIcon />
              </IconButton>
            </Box>

          </Paper>
        </Box>
      </Content>
    </Page>
  );
};