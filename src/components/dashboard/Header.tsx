import { Leaf, QrCode, Wallet2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between px-4 md:px-6">
      <Button variant="ghost" size="icon">
        <Wallet2 className="h-6 w-6 text-muted-foreground" />
      </Button>
      <div className="flex items-center gap-2">
        <Leaf className="h-5 w-5 text-green-500" />
        <h1 className="text-lg font-semibold">Investments</h1>
      </div>
      <Button variant="ghost" size="icon">
        <QrCode className="h-6 w-6 text-muted-foreground" />
      </Button>
    </header>
  );
}
