# Segurança

## Reportando uma vulnerabilidade

Não publique credenciais, chaves privadas, dados pessoais ou detalhes exploráveis
em uma issue pública. Para uma vulnerabilidade real, abra um aviso privado de
segurança no GitHub ou entre em contato com os mantenedores por um canal privado.

Inclua, quando possível:

- descrição do problema;
- passos mínimos para reproduzir;
- impacto observado;
- sugestão de correção.

## Boas práticas locais

- Nunca faça commit de arquivos `.env`, tokens, senhas, certificados ou chaves privadas.
- Use variáveis de ambiente para qualquer integração futura com Supabase, Cloudflare
  ou serviços de pagamento.
- Os documentos do MVP ficam no `localStorage` do navegador. Não use esta versão
  para armazenar dados sensíveis reais antes de adicionar autenticação, controle de
  acesso e armazenamento criptografado no servidor.
- A chave Pix exibida na área “Apoie o projeto” é pública por decisão do proprietário
  do projeto e não deve ser tratada como segredo.