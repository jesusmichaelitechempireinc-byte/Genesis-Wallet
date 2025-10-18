
import { QrCode, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm">
            <UserCircle className="h-6 w-6 text-muted-foreground" />
        </Button>
        
      </div>
      <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm">
        <QrCode className="h-6 w-6 text-muted-foreground" />
      </Button>
    </header>
  );
}
