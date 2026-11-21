'use_client'
import "tailwindcss";
import  Link  from "next/link";
export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm space-y-5 rounded-2xl bg-blue-500 p-8 shadow-lg">
        <form>
            <h1 className="text-center text-3xl font-bold text-white m-3">Login</h1>
            <div>
            <label htmlFor="email" className="mb-2 block text-lg text-white">
                Email
            </label>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="fulano@email.com"
                className="h-10 w-full rounded-lg bg-white px-3 outline-2 outline-transparent focus:outline-blue-200 mb-2 mt-2"
            />
            </div>

            <div>
            <label htmlFor="senha" className="mb-1 block text-lg text-white">
                Senha
            </label>
            <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Senha11"
                className="h-10 w-full rounded-lg bg-white px-3 outline-2 outline-transparent focus:outline-blue-200"
            />
            </div>

            <button
            type="submit"
            className="w-full rounded-xl bg-green-600 p-3 font-semibold text-white transition hover:bg-green-900 mt-5"
            >
            Entrar
            </button>
        </form>
            <div className="text-white">
                Não tem uma conta ? <Link href={"/cadastro"} className="text-white transition hover:text-lime-400">Registre-se</Link>
            </div>
        </div>
    </main>
  );
}