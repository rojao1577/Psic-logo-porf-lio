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
- **Banco de dados**: PostgreSQL gerenciado via **Supabase** (decisão
  tomada) — a Vercel não hospeda o banco.
  - Conectar **sempre pela connection string com pooler** (porta 6543,
    `?pgbouncer=true`), nunca pela direta (porta 5432): muitos instances
    simultâneos esgotariam as conexões do Postgres. Migrations usam a
    conexão direta (`DIRECT_URL`).
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
- Página própria em `/contato` (não faz parte da home — CTA principal do
  Header leva pra lá; Hero mantém só o botão de WhatsApp).
- Campos: nome, telefone/e-mail, motivo (texto livre — o paciente relata o
  contexto de por que está buscando o psicólogo), checkbox de consentimento
  LGPD (aceite + timestamp).
- Ao ser enviado: grava no Postgres via Prisma (`POST /api/leads`) e
  dispara notificação pro psicólogo (stub, ver `src/lib/email.ts`).

### Contato via WhatsApp
- Link direto `wa.me/<numero>` com mensagem pré-preenchida.
- Acessível via botão flutuante fixo (`WhatsAppFloatButton`, presente em
  todas as páginas) e em CTAs específicos pelo site (ex: cards de "temas
  atendidos").

### Painel administrativo (somente o psicólogo)
- Acesso via link discreto no rodapé do site ("Painel administrativo",
  ícone de cadeado) — não aparece na navegação principal.
- Login único (um usuário administrador só, por enquanto), com opção de
  mostrar/ocultar a senha digitada.
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
Esqueleto completo e **rodando contra banco real** (Supabase, migration
`init` aplicada):
- Repositório: https://github.com/rojao1577/Psic-logo-porf-lio
- Home com 10 seções (nos moldes do protótipo de referência, cor de
  destaque roxa) — o formulário saiu da home e virou página própria.
- `/contato`: formulário funcional, grava lead de verdade no Postgres.
- `/admin`: painel funcional (login, listar, filtrar por data, marcar
  contatado, excluir), acesso via link discreto no rodapé.
- **Scroll reveal**: componente `src/components/ui/Reveal.tsx`
  (IntersectionObserver + fade-in/translate via Tailwind) aplicado em
  praticamente todas as seções da home e nas telas do admin (login,
  cabeçalho+tabela) — elementos aparecem suavemente ao entrar na viewport.
- Navegação entre `/admin/login` ⇄ `/admin` ⇄ `/` usa
  `redirect(path, RedirectType.replace)` nas Server Actions, pra não
  empilhar telas de trânsito no histórico do navegador (botão voltar fica
  limpo). Logout mostra uma tela de transição ("Saindo...") via
  `useFormStatus()`, já que a home é estática e não tem um `loading.tsx`
  natural pra cobrir esse sentido.

Todo o conteúdo (textos, fotos, dados do psicólogo) está em placeholder —
ver `src/lib/site-config.ts` e os componentes em `src/components/sections/`.

## Decisões em aberto / próximos passos
- Conteúdo real (textos, fotos, dados do psicólogo) — usuário vai fornecer
  pra substituir os placeholders.
- Escolha do serviço de email (Resend vs SendGrid) — notificação de novo
  lead está stubada em `src/lib/email.ts` (só loga no console).
- Rate limiting anti-spam/anti-brute-force — ainda não implementado
  (`TODO` marcado em `src/app/api/leads/route.ts` e no login do admin).
- Deploy na Vercel — ainda não feito; projeto só roda localmente até aqui.

## Convenções de trabalho
- Este arquivo deve ser mantido atualizado à medida que novas decisões de
  produto/arquitetura forem tomadas ao longo do projeto.
- **Modo de aprendizado**: o usuário (João) está aprendendo a usar Next.js,
  Supabase/Prisma e o resto do stack, e quer escrever boa parte do código
  ele mesmo para aprender.
  - **Padrão**: quando a tarefa envolver escrever código, a Claude NÃO
    escreve o arquivo direto — mostra como o código deveria ficar (trecho
    comentado/explicado) e explica de forma didática o que cada parte faz
    e por quê, deixando o usuário digitar/aplicar.
  - **Exceção**: se o usuário pedir explicitamente pra Claude escrever
    ("pode escrever", "faz você", "implementa isso" etc.), Claude escreve
    o código normalmente — mas sempre explicando o que foi feito de forma
    didática, como se estivesse ensinando.
  - Tarefas puramente operacionais sem valor didático (configurar infra,
    rodar migration, debugar erro de ambiente, git/deploy) seguem sendo
    executadas diretamente pela Claude, sem precisar perguntar — o
    aprendizado é sobre o código da aplicação, não sobre operação de
    ferramentas.
