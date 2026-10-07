import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { buildWhatsAppLink, siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section id="inicio" className="pb-20 pt-12 sm:pt-20">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <h1 className="font-serif text-4xl text-ink sm:text-5xl">
            Cuidado psicológico com <span className="italic text-accent">acolhimento</span>,
            escuta e respeito ao seu momento.
          </h1>
          <p className="mt-6 text-lg text-ink-soft">
            [Placeholder] Atendimento psicológico para diferentes momentos da vida,
            presencialmente em {siteConfig.cidade} e também online.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LinkButton href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              Falar pelo WhatsApp
            </LinkButton>
            <a href="#contato" className="text-sm font-semibold text-accent underline">
              Ou preencher o formulário
            </a>
          </div>
          <p className="mt-4 text-sm text-ink-soft">
            {siteConfig.especialidade} · {siteConfig.cidade} e Online
          </p>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-bg-alt">
          <div className="flex h-full items-center justify-center text-center text-sm text-ink-soft">
            [Placeholder]
            <br />
            Foto do psicólogo
          </div>
          <div className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-soft">
            PSICÓLOGO(A) · {siteConfig.crp}
          </div>
        </div>
      </Container>
    </section>
  );
}
