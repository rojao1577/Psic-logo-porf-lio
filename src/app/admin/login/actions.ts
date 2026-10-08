"use server";

import { redirect, RedirectType } from "next/navigation";
import { getSession, verifyCredentials } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const valid = await verifyCredentials(email, password);
  if (!valid) {
    return { error: "E-mail ou senha inválidos." };
  }

  const session = await getSession();
  session.isAdmin = true;
  await session.save();

  // "replace" em vez do padrão "push": a tela de login não deve ficar no
  // histórico — senão o botão "voltar" do navegador fica preso nela.
  redirect("/admin", RedirectType.replace);
}
