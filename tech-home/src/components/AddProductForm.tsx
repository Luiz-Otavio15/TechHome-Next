'use client'

import { useRef } from "react";
import { addProduct } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react"
import { Navbar } from "./ui/navbar";
export default function AddProductForm() {
  const ref = useRef<HTMLFormElement>(null);

  async function clientAction(formData: FormData) {
    // 1. Chama a Server Action
    const result = await addProduct(formData);

    // 2. Verifica se houve erro
    if (result?.error) {
      alert(result.error);
    } else {
      // 3. Se deu sucesso, limpa o formulário (UX melhorada!)
      ref.current?.reset();
    }
  }

  return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Novo Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form 
            ref={ref} 
            action={clientAction} 
            className="grid grid-cols-3 gap-4"
          >
            <div className="relative">
              
              <Input 
                name="nome" 
                placeholder="Nome do produto" 
                required 
                className="pl-10"
              />
            </div>
            
            <div className="relative flex">
              
              <Input 
                name="preco" 
                type="number" 
                placeholder="Preço" 
                required 
                className="w-32 pl-10"
                step="0.01"
                min="0"
              />
            </div>
            <div className="relative flex">
              
              <Input 
                name="imagem" 
                placeholder="link foto" 
                required 
                className="pl-10"
              />
            </div>

            <div className="relative flex">
              
              <Input 
                name="estoque" 
                placeholder="estoque" 
                type="number"
                required 
                className="pl-10"
              />
            </div>

            <div className="relative flex ">
              
              <Input 
                name="descricao" 
                placeholder="descrição" 
                required 
                className="pl-10"
              />
            </div>
            <Button type="submit" className="px-6">
              <Plus className="h-6 w-6 mr-2"></Plus>
              Adicionar
            </Button>
          </form>
        </CardContent>
      </Card>
    
  );
}