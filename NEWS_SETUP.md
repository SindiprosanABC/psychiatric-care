# Configuração do Sistema de Notícias

## 📋 Passos para Configuração

### 1. Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp .env.local.example .env.local
```

2. Edite o arquivo `.env.local` e configure as seguintes variáveis:

#### MongoDB Atlas
- Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Crie um cluster gratuito (se ainda não tiver)
- Obtenha a string de conexão e configure:
```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB_NAME=psychiatric_news_system
```

#### NewsAPI
- Acesse [NewsAPI](https://newsapi.org/register)
- Crie uma conta gratuita
- Copie sua API key e configure:
```env
NEWSAPI_KEY=sua_chave_aqui
NEWSAPI_SEARCH_KEYWORDS=saúde mental psiquiatria terapia bem-estar psicológico depressão ansiedade
```

#### CRON_SECRET
Gere um token seguro:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Configure no `.env.local`:
```env
CRON_SECRET=token_gerado_aqui
```

---

### 2. Testar Localmente

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Teste o endpoint do cron job manualmente:
```bash
curl -X GET http://localhost:3000/api/cron/fetch-news \
  -H "Authorization: Bearer SEU_CRON_SECRET"
```

3. Verifique se retornou sucesso com notícias inseridas

4. Teste a API de leitura:
```bash
curl http://localhost:3000/api/news?limit=5&category=saude-mental
```

5. Acesse a aplicação e navegue até a seção "Notícias":
```
http://localhost:3000/#news
```

---

### 3. Deploy no Vercel

1. Configure as variáveis de ambiente no Vercel:
   - Acesse seu projeto no [Vercel Dashboard](https://vercel.com/dashboard)
   - Vá em **Settings** > **Environment Variables**
   - Adicione todas as variáveis do `.env.local`

2. Faça o deploy:
```bash
vercel --prod
```

3. Verifique o Cron Job:
   - No Vercel Dashboard, vá em **Deployments** > **Cron Jobs**
   - Confirme que o job está configurado para executar diariamente às 6h UTC
   - Monitore os logs de execução

---

## 🔍 Verificação

### Verificar Notícias no MongoDB

Se você tem o MongoDB Compass ou mongosh instalado:

```bash
# Conectar
mongosh "mongodb+srv://cluster.mongodb.net/psychiatric_news_system" --username seu_usuario

# Ver notícias
db.news_articles.find({ category: "saude-mental" }).sort({ publishedAt: -1 }).limit(5).pretty()

# Contar total
db.news_articles.countDocuments({ category: "saude-mental", isActive: true })
```

---

## 🎨 Customizações

### Mudar Palavras-Chave de Busca

Edite em `.env.local`:
```env
NEWSAPI_SEARCH_KEYWORDS=suas palavras chave aqui
```

### Ajustar Horário do Cron Job

Edite `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/fetch-news",
      "schedule": "0 6 * * *"  // ← Mude aqui (formato cron)
    }
  ]
}
```

Exemplos de schedule:
- `0 6 * * *` - Todo dia às 6h UTC
- `0 */6 * * *` - A cada 6 horas
- `0 9,18 * * *` - Às 9h e 18h UTC

### Personalizar Tags

Edite o arquivo [utils/news-transformer.ts](utils/news-transformer.ts), função `determineTag()`:

```typescript
function determineTag(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes("suas palavras")) {
    return "Sua Tag";
  }
  // Adicione mais condições...

  return "Tag Padrão";
}
```

---

## 📁 Estrutura de Arquivos Criados

```
psychiatric-care/
├── lib/
│   ├── mongodb.ts              # Conexão MongoDB
│   ├── newsapi.ts              # Cliente NewsAPI
│   └── types/
│       └── news.ts             # Tipos TypeScript
│
├── utils/
│   ├── slug-generator.ts       # Geração de slugs
│   ├── date-formatter.ts       # Formatação de datas
│   └── news-transformer.ts     # Transformação de dados
│
├── app/
│   └── api/
│       ├── cron/
│       │   └── fetch-news/
│       │       └── route.ts    # Cron job (busca notícias)
│       └── news/
│           └── route.ts        # API de leitura
│
├── components/
│   └── sections/
│       └── latest-news.tsx     # Componente de notícias
│
├── vercel.json                 # Configuração do cron
├── .env.local.example          # Exemplo de variáveis
└── NEWS_SETUP.md              # Este arquivo
```

---

## 🚨 Troubleshooting

### Erro: "MONGODB_URI not defined"
- Verifique se `.env.local` existe e está configurado
- Reinicie o servidor de desenvolvimento

### Erro: "NewsAPI rate limit exceeded"
- O plano gratuito da NewsAPI tem limite de 100 requisições/dia
- Aguarde 24h ou faça upgrade do plano

### Notícias não aparecem no frontend
- Verifique se o cron job foi executado com sucesso
- Execute o cron job manualmente (passo 2.2 acima)
- Verifique os logs do servidor

### Imagens não carregam
- Algumas notícias não têm imagens
- Configure `DEFAULT_NEWS_IMAGE` no `.env.local`
- Adicione uma imagem padrão em `/public/news-placeholder.jpg`

---

## 📚 Recursos Adicionais

- [Documentação NewsAPI](https://newsapi.org/docs)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Guia Completo](GUIA-REPLICACAO-NEWS-SYSTEM.md)

---

## ✅ Checklist de Deploy

- [ ] MongoDB Atlas configurado
- [ ] NewsAPI key obtida
- [ ] `.env.local` criado e configurado
- [ ] Testado localmente (cron + API + frontend)
- [ ] Variáveis adicionadas no Vercel
- [ ] Deploy realizado
- [ ] Cron job verificado no dashboard
- [ ] Notícias aparecendo no site

---

**Data de criação:** 2026-01-28
**Versão:** 1.0.0
