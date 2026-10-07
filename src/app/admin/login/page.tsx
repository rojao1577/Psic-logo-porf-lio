import { Container } from "@/components/ui/Container";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Login | Painel administrativo" };

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-bg-alt py-20">
      <Container className="max-w-sm">
        <div className="rounded-2xl bg-white p-8 shadow-soft">
          <h1 className="font-serif text-2xl text-ink">Painel administrativo</h1>
          <p className="mt-1 text-sm text-ink-soft">Acesso restrito.</p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
      </Container>
    </main>
  );
}
