"use client";

import { Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { HoldItem } from "@/redux/types";
import { getHoldStatusInfo } from "./HoldHeader";
import CountdownTimer from "@/components/shared/CountdownTimer";

interface HoldTimerCardProps {
  holdItem: HoldItem;
  onExpire?: () => void;
}

export default function HoldTimerCard({ holdItem, onExpire }: HoldTimerCardProps) {
  const statusInfo = getHoldStatusInfo(holdItem.status, holdItem.expiresAt);
  const isExpired = new Date(holdItem.expiresAt).getTime() <= Date.now();

  if (statusInfo.isConfirmed) {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 sm:p-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 size={28} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-emerald-950">
            Admission Confirmed!
          </h3>
          <p className="text-xs sm:text-sm text-emerald-800 mt-0.5">
            Your seat reservation is confirmed. Welcome to Onnorokom School!
          </p>
        </div>
      </div>
    );
  }

  if (!statusInfo.isHeld || isExpired) {
    return (
      <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 sm:p-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
          <AlertTriangle size={28} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-rose-950">
            Hold Period Expired
          </h3>
          <p className="text-xs sm:text-sm text-rose-800 mt-0.5">
            The hold reservation window has lapsed. The seat was released
            back to the available pool.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
            <Clock size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Hold Window Countdown
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Confirm your admission before the timer runs out to lock your seat.
            </p>
          </div>
        </div>

        <div className="text-center sm:text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
            Time Remaining (Hour : Min : Sec)
          </span>
          <CountdownTimer
            expiresAt={holdItem.expiresAt}
            onExpire={onExpire}
            variant="card"
          />
        </div>
      </div>
    </div>
  );
}
