"use client";

import React, { useState, useEffect } from "react";
import { Clock, XCircle } from "lucide-react";

export interface CountdownTimerProps {
  expiresAt: string;
  onExpire?: () => void;
  variant?: "badge" | "card";
  className?: string;
}

export default function CountdownTimer({
  expiresAt,
  onExpire,
  variant = "badge",
  className = "",
}: CountdownTimerProps) {
  const [timeLeftMs, setTimeLeftMs] = useState<number>(() => {
    return Math.max(0, new Date(expiresAt).getTime() - Date.now());
  });

  useEffect(() => {
    // Initial check
    const initialRemaining = new Date(expiresAt).getTime() - Date.now();
    if (initialRemaining <= 0) {
      setTimeLeftMs(0);
      onExpire?.();
      return;
    }

    const timer = setInterval(() => {
      const remaining = new Date(expiresAt).getTime() - Date.now();
      if (remaining <= 0) {
        setTimeLeftMs(0);
        clearInterval(timer);
        onExpire?.();
      } else {
        setTimeLeftMs(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, onExpire]);

  if (timeLeftMs <= 0) {
    if (variant === "card") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-100 text-red-700 text-sm font-bold">
          <XCircle size={16} /> Hold Expired
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-100 text-red-700 text-xs font-bold">
        <XCircle size={14} /> Hold Expired
      </span>
    );
  }

  const totalSeconds = Math.floor(timeLeftMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const isUrgent = totalSeconds < 120; // under 2 minutes

  const pad = (n: number) => String(n).padStart(2, "0");

  if (variant === "card") {
    return (
      <div
        className={`inline-flex items-center gap-2 p-3 sm:p-4 rounded-2xl font-mono text-white shadow-md transition-all ${
          isUrgent
            ? "bg-rose-600 shadow-rose-500/20 animate-pulse"
            : "bg-amber-600 shadow-amber-500/20"
        } ${className}`}
      >
        <div className="flex flex-col items-center min-w-[40px]">
          <span className="text-xl sm:text-2xl font-black">{pad(hours)}</span>
          <span className="text-[9px] uppercase tracking-wider font-sans opacity-80">
            Hours
          </span>
        </div>

        <span className="text-xl sm:text-2xl font-black pb-2">:</span>

        <div className="flex flex-col items-center min-w-[40px]">
          <span className="text-xl sm:text-2xl font-black">{pad(minutes)}</span>
          <span className="text-[9px] uppercase tracking-wider font-sans opacity-80">
            Mins
          </span>
        </div>

        <span className="text-xl sm:text-2xl font-black pb-2">:</span>

        <div className="flex flex-col items-center min-w-[40px]">
          <span className="text-xl sm:text-2xl font-black">{pad(seconds)}</span>
          <span className="text-[9px] uppercase tracking-wider font-sans opacity-80">
            Secs
          </span>
        </div>
      </div>
    );
  }

  // Default "badge" variant
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
        isUrgent
          ? "bg-red-50 border-red-200 text-red-600 animate-pulse"
          : "bg-amber-50 border-amber-200 text-amber-700"
      } ${className}`}
    >
      <Clock size={15} className={isUrgent ? "text-red-500" : "text-amber-500"} />
      <span>
        {pad(hours)}:{pad(minutes)}:{pad(seconds)} remaining
      </span>
    </div>
  );
}
