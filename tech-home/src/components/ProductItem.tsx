'use client'
import { useState } from "react";
import { updateProduct, deleteProduct } from "../app/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Pencil, Check, X } from "lucide-react"
import Image from "next/image"
interface ProductProps {
  product: {
    _id: string;
    nome: string;
    preco: number;
    imagem: string;
  }
}

export default function ProductItem({ product }: ProductProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Fecha o modo de edição após salvar
  async function handleUpdate(formData: FormData) {
    await updateProduct(formData);
    setIsEditing(false);
  }

  async function handleDelete(formData: FormData) {
    const result = await deleteProduct(formData);
    if (result?.error) alert(result.error);
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
            
            <Button
              type="submit"
              size="sm"
              className="bg-green-500 hover:bg-green-600"
              aria-label="Salvar alterações"
              title="Salvar alterações"
            >
              <Check className="h-4 w-4" />
            </Button>
            
            <Button 
              type="button" 
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
              aria-label="Cancelar edição"
              title="Cancelar edição"
            >
              <X className="h-4 w-4" />
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
          <div className=" relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <Image src={product.imagem} alt={product.nome} fill className="object-cover w-10 h-10 rounded-full"/>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{product.nome}</h3>
            <p className="text-sm text-gray-600">R$ {product.preco.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700 border border-gray-200"
          >
            <Pencil className="w-5 h-5 mr-2 "/>
            editar
          </Button>

          <form action={handleDelete}>
            <input type="hidden" name="id" value={product._id} />
            <Button 
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-gray-200"
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
