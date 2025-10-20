import { CurrencyProvider } from "@/hooks/use-currency";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrencyProvider>
        <div className="h-full w-full">{children}</div>
    </CurrencyProvider>
  );
}
