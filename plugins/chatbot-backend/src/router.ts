import { HttpAuthService, DatabaseService } from '@backstage/backend-plugin-api';
import { InputError } from '@backstage/errors';
import { z } from 'zod';
import express from 'express';
import Router from 'express-promise-router';

export async function createRouter({
  database,
}: {
  httpAuth: HttpAuthService;
  database: DatabaseService;
}): Promise<express.Router> {

  const router = Router();
  router.use(express.json());

  const systemPromptSchema = z.object({
    prompt: z.string().min(1, 'Prompt cannot be empty'),
  });

  const DEFAULT_PROMPT =
    'Você é um assistente para desenvolvedores. Stack: React, TypeScript, Node.js';

  // Criar tabela automaticamente
  const ensureTable = async () => {
    const db = await database.getClient();
    const exists = await db.schema.hasTable('chatbot_system_prompt');

    if (!exists) {
      await db.schema.createTable('chatbot_system_prompt', table => {
        table.increments('id').primary();
        table.text('prompt').notNullable();
        table.timestamp('updated_at').defaultTo(db.fn.now());
      });

      await db('chatbot_system_prompt').insert({
        prompt: DEFAULT_PROMPT,
      });
    }
  };

  // GET /system-prompt
  router.get('/system-prompt', async (_req, res) => {
    try {
      await ensureTable();

      const db = await database.getClient();
      const result = await db('chatbot_system_prompt')
        .select('prompt', 'updated_at')
        .orderBy('updated_at', 'desc')
        .first();

      res.json(
        result || {
          prompt: DEFAULT_PROMPT,
          updated_at: new Date().toISOString(),
        },
      );
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch system prompt' });
    }
  });

  // PUT /system-prompt
  router.put('/system-prompt', async (req, res) => {
    try {
      const parsed = systemPromptSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new InputError(parsed.error.toString());
      }

      await ensureTable();

      const db = await database.getClient();
      const [result] = await db('chatbot_system_prompt')
        .insert({
          prompt: parsed.data.prompt,
        })
        .returning(['prompt', 'updated_at']);

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update system prompt' });
    }
  });

  return router;
}