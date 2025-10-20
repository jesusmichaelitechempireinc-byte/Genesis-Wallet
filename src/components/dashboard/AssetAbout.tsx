'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Coin } from "@/lib/data";
import { useCurrency } from "@/hooks/use-currency";
import { Skeleton } from "../ui/skeleton";

const DataRow = ({ label, value, className }: { label: string, value: string | number, className?: string }) => (
    <div className={`flex justify-between items-center py-3 ${className}`}>
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold font-mono text-right">{value}</span>
    </div>
);

const AssetAboutSkeleton = () => {
    return (
        <Card className="shadow-heavy-out-lg border-none bg-transparent">
            <CardContent className="p-4 md:p-6">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />
                <div className="divide-y divide-border/50">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-center py-3">
                           <Skeleton className="h-4 w-1/3" />
                           <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default function AssetAbout({ coin }: { coin: Coin | null }) {
    const { formatCurrency, selectedCurrency } = useCurrency();
    
    if (!coin) {
        return <AssetAboutSkeleton />;
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
    
    const convertedMarketCap = coin.marketCap ? coin.marketCap * (selectedCurrency.rate || 1) : null;
    const convertedVolume = coin.volume24h ? coin.volume24h * (selectedCurrency.rate || 1) : null;
    const convertedATH = coin.allTimeHigh ? coin.allTimeHigh * (selectedCurrency.rate || 1) : null;

    const dataItems = [
        { label: "Market Cap", value: convertedMarketCap ? formatCurrency(convertedMarketCap, { notation: 'compact' }) : 'N/A' },
        { label: "Volume (24h)", value: convertedVolume ? formatCurrency(convertedVolume, { notation: 'compact' }) : 'N/A' },
        { label: "Circulating Supply", value: coin.circulatingSupply ? `${formatLargeNumber(coin.circulatingSupply)} ${coin.ticker}` : 'N/A' },
        { label: "Total Supply", value: coin.totalSupply ? `${formatLargeNumber(coin.totalSupply)} ${coin.ticker}` : 'N/A' },
        { label: "Max Supply", value: coin.maxSupply ? `${formatLargeNumber(coin.maxSupply)} ${coin.ticker}` : '∞' },
        { label: "All-Time High", value: convertedATH ? formatCurrency(convertedATH) : 'N/A' },
    ];
    
    const cleanDescription = coin.description?.replace(/<a href/g, '<a target="_blank" rel="noopener noreferrer" href');

    return (
        <Card className="shadow-heavy-out-lg border-none bg-transparent">
            <CardContent className="p-4 md:p-6">
                <div 
                    className="text-foreground leading-relaxed mb-6 prose prose-invert prose-a:text-primary hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: cleanDescription || 'No description available.'}}
                />
                <div className="divide-y divide-border/50">
                    {dataItems.map((item, index) => (
                       <DataRow key={index} label={item.label} value={item.value} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
