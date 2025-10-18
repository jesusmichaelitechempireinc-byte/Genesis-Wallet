
import Header from "@/components/dashboard/Header";
import BottomNav from "@/components/dashboard/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function AppearancePage() {
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
                    <CardDescription>Customize theme, dark mode, and layout.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Appearance settings will be available here.</p>
                </CardContent>
              </Card>
            </main>
            <BottomNav />
          </div>
      </div>
  );
}
