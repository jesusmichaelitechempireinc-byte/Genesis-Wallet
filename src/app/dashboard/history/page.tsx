import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import BottomNav from "@/components/dashboard/BottomNav";

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen w-full bg-background font-body text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col relative">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 mb-28">
            <TransactionHistory />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
