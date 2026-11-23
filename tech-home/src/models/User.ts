import mongoose, { Schema, model, models, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    nome: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: { type: String, required: true, select: false }, // hash do bcrypt
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof UserSchema>;
export default (models.User as mongoose.Model<UserDoc>) || model<UserDoc>("User", UserSchema);
