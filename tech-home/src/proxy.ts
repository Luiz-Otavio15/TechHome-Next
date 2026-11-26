import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Rotas que exigem sessão ativa
const ROTAS_PRIVADAS = ["/principal", "/pedidos", "/perfil", "/dashboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const rotaPrivada = ROTAS_PRIVADAS.some(
    (rota) => pathname === rota || pathname.startsWith(`${rota}/`)
  );
  if (!rotaPrivada) return NextResponse.next();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const login = new URL("/login", request.url);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  // Dashboard só para quem gerencia a loja (checagem otimista; a definitiva é no servidor)
  if (
    pathname.startsWith("/dashboard") &&
    token.role !== "admin" &&
    token.role !== "gerente"
  ) {
    return NextResponse.redirect(new URL("/principal", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/principal/:path*",
    "/pedidos/:path*",
    "/perfil/:path*",
    "/dashboard/:path*",
  ],
};
