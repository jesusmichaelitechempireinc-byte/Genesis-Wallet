import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import BottomNav from "@/components/dashboard/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, QrCode } from "lucide-react";
import Image from "next/image";

export default function ReceivePage() {
    const walletAddress = 'genesis-vault-main-0x...a4b8';
  return (
    <div className="flex min-h-screen w-full bg-background font-body text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col relative">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center mb-28">
           <Card className="w-full max-w-md shadow-neo-out-lg border-none text-center">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Receive Assets</CardTitle>
                <CardDescription>Share your address to receive crypto.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 items-center justify-center">
                <div className="p-4 bg-background shadow-neo-in-lg rounded-2xl inline-block">
                    <Image src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=genesis-vault-main-0x...a4b8" width={200} height={200} alt="QR Code" data-ai-hint="qr code" />
                </div>
                 <div className="flex items-center gap-4 p-4 rounded-lg shadow-neo-in-sm">
                    <p className="font-mono text-muted-foreground text-sm flex-1 text-left truncate">{walletAddress}</p>
                    <Button variant="ghost" size="icon" className="rounded-full shadow-neo-out-sm text-primary">
                        <Copy className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
          </Card>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
