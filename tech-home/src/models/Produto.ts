import mongoose, { Schema, model, models, type InferSchemaType } from "mongoose";

const ProdutoSchema = new Schema(
  {
    nome: { type: String, required: true, trim: true },
    descricao: { type: String, default: "", trim: true },
    preco: { type: Number, required: true, min: 0 },
    estoque: {type: Number, required: true, min: 0, default: 0, validate: { validator: Number.isInteger, message: "O estoque deve ser inteiro" },},
    // dono do produto (quem cadastrou no painel)
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    imagem: { type: String, default: ""},
    // TODO (opcional) categoria: { type: String }
  },
  { timestamps: true }
);

export type ProdutoDoc = InferSchemaType<typeof ProdutoSchema>;
export default (models.Produto as mongoose.Model<ProdutoDoc>) || model<ProdutoDoc>("Produto", ProdutoSchema);
