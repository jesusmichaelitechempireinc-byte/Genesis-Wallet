
import { CoinDataProvider } from "@/hooks/use-coin-data-provider";
import { CurrencyProvider } from "@/hooks/use-currency";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrencyProvider>
      <CoinDataProvider>
        <div className="h-full w-full">{children}</div>
      </CoinDataProvider>
    </CurrencyProvider>
  );
}
