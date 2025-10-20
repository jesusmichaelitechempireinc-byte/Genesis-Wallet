
import { CurrencyProvider } from "@/hooks/use-currency";
import { CoinDataProvider } from "@/hooks/use-coin-data-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CoinDataProvider>
      <CurrencyProvider>
        <div className="h-full w-full">{children}</div>
      </CurrencyProvider>
    </CoinDataProvider>
  );
}
