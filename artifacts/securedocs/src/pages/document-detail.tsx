import { ArrowLeft, Check, Download, FileDown, MoreHorizontal, Save, ShieldCheck, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { useSecureDocs } from '@/hooks/use-securedocs';

export default function DocumentDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { documents, saveDocument, deleteDocument } = useSecureDocs();
  const document = documents.find((item) => item.id === params.id);
  const [title, setTitle] = useState(document?.title || '');
  const [content, setContent] = useState(document?.content || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (document) { setTitle(document.title); setContent(document.content); }
  }, [document?.id]);

  if (!document) return <div className="page-enter mx-auto max-w-xl py-20 text-center"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-muted text-muted-foreground"><FileDown size={24} /></span><h1 className="mt-6 text-2xl font-semibold">Documento não encontrado</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Ele pode ter sido removido ou ainda não foi criado neste navegador.</p><Link href="/documentos" data-testid="link-back-library-not-found" className="mt-6 inline-flex rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">Voltar para documentos</Link></div>;
  const currentDocument = document;

  function save() {
    saveDocument({ ...currentDocument, title: title.trim() || currentDocument.title, content, status: currentDocument.status === 'Rascunho' ? 'Em revisão' : currentDocument.status, updatedAt: 'Agora mesmo', progress: Math.max(currentDocument.progress, 82) });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  function download(kind: 'txt' | 'html') {
    const safeTitle = title || 'documento-securedocs';
    const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    })[character] ?? character);
    const payload = kind === 'txt' ? content : `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${escapeHtml(safeTitle)}</title></head><body><h1>${escapeHtml(safeTitle)}</h1><pre style="white-space:pre-wrap;font:16px sans-serif;line-height:1.7">${escapeHtml(content)}</pre></body></html>`;
    const blob = new Blob([payload], { type: kind === 'txt' ? 'text/plain;charset=utf-8' : 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement('a');
    anchor.href = url; anchor.download = `${safeTitle.toLowerCase().replace(/[^a-z0-9]+/gi, '-')}.${kind}`; anchor.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="page-enter mx-auto max-w-[1280px]">
      <div className="flex flex-wrap items-center justify-between gap-4"><Link href="/documentos" data-testid="link-back-library" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft size={15} /> Todos os documentos</Link><div className="flex items-center gap-2"><button type="button" onClick={() => download('txt')} data-testid="button-download-txt" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-semibold hover:bg-muted"><Download size={15} /> <span className="hidden sm:inline">Baixar .txt</span></button><button type="button" onClick={() => download('html')} data-testid="button-download-html" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-semibold hover:bg-muted"><FileDown size={15} /> <span className="hidden sm:inline">Exportar HTML</span></button><button type="button" data-testid="button-more-document" aria-label="Mais opções" className="rounded-xl border border-border bg-card p-2.5 text-muted-foreground hover:bg-muted"><MoreHorizontal size={17} /></button></div></div>
      <div className="mt-8 grid gap-7 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-[0_12px_34px_hsl(218_31%_18%/.045)]"><div className="border-b border-border px-5 py-5 sm:px-8"><div className="flex items-center gap-2 text-[11px] text-muted-foreground"><span className="rounded-full bg-[hsl(168_36%_39%/.12)] px-2.5 py-1 font-bold text-[hsl(168_46%_31%)] dark:text-[hsl(168_46%_65%)]">{document.status}</span><span>·</span><span>Última edição {document.updatedAt}</span></div><input value={title} onChange={(event) => setTitle(event.target.value)} data-testid="input-document-title" aria-label="Título do documento" className="mt-4 w-full bg-transparent font-serif text-3xl font-semibold tracking-[-.045em] outline-none placeholder:text-muted-foreground sm:text-4xl" /></div><div className="px-5 py-7 sm:px-12 sm:py-10"><textarea value={content} onChange={(event) => setContent(event.target.value)} data-testid="textarea-document-content" aria-label="Conteúdo do documento" className="editor-content min-h-[540px] w-full resize-y bg-transparent text-sm text-foreground/85 outline-none placeholder:text-muted-foreground" /><div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5"><p className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={15} className="text-primary" /> Documento preparado para revisão humana</p><button type="button" onClick={save} data-testid="button-save-document" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-[0_8px_18px_hsl(var(--primary)/.16)]">{saved ? <Check size={15} /> : <Save size={15} />}{saved ? 'Salvo' : 'Salvar alterações'}</button></div></div></section>
        <aside className="space-y-4"><div className="rounded-2xl border border-card-border bg-card p-5"><div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Checklist de revisão</h2><span className="font-mono text-[10px] text-muted-foreground">{document.progress}%</span></div><div className="mt-4 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${document.progress}%` }} /></div><div className="mt-5 space-y-3">{document.checklist.map((item, index) => <label key={item} className="flex items-start gap-2.5 text-xs leading-5 text-muted-foreground"><input type="checkbox" defaultChecked={index < Math.ceil(document.checklist.length * document.progress / 100)} data-testid={`checkbox-checklist-${index}`} className="mt-1 accent-[hsl(var(--primary))]" />{item}</label>)}</div></div><div className="rounded-2xl border border-border bg-muted/50 p-5"><p className="text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">Dica de segurança</p><p className="mt-3 text-sm leading-6">Leia o documento como se fosse uma pessoa nova na equipe. Se uma ação não estiver clara, ela precisa de mais contexto.</p></div><button type="button" onClick={() => { if (window.confirm('Excluir este documento?')) { deleteDocument(document.id); setLocation('/documentos'); } }} data-testid="button-delete-document" className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold text-destructive hover:bg-destructive/10"><Trash2 size={14} /> Excluir documento</button></aside>
      </div>
    </div>
  );
}