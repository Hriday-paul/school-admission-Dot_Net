"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  GraduationCap,
  ShieldCheck,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Users,
  IdCard,
} from "lucide-react";
import { Modal, Input, Button, Form, message } from "antd";
import { setRole, setStudentDetails } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { toast } from "sonner";

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { birthCertificateId, role } = useSelector(
    (state: RootState) => state.userSlice
  );

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAdminChoice = () => {
    dispatch(setRole("admin"));
    toast.success("Welcome, Administrator!");
    router.push("/dashboard");
  };

  const handleStudentChoiceClick = () => {
    // If student already has a birth certificate ID stored, pre-fill it
    if (birthCertificateId) {
      form.setFieldsValue({ birthCertificateId });
    }
    setIsStudentModalOpen(true);
  };

  const handleStudentFormSubmit = (values: {
    birthCertificateId: string;
    studentName?: string;
  }) => {
    if (!values.birthCertificateId || !values.birthCertificateId.trim()) {
      message.error("Please enter your Date of Birth Certificate ID");
      return;
    }

    dispatch(
      setStudentDetails({
        birthCertificateId: values.birthCertificateId.trim(),
        studentName: values.studentName?.trim(),
      })
    );

    toast.success("Identity verified! Redirecting to available classes...");
    setIsStudentModalOpen(false);
    router.push("/classes");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1B8BCC] to-[#0A66C2] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <GraduationCap size={26} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                Onnorokom School
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                  Admission Portal
                </span>
              </h1>
              <p className="text-xs text-gray-500 font-medium hidden sm:block">
                Transparent &amp; Real-time Seat Reservation System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {role === "user" && birthCertificateId && (
              <Button
                type="dashed"
                size="small"
                onClick={() => router.push("/classes")}
                className="text-xs font-semibold text-blue-600 border-blue-300"
              >
                Resume as Student ({birthCertificateId.slice(0, 8)}...)
              </Button>
            )}
            {role === "admin" && (
              <Button
                type="dashed"
                size="small"
                onClick={() => router.push("/dashboard")}
                className="text-xs font-semibold text-gray-700 border-gray-300"
              >
                Go to Admin
              </Button>
            )}
          </div>
        </div>
      </header>

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
                seat with a 10-minute hold window, and finalize your admission.
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
                  <span>10-minute countdown to confirm reservation</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleStudentChoiceClick}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#1B8BCC] to-[#0A66C2] text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Apply / View Classes</span>
              <ArrowRight size={18} />
            </button>
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

            <button
              onClick={handleAdminChoice}
              className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 text-white font-bold text-base shadow-lg shadow-slate-900/20 hover:bg-slate-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Enter Admin Dashboard</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Admission Flow Explainer */}
        <div className="mt-16 sm:mt-20 max-w-4xl mx-auto w-full bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-sm">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6 text-center">
            How The Admission Process Works
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                1
              </div>
              <div>
                <h5 className="font-bold text-gray-800 text-sm mb-1">
                  Enter Certificate ID
                </h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Provide your Date of Birth Certificate ID. Stored securely and sent via API header.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                2
              </div>
              <div>
                <h5 className="font-bold text-gray-800 text-sm mb-1">
                  Apply &amp; Hold Seat
                </h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Select your desired class. Once applied, your seat is reserved on hold for 10 minutes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                3
              </div>
              <div>
                <h5 className="font-bold text-gray-800 text-sm mb-1">
                  Confirm Admission
                </h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Head over to &ldquo;My Holds&rdquo; before the countdown ends and confirm to secure your seat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Student Birth Certificate ID Modal */}
      <Modal
        open={isStudentModalOpen}
        onCancel={() => setIsStudentModalOpen(false)}
        footer={null}
        centered
        width={480}
        className="rounded-3xl overflow-hidden"
      >
        <div className="pt-2 pb-1">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1B8BCC] flex items-center justify-center mb-4">
            <IdCard size={28} />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            Student Identification
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Please enter your government <strong>Date of Birth Certificate ID</strong>. This will be stored and attached to all your admission requests.
          </p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleStudentFormSubmit}
            requiredMark={false}
          >
            <Form.Item
              name="birthCertificateId"
              label={
                <span className="font-semibold text-gray-800 text-sm">
                  Date of Birth Certificate ID / Registration Number{" "}
                  <span className="text-red-500">*</span>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter your Date of Birth Certificate ID",
                },
                {
                  min: 3,
                  message: "Certificate ID must be at least 3 characters",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="e.g. 20148915678901234 or BC-1002"
                className="rounded-xl font-medium"
              />
            </Form.Item>

            <Form.Item
              name="studentName"
              label={
                <span className="font-semibold text-gray-800 text-sm">
                  Student Full Name (Optional)
                </span>
              }
            >
              <Input
                size="large"
                placeholder="e.g. Abdullah Al Mamun"
                className="rounded-xl"
              />
            </Form.Item>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                size="large"
                onClick={() => setIsStudentModalOpen(false)}
                className="rounded-xl font-medium"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="rounded-xl font-bold bg-[#1B8BCC] hover:bg-[#1472a8]"
              >
                Continue to Admission
              </Button>
            </div>
          </Form>
        </div>
      </Modal>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/80 bg-white/60 py-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Onnorokom School. All rights reserved.</p>
      </footer>
    </div>
  );
}
