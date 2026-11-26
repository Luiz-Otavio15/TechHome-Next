# TechHome — Loja (Web II — 3ª Unidade)

Aplicação fullstack de e-commerce com **Next.js (App Router)**: front-end e back-end no mesmo projeto, autenticação por credenciais, cadastro de produtos com estoque, checkout com endereço e histórico de pedidos por usuário.

> A aplicação fica na pasta **`tech-home/`**. Todos os comandos `npm` devem ser executados de dentro dela.

## Estrutura do repositório

```
TechHome-Next/
├─ README.md
├─ OPCOES.md              # melhorias sugeridas / decisões de projeto
├─ .env.example           # modelo das variáveis de ambiente
└─ tech-home/             # aplicação Next.js
   ├─ src/app/            # rotas (pages), server actions, error/not-found e API do NextAuth
   ├─ src/components/     # componentes de UI e de domínio
   ├─ src/lib/            # db.ts (Mongoose singleton) e auth.ts (NextAuth)
   ├─ src/models/         # User, Product e Pedido
   ├─ src/store/          # estado de UI no client (Zustand)
   ├─ src/types/          # augmentação de tipos do NextAuth (id/role na sessão)
   ├─ src/proxy.ts        # proteção de rotas (equivalente ao middleware no Next 16)
   └─ next.config.ts
```

## Pré-requisitos

| Requisito | Versão | Observação |
| --- | --- | --- |
| **Node.js** | **>= 20.19** (recomendado 22 LTS ou 24) | `next@16` exige `>=20.9` e `mongoose@9` exige `>=20.19` |
| **npm** | >= 10 | O projeto usa `package-lock.json` (npm) |
| **MongoDB** | Atlas (free tier) ou local | A conexão é feita via `MONGODB_URI` |
| **Git** | qualquer versão recente | — |

Confira a versão instalada com `node -v`. Se estiver abaixo de 20.19, atualize o Node (nvm-windows, fnm ou instalador oficial) antes de continuar.

## Instalação e execução

```powershell
cd tech-home
npm install
Copy-Item .env.example .env.local   # depois preencha as variáveis
npm run dev
```

Acesse <http://localhost:3000>.

### Variáveis de ambiente (`.env.local`)

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `MONGODB_URI` | ✅ | String de conexão do MongoDB (`mongodb+srv://...` no Atlas) |
| `NEXTAUTH_SECRET` | ✅ | Segredo usado para assinar o JWT da sessão |
| `NEXTAUTH_URL` | ✅ (local/deploy) | URL base da aplicação (`http://localhost:3000` em dev) |

Gerar um `NEXTAUTH_SECRET`:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

No MongoDB Atlas, libere o acesso de rede em **Network Access** (`0.0.0.0/0` para desenvolvimento) e crie um usuário de banco em **Database Access**.

## Dependências

### Runtime (`dependencies`)

| Pacote | Versão | Para que serve no projeto |
| --- | --- | --- |
| `next` | `16.4.6` | Framework (App Router, Server Components, Server Actions) |
| `react` / `react-dom` | `19.3.1` | Biblioteca de UI exigida pelo Next |
| `next-auth` | `^4.24.15` | Login/logout com Credentials + sessão JWT |
| `bcryptjs` | `^3.0.3` | Hash das senhas dos usuários |
| `mongoose` | `^9.12.3` | ODM do MongoDB (conexão singleton em `src/lib/db.ts`) |
| `@tanstack/react-query` | `^5.108.2` | Instalado, mas **não utilizado** no momento (a sincronização usa `revalidatePath`) |
| `zustand` | `^5.1.0` | Estado de UI no client — ordenação da vitrine (`src/store/filters.ts`) |
| `lucide-react` | `^1.79.0` | Ícones |
| `tailwindcss` | `^4.3.5` | Estilização (Tailwind v4) |
| `@tailwindcss/postcss` | `^4.3.5` | Integração do Tailwind com o PostCSS |
| `postcss` | `^8.5.33` | Processamento do CSS |
| `tw-animate-css` | `^1.4.0` | Animações utilitárias do Tailwind |
| `clsx` + `tailwind-merge` | `^2.1.1` / `^3.7.1` | Helper `cn()` em `src/lib/utils.ts` |

