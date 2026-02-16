"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { requestNotificationPermission } from "@/lib/firebase";

export default function FcmTokenPage() {
  const [permission, setPermission] = useState("default");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const canUse = useMemo(() => {
    if (typeof window === "undefined") return false;
    return "Notification" in window && "serviceWorker" in navigator;
  }, []);

  const getTokenNow = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const t = await requestNotificationPermission();
      const perm = typeof window !== "undefined" && "Notification" in window ? Notification.permission : "default";
      setPermission(perm);

      if (!t) {
        setToken("");
        setStatus("error");
        setError(
          perm === "denied"
            ? "Notification permission is denied in the browser settings."
            : "No token returned. Make sure you're on HTTPS (or localhost) and you accepted the permission prompt."
        );
        return;
      }

      setToken(t);
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError(e?.message || "Failed to get FCM token");
    }
  }, []);

  const copyToken = useCallback(async () => {
    if (!token) return;
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
    } catch (e) {
      setError(e?.message || "Copy failed");
    }
  }, [token]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold">FCM Token</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Use this page to generate and copy the current browser/device FCM token for Firebase Cloud Messaging.
      </p>

      {!canUse && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-200">
          This browser/environment does not support Notifications + Service Workers.
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm">
            <div className="font-medium">Permission</div>
            <div className="text-slate-600 dark:text-slate-300">{permission}</div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={getTokenNow}
              disabled={!canUse || status === "loading"}
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {status === "loading" ? "Getting token..." : "Get token"}
            </button>
            <button
              onClick={copyToken}
              disabled={!token}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium disabled:opacity-50 dark:border-slate-700"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm font-medium">Token</div>
          <textarea
            readOnly
            value={token}
            placeholder="Click 'Get token' to generate your FCM token"
            className="mt-2 h-36 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        {status === "error" && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-200">
            {error}
          </div>
        )}

        {status === "success" && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200">
            Token generated successfully.
          </div>
        )}
      </div>

      <div className="mt-6 text-xs text-slate-600 dark:text-slate-300">
        Note: FCM tokens are per-browser profile + device, and can change. If it changes, revisit this page and click "Get token" again.
      </div>
    </div>
  );
}

