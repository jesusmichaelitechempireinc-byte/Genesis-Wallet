import type { ComponentProps } from "react";
import { Vault } from "lucide-react";

export function GenesisVaultLogo(props: ComponentProps<"svg">) {
  return (
    <div className="relative">
      <Vault className="h-8 w-8 text-foreground" {...props} />
      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-primary [filter:blur(4px)]"></div>
      <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-primary"></div>
    </div>
  );
}
