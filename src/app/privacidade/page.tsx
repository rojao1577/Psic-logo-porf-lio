import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Política de Privacidade | ${siteConfig.nomePsicologo}`,
};

export default function PrivacidadePage() {
  return (
    <main className="flex-1 py-20">
      <Container className="max-w-3xl space-y-6 text-ink-soft">
        <h1 className="font-serif text-3xl text-ink">Política de Privacidade</h1>
        <p>
          [Placeholder] Texto da política de privacidade — quais dados são coletados pelo
          formulário de contato (nome, telefone/e-mail, motivo do contato), por quanto tempo são
          armazenados, e como solicitar a exclusão, conforme a LGPD.
        </p>
        <p>[Placeholder] Dados de contato do controlador.</p>
      </Container>
    </main>
  );
}
