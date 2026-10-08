"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

/**
 * Precisa ser um componente separado (não pode estar no mesmo arquivo que
 * renderiza o <form>): useFormStatus() só enxerga o status do <form> mais
 * próximo que for ANCESTRAL desse componente, nunca o form que ele mesmo
 * renderiza.
 */
export function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer text-sm font-medium text-accent underline disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saindo..." : "Sair"}
      </button>

      {pending ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-bg-alt">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-sm text-ink-soft">Saindo...</p>
        </div>
      ) : null}
    </>
  );
}
