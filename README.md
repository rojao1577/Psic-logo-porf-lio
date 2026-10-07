# PSIportfolio

Site institucional do psicólogo — ver `CLAUDE.md` para o contexto completo do
produto e as decisões de arquitetura.

## Como rodar localmente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure o `.env.local` (já existe um com valores de exemplo — ver
   `.env.example` para a referência de cada variável):
   - `DATABASE_URL` / `DIRECT_URL`: branch de dev do Neon/Supabase (ver
     `CLAUDE.md` > Ambiente de desenvolvimento). Sem isso, o formulário de
     contato e o painel admin não conseguem gravar/ler dados.
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH`: credenciais do admin único.
     Gerar o hash com:
     ```bash
     node -e "console.log(require('bcryptjs').hashSync('sua-senha', 10))"
     ```
   - `SESSION_SECRET`: já vem preenchido com um valor aleatório gerado
     localmente — só troque se quiser invalidar sessões existentes.

3. Gere o Prisma Client e aplique o schema no banco:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. Suba o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   Abra [http://localhost:3000](http://localhost:3000). O painel admin fica
   em `/admin` (redireciona para `/admin/login` se não autenticado).

## Scripts

- `npm run dev` — servidor de desenvolvimento.
- `npm run build` — build de produção (typecheck + lint + compile).
- `npm run start` — serve o build de produção.
- `npm run lint` — ESLint.
- `npx prisma studio` — explorar o banco visualmente.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS + Prisma (Postgres) —
detalhes e decisões em `CLAUDE.md`.
