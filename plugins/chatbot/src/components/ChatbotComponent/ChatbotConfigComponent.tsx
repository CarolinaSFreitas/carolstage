import React, { useEffect, useState } from 'react';
import { Alert } from '@material-ui/lab';
import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Snackbar,
    TextField,
    Typography,
} from '@material-ui/core';
import { useApi } from '@backstage/core-plugin-api';
import { chatbotSystemPromptApiRef, SystemPrompt } from '@internal/backstage-plugin-chatbot';


export const ChatbotConfigComponent = () => {
    const [prompt, setPrompt] = useState('');
    const [originalPrompt, setOriginalPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const systemPromptApi = useApi(chatbotSystemPromptApiRef);

    useEffect(() => {
        const loadSystemPrompt = async () => {
            setLoading(true);

            try {
                const systemPrompt: SystemPrompt =
                    await systemPromptApi.getSystemPrompt();

                setPrompt(systemPrompt.prompt);
                setOriginalPrompt(systemPrompt.prompt);
            } catch (error) {
                setNotification({
                    open: true,
                    message: 'Erro ao carregar prompt do sistema',
                    severity: 'error',
                });
            } finally {
                setLoading(false);
            }
        };

        loadSystemPrompt();
    }, [systemPromptApi]);

    const handleSave = async () => {
        if (!prompt.trim()) {
            setNotification({
                open: true,
                message: 'O prompt não pode estar vazio',
                severity: 'error',
            });
            return;
        }

        setSaving(true);

        try {
            await systemPromptApi.setSystemPrompt(prompt.trim());
            setOriginalPrompt(prompt.trim());

            setNotification({
                open: true,
                message: 'Prompt salvo com sucesso!',
                severity: 'success',
            });
        } catch (error) {
            setNotification({
                open: true,
                message: 'Erro ao salvar prompt',
                severity: 'error',
            });
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setPrompt(originalPrompt);
    };

    const hasChanges = prompt.trim() !== originalPrompt;

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="400px"
            >
                <CircularProgress />
                <Typography style={{ marginLeft: 16 }}>
                    Carregando configurações...
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Paper style={{ padding: 24, marginBottom: 16 }}>
                <Typography variant="h6" style={{ marginBottom: 16 }}>
                    Configuração do Sistema Prompt
                </Typography>

                <TextField
                    label="Sistema Prompt"
                    placeholder="Digite as instruções para o chatbot..."
                    multiline
                    rows={8}
                    variant="outlined"
                    fullWidth
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    disabled={saving}
                    style={{ marginBottom: 16 }}
                />

                <Box display="flex" style={{ gap: 16 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={saving || !hasChanges || !prompt.trim()}
                    >
                        {saving ? <CircularProgress size={20} /> : 'Salvar'}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={handleCancel}
                        disabled={saving || !hasChanges}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={notification.open}
                autoHideDuration={4000}
                onClose={() =>
                    setNotification({ ...notification, open: false })
                }
            >
                <Alert severity={notification.severity}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};