### Desenvolvimento (`devDependencies`)

| Pacote | Versão | Para que serve |
| --- | --- | --- |
| `typescript` | `7.0.2` | Tipagem estática (o `next build` roda o type-check) |
| `@types/node` | `26.6.6` | Tipos do Node.js |
| `@types/react` | `19.3.0` | Tipos do React |
| `@types/bcryptjs` | `^2.4.6` | Tipos do bcryptjs |
| `eslint` | — | **Não instalado** — `eslint.config.mjs` já existe |
| `eslint-config-next` | — | **Não instalado** — usado pelo `eslint.config.mjs` |

> ⚠️ **Atenção:** `next`, `react` e `react-dom` estão instalados em `node_modules`, mas **não estão declarados no `package.json`**. Em um clone novo (ou após apagar `node_modules`), instale-os antes de rodar o projeto:
>
> ```powershell
> npm install next@16.4.6 react@19.3.1 react-dom@19.3.1
> npm install -D eslint eslint-config-next
> ```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Sobe o servidor de desenvolvimento (Turbopack) |
| `npm run build` | Build de produção + verificação de tipos |
| `npm run start` | Executa o build de produção |

Não há script de lint/test configurado.

## Rotas

| Rota | Acesso | Descrição |
| --- | --- | --- |
| `/` | público | Redireciona para `/principal` (logado) ou `/login` (visitante) |
| `/login` | público | Login por e-mail e senha |
| `/register` | público | Cadastro de usuário (senha com hash) |
| `/principal` | logado | Vitrine com busca por nome/descrição e ordenação (Zustand) |
| `/principal/[id]` | logado | Detalhe do produto |
| `/principal/[id]/finalizacao` | logado | Checkout (quantidade + endereço, baixa de estoque) |
| `/pedidos` | logado | Histórico de pedidos do usuário |
| `/perfil` | logado | Dados da conta (nome, e-mail, cargo) |
| `/dashboard` | `admin` / `gerente` | Cadastro e gerenciamento dos próprios produtos |
| `/api/auth/[...nextauth]` | — | Handler do NextAuth |

### Proteção em camadas

1. **`src/proxy.ts`** (o “middleware” do Next 16) intercepta as rotas privadas antes da renderização e redireciona visitantes para `/login`.
2. **Server Components** repetem a checagem com `getServerSession` + `redirect` (defesa em profundidade).
3. **Server Actions** validam a sessão e, em `deleteProduct`/`updateProduct`, também se o usuário é o dono do produto (ou `admin`).

O `/dashboard` é restrito a `admin`/`gerente` nas três camadas (proxy, página e action `addProduct`).

Os estados de UX usam os arquivos reservados: `src/app/loading.tsx`, `src/app/error.tsx` e `src/app/not-found.tsx`.

## Modelos (MongoDB)

- **User**: `name`, `email` (único), `password` (hash, `select: false`), `role` (`admin` | `gerente` | `cliente`, padrão `cliente`)
- **Product**: `nome`, `preco`, `descricao`, `imagem`, `estoque`, `usuarioId` (dono do produto)
- **Pedido**: `usuario`, `produto`, `nomeProduto`, `precoUnitario`, `quantidade`, `total`, `endereco` (cep, rua, número, complemento, bairro, cidade, uf)

## Deploy (Vercel)

1. Configure as Environment Variables: `MONGODB_URI`, `NEXTAUTH_SECRET` e `NEXTAUTH_URL` (URL de produção).
2. Root Directory do projeto na Vercel: **`tech-home`**.
3. Build Command: `npm run build`.

## Problemas comuns

- **`Defina MONGODB_URI no .env.local`** → o arquivo `.env.local` não existe ou está na pasta errada (deve ficar em `tech-home/`).
- **`Property 'id'/'role' does not exist on type Session`** → garanta que `src/types/next-auth.d.ts` existe e é incluído pelo `tsconfig.json`.
- **Erro de engine/versão do Node** → use Node >= 20.19 (`node -v`).
- **Falha ao conectar no Atlas** → confira o IP liberado em Network Access e a senha/usuário na URI.

<!-- TODO: link do deploy e prints -->
