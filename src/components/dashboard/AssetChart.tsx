
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Coin } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/hooks/use-currency";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const timeRanges = ['1H', '1D', '1W', '1M', '1Y', 'ALL'];

export default function AssetChart({ coin }: { coin: Coin }) {
  const [activeRange, setActiveRange] = useState('1D');
  const { selectedCurrency, formatCurrency } = useCurrency();
  
  if (!coin || !coin.history || coin.history.length === 0) {
     return (
      <Card className="shadow-heavy-out-lg border-none bg-transparent">
        <CardContent className="p-4 md:p-6">
          <div className="px-2 mb-4">
            <Skeleton className="h-9 w-48 mb-2" />
            <Skeleton className="h-7 w-40" />
          </div>
          <div className="h-[250px] w-full flex items-center justify-center">
            <p className="text-muted-foreground">Chart data not available.</p>
          </div>
          <div className="flex justify-center gap-1 mt-4">
            {timeRanges.map(range => (
              <Button key={range} variant="ghost" disabled className="rounded-full shadow-heavy-out-sm">
                {range}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = coin.history.map(h => ({
      ...h,
      price: h.price * (selectedCurrency.rate || 1)
  }));
  
  const currentPrice = chartData[chartData.length - 1].price;
  const priceChange = currentPrice - chartData[0].price;
  const percentageChange = (priceChange / chartData[0].price) * 100;
  const isPositive = percentageChange >= 0;


  return (
    <Card className="shadow-heavy-out-lg border-none bg-transparent">
      <CardContent className="p-4 md:p-6">
        <div className="px-2 mb-4">
             <p className="text-3xl font-bold font-mono">{formatCurrency(currentPrice)}</p>
             <p className={`font-semibold text-lg ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? '+' : ''}{formatCurrency(priceChange, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({percentageChange.toFixed(2)}%) Today
             </p>
        </div>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`color-${coin.ticker}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? 'hsl(140 100% 40%)' : 'hsl(0 100% 50%)'} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={isPositive ? 'hsl(140 100% 40%)' : 'hsl(0 100% 50%)'} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <YAxis domain={['dataMin', 'dataMax']} hide />
              <XAxis dataKey="time" hide/>
              <ChartTooltip
                cursor={{stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '4 4'}}
                content={<ChartTooltipContent
                    formatter={(value) => formatCurrency(Number(value))}
                    indicator="dot"
                    labelClassName="font-medium"
                    className="shadow-heavy-out-sm bg-background/80 backdrop-blur-sm rounded-xl"
                />}
              />
              <Area
                dataKey="price"
                type="natural"
                fill={`url(#color-${coin.ticker})`}
                stroke={isPositive ? 'hsl(140 100% 60%)' : 'hsl(0 100% 60%)'}
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: isPositive ? 'hsl(140 100% 60%)' : 'hsl(0 100% 60%)',
                  strokeWidth: 2,
                  stroke: "hsl(var(--background))",
                  style: { filter: `drop-shadow(0 0 8px ${isPositive ? 'hsl(140 100% 60%)' : 'hsl(0 100% 60%)'})` },
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
         <div className="flex justify-center gap-1 mt-4">
            {timeRanges.map(range => (
                <Button key={range} variant="ghost" onClick={() => setActiveRange(range)} className={cn('rounded-full shadow-heavy-out-sm active:shadow-heavy-in-sm', activeRange === range ? 'bg-muted text-foreground' : 'text-muted-foreground')}>
                    {range}
                </Button>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
