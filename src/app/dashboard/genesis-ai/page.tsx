
'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { BrainCircuit, Loader2, MessageSquare, Plus, Send, Settings2, Trash2, MoreVertical, Edit, Check } from 'lucide-react';
import { GenesisAILogo } from '@/components/icons/GenesisAILogo';
import { GenesisVaultLogo } from '@/components/icons';
import Image from 'next/image';
import BottomNav from '@/components/dashboard/BottomNav';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { chat as chatFlow } from '@/ai/flows/chat';
import type { MessageData } from 'genkit';


interface Message {
  role: 'user' | 'model';
  text: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

const initialChats: Chat[] = [
    {
        id: '1',
        title: 'Market analysis for Q3',
        messages: [
             { role: 'model', text: 'Hello! I am Genesis, your personal crypto assistant. How can I help you unlock the potential of your digital assets today?' },
             { role: 'user', text: 'Can you analyze the current sentiment for Ethereum?' },
             { role: 'model', text: 'Of course. Analyzing market sentiment for Ethereum... The current sentiment is cautiously optimistic. There is strong support around the $3,400 mark, with significant developer activity on Layer 2 solutions. However, macroeconomic factors could introduce volatility. Would you like a more detailed breakdown?' },
        ]
    },
    { id: '2', title: 'Security audit simulation', messages: [{ role: 'model', text: 'Ready to begin security audit simulation. What is our first scenario?' }] },
    { id: '3', title: 'Bitcoin price prediction', messages: [{ role: 'model', text: 'Let\'s look at the Bitcoin price predictions. What timeframe are you interested in?' }] },
];

export default function GenesisAIPage() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<string | null>('1');
  const [inputText, setInputText] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  
  const [renamingChatId, setRenamingChatId] = useState<string | null>(null);
  const [renamingTitle, setRenamingTitle] = useState('');

  const [deletingChat, setDeletingChat] = useState<Chat | null>(null);

  const mainContentRef = useRef<HTMLDivElement>(null);

  const activeChat = useMemo(() => chats.find(c => c.id === activeChatId), [chats, activeChatId]);

  useEffect(() => {
    if (mainContentRef.current) {
        mainContentRef.current.scrollTop = mainContentRef.current.scrollHeight;
    }
  }, [activeChat?.messages, isResponding]);
  
  const handleNewChat = () => {
    const newChat: Chat = {
        id: Date.now().toString(),
        title: 'New Chat',
        messages: [{ role: 'model', text: 'Hello! How may I assist you today?' }]
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChatId || isResponding) return;

    const userMessage: Message = { role: 'user', text: inputText };
    const history: MessageData[] = activeChat?.messages.map(m => ({ role: m.role, content: [{ text: m.text }] })) || [];
    
    // Add user message to UI immediately
    setChats(currentChats => currentChats.map(chat => 
      chat.id === activeChatId ? { ...chat, messages: [...chat.messages, userMessage] } : chat
    ));
    setInputText('');
    setIsResponding(true);

    try {
      const response = await chatFlow({ history, prompt: userMessage.text });
      const aiResponse: Message = { role: 'model', text: response };

      setChats(currentChats => currentChats.map(chat => 
        chat.id === activeChatId ? { ...chat, messages: [...chat.messages, aiResponse] } : chat
      ));
    } catch (error) {
      console.error("AI Error:", error);
      const errorResponse: Message = { role: 'model', text: "I'm sorry, I encountered an error while processing your request. Please try again." };
       setChats(currentChats => currentChats.map(chat => 
        chat.id === activeChatId ? { ...chat, messages: [...chat.messages, errorResponse] } : chat
      ));
    } finally {
      setIsResponding(false);
    }
  };
  
  const startRename = (chat: Chat) => {
    setRenamingChatId(chat.id);
    setRenamingTitle(chat.title);
  };
  
  const handleRename = () => {
    if (!renamingChatId || !renamingTitle.trim()) return;
    setChats(chats.map(chat => chat.id === renamingChatId ? { ...chat, title: renamingTitle } : chat));
    setRenamingChatId(null);
    setRenamingTitle('');
  };

  const confirmDelete = () => {
    if (!deletingChat) return;
    setChats(chats.filter(chat => chat.id !== deletingChat.id));
    
    if (activeChatId === deletingChat.id) {
        setActiveChatId(chats.length > 1 ? chats.filter(c => c.id !== deletingChat.id)[0].id : null);
    }
    
    setDeletingChat(null);
  };

