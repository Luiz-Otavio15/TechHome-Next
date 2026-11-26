import { Navbar } from "@/components/ui/navbar";

export default function PrincipalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      {children}
    </div>
  );
}
