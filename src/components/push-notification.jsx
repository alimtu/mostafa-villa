"use client";

import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { requestNotificationPermission, initMessaging, setupForegroundMessaging } from "@/lib/firebase";

export function PushNotification() {
  const [permission, setPermission] = useState("default");
  const [showPrompt, setShowPrompt] = useState(false);
  const [notification, setNotification] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
      
      // Show prompt after 3 seconds if permission not decided
      if (Notification.permission === "default") {
        const timer = setTimeout(() => setShowPrompt(true), 3000);
        return () => clearTimeout(timer);
      }
      
      // If already granted, setup messaging
      if (Notification.permission === "granted") {
        setupMessaging();
      }
    }
  }, []);

  const setupMessaging = async () => {
    await initMessaging();
    setupForegroundMessaging((payload) => {
      setNotification({
        title: payload?.notification?.title || "New Message",
        body: payload?.notification?.body || "",
      });
      setTimeout(() => setNotification(null), 5000);
    });
  };

  const handleEnableNotifications = async () => {
    const token = await requestNotificationPermission();
    
    if (token) {
      setFcmToken(token);
      setPermission("granted");
      setupMessaging();
      console.log("✅ Push notifications enabled! FCM Token:", token);
    } else {
      setPermission(Notification.permission);
    }
    
    setShowPrompt(false);
  };

  if (!showPrompt && !notification) return null;

  return (
    <>
      {/* Permission Prompt */}
      {showPrompt && permission === "default" && (
        <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-700 p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-sky-100 dark:bg-sky-900/50">
                <Bell className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sky-900 dark:text-white text-sm">
                  Enable Notifications
                </h3>
                <p className="text-xs text-sky-700 dark:text-sky-300 mt-1">
                  Get notified about new updates and opportunities.
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleEnableNotifications}
                    className="flex-1 px-3 py-1.5 text-xs font-medium bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                  >
                    Allow
                  </button>
                  <button
                    onClick={() => setShowPrompt(false)}
                    className="px-3 py-1.5 text-xs font-medium text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowPrompt(false)}
                className="text-sky-400 hover:text-sky-600 dark:hover:text-sky-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Foreground Notification Toast */}
      {notification && (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 animate-in slide-in-from-top-5 duration-300">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-700 p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-sky-100 dark:bg-sky-900/50">
                <Bell className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sky-900 dark:text-white text-sm">
                  {notification.title}
                </h3>
                <p className="text-xs text-sky-700 dark:text-sky-300 mt-1">
                  {notification.body}
                </p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-sky-400 hover:text-sky-600 dark:hover:text-sky-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
