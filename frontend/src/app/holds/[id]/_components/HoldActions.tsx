"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button, Modal } from "antd";
import { BookOpen, Printer, GraduationCap, CheckCircle2 } from "lucide-react";
import { HoldItem } from "@/redux/types";
import ConfirmBtn from "@/app/holds/_components/ConfirmBtn";
import DeletHoldBtn from "@/app/holds/_components/DeletHoldBtn";
import { getHoldStatusInfo } from "./HoldHeader";

interface HoldActionsProps {
  holdItem: HoldItem;
}

export default function HoldActions({ holdItem }: HoldActionsProps) {
  const { birthCertificateId } = useSelector(
    (state: RootState) => state.userSlice
  );

  const statusInfo = getHoldStatusInfo(holdItem.status, holdItem.expiresAt);
  const [isSlipOpen, setIsSlipOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
      <h2 className="text-lg font-bold text-gray-900 mb-2">Actions</h2>

      {statusInfo.isHeld ? (
        birthCertificateId ? (
          <div className="space-y-3">
            <div className="w-full">
              <ConfirmBtn holdItem={holdItem} />
            </div>

            <div className="w-full">
              <DeletHoldBtn holdItem={holdItem} />
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 leading-relaxed">
            Please provide your Birth Certificate ID to confirm or release this seat reservation.
          </div>
        )
      ) : statusInfo.isConfirmed ? (
        <div className="space-y-3">
          <p className="text-xs text-gray-500">
            This admission seat has been confirmed and finalized.
          </p>

          <Button
            type="primary"
            size="large"
            icon={<Printer size={16} />}
            onClick={() => setIsSlipOpen(true)}
            className="w-full rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500"
          >
            Admission Slip
          </Button>

          <Link href="/classes" className="block w-full">
            <Button
              size="large"
              icon={<BookOpen size={16} />}
              className="w-full rounded-xl font-bold text-[#1B8BCC] border-blue-200"
            >
              Browse More Classes
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-gray-500">
            This hold is no longer active. You can find and hold another available
            class.
          </p>
          <Link href="/classes" className="block w-full">
            <Button
              type="primary"
              size="large"
              className="w-full rounded-xl font-bold bg-[#1B8BCC]"
            >
              Explore Other Classes
            </Button>
          </Link>
        </div>
      )}

      {/* Official Admission Slip Modal */}
      <Modal
        open={isSlipOpen}
        onCancel={() => setIsSlipOpen(false)}
        footer={null}
        centered
        width={500}
      >
        <div className="p-4" id="printable-admission-slip">
          <div className="flex items-center gap-3 border-b pb-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1B8BCC] to-[#0A66C2] text-white flex items-center justify-center font-bold">
              <GraduationCap size={26} />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 leading-tight">
                Onnorokom School
              </h3>
              <p className="text-xs text-blue-600 font-semibold">
                Official Admission Confirmation Slip
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-400">Class Enrolled:</span>
              <strong className="text-gray-900 text-sm">
                {holdItem.class?.name || "Standard Class"}
              </strong>
            </div>

            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-400">Student ID / Reference:</span>
              <span className="font-mono font-bold text-gray-900">
                {holdItem.studentId
                  ? `${holdItem.studentId.slice(0, 4)}••••${holdItem.studentId.slice(-3)}`
                  : "Verified"}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-400">Admission Ref:</span>
              <span className="font-mono text-gray-600">{holdItem.id}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-400">Session:</span>
              <span className="text-gray-900 font-medium">2026 - 2027</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-400">Confirmed At:</span>
              <span className="text-gray-900">
                {new Date(holdItem.updatedAt).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between py-1.5 items-center">
              <span className="text-gray-400">Status:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                <CheckCircle2 size={13} className="text-emerald-600" />
                Admission Secured
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t flex justify-end gap-3 print:hidden">
            <Button onClick={() => setIsSlipOpen(false)} className="rounded-xl">
              Close
            </Button>
            <Button
              type="primary"
              icon={<Printer size={16} />}
              onClick={handlePrint}
              className="rounded-xl font-bold bg-[#1B8BCC]"
            >
              Print Slip
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
