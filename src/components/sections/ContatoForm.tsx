"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

export function ContatoForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      nome: formData.get("nome"),
      contato: formData.get("contato"),
      motivo: formData.get("motivo"),
      lgpdConsent: formData.get("lgpdConsent") === "on",
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Não foi possível enviar. Tente novamente.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Erro inesperado.");
    }
  }

  return (
    <section id="contato" className="bg-bg py-20">
      <Container className="max-w-2xl">
        <Reveal>
          <SectionHeading
            eyebrow="Vamos conversar"
            title="Dê o primeiro passo"
            description="[Placeholder] Conte um pouco sobre o que está sentindo."
          />
        </Reveal>

        {status === "success" ? (
          <p className="mt-8 rounded-2xl bg-white p-6 text-center text-ink shadow-soft">
            [Placeholder] Mensagem enviada! Em breve entraremos em contato.
          </p>
        ) : (
          <Reveal delay={150}>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="nome" className="mb-1 block text-sm font-medium text-ink">
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  required
                  minLength={2}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-accent"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="contato-field" className="mb-1 block text-sm font-medium text-ink">
                  Telefone ou e-mail
                </label>
                <input
                  id="contato-field"
                  name="contato"
                  required
                  minLength={5}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-accent"
                  placeholder="(00) 00000-0000 ou seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="motivo" className="mb-1 block text-sm font-medium text-ink">
                  O que te trouxe até aqui?
                </label>
                <textarea
                  id="motivo"
                  name="motivo"
                  required
                  minLength={10}
                  rows={5}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-accent"
                  placeholder="[Placeholder] Conte um pouco sobre o que está sentindo e o motivo de querer buscar acompanhamento."
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-ink/80">
                <input type="checkbox" name="lgpdConsent" required className="mt-1" />
                <span>
                  [Placeholder] Autorizo o armazenamento dos meus dados para fins de contato, conforme a{" "}
                  <a href="/privacidade" className="text-accent underline">
                    Política de Privacidade
                  </a>
                  .
                </span>
              </label>

              {status === "error" && errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

              <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
