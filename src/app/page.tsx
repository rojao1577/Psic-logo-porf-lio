import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Temas } from "@/components/sections/Temas";
import { Sobre } from "@/components/sections/Sobre";
import { TiposAtendimento } from "@/components/sections/TiposAtendimento";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { HorariosModalidades } from "@/components/sections/HorariosModalidades";
import { GaleriaInstagram } from "@/components/sections/GaleriaInstagram";
import { Consultorio } from "@/components/sections/Consultorio";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloatButton } from "@/components/sections/WhatsAppFloatButton";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Temas />
        <Sobre />
        <TiposAtendimento />
        <ComoFunciona />
        <HorariosModalidades />
        <GaleriaInstagram />
        <Consultorio />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  );
}
