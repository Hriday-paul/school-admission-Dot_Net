"use client";

import { Button, Input } from "antd";
import { Plus, Search, RefreshCw, Sparkles } from "lucide-react";
import { ClassItem } from "@/redux/types";

interface ClassesHeaderProps {
  onOpenAddModal: () => void;
  onRefresh: () => void;
  isFetching: boolean;
}

export default function ClassesHeader({
  onOpenAddModal,
  onRefresh,
  isFetching,
}: ClassesHeaderProps) {

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full mb-2">
            <Sparkles size={14} className="text-[#1B8BCC]" /> School Administration
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Manage School Classes
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Create new classes, monitor real-time seat availability, and delete classrooms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            icon={<RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />}
            onClick={onRefresh}
            className="rounded-xl font-medium"
          >
            Refresh
          </Button>

          <Button
            type="primary"
            icon={<Plus size={18} />}
            onClick={onOpenAddModal}
            className="rounded-xl font-bold bg-[#1B8BCC] hover:bg-[#1472a8] flex items-center gap-1.5 shadow-md shadow-blue-500/20"
          >
            Add New Class
          </Button>
        </div>
      </div>

    </div>
  );
}
