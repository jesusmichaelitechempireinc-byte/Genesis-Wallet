"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { coins, type Coin } from "@/lib/data";
import { ChevronDown, SlidersHorizontal, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const PriceChange = ({ change }: { change: number }) => {
  const isPositive = change >= 0;
  return (
    <span className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
       {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
      {Math.abs(change).toFixed(2)}%
    </span>
  );
}

export default function AssetList() {
  const [assets] = useState<Coin[]>(coins);

  return (
    <div className="w-full">
        <div className="flex justify-between items-center mb-4 px-2">
            <Button variant="ghost" className="flex items-center gap-1 text-muted-foreground">
                Balance
                <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
                <SlidersHorizontal className="h-5 w-5" />
            </Button>
        </div>
      <div className="rounded-lg bg-transparent overflow-hidden">
        <Table>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.ticker} className="border-none hover:bg-accent/50 cursor-pointer">
                <TableCell className="p-3">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                        {asset.iconUrl ? <Image src={asset.iconUrl} alt={asset.name} width={24} height={24} /> : <asset.icon className="h-6 w-6 text-foreground" />}
                     </div>
                    <div>
                      <div className="font-bold text-base">{asset.ticker} <span className="text-xs font-mono text-muted-foreground">{asset.network}</span></div>
                      <div className="flex items-center gap-2">
                         <span className="text-sm text-muted-foreground">${(asset.usdValue/asset.balance).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                         <PriceChange change={asset.change} />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right p-3">
                   <div className="font-bold text-base font-mono">{asset.balance.toLocaleString(undefined, {minimumFractionDigits: 4, maximumFractionDigits: 4})}</div>
                   <div className="text-sm text-muted-foreground font-mono">${asset.usdValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
