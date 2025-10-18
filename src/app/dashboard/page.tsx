
'use client';

import { useState } from 'react';
import Header from "@/components/dashboard/Header";
import AssetList from "@/components/dashboard/AssetList";
import WalletActions from "@/components/dashboard/WalletActions";
import BottomNav from "@/components/dashboard/BottomNav";
import TotalBalance from "@/components/dashboard/TotalBalance";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          <div className="flex flex-1 flex-col relative">
            <Header onSearchChange={setSearchTerm} />
            <main className="flex-1 p-4 md:p-6 lg:p-8 grid gap-8 pb-32">
                <TotalBalance />
                <WalletActions />
                <AssetList searchTerm={searchTerm} />
            </main>
            <BottomNav />
          </div>
      </div>
  );
}
