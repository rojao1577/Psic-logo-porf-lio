import { Header } from "@/components/sections/Header";
import { ContatoForm } from "@/components/sections/ContatoForm";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloatButton } from "@/components/sections/WhatsAppFloatButton";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Fale conosco | ${siteConfig.nomePsicologo}`,
};

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ContatoForm />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  );
}
