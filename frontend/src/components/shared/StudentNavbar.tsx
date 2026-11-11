"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setStudentDetails, logoutUser } from "@/redux/slices/userSlice";
import {
  GraduationCap,
  Clock,
  BookOpen,
  IdCard,
  Edit3,
  ArrowRightLeft,
  CheckCircle,
} from "lucide-react";
import { Modal, Input, Form, Button, Badge } from "antd";
import { useGetMyHoldsQuery } from "@/redux/api/baseApi";
import { toast } from "sonner";

export default function StudentNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const { birthCertificateId, studentName } = useSelector(
    (state: RootState) => state.userSlice
  );

  const [isEditIdModalOpen, setIsEditIdModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Fetch student holds to display count badge on "My Holds" tab
  const { data: myHolds = [] } = useGetMyHoldsQuery(undefined, {
    skip: !birthCertificateId,
    pollingInterval: 15000,
  });

  const activeHoldsCount = myHolds.filter((h) => {
    const isHeld = h.status === "HELD" || h.status === 0;
    const notExpired = new Date(h.expiresAt).getTime() > Date.now();
    return isHeld && notExpired;
  }).length;

  const handleUpdateId = (values: {
    birthCertificateId: string;
    studentName?: string;
  }) => {
    if (!values.birthCertificateId?.trim()) return;

    dispatch(
      setStudentDetails({
        birthCertificateId: values.birthCertificateId.trim(),
        studentName: values.studentName?.trim(),
      })
    );
    toast.success("Certificate ID updated!");
    setIsEditIdModalOpen(false);
  };

  const handleSwitchRole = () => {
    dispatch(logoutUser());
    router.push("/");
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1B8BCC] to-[#0A66C2] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap size={24} />
              </div>
              <div>
                <span className="font-black text-gray-900 text-lg sm:text-xl tracking-tight block leading-tight">
                  Onnorokom School
                </span>
                <span className="text-[11px] font-semibold text-blue-600">
                  Student Admission Portal
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/classes"
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  pathname === "/classes"
                    ? "bg-blue-50 text-[#1B8BCC]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <BookOpen size={16} />
                <span>Available Classes</span>
              </Link>

              <Link
                href="/holds"
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  pathname === "/holds"
                    ? "bg-blue-50 text-[#1B8BCC]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Clock size={16} />
                <span>My Holds</span>
                {activeHoldsCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-amber-500 text-white rounded-full animate-pulse">
                    {activeHoldsCount}
                  </span>
                )}
              </Link>
            </nav>

            {/* Student ID Badge & Role Switcher */}
            <div className="flex items-center gap-2 sm:gap-3">
              {birthCertificateId ? (
                <div
                  onClick={() => {
                    form.setFieldsValue({ birthCertificateId, studentName });
                    setIsEditIdModalOpen(true);
                  }}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer border border-slate-200 transition-colors"
                  title="Click to edit Certificate ID"
                >
                  <IdCard size={16} className="text-blue-600" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">
                      Birth Cert ID
                    </p>
                    <p className="text-xs font-bold text-gray-800 leading-tight">
                      {birthCertificateId}
                    </p>
                  </div>
                  <Edit3 size={13} className="text-gray-400 ml-1" />
                </div>
              ) : (
                <Button
                  size="small"
                  type="primary"
                  onClick={() => setIsEditIdModalOpen(true)}
                  className="bg-[#1B8BCC] rounded-lg text-xs font-bold"
                >
                  Enter Certificate ID
                </Button>
              )}

              <Button
                type="text"
                size="small"
                icon={<ArrowRightLeft size={15} />}
                onClick={handleSwitchRole}
                className="text-gray-500 hover:text-gray-800 text-xs font-semibold"
              >
                Switch Role
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Edit Certificate ID Modal */}
      <Modal
        open={isEditIdModalOpen}
        onCancel={() => setIsEditIdModalOpen(false)}
        footer={null}
        centered
        width={440}
      >
        <div className="pt-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1B8BCC] flex items-center justify-center mb-3">
            <IdCard size={22} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            Student Certificate ID
          </h3>
          <p className="text-xs text-gray-500 mb-5">
            Your government Date of Birth Certificate ID is sent in the{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded text-blue-700 font-mono">
              x-apikey
            </code>{" "}
            request header.
          </p>

          <Form
            form={form}
            layout="vertical"
            initialValues={{ birthCertificateId, studentName }}
            onFinish={handleUpdateId}
            requiredMark={false}
          >
            <Form.Item
              name="birthCertificateId"
              label={
                <span className="font-semibold text-gray-800 text-sm">
                  Date of Birth Certificate ID <span className="text-red-500">*</span>
                </span>
              }
              rules={[
                { required: true, message: "Please enter your Certificate ID" },
                { min: 3, message: "Minimum 3 characters" },
              ]}
            >
              <Input
                size="large"
                placeholder="e.g. 20148915678901234"
                className="rounded-xl font-medium"
              />
            </Form.Item>

            <Form.Item
              name="studentName"
              label={
                <span className="font-semibold text-gray-800 text-sm">
                  Student Name (Optional)
                </span>
              }
            >
              <Input
                size="large"
                placeholder="e.g. John Doe"
                className="rounded-xl font-medium"
              />
            </Form.Item>

            <div className="pt-2 flex justify-end gap-3">
              <Button
                size="large"
                onClick={() => setIsEditIdModalOpen(false)}
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
                Save ID
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}
