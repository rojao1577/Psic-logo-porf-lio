import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { siteConfig } from "@/lib/site-config";

const fotos = ["[Placeholder] Sala de atendimento", "[Placeholder] Espaço de acolhimento", "[Placeholder] Recepção"];

export function Consultorio() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Conheça o consultório"
          description="[Placeholder] Descrição do espaço de atendimento presencial."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {fotos.map((foto) => (
            <div key={foto} className="aspect-[4/3] overflow-hidden rounded-2xl bg-bg-alt">
              <div className="flex h-full items-center justify-center p-4 text-center text-sm text-ink-soft">
                {foto}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-2xl bg-white p-6 shadow-soft sm:flex-row sm:items-center">
          <div>
            <p className="font-serif text-lg text-ink">{siteConfig.endereco.local}</p>
            <p className="mt-1 text-sm text-ink-soft">{siteConfig.endereco.rua}</p>
            <p className="text-sm text-ink-soft">
              {siteConfig.endereco.bairro}, {siteConfig.endereco.cidadeUf}
            </p>
            <p className="text-sm text-ink-soft">{siteConfig.endereco.cep}</p>
          </div>
          <LinkButton href="https://maps.google.com" target="_blank" rel="noopener noreferrer" variant="outline">
            Abrir no Google Maps
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
