"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchInput({ placeholder = "Buscar produtos..." }: { placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [valor, setValor] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (valor.trim()) params.set("q", valor.trim());
      else params.delete("q");
      router.replace(`${pathname}?${params.toString()}`);
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valor]);

  return (
    <div className="relative w-full max-w-md">
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <Input
        type="search"
        aria-label="Buscar produtos"
        placeholder={placeholder}
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}