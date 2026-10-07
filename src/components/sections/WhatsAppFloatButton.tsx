import { buildWhatsAppLink } from "@/lib/site-config";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloatButton() {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-soft transition-transform hover:scale-105"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
