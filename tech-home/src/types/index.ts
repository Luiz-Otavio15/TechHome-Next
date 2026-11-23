export interface ProdutoDTO {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  imagem: string;
}
export type ProdutoInput = Pick<ProdutoDTO, "nome" | "descricao" | "preco" | "estoque" | "imagem">;
