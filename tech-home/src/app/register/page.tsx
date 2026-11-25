'use client'
import { registerUser } from "../actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function RegisterPage() {
  const router = useRouter();

  async function clientAction(formData: FormData) {
    const result = await registerUser(formData);
    if (result?.error) {
      alert(result.error);
    } else {
      alert("Conta criada! Faça login.");
      router.push("/login");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              
            </div>
          </div>
          <CardTitle className="text-2xl">Criar Conta</CardTitle>
          <CardDescription>
            Preencha os dados para criar sua conta
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form action={clientAction} className="space-y-4">
            <div className="relative">
              
              <Input 
                name="name" 
                type="text" 
                placeholder="Nome" 
                required 
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              
              <Input 
                name="email" 
                type="email" 
                placeholder="Email" 
                required 
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              
              <Input 
                name="password" 
                type="password" 
                placeholder="Senha" 
                required 
                className="pl-10"
              />
            </div>
            
            <Button className="w-full bg-green-600 hover:bg-green-700">
              
              Registrar
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Já tem conta? <Link href="/login" className="text-blue-600 hover:underline">Faça Login</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
