# 📘 Notas — Backstage (Templates, Actions e Scaffolder)

---

# 🧠 Fluxo Geral do Template

1. Usuária preenche os **parâmetros**
2. O template executa os **steps**
3. Cada step executa uma **action**

Resumo mental:

Parameters → Steps → Actions

---

# 🧩 Estrutura de um Step

No `template.yaml`, você pode mapear quantos steps quiser.

Exemplos de uso:
- Criar repositório
- Gerar arquivos
- Abrir PR
- Criar Issue
- Enviar notificação
- Executar workflow
- Etc.

### Estrutura básica:

```yaml
steps:
  - id: step-id
    name: Nome amigável
    action: nome:da-action
    input:
      parametro1: ${{ parameters.algumParametro }}
```

### Cada step possui:

- `id` → identificador interno
- `name` → nome exibido na UI
- `action` → action que será executada
- `input` → dados necessários para executar a action  
  Pode receber:
  - parâmetros do usuário
  - output de steps anteriores
  - arquivos
  - valores fixos

---

# 📝 Markdown no template.yaml

O `template.yaml` suporta **Markdown** para deixar a experiência mais amigável.

## ✅ Boa prática

No primeiro step (ou nos parâmetros), adicionar um bloco explicando:

- O que o template faz
- O que será criado
- Requisitos
- Fluxo
- Imagens (se necessário)

Isso ajuda o usuário a entender se o template atende sua necessidade.

## Como fazer

Usando `type: null`:

```yaml
properties:
  info:
    type: null
    description: |
      ## 📦 O que este template faz?

      - Cria repositório
      - Gera README
      - Abre PR
      - Configura workflow
```

⚠️ Atenção à indentação.  
Se o Markdown for muito extenso e a identação estiver errada, o YAML pode quebrar.

---

# 📋 Task List

URL:

http://localhost:3000/create/tasks

Mostra todas as tasks executadas pelo Scaffolder.

Importante porque:
- A usuária pode fechar a aba
- Depois pode acompanhar o andamento
- Permite consultar status via API

É possível extrair informações da API para verificar:
- Se a task foi concluída
- Se falhou
- Qual foi o output
- ...e outras infos

---

# 🔔 Notifications (Notificações)

Documentação:
https://backstage.io/docs/notifications/

Backstage implementou sistema de notificações que permite:

- Disparar notificação quando o template termina
- Avisar no canto inferior da UI
- Mapear conclusão do processo

Importante:  
A notificação refere-se ao processo **dentro do Backstage**.

Também é possível integrar com:
- Slack
- Email
- Outros canais

Exemplo backend:
https://backstage.io/docs/notifications/#add-notifications-backend

---

# 🔘 Exibir Botões ao Final do Template

É possível, ao finalizar o template:

- Retornar link do repositório criado
- Exibir botão para GitHub
- Exibir botão para workflow/action

Isso melhora a experiência da pessoa desenvolvedora.

---

# 🧪 Template Manager (Ambiente Produtivo)

Permite carregar e criar novos templates mesmo com o Backstage em produção.

## 🔹 Playground

Permite:

- Colar YAML
- Visualizar como ficará na UI
- Testar parâmetros
- Simular execução

Excelente para teste visual antes de salvar.

---

## 🔹 Custom Field Explorer

URL:

http://localhost:3000/create/custom-fields

Permite visualizar:

- Quais custom fields existem
- Como funcionam
- Como criar novos

Muito útil para onboarding.

---

## 🔹 Template Form Preview

URL:

http://localhost:3000/create/template-form

Mostra como o template será renderizado na UI.

Permite:

- Validar campos
- Testar estrutura
- Ajustar antes de publicar

---

# 🧱 Actions

## Instalar Action Externa

Instalar action é semelhante a instalar plugin:

1. `yarn add`
2. Adicionar no backend
3. Importar no arquivo do backend
4. Registrar a action

Isso vale para actions externas ao projeto.

---

## Actions Fundamentais

Existem:

- Actions mantidas pelo Backstage (foundation)
- Actions mantidas pela comunidade (open source)

---

