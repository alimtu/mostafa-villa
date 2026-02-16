"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/firebase";

export function FirebaseAnalytics() {
  useEffect(() => {
    const init = async () => {
      try {
        await initAnalytics();
        console.log("Firebase Analytics initialized");
      } catch (error) {
        console.error("Error initializing Firebase Analytics:", error);
      }
    };
    
    init();
  }, []);

  return null; // This component doesn't render anything
}

