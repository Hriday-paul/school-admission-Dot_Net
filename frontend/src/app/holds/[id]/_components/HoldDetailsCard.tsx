import { IdCard, Calendar, BookOpen, Clock, Hash } from "lucide-react";
import { HoldItem } from "@/redux/types";

interface HoldDetailsCardProps {
  holdItem: HoldItem;
}

export default function HoldDetailsCard({ holdItem }: HoldDetailsCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-gray-900">
        Reservation &amp; Student Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
          <IdCard size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-gray-400 font-medium block mb-0.5">
              Student Verification Status
            </span>
            <span className="text-sm font-bold text-gray-900 font-mono">
              {holdItem.studentId
                ? `${holdItem.studentId.slice(0, 3)}••••${holdItem.studentId.slice(-3)}`
                : "Verified"}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
          <BookOpen size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-gray-400 font-medium block mb-0.5">
              Target Classroom
            </span>
            <span className="text-sm font-bold text-gray-900">
              {holdItem.class?.name || "Standard Class"}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
          <Clock size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-gray-400 font-medium block mb-0.5">
              Applied At
            </span>
            <span className="text-sm font-bold text-gray-900">
              {new Date(holdItem.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
          <Calendar size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-gray-400 font-medium block mb-0.5">
              Expires At
            </span>
            <span className="text-sm font-bold text-gray-900">
              {new Date(holdItem.expiresAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
