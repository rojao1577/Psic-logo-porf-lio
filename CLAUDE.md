# PSIportfolio — Site institucional de psicólogo

## Visão geral
Site para divulgação profissional de um psicólogo, com foco em geração de
contatos/leads de pacientes interessados em consulta, e otimizado para SEO
(buscas no Google).

## Stack decidida
- **Framework**: Next.js (App Router), full-stack — sem backend separado;
  API Routes/Server Actions cobrem a lógica de servidor.
- **Linguagens**: TypeScript, CSS, HTML.
- **Estilização**: Tailwind CSS v4 (config via `@theme` em `globals.css`,
  tokens de cor/fonte centralizados ali — roxo como cor de destaque).
- **ORM**: Prisma 7 sobre Postgres, com driver adapter (`@prisma/adapter-pg`).
  Conexão do CLI configurada em `prisma.config.ts` (não mais no
  `schema.prisma` — padrão do Prisma 7); client gerado em
  `src/generated/prisma` (fora do controle de versão).
- **Validação**: zod nos endpoints que recebem dados do público (ex.
  formulário de contato).
- **Admin (usuário único)**: autenticação via `iron-session` (cookie
  assinado) + `bcryptjs` para o hash da senha; credenciais em variáveis de
  ambiente (`ADMIN_EMAIL`/`ADMIN_PASSWORD_HASH`), sem tabela de usuário no
  banco por enquanto.
- **Hospedagem**: Vercel (HTTPS automático, deploy simples).
  - **Nenhum container autoral no projeto**: sem `Dockerfile`, sem
    `docker-compose.yml`, sem orquestração. O artefato de deploy é o commit —
    `git push` → `next build` → estáticos e imagens no CDN, e rotas dinâmicas,
    API Routes e Server Actions executadas como Vercel Functions.
  - Containers existem, mas como detalhe interno da plataforma (Fluid Compute:
    instances gerenciados que atendem requests concorrentes). Do nosso lado
    configuramos apenas região, memória/CPU, `maxDuration` e variáveis de
    ambiente — nada de base image ou atualização de SO.
  - Região das functions: `gru1` (São Paulo), a mesma do Postgres — o
    formulário grava no banco e dispara email, então latência de ida e volta
    importa.
  - A Vercel aceita `Dockerfile.vercel` na raiz (imagem buildada → Vercel
    Container Registry → servida como Function). Opção conhecida e **não
    usada**: fica reservada caso apareça algo fora do alcance de Node/Next
    (binário nativo, worker em outra linguagem).
- **Banco de dados**: PostgreSQL como serviço externo gerenciado (ex: Neon ou
  Supabase) — a Vercel não hospeda o banco.
  - Conectar **sempre pela connection string com pooler** (PgBouncer do Neon /
    pooler do Supabase), nunca pela direta: muitos instances simultâneos
    esgotariam as conexões do Postgres. Migrations usam a conexão direta.
- **Envio de email**: serviço transacional (ex: Resend ou SendGrid) — decisão
  de detalhe técnico, não bloqueante.

## Ambiente de desenvolvimento
- `npm run dev` roda direto na máquina (Windows), sem Docker.
- Banco de desenvolvimento: branch de dev do próprio provedor, consumido via
  `DATABASE_URL` em `.env.local` (fora do versionamento). Ambiente idêntico ao
  de produção, sem Postgres local para manter em sincronia.
- Cada push gera um deployment de preview com URL própria; merge na `main`
  promove para produção.

## Funcionalidades principais

### Formulário de contato (público, sem login)
- Paciente preenche formulário de interesse em consulta (campos a definir
  em sessão futura).
- Inclui checkbox de consentimento LGPD (aceite + timestamp).
- Ao ser enviado: grava no Postgres e dispara email de notificação para o
  psicólogo.

### Contato via WhatsApp
- Link direto `wa.me/<numero>` com mensagem pré-preenchida, usado para
  tratar forma de pagamento/agendamento.

### Painel administrativo (somente o psicólogo)
- Login único (um usuário administrador só, por enquanto).
- Lista os formulários recebidos.
- Filtro por data.
- Marcar registro como "contatado".
- Excluir registros.

### Segurança
- HTTPS obrigatório (via Vercel).
- Rate limiting no endpoint do formulário público (anti-spam) e no login
  do admin (anti-brute-force).

### LGPD / privacidade
- Checkbox de consentimento obrigatório no formulário do paciente.
- Página de política de privacidade descrevendo o que é armazenado, por
  quanto tempo, e como solicitar exclusão dos dados.

### SEO
- Metadata API do Next.js, sitemap.xml e robots.txt automáticos.
- Dados estruturados (schema.org, ex: `Person`/`MedicalBusiness`).
- Otimização de imagens via `next/image`.
- Recomendado também configurar um Google Business Profile (fora do
  escopo de código do site).

## Estado atual do código
Esqueleto implementado: projeto Next.js rodando, home com as 11 seções (nos
moldes do protótipo de referência, cor de destaque roxa), formulário de
contato gravando no Postgres via Prisma, painel admin funcional (login,
listar, filtrar por data, marcar contatado, excluir). Todo o conteúdo
(textos, fotos, dados do psicólogo) está em placeholder — ver
`src/lib/site-config.ts` e os componentes em `src/components/sections/`.

## Decisões em aberto / próximos passos
- Conteúdo real (textos, fotos, dados do psicólogo) — usuário vai fornecer
  pra substituir os placeholders.
- Escolha final do provedor de Postgres (Neon vs Supabase) — necessário pra
  preencher `DATABASE_URL`/`DIRECT_URL` reais e rodar a primeira migration.
- Escolha do serviço de email (Resend vs SendGrid) — notificação de novo
  lead está stubada em `src/lib/email.ts` (só loga no console).
- Rate limiting anti-spam/anti-brute-force — ainda não implementado
  (`TODO` marcado em `src/app/api/leads/route.ts` e no login do admin).

## Convenções de trabalho
- Este arquivo deve ser mantido atualizado à medida que novas decisões de
  produto/arquitetura forem tomadas ao longo do projeto.
