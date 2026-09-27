import { Bell, ChevronRight, FileText, FolderKanban, HandHeart, LayoutDashboard, Menu, Moon, Plus, Settings, Sun, X } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { BrandMark } from '@/components/brand-mark';
import { useSecureDocs } from '@/hooks/use-securedocs';

const navItems = [
  { href: '/', label: 'Visão geral', icon: LayoutDashboard },
  { href: '/documentos', label: 'Documentos', icon: FileText },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
  { href: '/apoie', label: 'Apoie o projeto', icon: HandHeart },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme, documents } = useSecureDocs();
  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="app-shell noise text-foreground">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[248px] flex-col bg-sidebar px-4 py-5 text-sidebar-foreground md:flex">
        <div className="px-3"><BrandMark /></div>
        <div className="mt-10 px-3 text-[10px] font-bold uppercase tracking-[.17em] text-sidebar-foreground/45">Workspace</div>
        <nav className="mt-3 space-y-1" aria-label="Navegação principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={closeMobile} data-testid={`link-nav-${item.label.toLowerCase().replace(' ', '-')}`} className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${active ? 'bg-sidebar-accent text-sidebar-foreground' : 'text-sidebar-foreground/65 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground'}`}>
                <Icon size={18} strokeWidth={active ? 2.3 : 1.8} />
                <span className="flex-1">{item.label}</span>
                {item.href === '/documentos' && <span className="font-mono text-[10px] text-sidebar-foreground/40">{documents.length}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 border-t border-sidebar-border pt-6">
          <Link href="/novo-documento" data-testid="link-new-document" className="flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_24px_hsl(var(--primary)/.18)] transition-transform hover:-translate-y-0.5">
            <Plus size={17} /> Novo documento
          </Link>
        </div>
        <div className="mt-auto rounded-2xl border border-sidebar-border bg-sidebar-accent/50 p-3">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 grid size-7 place-items-center rounded-lg bg-[hsl(168_36%_39%/.18)] text-[hsl(168_46%_65%)]"><FolderKanban size={15} /></span>
            <div><p className="text-xs font-medium">Seu workspace</p><p className="mt-1 text-[11px] leading-4 text-sidebar-foreground/50">Dobra Studio · plano gratuito</p></div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between px-2 text-xs text-sidebar-foreground/45">
          <span>SecureDocs v1.0</span>
          <button type="button" onClick={toggleTheme} aria-label="Alternar tema" data-testid="button-toggle-theme" className="rounded-lg p-1.5 hover:bg-sidebar-accent hover:text-sidebar-foreground">{theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}</button>
        </div>
      </aside>

      {mobileOpen && <button type="button" aria-label="Fechar menu" onClick={closeMobile} className="fixed inset-0 z-40 bg-[hsl(218_31%_18%/.42)] md:hidden" data-testid="button-close-overlay" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[258px] flex-col bg-sidebar px-4 py-5 text-sidebar-foreground transition-transform md:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-3"><BrandMark /><button type="button" onClick={closeMobile} data-testid="button-close-menu" className="rounded-lg p-2 hover:bg-sidebar-accent"><X size={18} /></button></div>
        <nav className="mt-10 space-y-1">{navItems.map((item) => { const Icon = item.icon; return <Link key={item.href} href={item.href} onClick={closeMobile} data-testid={`mobile-link-${item.label}`} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent"><Icon size={18} />{item.label}</Link>; })}</nav>
        <Link href="/novo-documento" onClick={closeMobile} data-testid="mobile-link-new-document" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground"><Plus size={17} /> Novo documento</Link>
        <button type="button" onClick={toggleTheme} data-testid="mobile-button-toggle-theme" className="mt-auto flex items-center gap-2 rounded-xl border border-sidebar-border px-3 py-3 text-sm">{theme === 'light' ? <Moon size={16} /> : <Sun size={16} />} Modo {theme === 'light' ? 'escuro' : 'claro'}</button>
      </aside>

      <div className="md:pl-[248px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-border/70 bg-background/90 px-5 backdrop-blur-xl sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMobileOpen(true)} data-testid="button-open-menu" className="rounded-lg p-2 hover:bg-muted md:hidden"><Menu size={20} /></button>
            <div className="md:hidden"><BrandMark compact /></div>
            <p className="hidden text-sm text-muted-foreground md:block">Quinta-feira, 21 de junho de 2024</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button type="button" data-testid="button-notifications" aria-label="Notificações" className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><Bell size={18} /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" /></button>
            <span className="hidden h-5 w-px bg-border sm:block" />
            <Link href="/configuracoes" data-testid="link-account" className="flex items-center gap-2.5 rounded-xl py-1 pl-1 pr-2 hover:bg-muted"><span className="grid size-8 place-items-center rounded-full bg-[hsl(25_52%_23%)] text-xs font-bold text-[hsl(39_88%_85%)]">DS</span><span className="hidden text-left sm:block"><span className="block text-xs font-semibold">Dobra Studio</span><span className="block text-[10px] text-muted-foreground">Workspace</span></span><ChevronRight size={14} className="hidden text-muted-foreground sm:block" /></Link>
          </div>
        </header>
        <main className="px-5 py-7 sm:px-8 lg:px-12 lg:py-10">{children}</main>
      </div>
    </div>
  );
}