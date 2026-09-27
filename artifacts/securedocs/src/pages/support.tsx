import { Check, Copy, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';

const pixKey = 'e07a470a-59cd-4a97-8c14-22ba7a0e26dd';

export default function Support() {
  const [copied, setCopied] = useState(false);

  async function copyPixKey() {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="page-enter mx-auto max-w-[1020px]">
      <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-primary">
        Apoie o projeto
      </p>
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-start">
        <section className="rounded-3xl border border-card-border bg-card p-6 shadow-[0_16px_44px_hsl(218_31%_18%/.06)] sm:p-10">
          <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
            <HeartHandshake size={23} />
          </span>
          <h1 className="mt-7 max-w-xl font-serif text-4xl leading-[1.05] tracking-[-.045em] sm:text-5xl">
            Segurança digital também se constrói em comunidade.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            O SecureDocs nasceu para tornar a segurança e a privacidade mais acessíveis
            para pequenas empresas. Se este projeto fizer sentido para você, seu apoio
            ajuda a manter o produto independente, melhorar os modelos e criar novos
            recursos gratuitos.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-muted/70 p-4">
              <Sparkles size={18} className="text-primary" />
              <p className="mt-4 text-sm font-semibold">Evolução contínua</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Mais modelos e orientações práticas para o dia a dia.
              </p>
            </div>
            <div className="rounded-2xl bg-muted/70 p-4">
              <ShieldCheck size={18} className="text-[hsl(168_46%_42%)]" />
              <p className="mt-4 text-sm font-semibold">Projeto independente</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                O apoio ajuda a preservar uma experiência simples e sem anúncios.
              </p>
            </div>
          </div>
        </section>

        <aside className="rounded-3xl bg-sidebar p-6 text-sidebar-foreground shadow-[0_16px_44px_hsl(218_31%_18%/.15)] sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">
            Apoio via Pix
          </p>
          <h2 className="mt-5 text-2xl font-semibold tracking-[-.035em]">
            Contribua com o SecureDocs
          </h2>
          <p className="mt-3 text-sm leading-6 text-sidebar-foreground/65">
            Copie a chave abaixo e faça sua contribuição pelo aplicativo do seu banco.
          </p>
          <div className="mt-7 rounded-2xl border border-sidebar-border bg-sidebar-accent/60 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-sidebar-foreground/45">
              Chave aleatória
            </p>
            <p className="mt-3 break-all font-mono text-xs leading-5 text-sidebar-foreground/90">
              {pixKey}
            </p>
          </div>
          <button
            type="button"
            onClick={copyPixKey}
            data-testid="button-copy-pix"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_24px_hsl(var(--primary)/.2)] transition-transform hover:-translate-y-0.5"
          >
            {copied ? <Check size={17} /> : <Copy size={17} />}
            {copied ? 'Chave copiada' : 'Copiar chave Pix'}
          </button>
          <p className="mt-4 text-center text-[11px] leading-5 text-sidebar-foreground/45">
            Obrigado por apoiar o desenvolvimento do projeto.
          </p>
        </aside>
      </div>
    </div>
  );
}