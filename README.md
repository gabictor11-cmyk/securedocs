# SecureDocs

O SecureDocs ajuda pequenas empresas a criar, revisar e organizar documentos
práticos de segurança cibernética e privacidade em português claro.

## Site

O build estático está na branch `gh-pages`.

**Acessar:** https://gabictor11-cmyk.github.io/securedocs/

Se o link ainda não abrir, em **Settings → Pages** do repositório selecione
**Deploy from a branch**, escolha `gh-pages` e a pasta `/(root)`, e salve.

## O que já existe

- Dashboard de preparação da empresa.
- Biblioteca com busca e filtros.
- Criação guiada de documentos.
- Editor com salvamento local.
- Exportação em `.txt` e `.html`.
- Área pública de apoio via Pix.
- Modo claro e escuro.
- Interface responsiva para desktop e celular.

## Rodando localmente

O projeto usa pnpm e Node.js.

```bash
pnpm install
pnpm --filter @workspace/securedocs run dev
```

Para verificar tipos:

```bash
pnpm --filter @workspace/securedocs run typecheck
```

Para gerar o build:

```bash
PORT=4173 BASE_PATH=/ pnpm --filter @workspace/securedocs run build
```

## Segurança do MVP

Esta primeira versão não usa autenticação nem banco remoto. Os documentos ficam
no `localStorage` do navegador para facilitar a validação inicial do produto.
Não armazene dados pessoais reais ou documentos sensíveis nesta versão antes de
adicionar autenticação, controle de acesso e persistência segura no servidor.

Credenciais, tokens e variáveis de ambiente não devem ser commitados. Consulte
[`SECURITY.md`](./SECURITY.md) antes de abrir o repositório ou configurar
integrações com Supabase e Cloudflare.

## Próxima evolução

O próximo passo recomendado é trocar o armazenamento local por Supabase com
autenticação, políticas de acesso por workspace e armazenamento seguro dos
documentos.