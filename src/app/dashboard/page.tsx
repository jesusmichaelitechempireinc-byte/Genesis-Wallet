import Header from "@/components/dashboard/Header";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import WalletActions from "@/components/dashboard/WalletActions";
import Sidebar from "@/components/dashboard/Sidebar";
import BottomNav from "@/components/dashboard/BottomNav";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-background font-body text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col relative">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 grid gap-8 pb-36">
            <WalletActions />
            <PortfolioChart />
            <TransactionHistory />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
