
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Repeat } from "lucide-react";
import Link from 'next/link';

export default function WalletActions() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Link href="/dashboard/send" className="flex-1">
        <Button
          size="lg"
          className="w-full rounded-full bg-primary text-primary-foreground h-12 text-base font-bold shadow-heavy-out-lg active:shadow-heavy-in-lg btn-glow"
        >
          <ArrowUp className="mr-2 h-5 w-5" />
          Send
        </Button>
      </Link>
      <Link href="/dashboard/receive" className="flex-1">
        <Button
          size="lg"
          variant="secondary"
          className="w-full rounded-full h-12 text-base font-bold shadow-heavy-out-lg active:shadow-heavy-in-lg"
        >
          <ArrowDown className="mr-2 h-5 w-5" />
          Receive
        </Button>
      </Link>
      <Link href="/dashboard/swap">
        <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 shadow-heavy-out-lg active:shadow-heavy-in-lg">
          <Repeat className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}
