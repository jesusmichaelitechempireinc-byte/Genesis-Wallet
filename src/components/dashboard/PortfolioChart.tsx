"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import { portfolioData } from "@/lib/data";

const chartConfig = {
  balance: {
    label: "Balance",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function PortfolioChart() {
  return (
    <Card className="shadow-neo-out border-none">
      <CardHeader>
        <CardTitle className="font-headline">Portfolio Overview</CardTitle>
        <CardDescription>Your portfolio value over the last 7 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent
                    formatter={(value) => `$${Number(value).toLocaleString()}`}
                    indicator="dot"
                    labelClassName="font-medium"
                    className="shadow-neo-out-sm bg-background/80 backdrop-blur-sm"
                />}
              />
              <Area
                dataKey="balance"
                type="natural"
                fill="url(#colorBalance)"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: "hsl(var(--primary))",
                  strokeWidth: 2,
                  stroke: "hsl(var(--background))",
                }}
                activeDot={{
                  r: 6,
                  fill: "hsl(var(--primary))",
                  strokeWidth: 2,
                  stroke: "hsl(var(--background))",
                  style: { filter: "drop-shadow(0 0 5px hsl(var(--primary)))" },
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
