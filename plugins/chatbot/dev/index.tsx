import { createDevApp } from '@backstage/dev-utils';
import { chatbotPlugin, ChatbotPage } from '../src/plugin';

createDevApp()
  .registerPlugin(chatbotPlugin)
  .addPage({
    element: <ChatbotPage />,
    title: 'Root Page',
    path: '/chatbot',
  })
  .render();
