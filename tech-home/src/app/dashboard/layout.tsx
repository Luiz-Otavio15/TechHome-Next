import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Camada extra de proteção + layout aninhado do painel
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return <main className="mx-auto max-w-4xl p-4 sm:p-6">{children}</main>;
}
