"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

export function SecretRedirect({ children }) {
  const router = useRouter();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const handleSecretTripleClick = useCallback(() => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
      clickTimerRef.current = null;
    }, 600);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
        clickTimerRef.current = null;
      }
      router.push("/fcm-token");
    }
  }, [router]);

  return (
    <div onClick={handleSecretTripleClick} className="cursor-default select-none">
      {children}
    </div>
  );
}

