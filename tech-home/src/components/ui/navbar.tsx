import * as react from "react";
import { Button } from "./button";
import { User } from "lucide-react";
import Link from "next/link";
export function Navbar({className="", ...props }: React.HTMLAttributes<HTMLDivElement>){
    return (
        <div className=" max-w p-7 flex items-center justify-between bg-blue-500">
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white">TechHome</h1>
            </div>
            <div>
                <Button variant="default" size="default">
                    <Link href={"/perfil"} className="flex">
                        <User className="mr-2"/>
                        Perfil
                    </Link>
                    
                </Button>
            </div>
        </div>
    );
}