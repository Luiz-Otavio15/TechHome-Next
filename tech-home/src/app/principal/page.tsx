import Product from "@/models/Product";
import ProductItem from "@/components/ProductItem";
import ProdutoCard from "@/components/ProdutoCard";
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/ui/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";

export default async function principal() {

    const session = await getServerSession(authOptions);
    
    if (!session) redirect("/login");

    await dbConnect();

    const produto = await Product.find({usuarioId: (session.user as any).id}).lean();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="mx-auto ">
                <Navbar/>
                
        
                <div className="flex justify-center items-center h-screen">
                    <div className="flex">
                        {produto.map((produtos) => (
                            <ProdutoCard 
                                key={produtos._id.toString()} 
                                product={{
                                    ...produtos,
                                    _id: produtos._id.toString()
                                }} 
                            />
                        ))}   
                    </div>
                </div>
            </div>
        </div>
    );
}