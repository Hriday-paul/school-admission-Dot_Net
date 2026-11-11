import { Info, Calendar, ShieldCheck, Clock } from "lucide-react";

export default function ClassInfoCard() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-gray-900">
        Admission Details &amp; Guidelines
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
          <Calendar size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-gray-900 font-bold mb-0.5">
              Academic Session
            </strong>
            <span className="text-gray-500">2026 - 2027 Admission Cycle</span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
          <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-gray-900 font-bold mb-0.5">
              Verified Admission
            </strong>
            <span className="text-gray-500">
              Government Date of Birth Certificate Required
            </span>
          </div>
        </div>
      </div>

      {/* Hold Reservation Policy Note */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex items-start gap-3">
        <Clock size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-gray-700 leading-relaxed">
          <strong className="text-blue-900 block font-bold mb-1">
            How The Seat Hold Reservation Works
          </strong>
          When you click &ldquo;Apply &amp; Hold Seat&rdquo;, a seat is temporarily
          allocated to your Birth Certificate ID. Within this hold window,
          navigate to &ldquo;My Holds&rdquo; and confirm your admission before the
          countdown timer expires. If the hold expires, the seat returns to the public pool.
        </div>
      </div>
    </div>
  );
}
