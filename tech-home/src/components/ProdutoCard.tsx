'use client'
import { useState } from "react";
import { updateProduct, deleteProduct } from "../app/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Pencil } from "lucide-react"
import Image from "next/image";
import Link from "next/link";
interface ProdutoProps{
  product: {
    _id: string;
    nome: string;
    preco: number;
    imagem: string;
    descricao: string
  }
}

export default function ProdutoCard({ product }: ProdutoProps) {
  

  return (
    
    <Link href={`principal/${product._id}`}>
      <Card className="hover:shadow-md transition-shadow w-80 h-auto">
          <div className="relative aspect-square object-cover w-full h-56">
            <Image src={product.imagem} alt={product.nome} fill />
          </div>
          
          <CardContent className="flex items-center justify-between p-5 pt-5">
            <div>
                <h3 className="font-semibold text-gray-900 text-xl mb-3">{product.nome}</h3>
                <p className="text-xl font-medium">R$ {product.preco.toFixed(2)}</p>
            </div>
          </CardContent>
          

      </Card>
    </Link>
      
  );
}
