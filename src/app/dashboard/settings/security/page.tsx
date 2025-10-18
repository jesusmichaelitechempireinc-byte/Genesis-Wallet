
'use client';
import { ArrowLeft, Fingerprint, Lock, FileText } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BottomNav from "@/components/dashboard/BottomNav";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SecurityPage() {
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
                    <CardTitle className="font-headline text-3xl">Security & Privacy</CardTitle>
                    <CardDescription>Manage PIN, biometrics, and data settings.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 max-w-2xl">
                     <div className="flex items-center justify-between p-4 rounded-2xl shadow-heavy-out-sm bg-background">
                        <div className="flex items-center gap-4">
                           <div className="p-3 rounded-full shadow-heavy-in-sm bg-background">
                                <Lock className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-bold text-lg">Change PIN</p>
                            </div>
                        </div>
                        <Button variant="secondary" className="shadow-heavy-out-sm">Change</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl shadow-heavy-out-sm bg-background">
                        <div className="flex items-center gap-4">
                           <div className="p-3 rounded-full shadow-heavy-in-sm bg-background">
                                <Fingerprint className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <Label htmlFor="bio-switch" className="font-bold text-lg">Biometric Unlock</Label>
                                <p className="text-sm text-muted-foreground">Use your fingerprint or face to unlock.</p>
                            </div>
                        </div>
                        <Switch id="bio-switch" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between p-4 rounded-2xl shadow-heavy-out-sm bg-background">
                        <div className="flex items-center gap-4">
                           <div className="p-3 rounded-full shadow-heavy-in-sm bg-background">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-bold text-lg">View Secret Phrase</p>
                            </div>
                        </div>
                        <Button variant="destructive" className="shadow-heavy-out-sm">Reveal</Button>
                    </div>
                </CardContent>
              </Card>
            </main>
            <BottomNav />
          </div>
      </div>
  );
}
