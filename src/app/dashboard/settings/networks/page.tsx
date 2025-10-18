
'use client';
import { ArrowLeft, Plus } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BottomNav from "@/components/dashboard/BottomNav";

const supportedNetworks = [
    { name: 'Bitcoin', active: true },
    { name: 'Ethereum', active: true },
    { name: 'Solana', active: true },
    { name: 'Tron', active: true },
];

export default function NetworksPage() {
  return (
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          <div className="flex flex-1 flex-col relative">
             <header className="sticky top-0 z-10 flex h-20 items-center justify-between px-4 md:px-6">
                <Link href="/dashboard/settings" passHref>
                    <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm">
                    <ArrowLeft className="h-6 w-6 text-muted-foreground" />
                    </Button>
                </Link>
                 <Button className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm">
                    <Plus className="mr-2 h-5 w-5"/>
                    Add Network
                </Button>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8 pb-32">
              <Card className="shadow-none border-none bg-transparent">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Networks</CardTitle>
                    <CardDescription>Manage connections to blockchain networks.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 max-w-2xl">
                    {supportedNetworks.map(network => (
                        <div key={network.name} className="flex items-center justify-between p-4 rounded-2xl shadow-heavy-out-sm bg-background">
                            <div className="flex items-center gap-4">
                                <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_8px_theme(colors.green.500)]"></div>
                                <p className="font-bold text-lg">{network.name}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">Details</Button>
                        </div>
                    ))}
                </CardContent>
              </Card>
            </main>
            <BottomNav />
          </div>
      </div>
  );
}
