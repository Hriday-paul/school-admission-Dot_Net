import { useCreateHoldMutation } from '@/redux/api/baseApi';
import { RootState } from '@/redux/store';
import { ClassItem } from '@/redux/types'
import { Button, Progress, Tag } from 'antd';
import { BookOpen, CheckCircle2, Clock } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

function Classcard({ item }: { item: ClassItem }) {
    const isAvailable = item.availableSeats > 0;
    const isLow = isAvailable && item.availableSeats <= 5;
    const percentOccupied = Math.min(100, Math.round((((item.confirmedSeats || 0) + (item.heldSeats || 0)) / (item.totalSeats || 1)) * 100));

    const { birthCertificateId } = useSelector(
        (state: RootState) => state.userSlice
    );

    const [createHold, { isLoading: isHolding }] = useCreateHoldMutation();

    const handleApplyHoldClick = async (classItem: ClassItem) => {
        try {
            const res = await createHold(classItem?.id).unwrap();
            toast.success(`Seat held for ${classItem?.name}!`);

        } catch (err: any) {
            toast.error(
                err?.data?.message || err?.error || "Failed to hold seat for this class"
            );
        }
    };

    return (
        <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
        >
            <div>
                {/* Card Top: Class Name and Status Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1B8BCC] flex items-center justify-center mb-3 font-bold">
                            <BookOpen size={20} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 leading-tight">
                            {item.name}
                        </h3>
                    </div>

                    <Tag
                        color={!isAvailable ? "error" : isLow ? "warning" : "success"}
                        className="px-3 py-1 rounded-full font-bold text-xs"
                    >
                        {!isAvailable
                            ? "Fully Booked"
                            : isLow
                                ? "Few Seats Left"
                                : "Seats Available"}
                    </Tag>
                </div>

                {/* Seat Stats Grid */}
                <div className="bg-slate-50/80 rounded-2xl p-4 mb-5 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-500">
                            Seat Availability
                        </span>
                        <span className="text-sm font-black text-gray-900">
                            <span
                                className={
                                    isAvailable ? "text-emerald-600" : "text-red-500"
                                }
                            >
                                {item.availableSeats}
                            </span>{" "}
                            <span className="text-xs font-normal text-gray-400">
                                / {item.totalSeats} Total
                            </span>
                        </span>
                    </div>

                    <Progress
                        percent={percentOccupied}
                        showInfo={false}
                        size="small"
                        strokeColor={
                            !isAvailable
                                ? "#ef4444"
                                : isLow
                                    ? "#f59e0b"
                                    : "#1B8BCC"
                        }
                    />

                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/60 text-xs">
                        <div className="flex items-center gap-1.5 text-gray-600">
                            <Clock size={13} className="text-amber-500" />
                            <span>{item.heldSeats || 0} on hold</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600 justify-end">
                            <CheckCircle2 size={13} className="text-blue-500" />
                            <span>{item.confirmedSeats || 0} enrolled</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <Button
                    size="large"
                    // onClick={() => handleOpenDetails(item)}
                    className="flex-1 rounded-xl font-bold text-xs sm:text-sm text-gray-700 hover:text-blue-600 hover:border-blue-400"
                >
                    View Details
                </Button>

                {birthCertificateId && <Button
                    type="primary"
                    size="large"
                    disabled={!isAvailable}
                    loading={isHolding}
                    onClick={() => handleApplyHoldClick(item)}
                    className={`flex-1 rounded-xl font-bold text-xs sm:text-sm shadow-md ${isAvailable
                        ? "bg-[#1B8BCC] hover:bg-[#1472a8] shadow-blue-500/20"
                        : "bg-gray-200 text-gray-400 shadow-none cursor-not-allowed"
                        }`}
                >
                    {isAvailable ? "Apply & Hold" : "Full"}
                </Button>}
            </div>
        </div>
    )
}

export default Classcard
