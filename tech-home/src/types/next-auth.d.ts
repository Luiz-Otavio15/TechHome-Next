import type { DefaultSession } from "next-auth";

// Estende os tipos do next-auth para incluir os campos que colocamos na sessão
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & NonNullable<DefaultSession["user"]>;
  }

  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}
