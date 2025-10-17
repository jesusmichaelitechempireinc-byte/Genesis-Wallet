import type { ComponentProps } from "react";
import { BrainCircuit } from "lucide-react";

export function GenesisAILogo(props: ComponentProps<"svg">) {
  return (
    <div className="relative">
      <BrainCircuit className="h-8 w-8 text-primary primary-glow" {...props} />
    </div>
  );
}
