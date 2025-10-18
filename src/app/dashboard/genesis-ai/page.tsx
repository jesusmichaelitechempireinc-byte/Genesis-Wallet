
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BrainCircuit, MessageSquare, Plus, Send, Settings2, Trash2 } from 'lucide-react';
import { GenesisAILogo } from '@/components/icons/GenesisAILogo';
import Link from 'next/link';
import Image from 'next/image';
import BottomNav from '@/components/dashboard/BottomNav';

const recentChats = [
    { id: '1', title: 'Market analysis for Q3' },
    { id: '2', title: 'Security audit simulation' },
    { id: '3', title: 'Bitcoin price prediction' },
    { id: '4', title: 'Optimizing my portfolio' },
];

const chatMessages = [
    { from: 'ai', text: 'Hello! I am Genesis, your personal crypto assistant. How can I help you unlock the potential of your digital assets today?' },
    { from: 'user', text: 'Can you analyze the current sentiment for Ethereum?' },
    { from: 'ai', text: 'Of course. Analyzing market sentiment for Ethereum... The current sentiment is cautiously optimistic. There is strong support around the $3,400 mark, with significant developer activity on Layer 2 solutions. However, macroeconomic factors could introduce volatility. Would you like a more detailed breakdown?' },
];

export default function GenesisAIPage() {
  return (
      <div className="flex h-screen w-full bg-background font-body text-foreground">
          {/* Main Chat Panel */}
          <div className="flex flex-1 flex-col relative">
            <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-background/80 px-8 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                     <GenesisAILogo />
                    <h1 className="text-2xl font-semibold font-headline">Genesis AI</h1>
                </div>
                <Button className="rounded-full shadow-heavy-out-sm bg-background hover:bg-muted/50 text-foreground hover:text-primary">
                    <Plus className="mr-2 h-5 w-5" />
                    New Chat
                </Button>
            </header>

            <main className="flex-1 overflow-y-auto p-8 pb-28">
                <div className="space-y-8 max-w-4xl mx-auto">
                    {chatMessages.map((message, index) => (
                        <div key={index} className={`flex items-start gap-4 ${message.from === 'user' ? 'justify-end' : ''}`}>
                            {message.from === 'ai' && (
                                <div className="p-2 rounded-full shadow-heavy-out bg-background">
                                    <GenesisAILogo className="h-8 w-8" />
                                </div>
                            )}
                            <div className={`max-w-xl p-5 rounded-2xl ${message.from === 'user' ? 'bg-primary text-primary-foreground shadow-heavy-out-lg rounded-br-none' : 'bg-background shadow-heavy-in-lg rounded-bl-none'}`}>
                                <p className="text-base">{message.text}</p>
                            </div>
                             {message.from === 'user' && (
                               <Avatar className="h-12 w-12 shadow-heavy-out-sm">
                                    <Image src="https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760722677/wallet-2_z7psdg.png" alt="User Avatar" layout="fill" data-ai-hint="avatar user" />
                                    <AvatarFallback>U</AvatarFallback>
                               </Avatar>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <footer className="absolute bottom-0 w-full z-10 border-t bg-background/80 p-4 backdrop-blur-sm pb-28">
                <div className="relative max-w-4xl mx-auto">
                    <Input
                        placeholder="Ask Genesis anything about your portfolio, market trends, or security..."
                        className="h-14 pl-6 pr-16 text-base rounded-full shadow-heavy-in-lg border-transparent focus:shadow-heavy-out-lg transition-shadow"
                    />
                    <Button size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary text-primary-foreground btn-glow shadow-heavy-out-sm">
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </footer>
            <BottomNav />
          </div>
      </div>
  );
}
