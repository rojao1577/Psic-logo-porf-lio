import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";
import { Camera } from "lucide-react";

const posts = [1, 2];

export function GaleriaInstagram() {
  return (
    <section className="bg-bg-alt py-20">
      <Container className="grid items-center gap-8 md:grid-cols-[auto_auto_1fr]">
        <div className="flex gap-4">
          {posts.map((post) => (
            <div key={post} className="relative aspect-[4/5] w-32 overflow-hidden rounded-2xl bg-white shadow-soft sm:w-40">
              <div className="flex h-full items-center justify-center text-center text-xs text-ink-soft">
                [Placeholder]
                <br />
                Post {post}
              </div>
              <div className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-accent shadow-soft">
                <Camera className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-serif text-2xl text-ink sm:text-3xl">
            Psicologia sem palavras difíceis, no seu feed
          </h2>
          <p className="mt-4 text-ink-soft">
            [Placeholder] Reflexões sobre saúde emocional e conteúdos para te ajudar no dia a dia.
          </p>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            <Camera className="h-4 w-4" />
            {siteConfig.instagramHandle}
          </a>
        </div>
      </Container>
    </section>
  );
}
