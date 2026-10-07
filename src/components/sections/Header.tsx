import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { buildWhatsAppLink, siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#atendimentos", label: "Atendimentos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-bg/90 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link href="#inicio" className="flex flex-col leading-tight">
          <span className="font-serif text-xl text-ink">{siteConfig.nomePsicologo}</span>
          <span className="text-xs text-ink-soft">{siteConfig.especialidade}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-ink hover:text-accent">
              {link.label}
            </a>
          ))}
        </nav>

        <LinkButton href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">
          Falar pelo WhatsApp
        </LinkButton>
      </Container>
    </header>
  );
}
