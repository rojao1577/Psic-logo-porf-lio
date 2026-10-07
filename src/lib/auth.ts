import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";

// Admin único por enquanto (ver CLAUDE.md > Painel administrativo).
export interface SessionData {
  isAdmin?: boolean;
}

const fallbackDevSecret =
  "dev-only-insecure-secret-troque-isso-antes-de-ir-pra-producao!!";

if (!process.env.SESSION_SECRET && process.env.NODE_ENV === "production") {
  throw new Error(
    "SESSION_SECRET não está definida. Configure-a nas variáveis de ambiente.",
  );
}

export const sessionOptions: SessionOptions = {
  cookieName: "psi_admin_session",
  password: process.env.SESSION_SECRET || fallbackDevSecret,
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
};

/** Para uso em Server Components e Server Actions. */
export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function isAuthenticated() {
  const session = await getSession();
  return Boolean(session.isAdmin);
}

/**
 * Valida as credenciais do admin único contra as variáveis de ambiente
 * ADMIN_EMAIL / ADMIN_PASSWORD_HASH (hash gerado com bcrypt — ver .env.example).
 */
export async function verifyCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    console.error(
      "ADMIN_EMAIL ou ADMIN_PASSWORD_HASH não configurados — login de admin indisponível.",
    );
    return false;
  }

  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
    return false;
  }

  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(password, adminPasswordHash);
}
