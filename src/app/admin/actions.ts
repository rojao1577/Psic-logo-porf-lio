"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession, isAuthenticated } from "@/lib/auth";

async function assertAdmin() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function toggleContatado(id: string, contatado: boolean) {
  await assertAdmin();
  await prisma.lead.update({ where: { id }, data: { contatado } });
  revalidatePath("/admin");
}

export async function deleteLead(id: string) {
  await assertAdmin();
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}
