"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/userSlice";
import {
  GraduationCap,
  ArrowRightLeft,
} from "lucide-react";
import { Button } from "antd";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

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


            {/* Student ID Badge & Role Switcher */}
            <div className="flex items-center gap-2 sm:gap-3">
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
    </>
  );
}