  return (
      <div className="flex h-screen w-full bg-background font-body text-foreground">
          {/* Sidebar */}
          <aside className="w-80 border-r flex flex-col">
            <header className="flex h-20 items-center justify-between p-4 border-b">
                 <div className="flex items-center gap-3">
                     <GenesisVaultLogo />
                    <h1 className="text-xl font-semibold font-headline">Genesis AI</h1>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full shadow-heavy-out-sm">
                    <Settings2 className="h-5 w-5" />
                </Button>
            </header>
            <div className="p-4">
                 <Button onClick={handleNewChat} className="w-full rounded-full shadow-heavy-out-sm bg-background hover:bg-muted/50 text-foreground hover:text-primary">
                    <Plus className="mr-2 h-5 w-5" />
                    New Chat
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <h2 className="text-sm font-semibold text-muted-foreground px-2">Recent Chats</h2>
                {chats.map(chat => (
                    <div
                        key={chat.id}
                        onClick={() => setActiveChatId(chat.id)}
                        className={cn(
                            "group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all",
                            activeChatId === chat.id ? 'bg-primary/10 shadow-heavy-in-sm' : 'hover:bg-muted/30'
                        )}
                    >
                        {renamingChatId === chat.id ? (
                            <div className="flex-1 flex items-center gap-2">
                                <Input 
                                    value={renamingTitle}
                                    onChange={(e) => setRenamingTitle(e.target.value)}
                                    onBlur={handleRename}
                                    onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                                    className="h-8 flex-1"
                                    autoFocus
                                />
                                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleRename}><Check className="h-4 w-4"/></Button>
                            </div>
                        ) : (
                            <>
                                <MessageSquare className="h-5 w-5 mr-3 text-muted-foreground" />
                                <span className="flex-1 truncate font-medium text-sm">{chat.title}</span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                         <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onSelect={() => startRename(chat)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Rename
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => setDeletingChat(chat)} className="text-destructive">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        )}
                    </div>
                ))}
            </div>
          </aside>

          {/* Main Chat Panel */}
          <div className="flex flex-1 flex-col relative">
            <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-background/80 px-8 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold font-headline">{activeChat?.title || "Genesis AI"}</h1>
                </div>
            </header>

            <main ref={mainContentRef} className="flex-1 overflow-y-auto p-8 pb-32">
                {activeChat ? (
                    <div className="space-y-8 max-w-4xl mx-auto">
                        {activeChat.messages.map((message, index) => (
                            <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                                {message.role === 'model' && (
                                    <div className="p-2 rounded-full shadow-heavy-out bg-background">
                                        <GenesisAILogo className="h-8 w-8" />
                                    </div>
                                )}
                                <div className={`max-w-3xl p-5 rounded-2xl ${message.role === 'user' ? 'bg-primary text-primary-foreground shadow-heavy-out-lg rounded-br-none' : 'bg-background shadow-heavy-in-lg rounded-bl-none'}`}>
                                    <p className="text-base whitespace-pre-wrap">{message.text}</p>
                                </div>
                                {message.role === 'user' && (
                                <Avatar className="h-12 w-12 shadow-heavy-out-sm">
                                        <Image src="https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760722677/wallet-2_z7psdg.png" alt="User Avatar" layout="fill" data-ai-hint="avatar user" />
                                        <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                )}
                            </div>
                        ))}
                         {isResponding && (
                           <div className="flex items-start gap-4">
                                <div className="p-2 rounded-full shadow-heavy-out bg-background">
                                    <GenesisAILogo className="h-8 w-8 animate-pulse" />
                                </div>
                                <div className="max-w-3xl p-5 rounded-2xl bg-background shadow-heavy-in-lg rounded-bl-none">
                                    <div className="flex items-center gap-2">
                                       <Loader2 className="h-5 w-5 animate-spin" />
                                       <p className="text-base text-muted-foreground">Genesis is thinking...</p>
                                    </div>
                                </div>
                           </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                        <BrainCircuit className="h-24 w-24 mb-4" />
                        <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to Genesis AI</h2>
                        <p>Create a new chat to begin your conversation.</p>
                    </div>
                )}
            </main>

            {activeChatId && (
              <footer className="absolute bottom-0 w-full z-10 border-t bg-background/80 p-4 backdrop-blur-sm pb-32">
                  <form onSubmit={handleSendMessage} className="relative max-w-4xl mx-auto">
                      <Input
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          placeholder="Ask Genesis anything..."
                          className="h-14 pl-6 pr-16 text-base rounded-full shadow-heavy-in-lg border-transparent focus:shadow-heavy-out-lg transition-shadow"
                          disabled={isResponding}
                      />
                      <Button type="submit" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary text-primary-foreground btn-glow shadow-heavy-out-sm" disabled={isResponding || !inputText.trim()}>
                          {isResponding ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                      </Button>
                  </form>
              </footer>
            )}
            <BottomNav />
          </div>

          <Dialog open={!!deletingChat} onOpenChange={() => setDeletingChat(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Chat</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the chat "{deletingChat?.title}"? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeletingChat(null)}>Cancel</Button>
                <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
      </div>
  );
}
