import {
  GraduationCap,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 flex flex-col justify-between">

      {/* Hero & Role Selection */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col justify-center">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold mb-4 shadow-sm">
            <Sparkles size={14} className="text-blue-600" />
            Academic Year 2026-2027 Admissions Open
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
            Welcome to <span className="text-[#1B8BCC]">Onnorokom School</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Please select how you would like to proceed. Students can check seat
            availability and apply with temporary seat hold reservations.
          </p>
        </div>

        {/* Two Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto w-full">
          {/* USER / STUDENT CARD */}
          <div className="group relative bg-white rounded-3xl p-8 border-2 border-blue-100/90 shadow-xl shadow-blue-500/5 hover:border-[#1B8BCC] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute -top-3 right-8 bg-gradient-to-r from-[#1B8BCC] to-[#0A66C2] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Student / Applicant
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1B8BCC] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#1B8BCC] group-hover:text-white transition-all duration-300 shadow-sm">
                <GraduationCap size={32} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Continue as Student
              </h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Explore classes, view real-time seat availability, reserve a
                seat with a temporary hold window, and finalize your admission.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  <span>Check live available &amp; held seats</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  <span>Hold a seat instantly with birth certificate ID</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Clock size={18} className="text-amber-500 flex-shrink-0" />
                  <span>Live countdown timer to confirm reservation</span>
                </div>
              </div>
            </div>

            <Link href={"/classes"}>
              <button
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#1B8BCC] to-[#0A66C2] text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Apply / View Classes</span>
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>

          {/* ADMIN CARD */}
          <div className="group relative bg-white rounded-3xl p-8 border-2 border-slate-200/90 shadow-xl shadow-slate-500/5 hover:border-slate-800 hover:shadow-2xl hover:shadow-slate-800/10 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute -top-3 right-8 bg-slate-800 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Administration
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-slate-800 group-hover:text-white transition-all duration-300 shadow-sm">
                <ShieldCheck size={32} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Continue as Admin
              </h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Manage all school classes, add new classrooms, adjust total seat
                capacities, and track seat reservation statistics.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  <span>Create, edit &amp; delete classes</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  <span>Real-time seat occupancy metrics</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  <span>Manage admission quotas &amp; limits</span>
                </div>
              </div>
            </div>

            <Link href={"/admin/classes"}>
              <button
                className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 text-white font-bold text-base shadow-lg shadow-slate-900/20 hover:bg-slate-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Admin Dashboard</span>
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/80 bg-white/60 py-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Onnorokom School. All rights reserved.</p>
      </footer>
    </div>
  );
}
