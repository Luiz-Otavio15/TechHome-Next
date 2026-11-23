// Camada 1 de proteção (front): redireciona para /login se não houver sessão.
// Se o Next avisar que "middleware" foi renomeado, troque o nome do arquivo para src/proxy.ts
export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard/:path*"] };
