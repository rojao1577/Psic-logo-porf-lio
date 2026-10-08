import { Container } from "@/components/ui/Container";
import { prisma } from "@/lib/db";
import { toggleContatado, deleteLead, logoutAction } from "./actions";

interface AdminPageProps {
  searchParams: Promise<{ data?: string }>;
}

export const metadata = { title: "Leads | Painel administrativo" };
// Painel sempre dinâmico (dados do banco por request, atrás de auth) — não
// faz sentido pré-renderizar estaticamente. Ver blocking-prerender-dynamic.
export const instant = false;

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { data } = await searchParams;

  const where = data
    ? {
        createdAt: {
          gte: new Date(`${data}T00:00:00`),
          lt: new Date(`${data}T23:59:59.999`),
        },
      }
    : undefined;

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen flex-1 bg-bg-alt py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl text-ink">Leads recebidos</h1>
            <p className="text-sm text-ink-soft">{leads.length} registro(s)</p>
          </div>

          <div className="flex items-center gap-4">
            <form className="flex items-center gap-2">
              <input
                type="date"
                name="data"
                defaultValue={data ?? ""}
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="cursor-pointer rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-medium text-ink"
              >
                Filtrar
              </button>
              {data ? (
                <a href="/admin" className="text-sm text-accent underline">
                  Limpar
                </a>
              ) : null}
            </form>

            <form action={logoutAction}>
              <button type="submit" className="cursor-pointer text-sm font-medium text-accent underline">
                Sair
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-soft">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-black/10 text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Contato</th>
                <th className="px-4 py-3">Motivo</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-black/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{lead.nome}</td>
                  <td className="px-4 py-3 text-ink-soft">{lead.contato}</td>
                  <td className="max-w-xs truncate px-4 py-3 text-ink-soft" title={lead.motivo}>
                    {lead.motivo}
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{lead.createdAt.toLocaleDateString("pt-BR")}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        lead.contatado
                          ? "rounded-full bg-accent-tint px-3 py-1 text-xs font-semibold text-accent"
                          : "rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-ink-soft"
                      }
                    >
                      {lead.contatado ? "Contatado" : "Pendente"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <form action={toggleContatado.bind(null, lead.id, !lead.contatado)}>
                        <button
                          type="submit"
                          className="cursor-pointer text-xs font-semibold text-accent underline"
                        >
                          {lead.contatado ? "Marcar pendente" : "Marcar contatado"}
                        </button>
                      </form>
                      <form action={deleteLead.bind(null, lead.id)}>
                        <button
                          type="submit"
                          className="cursor-pointer text-xs font-semibold text-red-600 underline"
                        >
                          Excluir
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}

              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-ink-soft">
                    Nenhum lead encontrado.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
}
