import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Repeat } from "lucide-react";

export default function WalletActions() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        size="lg"
        className="flex-1 rounded-full bg-primary text-primary-foreground h-12 text-base font-bold"
      >
        <ArrowUp className="mr-2 h-5 w-5" />
        Send
      </Button>
      <Button
        size="lg"
        variant="secondary"
        className="flex-1 rounded-full h-12 text-base font-bold bg-gray-200 text-black hover:bg-gray-300"
      >
        <ArrowDown className="mr-2 h-5 w-5" />
        Receive
      </Button>
      <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 bg-gray-800 hover:bg-gray-700">
        <Repeat className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
}
