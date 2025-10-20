
import { Suspense } from 'react';
import SendPageClient from './send-page-client';
import { Loader2 } from 'lucide-react';

export default function SendPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
      <SendPageClient />
    </Suspense>
  );
}
