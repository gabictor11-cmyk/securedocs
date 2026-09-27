# SecureDocs

O SecureDocs ajuda pequenas empresas a criar, revisar e organizar documentos práticos de segurança cibernética e privacidade em português claro.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/securedocs/src/` — aplicativo web principal.
- `artifacts/securedocs/src/lib/securedocs-store.ts` — modelos de documentos, conteúdo inicial e persistência local do MVP.
- `artifacts/securedocs/src/index.css` — tokens visuais e modos claro/escuro.
- `artifacts/securedocs/src/components/brand-mark.tsx` — marca visual do SecureDocs.

## Architecture decisions

- O primeiro MVP funciona sem credenciais externas: documentos e preferências são salvos no navegador para permitir validação rápida do produto.
- O fluxo de criação é guiado por perguntas práticas e gera um rascunho editável, em vez de prometer conformidade automática.
- O armazenamento está isolado atrás de um pequeno store para facilitar a futura troca por Supabase sem reescrever as telas.
- A identidade usa branco e laranja como base, com modo escuro para uso prolongado em ambientes de trabalho.

## Product

O SecureDocs nasceu para reduzir a distância entre “precisamos melhorar nossa segurança” e “temos um próximo passo documentado”. O foco é transformar tarefas confusas de segurança e privacidade em documentos úteis, revisáveis e adequados à realidade de pequenas empresas. A primeira versão inclui painel de preparação, biblioteca de documentos, criação guiada, editor, exportação e preferências de aparência.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
