
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import BottomNav from "@/components/dashboard/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { coins } from "@/lib/data";

export default function SendPage() {
  return (
    <div className="flex min-h-screen w-full bg-background font-body text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col relative">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center pb-36">
          <Card className="w-full max-w-md shadow-heavy-out-lg border-none">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Send Assets</CardTitle>
                <CardDescription>Enter the recipient details to send crypto.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="recipient">Recipient Address</Label>
                    <Input id="recipient" placeholder="0x..." className="shadow-heavy-in-sm" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="asset">Asset</Label>
                     <Select>
                        <SelectTrigger className="w-full shadow-heavy-in-sm">
                            <SelectValue placeholder="Select an asset" />
                        </SelectTrigger>
                        <SelectContent className="shadow-heavy-out-sm">
                            {coins.map((c) => (
                                <SelectItem key={c.ticker} value={c.ticker}>
                                <div className="flex items-center gap-2">
                                    <c.icon className="h-5 w-5" />
                                    <span>{c.name} ({c.ticker})</span>
                                </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" placeholder="0.00" className="shadow-heavy-in-sm" />
                </div>
                <Button size="lg" className="w-full rounded-full bg-primary text-primary-foreground btn-glow shadow-heavy-out-lg">Review Transaction</Button>
            </CardContent>
          </Card>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
