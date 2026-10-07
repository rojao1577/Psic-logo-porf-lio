import { config } from "dotenv";

// O Next.js carrega .env.local sozinho em tempo de execução, mas o CLI do
// Prisma (generate/migrate) roda fora do Next e precisa carregar manualmente.
config({ path: ".env.local" });

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // O CLI (migrate/introspect) precisa de conexão direta, sem pooler — por
  // isso usa DIRECT_URL aqui. O app em si (src/lib/db.ts) conecta via
  // DATABASE_URL (com pooler) através do driver adapter, independentemente
  // desta config.
  datasource: {
    url: env("DIRECT_URL"),
  },
});
