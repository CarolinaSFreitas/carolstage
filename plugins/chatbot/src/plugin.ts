import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const chatbotPlugin = createPlugin({
  id: 'chatbot',
  routes: {
    root: rootRouteRef,
  },
});

export const ChatbotPage = chatbotPlugin.provide(
  createRoutableExtension({
    name: 'ChatbotPage',
    component: () =>
      import('./components/ChatbotComponent').then(m => m.ChatbotComponent),
    mountPoint: rootRouteRef,
  }),
);