# 🛠 Criando Nova Action

## Passos

1. Ir na raiz do projeto
2. Rodar:

```bash
yarn new
```

3. Escolher:

scaffolder-backend-module

O Backstage cria automaticamente a estrutura do módulo (monorepo).

Depois:

- Implementar a action
- Registrar no backend
- Chamar no template

---

## Chamando a Action no Template

```yaml
action: nome:da-action
```

E passar os inputs necessários.

---

## Documentação Interna de Actions

URL:

http://localhost:3000/create/actions

Mostra:

- Todas as actions disponíveis
- Schema de input
- Outputs
- Documentação interna

---

# 🎨 Custom Fields

Custom Field é usado quando:

- Os tipos nativos (string, enum, boolean, etc.) não atendem
- É necessário comportamento personalizado
- Exemplo: seletor customizado, validação especial, integração externa

---

# 📌 URLs Úteis

| Função | URL |
|--------|------|
| Tasks | http://localhost:3000/create/tasks |
| Template Form | http://localhost:3000/create/template-form |
| Custom Fields | http://localhost:3000/create/custom-fields |
| Actions | http://localhost:3000/create/actions |

---

# 📚 Pontos Interessantes para Onboarding

Documentar que:
- Existe Template Editor para validação visual
- Existe Custom Field Explorer
- Existe Task List
- Existe sistema de Notifications
- É possível testar tudo antes de publicar
- É possível consultar API para status de execução

---

# 💡 Interessantes 💡
## Sistema de Notificações no Scaffolder

O sistema de **Notifications do Backstage** é um recurso estratégico que pode melhorar bastante a experiência da pessoa desenvolvedora — especialmente em processos de criação via template que podem levar alguns minutos.

## 🚀 Por que isso é relevante no trabalho?

Em fluxos reais de criação (ex.: criação de repositório, provisionamento de infraestrutura, abertura de PR, execução de workflow), a pessoa pode:

- Fechar a aba do Backstage
- Navegar para outra página
- Não acompanhar a execução em tempo real

Com notificações habilitadas, o Backstage pode:

- Avisar quando o processo terminar com sucesso
- Avisar se houve falha
- Exibir alerta no canto inferior da tela
- Manter histórico na central de notificações

Isso aumenta:

- ✅ Transparência do processo
- ✅ Experiência da desenvolvedora
- ✅ Confiabilidade da plataforma interna

---

## 🧩 Como funciona conceitualmente

1. Usuária inicia um template
2. O Scaffolder executa a task
3. Ao finalizar (success ou failure)
4. O sistema de Notifications dispara um evento
5. A usuária recebe o aviso dentro do Backstage

Importante: a notificação refere-se à finalização do processo **no Backstage**, não necessariamente à conclusão de processos externos (ex.: pipeline que ainda esteja rodando no GitHub).

---

## 🔧 Implementação (visão geral)

Para habilitar notificações no Scaffolder:

1. Instalar os plugins de notifications (backend + frontend)
2. Adicionar o módulo de integração com scaffolder
3. Configurar o backend

Documentação oficial:

https://backstage.io/docs/notifications/

Exemplo de integração com Scaffolder:

https://backstage.io/docs/notifications/#add-notifications-backend

---

## 🏢 Valor Estratégico para Plataforma Interna

Trazer notificações para o fluxo de templates permite:

- Criar uma experiência mais "enterprise"
- **A pessoa não precisa buscar pelo nome no Github**
- Aumentar percepção de maturidade da Developer Platform
- Permitir que a pessoa desenvolvedora siga trabalhando enquanto a task roda

Pode ser um diferencial interessante para apresentar como evolução do Developer Portal.

---

## 🔮 Possíveis Evoluções

Além das notificações in-app, é possível evoluir para:

- Integração com Slack
- Webhooks internos
- Dashboard de auditoria de templates executados

Isso transforma o Scaffolder não apenas em ferramenta de criação, mas em um orquestrador de processos internos com rastreabilidade.

---

# 📦 Yarn Workspace no Backstage
## 🧩 Contexto

O Backstage usa monorepo com Yarn Workspaces.

