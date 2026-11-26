import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Mail, User } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import Logout from "@/components/logoutbutton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, MoveLeft } from "lucide-react";
import Link from "next/link";

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);

  // proteção no servidor (segunda camada, além do middleware)
  if (!session?.user) redirect("/login");

  const { name, email, role } = session.user;


  const verDashboard = ["admin", "gerente"].includes(session?.user?.role);
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-300 text-2xl font-semibold text-green-700">
              <User className="h-5 w-5 text-blue-100" />
            </div>
          </div>
          <CardTitle className="text-2xl">Minha conta</CardTitle>
          <CardDescription>Dados do seu perfil</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 rounded-md border border-gray-400 p-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Nome</p>
              <p className="font-medium">{name ?? "Não informado"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-md border border-gray-400 p-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium break-all">{email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md border border-gray-400 p-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Cargo</p>
              <p className="font-medium break-all">{role}</p>
            </div>
          </div>
          

          {verDashboard &&
            <Button variant="ghost" className="w-full border border-gray-400">
              <Link href="/dashboard" className="flex">
                  
                  <ArrowLeft className="mr-2 h-5 w-5"/>
                  Dashboard
              </Link>
            </Button>
          }
          
        <Button variant="ghost" className="w-full border border-gray-400">
            <Link href="/principal" className="flex">
                
                <ArrowLeft className="mr-2 h-5 w-5"/>
                Voltar para a loja
            </Link>
        </Button>
          <Logout/>

        
        </CardContent>
      </Card>
    </div>
  );
}