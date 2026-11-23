import Image from "next/image";

export default function ProdutoImagem({ src, alt }: { src?: string | null; alt: string }) {
  const url = src?.trim();
  if (!url) {
    return (
      <div className="flex aspect-[3/2] w-full items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-400">
        Sem imagem
      </div>
    );
  }
  return <Image src={url} alt={alt} width={600} height={400} className="aspect-[3/2] w-full rounded-lg object-cover" />;
}