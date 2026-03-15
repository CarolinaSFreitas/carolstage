import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';

import { createRouter } from './router';

export const chatbotPlugin = createBackendPlugin({
  pluginId: 'chatbot',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        database: coreServices.database,
      },

      async init({ logger, httpAuth, httpRouter, database }) {
        logger.info('Initializing chatbot backend plugin...');

        httpRouter.use(
          await createRouter({
            httpAuth,
            database,
          }),
        );
      },
    });
  },
});