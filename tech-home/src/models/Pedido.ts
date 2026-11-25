import mongoose, { Schema, models, model } from "mongoose";

const EnderecoSchema = new Schema(
  {
    cep: { type: String, required: true },
    rua: { type: String, required: true },
    numero: { type: String, required: true },
    complemento: { type: String, default: "" },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    uf: { type: String, required: true, maxlength: 2 },
  },
  { _id: false }
);

const PedidoSchema = new Schema(
  {
    usuario: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    produto: { type: Schema.Types.ObjectId, ref: "Product", required: true },

    // "foto" do produto no momento da compra (se o preço mudar depois, o pedido não muda)
    nomeProduto: { type: String, required: true },
    precoUnitario: { type: Number, required: true, min: 0 },

    quantidade: { type: Number, required: true, min: 1 },
    total: { type: Number, required: true, min: 0 },

    endereco: { type: EnderecoSchema, required: true },

    
  },
  { timestamps: true }
);

export default models.Pedido || model("Pedido", PedidoSchema);