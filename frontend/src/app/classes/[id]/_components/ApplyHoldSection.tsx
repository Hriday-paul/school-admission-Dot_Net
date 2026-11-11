"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useCreateHoldMutation } from "@/redux/api/baseApi";
import { ClassItem } from "@/redux/types";
import { Button, Modal } from "antd";
import { IdCard, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";
import AddDobForm from "@/components/shared/AddDobForm";

interface ApplyHoldSectionProps {
  classItem: ClassItem;
}

export default function ApplyHoldSection({ classItem }: ApplyHoldSectionProps) {
  const router = useRouter();
  const { birthCertificateId } = useSelector(
    (state: RootState) => state.userSlice
  );

  const [createHold, { isLoading: isHolding }] = useCreateHoldMutation();
  const [openAddCertModal, setOpenAddCertModal] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const isAvailable = classItem.availableSeats > 0;

  const handleApplyHold = async () => {
    if (!birthCertificateId) {
      setOpenAddCertModal(true);
      return;
    }

    try {
      await createHold(classItem.id).unwrap();
      setIsSuccessModalOpen(true);
      toast.success(`Seat held for ${classItem.name}!`);
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.error || "Failed to hold seat for this class"
      );
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-100 shadow-lg shadow-blue-500/5">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Reserve Your Seat Now
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          Ready to apply? Click the button below to reserve a seat in{" "}
          <strong>{classItem.name}</strong>.
        </p>

        {birthCertificateId ? (
          <>
            <div className="mb-6 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1B8BCC] flex items-center justify-center flex-shrink-0">
                  <IdCard size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">
                    Applicant Identity
                  </span>
                  <span className="text-sm font-bold text-gray-900 font-mono">
                    {`${birthCertificateId.slice(0, 3)}••••${birthCertificateId.slice(-3)}`}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                Verified
              </span>
            </div>

            <Button
              type="primary"
              size="large"
              disabled={!isAvailable}
              loading={isHolding}
              onClick={handleApplyHold}
              className={`w-full py-6 rounded-2xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
                isAvailable
                  ? "bg-[#1B8BCC] hover:bg-[#1472a8] shadow-blue-500/20"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              {isAvailable ? "Apply & Hold Seat" : "Classroom Fully Booked"}
            </Button>
          </>
        ) : (
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-800 flex items-center justify-between gap-3">
            <span>Enter your Birth Certificate ID to unlock seat application.</span>
            <Button
              size="small"
              type="primary"
              onClick={() => setOpenAddCertModal(true)}
              className="bg-amber-600 rounded-lg text-xs font-bold"
            >
              Add ID
            </Button>
          </div>
        )}
      </div>

      {/* Add Certificate Modal */}
      <Modal
        open={openAddCertModal}
        onCancel={() => setOpenAddCertModal(false)}
        footer={null}
        centered
        width={440}
      >
        <div className="pt-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1B8BCC] flex items-center justify-center mb-3">
            <IdCard size={22} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            Certificate ID Required
          </h3>
          <p className="text-xs text-gray-500 mb-5">
            Please enter your Date of Birth Certificate ID to proceed with applying.
          </p>

          <AddDobForm
            next={() => {
              setOpenAddCertModal(false);
            }}
          />
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        open={isSuccessModalOpen}
        onCancel={() => setIsSuccessModalOpen(false)}
        footer={null}
        centered
        width={440}
      >
        <div className="pt-2 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
            <CheckCircle2 size={32} />
          </div>

          <h3 className="text-2xl font-black text-gray-900 mb-2">
            Seat Held Successfully!
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            A seat in <strong>{classItem.name}</strong> is now reserved for you on
            hold.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 mb-6 flex items-center gap-3 text-left">
            <Clock size={24} className="text-amber-600 flex-shrink-0" />
            <div>
              <strong className="block font-bold">Temporary Hold Window</strong>
              Please confirm your seat in &ldquo;My Holds&rdquo; before the countdown
              expires.
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              size="large"
              onClick={() => setIsSuccessModalOpen(false)}
              className="rounded-xl font-medium"
            >
              Stay on Page
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setIsSuccessModalOpen(false);
                router.push("/holds");
              }}
              className="rounded-xl font-bold bg-[#1B8BCC] hover:bg-[#1472a8] flex items-center gap-2"
            >
              <span>Go to My Holds</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
