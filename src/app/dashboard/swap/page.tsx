import Header from "@/components/dashboard/Header";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import TokenSwap from "@/components/dashboard/TokenSwap";
import BottomNav from "@/components/dashboard/BottomNav";

export default function SwapPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
        <Sidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col relative">
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center pb-36">
              <div className="w-full max-w-md">
                <TokenSwap />
              </div>
            </main>
            <BottomNav />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
