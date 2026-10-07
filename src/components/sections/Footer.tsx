import { Container } from "@/components/ui/Container";
import { siteConfig, buildWhatsAppLink } from "@/lib/site-config";

const COPYRIGHT_YEAR = 2026; // atualizar manualmente (ver comentário abaixo)

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-bg py-10">
      <Container className="flex flex-col items-center gap-4 text-center text-sm text-ink-soft sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-serif text-lg text-ink">{siteConfig.nomePsicologo}</p>
          <p>
            {siteConfig.especialidade} · {siteConfig.crp}
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4">
          <a href="#sobre" className="hover:text-accent">Sobre</a>
          <a href="#atendimentos" className="hover:text-accent">Atendimentos</a>
          <a href="#faq" className="hover:text-accent">FAQ</a>
          <a href="#contato" className="hover:text-accent">Contato</a>
          <a href="/privacidade" className="hover:text-accent">Privacidade</a>
          <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            WhatsApp
          </a>
        </nav>
      </Container>

      <p className="mt-6 text-center text-xs text-ink-soft/70">
        {/* Ano fixo (não `new Date()`) pra manter a home estática sob Cache Components —
            ver https://nextjs.org/docs/messages/blocking-prerender-current-time */}
        © {COPYRIGHT_YEAR} {siteConfig.nomePsicologo}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
