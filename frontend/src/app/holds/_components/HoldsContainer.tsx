"use client"
import MissingCeritficate from '@/components/shared/MissingCeritficate';
import { useGetMyHoldsQuery } from '@/redux/api/baseApi';
import { RootState } from '@/redux/store';
import { Button, Spin } from 'antd';
import { AlertTriangle, ArrowRight, BookOpen, CheckCircle2, Clock, RefreshCw, Sparkles, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ConfirmBtn from './ConfirmBtn';
import DeletHoldBtn from './DeletHoldBtn';
import CountdownTimer from '@/components/shared/CountdownTimer';

// Helper to determine status type
const getStatusInfo = (status: any, expiresAt: string) => {
    const isExpiredByTime = new Date(expiresAt).getTime() <= Date.now();

    if (status === "CONFIRMED" || status === 1) {
        return {
            label: "Confirmed / Enrolled",
            color: "success",
            badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
            icon: <CheckCircle2 size={16} className="text-emerald-500" />,
            isHeld: false,
            isConfirmed: true,
        };
    }

    if (status === "CANCELLED" || status === 3) {
        return {
            label: "Cancelled",
            color: "default",
            badgeBg: "bg-gray-100 text-gray-500 border-gray-200",
            icon: <XCircle size={16} className="text-gray-400" />,
            isHeld: false,
            isConfirmed: false,
        };
    }

    if (status === "EXPIRED" || status === 2 || isExpiredByTime) {
        return {
            label: "Expired",
            color: "error",
            badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
            icon: <AlertTriangle size={16} className="text-rose-500" />,
            isHeld: false,
            isConfirmed: false,
        };
    }

    return {
        label: "Active Seat Hold",
        color: "warning",
        badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
        icon: <Clock size={16} className="text-amber-500" />,
        isHeld: true,
        isConfirmed: false,
    };
};

function HoldsContainer() {

    const router = useRouter();
    const { birthCertificateId } = useSelector((state: RootState) => state.userSlice);

    const {
        data: holds = [],
        isLoading,
        isFetching,
        refetch,
    } = useGetMyHoldsQuery(undefined, {
        skip: !birthCertificateId,
        pollingInterval: 10000,
    });

    return (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Missing Certificate ID Notice */}
            <MissingCeritficate />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-2">
                        <Sparkles size={14} /> My Seat Reservations
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                        Held Classes &amp; Admission Status
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Confirm your held seats before expiration to secure your student admission.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        icon={<RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />}
                        onClick={() => refetch()}
                        className="rounded-xl font-medium"
                    >
                        Refresh
                    </Button>

                    <Button
                        type="primary"
                        onClick={() => router.push("/classes")}
                        className="rounded-xl font-bold bg-[#1B8BCC] hover:bg-[#1472a8] flex items-center gap-2 shadow-md shadow-blue-500/20"
                    >
                        <span>Browse Classes</span>
                        <ArrowRight size={16} />
                    </Button>
                </div>
            </div>

            {/* Holds List */}
            {isLoading ? (
                <div className="py-24 flex flex-col items-center justify-center gap-3">
                    <Spin size="large" />
                    <p className="text-sm text-gray-400 font-medium">
                        Loading your admission holds...
                    </p>
                </div>
            ) : holds.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-2xl mx-auto">
                    <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#1B8BCC] flex items-center justify-center mx-auto mb-4">
                        <BookOpen size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        No Seat Holds Found
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                        You haven&rsquo;t applied for any seats yet. Browse our available classes to reserve a seat.
                    </p>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => router.push("/classes")}
                        className="rounded-xl font-bold bg-[#1B8BCC] hover:bg-[#1472a8] shadow-md shadow-blue-500/20"
                    >
                        Explore Available Classes
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {holds.map((hold) => {
                        const statusInfo = getStatusInfo(hold.status, hold.expiresAt);
                        const isHoldActive = statusInfo.isHeld;

                        return (
                            <div
                                key={hold.id}
                                className={`bg-white rounded-3xl p-6 border-2 transition-all shadow-sm ${isHoldActive
                                    ? "border-amber-200 hover:shadow-lg"
                                    : statusInfo.isConfirmed
                                        ? "border-emerald-200"
                                        : "border-slate-100 opacity-80"
                                    }`}
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    {/* Left: Class Information & Certificate ID */}
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${isHoldActive
                                                ? "bg-amber-100 text-amber-700"
                                                : statusInfo.isConfirmed
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-slate-100 text-slate-500"
                                                }`}
                                        >
                                            <BookOpen size={24} />
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-3 flex-wrap mb-1">
                                                <h3 className="text-xl font-black text-gray-900">
                                                    {hold.class?.name || "Classroom"}
                                                </h3>

                                                <div
                                                    className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border text-xs font-bold ${statusInfo.badgeBg}`}
                                                >
                                                    {statusInfo.icon}
                                                    <span>{statusInfo.label}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                                                <span>
                                                    Student:{" "}
                                                    <strong className="text-gray-700 font-mono">
                                                        {hold.studentId
                                                            ? `${hold.studentId.slice(0, 3)}••••${hold.studentId.slice(-3)}`
                                                            : "Verified"}
                                                    </strong>
                                                </span>
                                                <span>&bull;</span>
                                                <span>
                                                    Applied at:{" "}
                                                    {new Date(hold.createdAt).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </span>
                                                {hold.class?.totalSeats && (
                                                    <>
                                                        <span>&bull;</span>
                                                        <span>Class Capacity: {hold.class.totalSeats} seats</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle: Live Countdown Timer if Active Hold */}
                                    {isHoldActive && (
                                        <div className="flex flex-col items-start lg:items-center justify-center">
                                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                                Hold Window Remaining
                                            </span>
                                            <CountdownTimer
                                                expiresAt={hold.expiresAt}
                                                onExpire={() => refetch()}
                                                variant="badge"
                                            />
                                        </div>
                                    )}

                                    {/* Right: Actions */}
                                    <div className="flex items-center gap-3 self-end lg:self-auto flex-wrap">
                                        <Link href={`/holds/${hold.id}`}>
                                            <Button
                                                size="large"
                                                className="rounded-xl font-bold text-xs sm:text-sm text-gray-700 hover:text-blue-600 hover:border-blue-400"
                                            >
                                                Details
                                            </Button>
                                        </Link>

                                        {isHoldActive ? (
                                            birthCertificateId ? (
                                                <>
                                                    <DeletHoldBtn holdItem={hold} />

                                                    <ConfirmBtn holdItem={hold} />
                                                </>
                                            ) : null
                                        ) : statusInfo.isConfirmed ? (
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                                                <CheckCircle2 size={16} className="text-emerald-600" />
                                                <span>Admission Confirmed &amp; Seat Enrolled</span>
                                            </div>
                                        ) : (
                                            <Button
                                                size="large"
                                                onClick={() => router.push("/classes")}
                                                className="rounded-xl font-bold text-xs sm:text-sm text-[#1B8BCC] border-blue-200 hover:border-blue-400"
                                            >
                                                Find Another Class
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    )
}

export default HoldsContainer;
