
import Header from "@/components/dashboard/Header";
import BottomNav from "@/components/dashboard/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Brush, Shield, Network, Info } from "lucide-react";
import Link from 'next/link';

const settingsItems = [
    {
        icon: Brush,
        title: "Appearance",
        description: "Customize theme, dark mode, and layout.",
        href: "/dashboard/settings/appearance"
    },
    {
        icon: Shield,
        title: "Security & Privacy",
        description: "Manage PIN, biometrics, and data settings.",
        href: "/dashboard/settings/security"
    },
    {
        icon: Network,
        title: "Networks",
        description: "Manage connections to blockchain networks.",
        href: "/dashboard/settings/networks"
    },
     {
        icon: Info,
        title: "About",
        description: "App version and legal information.",
        href: "/dashboard/settings/about"
    }
]

export default function SettingsPage() {
  return (
      <div className="flex min-h-screen w-full bg-background font-body text-foreground">
          <div className="flex flex-1 flex-col relative">
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8 pb-28">
              <Card className="shadow-none border-none bg-transparent">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Settings</CardTitle>
                    <CardDescription>Manage your wallet and application settings.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {settingsItems.map(item => (
                        <Link href={item.href} key={item.title}>
                            <div className="flex items-center p-4 rounded-2xl shadow-heavy-out-sm bg-background hover:shadow-heavy-in-sm transition-shadow cursor-pointer">
                                <div className="p-3 rounded-full shadow-heavy-in-sm bg-background mr-4">
                                    <item.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
                                </div>
                                <ChevronRight className="h-6 w-6 text-muted-foreground" />
                            </div>
                        </Link>
                    ))}
                </CardContent>
              </Card>
            </main>
            <BottomNav />
          </div>
      </div>
  );
}
