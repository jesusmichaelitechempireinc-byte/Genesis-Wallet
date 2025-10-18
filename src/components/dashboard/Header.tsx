
import { Leaf, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Leaf className="h-6 w-6 text-muted-foreground" />
          </Button>
        </SidebarTrigger>
        <div className="hidden items-center gap-2 md:flex">
          <SidebarTrigger />
          <Leaf className="h-5 w-5 text-green-500" />
          <h1 className="text-lg font-semibold">Investments</h1>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <QrCode className="h-6 w-6 text-muted-foreground" />
      </Button>
    </header>
  );
}
