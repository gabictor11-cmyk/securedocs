import { ArrowLeft, ArrowRight, Check, ClipboardList, FileText, LockKeyhole, ShieldCheck, Siren, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useSecureDocs } from '@/hooks/use-securedocs';
import { makeDocument, templates } from '@/lib/securedocs-store';

const icons = { ShieldCheck, Siren, ClipboardList, FileText };
const questions = [
  { key: 'company', label: 'Como sua empresa se chama?', placeholder: 'Ex.: Dobra Studio', hint: 'Usaremos o nome para deixar o documento específico para sua operação.' },
  { key: 'focus', label: 'O que você quer proteger primeiro?', placeholder: 'Ex.: dados de clientes e pedidos', hint: 'Pode ser simples. Pense no que não pode parar ou vazar.' },
  { key: 'contact', label: 'Qual canal deve aparecer no documento?', placeholder: 'Ex.: privacidade@dobrastudio.com.br', hint: 'Um e-mail ou pessoa responsável que sua equipe reconheça.' },
];

export default function NewDocument() {
  const [, setLocation] = useLocation();
  const { saveDocument } = useSecureDocs();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(templates[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const currentQuestion = questions[step - 1];
  const canContinue = step === 0 ? Boolean(selected) : Boolean(answers[currentQuestion?.key]);

  function generate() {
    setIsGenerating(true);
    window.setTimeout(() => {
      const created = makeDocument(selected, answers);
      saveDocument(created);
      setLocation(`/documentos/${created.id}`);
    }, 650);
  }

  return (
    <div className="page-enter mx-auto max-w-[1040px]">
      <Link href="/documentos" data-testid="link-back-documents" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft size={15} /> Voltar para documentos</Link>
      <div className="mt-8 grid gap-9 lg:grid-cols-[220px_1fr]">
        <aside><p className="text-xs font-bold uppercase tracking-[.16em] text-primary">Criar documento</p><h1 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Comece pelo<br /> contexto.</h1><p className="mt-4 text-sm leading-6 text-muted-foreground">Poucas respostas. Um documento que entende como seu negócio funciona.</p><div className="mt-10 hidden space-y-4 lg:block">{['Escolha um ponto de partida', 'Conte sobre sua empresa', 'Revise e gere'].map((label, index) => <div key={label} className="flex items-start gap-3"><span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${step >= index ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{step > index ? <Check size={14} /> : index + 1}</span><span className={`pt-1 text-xs ${step >= index ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{label}</span></div>)}</div></aside>
        <section className="min-w-0 rounded-3xl border border-card-border bg-card p-5 shadow-[0_12px_34px_hsl(218_31%_18%/.045)] sm:p-8">
          <div className="flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Etapa {step + 1} de 4</p><div className="mt-3 h-1.5 w-32 overflow-hidden rounded-full bg-muted sm:w-56"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((step + 1) / 4) * 100}%` }} /></div></div><span className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><LockKeyhole size={13} /> Salvo localmente</span></div>
          {step === 0 && <div className="mt-10"><h2 className="text-2xl font-semibold tracking-[-.035em]">O que você quer organizar?</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Escolha um modelo. Ele será preenchido com as respostas do seu contexto, não com texto genérico.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{templates.map((template) => { const Icon = icons[template.icon as keyof typeof icons]; return <button type="button" key={template.id} onClick={() => setSelected(template.id)} data-testid={`template-${template.id}`} className={`group rounded-2xl border p-4 text-left transition-all ${selected === template.id ? 'border-primary bg-accent/60 shadow-[0_0_0_3px_hsl(var(--primary)/.1)]' : 'border-border hover:border-primary/50 hover:bg-muted/40'}`}><div className="flex items-start justify-between"><span className={`grid size-10 place-items-center rounded-xl ${selected === template.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}><Icon size={19} /></span>{selected === template.id && <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground"><Check size={14} /></span>}</div><h3 className="mt-5 text-sm font-semibold">{template.title}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{template.description}</p><p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{template.category} · {template.time}</p></button>; })}</div></div>}
          {step > 0 && step < 4 && <div className="mt-10 max-w-xl"><span className="grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground"><Sparkles size={20} /></span><h2 className="mt-7 text-2xl font-semibold tracking-[-.035em]">{currentQuestion.label}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{currentQuestion.hint}</p><input autoFocus value={answers[currentQuestion.key] || ''} onChange={(event) => setAnswers({ ...answers, [currentQuestion.key]: event.target.value })} onKeyDown={(event) => { if (event.key === 'Enter' && canContinue) setStep(step + 1); }} placeholder={currentQuestion.placeholder} data-testid={`input-${currentQuestion.key}`} className="mt-8 h-13 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10" /></div>}
          {step === 4 && <div className="mt-10"><span className="grid size-11 place-items-center rounded-2xl bg-[hsl(168_36%_39%/.12)] text-[hsl(168_46%_31%)] dark:text-[hsl(168_46%_65%)]"><ShieldCheck size={21} /></span><h2 className="mt-7 text-2xl font-semibold tracking-[-.035em]">Tudo pronto para gerar.</h2><p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">O SecureDocs vai montar seu {templates.find((item) => item.id === selected)?.title.toLowerCase()} com base no seu contexto. Você poderá editar tudo depois.</p><div className="mt-7 rounded-2xl bg-muted/70 p-5"><p className="text-xs font-bold uppercase tracking-[.12em] text-muted-foreground">Resumo</p><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between gap-5"><dt className="text-muted-foreground">Modelo</dt><dd className="text-right font-semibold">{templates.find((item) => item.id === selected)?.title}</dd></div>{Object.entries(answers).map(([key, value]) => <div key={key} className="flex justify-between gap-5"><dt className="text-muted-foreground">{questions.find((item) => item.key === key)?.label}</dt><dd className="max-w-[58%] text-right font-semibold">{value}</dd></div>)}</dl></div></div>}
          <div className="mt-10 flex justify-between gap-3 border-t border-border pt-5">{step > 0 ? <button type="button" onClick={() => setStep(step - 1)} data-testid="button-previous-step" className="rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted">Voltar</button> : <span />}{step < 4 ? <button type="button" disabled={!canContinue} onClick={() => setStep(step + 1)} data-testid="button-next-step" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_hsl(var(--primary)/.15)] disabled:cursor-not-allowed disabled:opacity-40">Continuar <ArrowRight size={16} /></button> : <button type="button" disabled={isGenerating} onClick={generate} data-testid="button-generate-document" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{isGenerating ? 'Gerando documento...' : 'Gerar documento'} <Sparkles size={16} /></button>}</div>
        </section>
      </div>
    </div>
  );
}