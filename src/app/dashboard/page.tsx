
import Header from "@/components/dashboard/Header";
import AssetList from "@/components/dashboard/AssetList";
import WalletActions from "@/components/dashboard/WalletActions";
import BottomNav from "@/components/dashboard/BottomNav";
import TotalBalance from "@/components/dashboard/TotalBalance";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
        <Sidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col relative">
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8 grid gap-8 pb-36">
                <TotalBalance />
                <WalletActions />
                <AssetList />
            </main>
            <BottomNav />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
