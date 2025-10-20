'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Coin } from "@/lib/data";
import { useCurrency } from "@/hooks/use-currency";

const DataRow = ({ label, value, className }: { label: string, value: string | number, className?: string }) => (
    <div className={`flex justify-between items-center py-3 ${className}`}>
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold font-mono text-right">{value}</span>
    </div>
);

export default function AssetAbout({ coin }: { coin: Coin | null }) {
    const { formatCurrency } = useCurrency();
    
    if (!coin) {
        return (
            <Card className="shadow-heavy-out-lg border-none bg-transparent">
                <CardContent className="p-4 md:p-6">
                    <p className="text-muted-foreground">No data available for this asset.</p>
                </CardContent>
            </Card>
        )
    }

    const formatLargeNumber = (num: number) => {
        if (num >= 1_000_000_000_000) {
            return `${(num / 1_000_000_000_000).toFixed(2)}T`;
        }
        if (num >= 1_000_000_000) {
            return `${(num / 1_000_000_000).toFixed(2)}B`;
        }
        if (num >= 1_000_000) {
            return `${(num / 1_000_000).toFixed(2)}M`;
        }
        return num.toLocaleString();
    }

    const dataItems = [
        { label: "Market Cap", value: coin.marketCap ? formatCurrency(coin.marketCap, { notation: 'compact' }) : 'N/A' },
        { label: "Volume (24h)", value: coin.volume24h ? formatCurrency(coin.volume24h, { notation: 'compact' }) : 'N/A' },
        { label: "Circulating Supply", value: coin.circulatingSupply ? `${formatLargeNumber(coin.circulatingSupply)} ${coin.ticker}` : 'N/A' },
        { label: "Total Supply", value: coin.totalSupply ? `${formatLargeNumber(coin.totalSupply)} ${coin.ticker}` : 'N/A' },
        { label: "Max Supply", value: coin.maxSupply ? `${formatLargeNumber(coin.maxSupply)} ${coin.ticker}` : '∞' },
        { label: "All-Time High", value: coin.allTimeHigh ? formatCurrency(coin.allTimeHigh) : 'N/A' },
    ];
    
    return (
        <Card className="shadow-heavy-out-lg border-none bg-transparent">
            <CardContent className="p-4 md:p-6">
                <p className="text-foreground leading-relaxed mb-6">
                    {coin.description || 'No description available.'}
                </p>
                <div className="divide-y divide-border/50">
                    {dataItems.map((item, index) => (
                       <DataRow key={index} label={item.label} value={item.value} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
