
'use client';
import { ArrowLeft, Palette, Moon, Sun, Layout } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BottomNav from "@/components/dashboard/BottomNav";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCurrency } from "@/hooks/use-currency";
import { currencies } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

export default function AppearancePage() {
    const { selectedCurrency, setSelectedCurrency } = useCurrency();

  return (
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          <div className="flex flex-1 flex-col relative">
             <header className="sticky top-0 z-10 flex h-20 items-center justify-start px-4 md:px-6">
                <Link href="/dashboard/settings" passHref>
                    <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm">
                    <ArrowLeft className="h-6 w-6 text-muted-foreground" />
                    </Button>
                </Link>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8 pb-32">
              <Card className="shadow-none border-none bg-transparent">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Appearance</CardTitle>
                    <CardDescription>Customize your wallet's look and feel.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 max-w-2xl">
                    <div className="flex items-center justify-between p-4 rounded-2xl shadow-heavy-out-sm bg-background">
                        <div className="flex items-center gap-4">
                           <div className="p-3 rounded-full shadow-heavy-in-sm bg-background">
                                <Sun className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <Label htmlFor="theme-switch" className="font-bold text-lg">Light Mode</Label>
                                <p className="text-sm text-muted-foreground">Switch to the light theme.</p>
                            </div>
                        </div>
                        <Switch id="theme-switch-light" disabled/>
                    </div>
                     <div className="flex items-center justify-between p-4 rounded-2xl shadow-heavy-out-sm bg-background">
                        <div className="flex items-center gap-4">
                           <div className="p-3 rounded-full shadow-heavy-in-sm bg-background">
                                <Moon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <Label htmlFor="theme-switch" className="font-bold text-lg">Dark Mode</Label>
                                <p className="text-sm text-muted-foreground">Switch to the dark theme.</p>
                            </div>
                        </div>
                        <Switch id="theme-switch-dark" checked disabled/>
                    </div>
                     <div className="flex items-center justify-between p-4 rounded-2xl shadow-heavy-out-sm bg-background">
                        <div className="flex items-center gap-4">
                           <div className="p-3 rounded-full shadow-heavy-in-sm bg-background">
                                <Palette className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <Label className="font-bold text-lg">Primary Currency</Label>
                                <p className="text-sm text-muted-foreground">Select the currency for displaying balances.</p>
                            </div>
                        </div>
                        <Select value={selectedCurrency.code} onValueChange={(code) => {
                            const currency = currencies.find(c => c.code === code);
                            if (currency) setSelectedCurrency(currency);
                        }}>
                            <SelectTrigger className="w-[180px] shadow-heavy-in-sm">
                                <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent className="shadow-heavy-out-sm">
                                {currencies.map(c => (
                                    <SelectItem key={c.code} value={c.code}>
                                        <span>{c.code} - {c.name}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
              </Card>
            </main>
            <BottomNav />
          </div>
      </div>
  );
}