Isso significa que um único repositório contém vários pacotes internos, geralmente:

````
packages/
  app/       → Frontend
  backend/   → Backend
````

Cada pasta dentro de `packages/` é um workspace independente.

## 🔎 Comando explicado
``yarn workspace app add @backstage/plugin-scaffolder-react```-> O que significa cada parte:
1. ``yarn workspace app``
  - Executa o comando dentro do workspace chamado app, ou seja, dentro de: `packages/app`
2. ``add``
  - Instala uma dependência.
3. ``@backstage/plugin-scaffolder-react``
  - É o plugin do Scaffolder (parte frontend/UI)

# 🎯 O que esse comando faz na prática
1. Instala o plugin no frontend
2. Atualiza ``packages/app/package.json``
3. Não altera o backend
4. Não instala globalmente no projeto inteiro

# 🔌 Plugin Frontend vs Backend no Backstage

## Plugin Frontend

- Interface visual do Backstage
- Componentes React
- Rotas da UI
  - Exemplo: ``@backstage/plugin-scaffolder-react``

## Plugin Backend

- Executa lógica
- Processa tasks
- Integra com APIs externas
  - Exemplo: ``@backstage/plugin-scaffolder-backend``
---

# enum vs Json no Backstage (Scaffolder)
## 🎯 Quando usar enum
O enum funciona bem quando:
- O número de opções é pequeno
- As opções são estáveis
- A lista é simples

### Exemplos:
- Linguagem (Node.js, Python, Java)
- Cloud provider (AWS, Azure, GCP)
- Tipo de serviço

### 📌 Vantagem:
- Simples
- Direto no YAML
- Fácil manutenção

## ⚠️ Quando o enum começa a não valer a pena
Se:
- A lista de opções cresce muito
- O YAML começa a ficar extenso e difícil de manter
- As opções mudam com frequência
- A lista precisa vir de uma fonte dinâmica
Nesse caso, manter tudo no enum deixa o template:
  - Verboso
  - Difícil de ler
  - Difícil de atualizar

### 🚀 Melhor alternativa nesses casos
- Importar os dados de outro lugar, como:
- Um arquivo JSON externo
- Uma API
- Uma fonte dinâmica
- Um catálogo interno

### 📌 Isso torna o template:
- Mais limpo
- Mais escalável
- Mais fácil de manter

**Tip:**
1. Usar enum para listas pequenas e estáticas.
2. Usar JSON ou fonte externa quando a lista for grande, dinâmica ou complexa.

---

# Lembretes:
1. ``packages/app/src/App.tsx`` -> onde faz roteamento; adicionar subcomponentes na página
2. Criando novidade com scaffolder -> cria o tsx, pro front, traz pro roteamento no App.tsx e adiciona no template.yaml e depois de montar esse skeleton, termina a regra de negócio.
3. Backstage tá [usando a versão 4 do material ui](https://v4.mui.com/pt/getting-started/installation/?_gl=1*e4mydd*_up*MQ..*_ga*NDA4NDA0OTUxLjE3NzIzMTMwODc.*_ga_5NXDQLC2ZK*czE3NzIzMTMwODYkbzEkZzAkdDE3NzIzMTMwODYkajYwJGwwJGgw)
4. Sempre que for integrar com API externa, é IDEAL, que dentro do ``app-config.yaml`` procurar o ``proxy:`` e fazer o mapeamento da API externa do proxy.
  - exemplo feito com a api de times
  - dessa forma, toda autenticação que o backstage fizer, pra acessar a rota vai ter que passar pela autenticação, NÃO VAI FICAR EXPOSTA.
  - também é possível passar HEADERS (ex: api do servicenow, etc)
  - integração com estas ferramentas (como servicenow), **criar um arquivo pra organizar as chamadas**
5. Arquivo ``packages/app/src/apis.ts`` serve pra que sempre que fizer uma implementação de consumo de api externa, precisa registrar nesse arquivo, como foi no caso da api simples de times.
  - esse registro é feito trazendo ``createApiFactory`` que contém: ``api:`` e ``deps:``