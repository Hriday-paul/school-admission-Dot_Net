import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { HoldItem } from "@/redux/types";

interface HoldHeaderProps {
  holdItem: HoldItem;
}

export function getHoldStatusInfo(status: any, expiresAt: string) {
  const isExpiredByTime = new Date(expiresAt).getTime() <= Date.now();

  if (status === "CONFIRMED" || status === 1) {
    return {
      label: "Confirmed / Enrolled",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: <CheckCircle2 size={16} className="text-emerald-500" />,
      isHeld: false,
      isConfirmed: true,
    };
  }

  if (status === "CANCELLED" || status === 3) {
    return {
      label: "Cancelled",
      badgeBg: "bg-gray-100 text-gray-500 border-gray-200",
      icon: <XCircle size={16} className="text-gray-400" />,
      isHeld: false,
      isConfirmed: false,
    };
  }

  if (status === "EXPIRED" || status === 2 || isExpiredByTime) {
    return {
      label: "Hold Expired",
      badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
      icon: <AlertTriangle size={16} className="text-rose-500" />,
      isHeld: false,
      isConfirmed: false,
    };
  }

  return {
    label: "Active Seat Hold",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    icon: <Clock size={16} className="text-amber-500" />,
    isHeld: true,
    isConfirmed: false,
  };
}

export default function HoldHeader({ holdItem }: HoldHeaderProps) {
  const statusInfo = getHoldStatusInfo(holdItem.status, holdItem.expiresAt);

  return (
    <div className="mb-8">
      <Link
        href="/holds"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 mb-4 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to My Holds</span>
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold flex-shrink-0 shadow-md ${
              statusInfo.isHeld
                ? "bg-amber-100 text-amber-700 shadow-amber-500/10"
                : statusInfo.isConfirmed
                ? "bg-emerald-100 text-emerald-700 shadow-emerald-500/10"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            <BookOpen size={28} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-medium text-gray-400">
                Onnorokom School Admission Hold
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {holdItem.class?.name || "Classroom Reservation"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-mono">
              Hold ID: {holdItem.id}
            </p>
          </div>
        </div>

        <div>
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-bold ${statusInfo.badgeBg}`}
          >
            {statusInfo.icon}
            <span>{statusInfo.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
