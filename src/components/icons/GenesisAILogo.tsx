import type { ComponentProps } from "react";
import Image from "next/image";

export function GenesisAILogo(props: ComponentProps<"div">) {
  return (
    <div className="relative h-8 w-8" {...props}>
      <Image
        src="https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760746817/istockphoto-1073207930-612x612_1_ocnvis.png"
        alt="Genesis AI Logo"
        width={32}
        height={32}
        className="primary-glow"
        data-ai-hint="brain circuit"
      />
    </div>
  );
}
