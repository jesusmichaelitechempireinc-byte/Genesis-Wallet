import Header from "@/components/dashboard/Header";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import TokenSwap from "@/components/dashboard/TokenSwap";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import WalletActions from "@/components/dashboard/WalletActions";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 grid gap-8 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 grid gap-8">
            <WalletActions />
            <PortfolioChart />
            <TransactionHistory />
          </div>
          <div className="lg:col-span-1">
            <TokenSwap />
          </div>
        </main>
      </div>
    </div>
  );
}
