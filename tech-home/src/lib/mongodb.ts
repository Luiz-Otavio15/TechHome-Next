import mongoose from "mongoose";

// Singleton: guarda a conexão no `global` para o hot reload / serverless
// não abrir uma conexão nova a cada requisição.
type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
const g = global as typeof globalThis & { _mongoose?: Cache };
const cached: Cache = (g._mongoose ??= { conn: null, promise: null });

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Defina MONGODB_URI no .env.local");
  if (cached.conn) return cached.conn;
  cached.promise ??= mongoose.connect(uri, { bufferCommands: false });
  cached.conn = await cached.promise;
  return cached.conn;
}
