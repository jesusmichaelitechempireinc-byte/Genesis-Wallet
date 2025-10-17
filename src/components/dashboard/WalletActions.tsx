import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, Wallet, Copy } from "lucide-react";
import { totalBalance } from "@/lib/data";

export default function WalletActions() {
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalBalance);

  return (
    <Card className="shadow-neo-out border-none">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="text-sm font-medium text-muted-foreground">Total Balance</div>
            <div className="text-4xl font-bold font-headline tracking-tight">{formattedBalance}</div>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <Wallet className="h-4 w-4" />
              <span className="font-mono text-xs">genesis-vault-main-0x...a4b8</span>
              <Copy className="h-4 w-4 cursor-pointer hover:text-primary transition-colors"/>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button size="lg" className="flex-1 rounded-full shadow-neo-out-sm bg-background hover:bg-background active:shadow-neo-in-sm text-foreground hover:text-primary transition-all duration-300 group">
              <ArrowDownLeft className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Receive
            </Button>
            <Button size="lg" className="flex-1 rounded-full bg-primary text-primary-foreground btn-glow">
              <ArrowUpRight className="mr-2 h-5 w-5" />
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
