'use client'
import { useState } from "react";
import { updateProduct, deleteProduct } from "../app/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Pencil } from "lucide-react"

interface ProductProps {
  product: {
    _id: string;
    nome: string;
    preco: number;
  }
}

export default function ProductItem({ product }: ProductProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Fecha o modo de edição após salvar
  async function handleUpdate(formData: FormData) {
    await updateProduct(formData);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <form action={handleUpdate} className="flex items-center gap-2">
            <input type="hidden" name="id" value={product._id} />
            
            <Input 
              name="nome" 
              defaultValue={product.nome} 
              className="flex-1 bg-white" 
              autoFocus 
            />
            
            <div className="relative">
              
              <Input 
                name="preco" 
                type="number" 
                defaultValue={product.preco} 
                className="w-32 bg-white pl-8" 
                step="0.01"
                min="0"
              />
            </div>
            
            <Button type="submit" size="sm" className="bg-green-500 hover:bg-green-600">
              
            </Button>
            
            <Button 
              type="button" 
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow m-5">
      <CardContent className="flex items-center justify-between p-5 pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{product.nome}</h3>
            <p className="text-sm text-gray-600">R$ {product.preco.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Pencil className="w-5 h-5 mr-2 "/>
            editar
          </Button>

          <form action={deleteProduct}>
            <input type="hidden" name="id" value={product._id} />
            <Button 
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash className="h-5 w-5 mr-2"/>
              Deletar
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
