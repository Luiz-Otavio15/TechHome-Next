# O que ficou para você decidir

Marque conforme for fazendo. Os `// TODO` no código mostram onde mexer.

- [ ] **Identidade da loja**: nome (`layout.tsx`, `Navbar.tsx`), frase da home (`page.tsx`), logo em `public/logo.svg`, cores (troque `indigo` por outra cor)
- [ ] **Biblioteca de UI**: o base usa só Tailwind. Para o critério 4, adicione ShadCN/UI (`npx shadcn@latest init` e `add button input dialog card sonner`) e troque o modal e os botões, ou use HeroUI
- [ ] **Quem pode cadastrar produtos**: hoje qualquer usuário logado cadastra e gerencia os próprios produtos. Se quiser só um admin, adicione `role` no model `User` e confira no `middleware` e nas rotas `/api/produtos`
- [ ] **Campos extras do produto**: imagem (use `<Image>` + `remotePatterns` no `next.config.ts`), categoria, código, desconto
- [ ] **Extras da vitrine**: busca e filtro por categoria, ordenação por preço, paginação, carrinho (Zustand é ótimo para isso)
- [ ] **Estoque**: baixar o estoque ao "comprar" (uma rota `POST /api/produtos/[id]/comprar` com `$inc: { estoque: -1 }`)
- [ ] **README final** com descrição, prints e link do deploy
- [ ] **Deploy**: Vercel + variáveis de ambiente (antes do primeiro deploy) + liberar `0.0.0.0/0` no Network Access do Atlas
