import * as react from "react";
import { Button } from "./button";
import { User, Handbag, ArrowLeft } from "lucide-react";
import Link from "next/link";

type NavbarVoltarProps = {
  direcionar?: string;
  className?: string;
};

export function NavbarVoltar({className="", direcionar="/principal"}: NavbarVoltarProps){
    return (
        <div className=" max-w p-7 flex items-center justify-between bg-blue-500">
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white">TechHome</h1>
            </div>
            
            
            <div>
                <Button variant="default" size="default" className="mr-2">
                    <Link href={direcionar} className="flex">
                        <ArrowLeft className="mr-2" />
                        Voltar
                    </Link>
                </Button>

                <Button variant="default" size="default" className="mr-2">
                    <Link href={"/pedidos"} className="flex">
                        <Handbag className="mr-2"/>
                        Pedidos
                    </Link>
                    
                </Button>

                <Button variant="default" size="default" className="mr-2">
                    <Link href={"/perfil"} className="flex">
                        <User className="mr-2"/>
                        Perfil
                    </Link>
                    
                </Button>
            </div>
        </div>
    );
}



export function Navbar({className="", ...props }: React.HTMLAttributes<HTMLDivElement>){
    return (
        <div className=" max-w p-7 flex items-center justify-between bg-blue-500">
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white">TechHome</h1>
            </div>
            
            
            <div>
                <Button variant="default" size="default" className="mr-2">
                    <Link href={"/pedidos"} className="flex">
                        <Handbag className="mr-2"/>
                        Pedidos
                    </Link>
                    
                </Button>

                <Button variant="default" size="default" className="mr-2">
                    <Link href={"/perfil"} className="flex">
                        <User className="mr-2"/>
                        Perfil
                    </Link>
                    
                </Button>
            </div>
        </div>
    );
}