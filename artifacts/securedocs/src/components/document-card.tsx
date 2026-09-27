import { ArrowUpRight, FileCheck2, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'wouter';
import type { SecureDocument } from '@/lib/securedocs-store';

const statusStyle: Record<SecureDocument['status'], string> = {
  Pronto: 'bg-[hsl(168_36%_39%/.12)] text-[hsl(168_46%_31%)] dark:text-[hsl(168_46%_65%)]',
  'Em revisão': 'bg-accent text-accent-foreground',
  Rascunho: 'bg-muted text-muted-foreground',
};

export function DocumentCard({ document, onDelete, compact = false }: { document: SecureDocument; onDelete?: (id: string) => void; compact?: boolean }) {
  return (
    <article className={`group rounded-2xl border border-card-border bg-card p-5 shadow-[0_8px_28px_hsl(218_31%_18%/.035)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_hsl(218_31%_18%/.08)] ${compact ? 'sm:p-4' : ''}`} data-testid={`card-document-${document.id}`}>
      <div className="flex items-start justify-between gap-3">
        <Link href={`/documentos/${document.id}`} data-testid={`link-document-${document.id}`} className="flex min-w-0 items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground"><FileCheck2 size={18} /></span>
          <div className="min-w-0"><h3 className="truncate text-sm font-semibold tracking-[-.01em] group-hover:text-primary">{document.title}</h3><p className="mt-1 text-xs text-muted-foreground">{document.category} · Atualizado {document.updatedAt}</p></div>
        </Link>
        {onDelete ? <button type="button" onClick={() => onDelete(document.id)} aria-label={`Opções de ${document.title}`} data-testid={`button-options-${document.id}`} className="rounded-lg p-1.5 text-muted-foreground opacity-60 hover:bg-muted hover:opacity-100"><MoreHorizontal size={17} /></button> : <ArrowUpRight size={16} className="mt-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle[document.status]}`}>{document.status}</span><span className="font-mono text-[10px] text-muted-foreground">{document.progress}% concluído</span></div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${document.progress}%` }} /></div>
      {onDelete && <div className="mt-4 flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100"><Link href={`/documentos/${document.id}`} data-testid={`button-edit-${document.id}`} className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"><Pencil size={13} /> Editar</Link><button type="button" onClick={() => onDelete(document.id)} data-testid={`button-delete-${document.id}`} className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"><Trash2 size={13} /> Excluir</button></div>}
    </article>
  );
}