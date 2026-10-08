import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center gap-3 bg-bg-alt">
      <Loader2 className="h-8 w-8 animate-spin text-accent" />
      <p className="text-sm text-ink-soft">Carregando painel...</p>
    </div>
  );
}
