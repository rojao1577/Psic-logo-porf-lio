import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { buildWhatsAppLink, siteConfig } from "@/lib/site-config";

const modalidades = [
  {
    titulo: `Atendimento presencial em ${siteConfig.cidade}`,
    texto: "[Placeholder] Descrição do atendimento presencial.",
    horarios: ["[Placeholder] Dia da semana · horário"],
    cta: "Consultar horários",
  },
  {
    titulo: "Atendimento Online",
    texto: "[Placeholder] Descrição do atendimento online.",
    horarios: ["[Placeholder] Dias e horários disponíveis"],
    cta: "Consultar disponibilidade",
  },
];

export function HorariosModalidades() {
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionHeading title={`Atendimento em ${siteConfig.cidade} e Online`} />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {modalidades.map((modalidade, index) => (
            <Reveal key={modalidade.titulo} delay={index * 80}>
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-soft">
                <h3 className="font-serif text-xl text-ink">{modalidade.titulo}</h3>
                <p className="mt-3 text-sm text-ink-soft">{modalidade.texto}</p>
                <div className="mt-4 space-y-2">
                  {modalidade.horarios.map((h) => (
                    <div key={h} className="rounded-xl bg-bg-alt px-4 py-2 text-sm font-medium text-ink">
                      {h}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <LinkButton href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" variant="outline">
                    {modalidade.cta}
                  </LinkButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
