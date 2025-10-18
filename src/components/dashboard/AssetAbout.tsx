
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Coin } from "@/lib/data";
import { useCurrency } from "@/hooks/use-currency";

const DataRow = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex justify-between items-center py-3">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold font-mono text-right">{value}</span>
    </div>
);

export default function AssetAbout({ coin }: { coin: Coin }) {
    const { formatCurrency } = useCurrency();
    
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
        { label: "Market Cap", value: formatCurrency(coin.marketCap, { notation: 'compact' }) },
        { label: "Volume (24h)", value: formatCurrency(coin.volume24h, { notation: 'compact' }) },
        { label: "Circulating Supply", value: `${formatLargeNumber(coin.circulatingSupply)} ${coin.ticker}` },
        { label: "Total Supply", value: `${formatLargeNumber(coin.totalSupply)} ${coin.ticker}` },
        { label: "Max Supply", value: coin.maxSupply ? `${formatLargeNumber(coin.maxSupply)} ${coin.ticker}` : '∞' },
        { label: "All-Time High", value: formatCurrency(coin.allTimeHigh) },
    ];
    
    return (
        <Card className="shadow-heavy-out-lg border-none bg-transparent">
            <CardContent className="p-4 md:p-6">
                <p className="text-foreground leading-relaxed mb-6">
                    {coin.description}
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
