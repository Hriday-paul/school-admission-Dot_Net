import {
  Sparkles,
} from "lucide-react";
import MissingCeritficate from "@/components/shared/MissingCeritficate";
import ClassContainer from "./_components/ClassContainer";
import MyHoldActionBtn from "./_components/MyHoldActionBtn";

export default function StudentClassesPage() {

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">


      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Banner Alert if student ID not provided */}
        <MissingCeritficate />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-2">
              <Sparkles size={14} /> Real-Time Admission Availability
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Explore Available Classes
            </h1>
            <p className="text-sm text-gray-500 mt-1 max-w-2xl">
              Browse classes and check live seat counts. Apply to hold a seat temporarily while you confirm your admission.
            </p>
          </div>

          <MyHoldActionBtn />
        </div>

        {/* Classes Grid */}
        <ClassContainer />

      </main>

    </div>
  );
}
