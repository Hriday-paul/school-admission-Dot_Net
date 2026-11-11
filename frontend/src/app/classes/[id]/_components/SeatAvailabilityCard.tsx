import { Progress } from "antd";
import { CheckCircle2, Clock, Users, AlertCircle } from "lucide-react";
import { ClassItem } from "@/redux/types";

interface SeatAvailabilityCardProps {
  classItem: ClassItem;
}

export default function SeatAvailabilityCard({ classItem }: SeatAvailabilityCardProps) {
  const total = classItem.totalSeats || 1;
  const occupied = (classItem.confirmedSeats || 0) + (classItem.heldSeats || 0);
  const percentOccupied = Math.min(100, Math.round((occupied / total) * 100));
  const isAvailable = classItem.availableSeats > 0;
  const isLow = isAvailable && classItem.availableSeats <= 5;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Live Seat Availability</h2>
        <span className="text-xs text-gray-400 font-medium">Auto-refreshing</span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
          <span>Capacity Occupancy</span>
          <span className="text-gray-900 font-bold">{percentOccupied}% Filled</span>
        </div>
        <Progress
          percent={percentOccupied}
          showInfo={false}
          strokeColor={
            !isAvailable ? "#ef4444" : isLow ? "#f59e0b" : "#1B8BCC"
          }
          className="rounded-full"
        />
      </div>

      {/* 4 Stat Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-1 font-medium">
            <Users size={14} className="text-gray-400" />
            <span>Total Seats</span>
          </div>
          <span className="text-2xl font-black text-gray-900">
            {classItem.totalSeats}
          </span>
        </div>

        <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100">
          <div className="flex items-center gap-2 text-emerald-700 text-xs mb-1 font-medium">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span>Available Seats</span>
          </div>
          <span
            className={`text-2xl font-black ${
              isAvailable ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {classItem.availableSeats}
          </span>
        </div>

        <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-100">
          <div className="flex items-center gap-2 text-amber-700 text-xs mb-1 font-medium">
            <Clock size={14} className="text-amber-500" />
            <span>Currently Held</span>
          </div>
          <span className="text-2xl font-black text-amber-600">
            {classItem.heldSeats || 0}
          </span>
        </div>

        <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-center gap-2 text-blue-700 text-xs mb-1 font-medium">
            <CheckCircle2 size={14} className="text-blue-500" />
            <span>Confirmed</span>
          </div>
          <span className="text-2xl font-black text-blue-600">
            {classItem.confirmedSeats || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
