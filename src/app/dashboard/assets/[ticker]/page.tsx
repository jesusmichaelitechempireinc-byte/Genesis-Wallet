
import AssetHeader from "@/components/dashboard/AssetHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import BottomNav from "@/components/dashboard/BottomNav";
import { coins } from "@/lib/data";
import AssetChart from "@/components/dashboard/AssetChart";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Repeat } from "lucide-react";
import Link from 'next/link';

export default function AssetPage({ params }: { params: { ticker: string } }) {
  const coin = coins.find((c) => c.ticker === params.ticker.toUpperCase());

  if (!coin) {
    return (
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
        <Sidebar />
        <div className="flex flex-1 flex-col relative">
          <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center pb-36">
            <p>Token not found.</p>
          </main>
          <BottomNav />
        </div>
      </div>
    );
  }

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(coin.usdValue);

  return (
    <div className="flex min-h-screen w-full bg-background font-body text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col relative">
        <AssetHeader coin={coin} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-36">
            <div className="text-center my-4">
                <h1 className="text-5xl font-bold tracking-tight">{formattedBalance}</h1>
                <p className="text-muted-foreground text-lg mt-1">
                    {coin.balance.toLocaleString()} {coin.ticker}
                </p>
            </div>

            <AssetChart coin={coin} />
            
            <div className="flex items-center justify-center gap-4 my-8">
                <Link href="/dashboard/send" className="flex-1">
                    <Button
                        size="lg"
                        className="w-full rounded-full bg-primary text-primary-foreground h-14 text-lg font-bold shadow-heavy-out-lg active:shadow-heavy-in-lg btn-glow"
                    >
                        <ArrowUp className="mr-2 h-6 w-6" />
                        Send
                    </Button>
                </Link>
                <Link href="/dashboard/receive" className="flex-1">
                    <Button
                        size="lg"
                        variant="secondary"
                        className="w-full rounded-full h-14 text-lg font-bold bg-background text-foreground shadow-heavy-out-lg active:shadow-heavy-in-lg"
                    >
                        <ArrowDown className="mr-2 h-6 w-6" />
                        Receive
                    </Button>
                </Link>
                 <Link href="/dashboard/swap" className="flex-1">
                    <Button variant="secondary" size="lg" className="w-full rounded-full h-14 text-lg font-bold bg-background text-foreground shadow-heavy-out-lg active:shadow-heavy-in-lg">
                        <Repeat className="h-6 w-6" />
                    </Button>
                </Link>
            </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
