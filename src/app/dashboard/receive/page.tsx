
import { Suspense } from 'react';
import ReceivePageClient from './receive-page-client';
import { Loader2 } from 'lucide-react';

export default function ReceivePage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
      <ReceivePageClient />
    </Suspense>
  );
}
