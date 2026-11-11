"use client";
import { Flex, Button } from "antd";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";
import { GraduationCap, LogOut, ArrowRightLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/userSlice";

type TNavbarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Navbar = ({ collapsed, setCollapsed }: TNavbarProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSwitchToStudent = () => {
    router.push("/classes");
  };

  const handleExit = () => {
    dispatch(logoutUser());
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between w-full px-6 font-poppins">
      {/* Left side */}
      <Flex align="center" gap={16}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer hover:bg-gray-100 rounded-lg p-2 duration-200 text-gray-700"
          aria-label="Toggle sidebar"
        >
          <FaBars size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-800 leading-tight">
            Administrator Dashboard
          </h2>
          <p className="text-xs text-gray-500">
            Onnorokom School Admission Management
          </p>
        </div>
      </Flex>

      {/* Right side */}
      <Flex align="center" gap={12}>
        <Button
          type="default"
          icon={<GraduationCap size={16} className="text-[#1B8BCC]" />}
          onClick={handleSwitchToStudent}
          className="hidden sm:inline-flex items-center font-medium border-blue-200 text-blue-700 hover:border-blue-500"
        >
          Open Student View
        </Button>

        <Button
          type="text"
          danger
          icon={<ArrowRightLeft size={16} />}
          onClick={handleExit}
          className="flex items-center font-medium"
        >
          Switch Role
        </Button>
      </Flex>
    </div>
  );
};

export default Navbar;
