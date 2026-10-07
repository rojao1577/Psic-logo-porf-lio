import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconCircle } from "@/components/ui/IconCircle";
import { buildWhatsAppLink } from "@/lib/site-config";
import { Heart, User, Sparkles } from "lucide-react";

const tipos = [
  {
    icon: Heart,
    titulo: "[Placeholder] Psicoterapia Infantil",
    texto: "[Placeholder] Descrição do atendimento infantil.",
    cta: "Saber mais pelo WhatsApp",
  },
  {
    icon: User,
    titulo: "[Placeholder] Adolescentes",
    texto: "[Placeholder] Descrição do atendimento para adolescentes.",
    cta: "Conversar sobre atendimento",
  },
  {
    icon: Sparkles,
    titulo: "[Placeholder] Jovens Adultos",
    texto: "[Placeholder] Descrição do atendimento para jovens adultos.",
    cta: "Quero iniciar meu acompanhamento",
  },
];

export function TiposAtendimento() {
  return (
    <section id="atendimentos" className="py-20">
      <Container>
        <SectionHeading title="Acompanhamento para diferentes momentos da vida" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tipos.map((tipo) => {
            const Icon = tipo.icon;
            return (
              <Card key={tipo.titulo}>
                <IconCircle>
                  <Icon className="h-5 w-5" />
                </IconCircle>
                <h3 className="mt-4 font-serif text-xl text-ink">{tipo.titulo}</h3>
                <p className="mt-3 text-sm text-ink-soft">{tipo.texto}</p>
                <a
                  href={buildWhatsAppLink(`Olá! Tenho interesse em: ${tipo.titulo}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent"
                >
                  {tipo.cta} →
                </a>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
