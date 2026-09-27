import { ArrowLeft, SearchX, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="page-enter mx-auto flex max-w-xl flex-col items-center py-20 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground"><SearchX size={25} /></span>
      <p className="mt-7 text-xs font-bold uppercase tracking-[.16em] text-primary">404 · página não encontrada</p>
      <h1 className="mt-3 font-serif text-4xl tracking-[-.04em]">Este caminho não existe.</h1>
      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">O endereço pode estar desatualizado. Seus documentos continuam seguros no workspace.</p>
      <Link href="/" data-testid="link-not-found-home" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"><ArrowLeft size={16} /> Voltar ao início</Link>
      <div className="mt-16 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={15} className="text-primary" /> SecureDocs</div>
    </div>
  );
}
