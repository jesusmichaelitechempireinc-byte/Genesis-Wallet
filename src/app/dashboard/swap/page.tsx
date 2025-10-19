
import React, { Suspense } from 'react';
import Header from "@/components/dashboard/Header";
import TokenSwap from "@/components/dashboard/TokenSwap";
import BottomNav from "@/components/dashboard/BottomNav";
import { Loader2 } from 'lucide-react';

// The page now accepts searchParams as a prop, provided by Next.js
export default function SwapPage({ searchParams }: { searchParams: { from?: string } }) {
  // searchParams is a promise-like object and must be unwrapped with React.use()
  const { from } = React.use(searchParams) ?? {};
  const initialFromTicker = from || null;

  return (
    // The Suspense boundary is at the top level
    <Suspense fallback={<div className="flex items-center justify-center h-screen w-full bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          <div className="flex flex-1 flex-col relative">
            <Header />
            <main className="flex py-8 items-center justify-center pb-32">
              <div className="w-full max-w-md">
                  {/* Pass the ticker as a prop, avoiding hooks here */}
                  <TokenSwap initialFromTicker={initialFromTicker} />
              </div>
            </main>
            <BottomNav />
          </div>
      </div>
    </Suspense>
  );
}
