# Meu Projeto (Web II — 3ª Unidade)

Aplicação fullstack com Next.js (App Router). Front e back no mesmo projeto.

## Tecnologias
Next.js, TypeScript, Tailwind CSS, MongoDB Atlas + Mongoose (Singleton), NextAuth.js (JWT), Bcrypt, TanStack Query, Zustand.

## Rodando localmente
```powershell
npm install
Copy-Item .env.example .env.local   # preencha MONGODB_URI e NEXTAUTH_SECRET
npm run dev
```
Gerar um segredo: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

## Funcionalidades
- Cadastro (senha com hash) e login/logout
- Rotas privadas protegidas no front (middleware + layout) e no back (sessão nas API Routes)
- CRUD de itens por usuário, com filtro por status

## Deploy
Vercel, com `MONGODB_URI`, `NEXTAUTH_SECRET` e `NEXTAUTH_URL` configuradas em Environment Variables.

<!-- TODO: link do deploy e prints -->
