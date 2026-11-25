"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { criarPedido } from "@/app/actions";

interface Props {
  produto: { id: string; nome: string; preco: number; estoque: number };
}

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function CheckoutForm({ produto }: Props) {
  const router = useRouter();
  const [quantidade, setQuantidade] = useState(1);
  const [enviando, setEnviando] = useState(false);

  async function clientAction(formData: FormData) {
    setEnviando(true);
    const result = await criarPedido(formData);

    if (result?.error) {
      alert(result.error);
      setEnviando(false);
      return;
    }

    router.push("/pedidos"); // ou "/principal" se ainda não criou a tela de pedidos
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Button variant="ghost" className="mb-4">
        <Link href={`/principal/${produto.id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao produto
        </Link>
      </Button>

      <form action={clientAction} className="grid gap-4 md:grid-cols-3">
        <input type="hidden" name="produtoId" value={produto.id} />
        <input type="hidden" name="quantidade" value={quantidade} />

        {/* Endereço */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-green-600" />
              Endereço de entrega
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input name="cep" placeholder="CEP" inputMode="numeric" maxLength={9} required />
            <Input name="rua" placeholder="Rua / Avenida" required />

            <div className="grid grid-cols-3 gap-4">
              <Input name="numero" placeholder="Número" required />
              <Input name="complemento" placeholder="Complemento (opcional)" className="col-span-2" />
            </div>

            <Input name="bairro" placeholder="Bairro" required />

            <div className="grid grid-cols-3 gap-4">
              <Input name="cidade" placeholder="Cidade" className="col-span-2" required />
              <Input name="uf" placeholder="UF" maxLength={2} required />
            </div>
          </CardContent>
        </Card>

        {/* Resumo */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Resumo do pedido</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="line-clamp-2 text-sm text-gray-700">{produto.nome}</p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Quantidade</span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantidade((q) => q - 1)}
                  disabled={quantidade <= 1}
                >
                  -
                </Button>
                <span className="w-6 text-center">{quantidade}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantidade((q) => q + 1)}
                  disabled={quantidade >= produto.estoque}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <span className="font-medium">Total</span>
              <span className="text-xl font-semibold">{brl(produto.preco * quantidade)}</span>
            </div>

            <Button
              type="submit"
              disabled={enviando}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {enviando ? "Finalizando..." : "Finalizar compra"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}