import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";

const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome."),
  contato: z.string().trim().min(5, "Informe um telefone ou e-mail válido."),
  motivo: z.string().trim().min(10, "Conte um pouco mais sobre o motivo."),
  lgpdConsent: z.boolean().refine((v) => v === true, {
    message: "É necessário aceitar o consentimento LGPD.",
  }),
});

// TODO: rate limiting anti-spam (ex: Upstash Ratelimit) — ver CLAUDE.md > Segurança.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { nome, contato, motivo } = parsed.data;

  const lead = await prisma.lead.create({
    data: {
      nome,
      contato,
      motivo,
      lgpdConsent: true,
      lgpdConsentAt: new Date(),
    },
  });

  await sendLeadNotification({ nome, contato, motivo });

  return NextResponse.json({ id: lead.id }, { status: 201 });
}
