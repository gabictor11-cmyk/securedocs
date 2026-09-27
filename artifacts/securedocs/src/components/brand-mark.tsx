import { ShieldCheck } from 'lucide-react';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" data-testid="brand-securedocs">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_8px_20px_hsl(var(--primary)/.22)]">
        <ShieldCheck size={20} strokeWidth={2.4} />
      </span>
      {!compact && (
        <span className="font-semibold tracking-[-.03em] text-[17px] text-sidebar-foreground">
          Secure<span className="text-primary">Docs</span>
        </span>
      )}
    </div>
  );
}