
'use client';
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BottomNav from "@/components/dashboard/BottomNav";
import { GenesisVaultLogo } from "@/components/icons";

export default function AboutPage() {
  const version = "1.0.0";
  const build = "20240726";
  const year = new Date().getFullYear();

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
            <main className="flex-1 p-4 md:p-6 lg:p-8 pb-32 flex justify-center">
              <div className="w-full max-w-2xl">
                <Card className="shadow-none border-none bg-transparent">
                  <CardHeader className="text-center items-center">
                      <div className="p-4 rounded-full shadow-heavy-out mb-4">
                        <div className="p-4 rounded-full shadow-heavy-in">
                          <GenesisVaultLogo />
                        </div>
                      </div>
                      <CardTitle className="font-headline text-4xl">Genesis Vault</CardTitle>
                      <CardDescription className="text-lg">Your Gateway to the Digital Economy.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-8 mt-8">
                      <p className="text-muted-foreground">
                        Genesis Vault is a non-custodial cryptocurrency wallet that gives you full control over your digital assets. Our mission is to provide a secure, intuitive, and powerful tool for everyone to access the decentralized future. Your keys, your crypto.
                      </p>
                      <div className="text-sm text-muted-foreground/80 font-mono">
                        <p>Version {version} (Build {build})</p>
                        <p>&copy; {year} Genesis Labs Inc. All rights reserved.</p>
                      </div>
                      <div className="flex justify-center gap-4">
                        <Link href="#"><Button variant="link">Privacy Policy</Button></Link>
                        <Link href="#"><Button variant="link">Terms of Service</Button></Link>
                      </div>
                  </CardContent>
                </Card>
              </div>
            </main>
            <BottomNav />
          </div>
      </div>
  );
}
