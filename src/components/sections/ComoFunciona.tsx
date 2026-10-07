import { Container } from "@/components/ui/Container";
import { MessageCircle, UserCheck, ShieldCheck, Activity } from "lucide-react";

const itens = [
  {
    icon: MessageCircle,
    titulo: "[Placeholder] Uma linha, não um cardápio",
    texto: "[Placeholder] Explicação da abordagem terapêutica usada.",
  },
  {
    icon: UserCheck,
    titulo: "[Placeholder] Fases do acompanhamento",
    texto: "[Placeholder] Explicação de como o acompanhamento se adapta a cada fase.",
  },
  {
    icon: ShieldCheck,
    titulo: "[Placeholder] Sigilo e confiança",
    texto: "[Placeholder] Explicação sobre sigilo profissional.",
  },
  {
    icon: Activity,
    titulo: "[Placeholder] Presencial ou online",
    texto: "[Placeholder] Explicação sobre os formatos de atendimento oferecidos.",
  },
];

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-bg-dark py-20 text-cream">
      <Container>
        <h2 className="font-serif text-3xl sm:text-4xl">Como o acompanhamento funciona</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {itens.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.titulo} className="border-t border-cream/20 pt-6">
                <Icon className="h-6 w-6" />
                <h3 className="mt-4 font-serif text-lg">{item.titulo}</h3>
                <p className="mt-2 text-sm text-cream/80">{item.texto}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
