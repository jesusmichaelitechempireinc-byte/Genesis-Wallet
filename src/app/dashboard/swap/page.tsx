
import { Suspense } from 'react';
import SwapPageClient from './swap-page-client';
import { Loader2 } from 'lucide-react';

export default function SwapPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
      <SwapPageClient />
    </Suspense>
  );
}
