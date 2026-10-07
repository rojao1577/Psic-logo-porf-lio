import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { buildWhatsAppLink, siteConfig } from "@/lib/site-config";
import { GraduationCap, BookOpen, HeartHandshake, Award } from "lucide-react";

const credenciais = [
  { icon: Award, texto: `${siteConfig.especialidade} · ${siteConfig.crp}` },
  { icon: GraduationCap, texto: "[Placeholder] Formação complementar" },
  { icon: BookOpen, texto: "[Placeholder] Especialização em andamento" },
  { icon: HeartHandshake, texto: "[Placeholder] Abordagem terapêutica" },
];

const tags = ["[Placeholder tag]", "[Placeholder tag]", "Atendimento Online", `Atendimento em ${siteConfig.cidade}`];

export function Sobre() {
  return (
    <section id="sobre" className="bg-bg-alt py-20">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <div className="mx-auto aspect-[4/5] w-full max-w-sm rounded-[2rem] bg-white shadow-soft">
          <div className="flex h-full items-center justify-center text-center text-sm text-ink-soft">
            [Placeholder]
            <br />
            Foto do psicólogo
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">
            Um atendimento construído a partir da escuta
          </h2>
          <p className="mt-6 text-ink-soft">
            [Placeholder] Sou {siteConfig.nomePsicologo}, {siteConfig.especialidade.toLowerCase()}, e meu
            trabalho é oferecer um atendimento baseado em escuta, acolhimento e respeito à
            individualidade de cada paciente.
          </p>

          <div className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              Formação e credenciais
            </p>
            {credenciais.map(({ icon: Icon, texto }) => (
              <div
                key={texto}
                className="flex items-center gap-3 border-b border-black/5 pb-3 last:border-0 last:pb-0"
              >
                <Icon className="h-5 w-5 text-accent" />
                <span className="text-sm text-ink">{texto}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>

          <div className="mt-8">
            <LinkButton href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" variant="outline">
              Quero saber mais sobre o atendimento
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
