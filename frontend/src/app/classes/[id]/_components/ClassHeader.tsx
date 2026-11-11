import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { Tag } from "antd";
import { ClassItem } from "@/redux/types";

interface ClassHeaderProps {
  classItem: ClassItem;
}

export default function ClassHeader({ classItem }: ClassHeaderProps) {
  const isAvailable = classItem.availableSeats > 0;
  const isLow = isAvailable && classItem.availableSeats <= 5;

  return (
    <div className="mb-8">
      <Link
        href="/classes"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 mb-4 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to All Classes</span>
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1B8BCC] to-[#0A66C2] text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md shadow-blue-500/20">
            <BookOpen size={28} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                <Sparkles size={12} /> Academic Year 2026-2027
              </span>
              <span className="text-xs font-medium text-gray-400">
                &bull; Onnorokom School
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {classItem.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Class ID: <code className="font-mono text-gray-700">{classItem.id}</code>
            </p>
          </div>
        </div>

        <div>
          <Tag
            color={!isAvailable ? "error" : isLow ? "warning" : "success"}
            className="px-4 py-1.5 rounded-full font-bold text-sm"
          >
            {!isAvailable
              ? "Fully Booked"
              : isLow
              ? "Few Seats Left"
              : "Seats Available"}
          </Tag>
        </div>
      </div>
    </div>
  );
}
