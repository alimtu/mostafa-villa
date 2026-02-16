"use client";

import Image from "next/image";
import { useTheme } from "./theme-provider";

export function ProfileImage({ className = "" }) {
  const { theme } = useTheme();

  return (
    <div className={className}>
      {/* Light mode image */}
      <Image
        src="/ali.png"
        alt="Ali Montazerion"
        width={144}
        height={144}
        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        }`}
        priority
      />
      {/* Dark mode image */}
      <Image
        src="/ali.png"
        alt="Ali Montazerion"
        width={144}
        height={144}
        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
        priority
      />
    </div>
  );
}

