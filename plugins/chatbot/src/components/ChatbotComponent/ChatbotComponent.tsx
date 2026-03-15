import React, { useEffect, useRef, useState } from 'react';
import SendIcon from '@material-ui/icons/Send';

import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Divider,
  AppBar,
  Tabs,
  Tab,
  IconButton,
} from '@material-ui/core';

import {
  Header,
  Page,
  Content,
  HeaderLabel,
} from '@backstage/core-components';

import { useApi } from '@backstage/core-plugin-api';

import {
  chatbotApiRef,
  chatbotSystemPromptApiRef,
  ChatRole,
  ChatMessage,
  SystemPrompt,
} from '@internal/backstage-plugin-chatbot';

import { ChatbotConfigComponent } from './ChatbotConfigComponent';

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <div hidden={value !== index}>
    {value === index && children}
  </div>
);

type ChatMsg = {
  role: 'user' | 'bot';
  content: string;
};

export const ChatbotComponent = () => {
  const [tabValue, setTabValue] = useState(0);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatbotApi = useApi(chatbotApiRef);
  const systemPromptApi = useApi(chatbotSystemPromptApiRef);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [chat, loading]);

  const sendQuestion = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();

    setChat(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      // Buscar prompt mais recente
      const currentPrompt: SystemPrompt =
        await systemPromptApi.getSystemPrompt();

      const chatHistory = [...chat, { role: 'user', content: userMsg }];

      const messages: ChatMessage[] = [
        {
          role: ChatRole.SYSTEM,
          content: currentPrompt.prompt,
        },
        ...chatHistory.map(msg => ({
          role:
            msg.role === 'user'
              ? ChatRole.USER
              : ChatRole.ASSISTANT,
          content: msg.content,
        })),
      ];

      const response = await chatbotApi.sendMessage(messages);

      setChat(prev => [
        ...prev,
        {
          role: 'bot',
          content: response,
        },
      ]);
    } catch (error) {
      setChat(prev => [
        ...prev,
        {
          role: 'bot',
          content: 'Erro ao processar sua mensagem. Tente novamente.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page themeId="chatbot">
      <Header
        title="Chatbot"
        subtitle="Assistente de desenvolvimento"
      >
        <HeaderLabel label="Status" value="Online" />
        <HeaderLabel label="Versão" value="2.0" />
      </Header>

      <Content>
        <Paper>
          <AppBar position="static" color="default" elevation={0}>
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Chat" />
              <Tab label="Configurações" />
            </Tabs>
          </AppBar>

          {/* CHAT */}
          <TabPanel value={tabValue} index={0}>
            <Box
              flexDirection="column"
              alignItems="center"
              height="60vh"
              p={2}
            >
              <Paper
                style={{
                  padding: 16,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: 800,
                  width: '100%',
                  margin: '0 auto',
                }}
              >
                <Box
                  flex={1}
                  style={{ overflowY: 'auto', marginBottom: 8 }}
                >
                  {chat.length === 0 && (
                    <Typography
                      color="textSecondary"
                      align="center"
                      style={{ marginTop: 40 }}
                    >
                      Como posso ajudar você hoje?
                    </Typography>
                  )}

                  {chat.map((msg, idx) => (
                    <Box
                      key={idx}
                      display="flex"
                      flexDirection="column"
                      alignItems={
                        msg.role === 'user'
                          ? 'flex-end'
                          : 'flex-start'
                      }
                      mb={1}
                    >
                      <Box
                        style={{
                          background:
                            msg.role === 'user'
                              ? '#1976d2'
                              : '#e0e0e0',
                          color:
                            msg.role === 'user'
                              ? '#fff'
                              : '#333',
                          borderRadius: 16,
                          padding: '8px 14px',
                          maxWidth: '70%',
                          wordBreak: 'break-word',
                        }}
                      >
                        {msg.content}
                      </Box>

                      <Typography
                        variant="caption"
                        color="textSecondary"
                        style={{ marginTop: 4 }}
                      >
                        {msg.role === 'user' ? 'Você' : 'Bot'}
                      </Typography>
                    </Box>
                  ))}

                  {loading && (
                    <Box display="flex" alignItems="center" mb={1}>
                      <CircularProgress size={18} />
                      <Typography
                        style={{ marginLeft: 8 }}
                        variant="body2"
                        color="textSecondary"
                      >
                        Pensando...
                      </Typography>
                    </Box>
                  )}

                  <div ref={messagesEndRef} />
                </Box>

                <Divider />

                <Box display="flex" alignItems="center" mt={1}>
                  <TextField
                    placeholder="Digite sua pergunta"
                    variant="outlined"
                    value={input}
                    disabled={loading}
                    fullWidth
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e =>
                      e.key === 'Enter' &&
                      !loading &&
                      sendQuestion()
                    }
                  />

                  <IconButton
                    color="primary"
                    disabled={loading || !input.trim()}
                    onClick={sendQuestion}
                    style={{ marginLeft: 8 }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box p={3}>
              <ChatbotConfigComponent />
            </Box>
          </TabPanel>
        </Paper>
      </Content>
    </Page>
  );
};