import { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: {type: String, required: true},
  usuarioId: { type: String, required: true }, // Relacionamento
  estoque: {type: Number, required: true},
  imagem: {type: String, required: true},

}, { timestamps: true });

const Product = models.Product || model("Product", ProductSchema);
export default Product;