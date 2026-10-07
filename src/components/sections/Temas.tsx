import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconCircle } from "@/components/ui/IconCircle";
import { buildWhatsAppLink } from "@/lib/site-config";
import { HeartHandshake, CloudRain, ShieldQuestion, Sparkles, Users, Brain } from "lucide-react";

const temas = [
  { icon: CloudRain, titulo: "[Placeholder] Ansiedade" },
  { icon: HeartHandshake, titulo: "[Placeholder] Autoestima" },
  { icon: ShieldQuestion, titulo: "[Placeholder] Insegurança" },
  { icon: Users, titulo: "[Placeholder] Relacionamentos" },
  { icon: Brain, titulo: "[Placeholder] Sobrecarga emocional" },
  { icon: Sparkles, titulo: "[Placeholder] Autoconhecimento" },
];

export function Temas() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Você não está sozinho(a)" title="Talvez você esteja passando por..." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {temas.map((tema) => {
            const Icon = tema.icon;
            return (
              <a
                key={tema.titulo}
                href={buildWhatsAppLink(`Olá! Gostaria de falar sobre: ${tema.titulo}`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <IconCircle>
                    <Icon className="h-5 w-5" />
                  </IconCircle>
                  <p className="mt-4 font-medium text-ink">{tema.titulo}</p>
                </Card>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
