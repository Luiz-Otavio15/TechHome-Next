import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin","gerente","cliente"],
    default: "cliente",
  }
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;