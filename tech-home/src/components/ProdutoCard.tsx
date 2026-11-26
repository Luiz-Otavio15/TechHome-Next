import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ProdutoProps {
  product: {
    _id: string;
    nome: string;
    preco: number;
    imagem: string;
    descricao: string;
  };
}

export default function ProdutoCard({ product }: ProdutoProps) {
  return (
    <Link href={`/principal/${product._id}`} className="w-full max-w-[20rem]">
      <Card className="w-full overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative h-56 w-full bg-slate-100">
          <Image
            src={product.imagem}
            alt={product.nome}
            fill
            sizes="(max-width: 640px) 100vw, 20rem"
            className="object-cover"
          />
        </div>

        <CardContent className="flex items-center justify-between p-5 pt-5">
          <div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">{product.nome}</h3>
            <p className="text-xl font-medium">R$ {product.preco.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
