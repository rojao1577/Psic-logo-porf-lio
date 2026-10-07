import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { buildWhatsAppLink } from "@/lib/site-config";

const perguntas = [
  { pergunta: "Como funciona a primeira sessão?", resposta: "[Placeholder] Resposta." },
  { pergunta: "Quanto tempo dura uma sessão?", resposta: "[Placeholder] Resposta." },
  { pergunta: "O atendimento é presencial ou online?", resposta: "[Placeholder] Resposta." },
  { pergunta: "Qual é a linha teórica utilizada nos atendimentos?", resposta: "[Placeholder] Resposta." },
  { pergunta: "Como faço para agendar?", resposta: "[Placeholder] Resposta." },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-bg-alt py-20">
      <Container className="max-w-3xl">
        <SectionHeading title="Dúvidas frequentes" />

        <div className="mt-10 divide-y divide-black/10">
          {perguntas.map((item) => (
            <details key={item.pergunta} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                {item.pergunta}
                <span className="text-xl text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-ink-soft">{item.resposta}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <LinkButton href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">
            Consultar horários pelo WhatsApp
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
