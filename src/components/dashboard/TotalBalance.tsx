import { totalBalance } from "@/lib/data";

export default function TotalBalance() {
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalBalance);
  
  const usdcBalance = totalBalance;

  return (
    <div className="text-center my-4">
      <h1 className="text-5xl font-bold tracking-tight">{formattedBalance}</h1>
      <p className="text-muted-foreground text-lg mt-1">≈{usdcBalance.toLocaleString()} USDC</p>
    </div>
  );
}
