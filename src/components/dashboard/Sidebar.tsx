
'use client'

import Link from 'next/link';
import {
  AreaChart,
  Wallet,
  Repeat,
  History,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { GenesisVaultLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sidebar as SidebarPrimitive, SidebarContent, SidebarGroup, SidebarItem, SidebarLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', icon: Wallet, label: 'Balance' },
  { href: '/dashboard/transactions', icon: Repeat, label: 'Transactions' },
  { href: '/dashboard/history', icon: History, label: 'History' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <SidebarPrimitive>
      <SidebarContent>
        <SidebarGroup>
          <Link href="/" className="flex items-center gap-3 px-2 py-4">
            <GenesisVaultLogo />
            <SidebarLabel>Genesis Vault</SidebarLabel>
          </Link>
        </SidebarGroup>
        <SidebarMenu>
          {navItems.map((item, index) => (
            <SidebarMenuItem key={item.label}>
               <Link href={item.href} className='w-full'>
                <SidebarMenuButton
                    isActive={item.href === '/dashboard'}
                >
                    <item.icon className="h-5 w-5" />
                    <SidebarLabel>{item.label}</SidebarLabel>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup className="mt-auto">
          <Card className="bg-card border-none shadow-heavy-out">
              <CardContent className="p-4 flex flex-col items-center text-center">
                  <HelpCircle className="h-8 w-8 text-primary mb-2"/>
                  <h3 className="font-semibold">Need help?</h3>
                  <p className="text-xs text-muted-foreground mt-1 mb-3">Contact our support team for any assistance.</p>
                  <Button size="sm" className="w-full rounded-full bg-primary text-primary-foreground shadow-heavy-out active:shadow-heavy-in">Contact Support</Button>
              </CardContent>
          </Card>
        </SidebarGroup>
      </SidebarContent>
    </SidebarPrimitive>
  );
}
