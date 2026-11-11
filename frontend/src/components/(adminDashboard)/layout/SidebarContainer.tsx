"use client";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import { navLinks } from "@/utils/navLinks";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/userSlice";
import { GraduationCap } from "lucide-react";

const SidebarContainer = ({ collapsed }: { collapsed: boolean }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "home") {
      dispatch(logoutUser());
      router.push("/");
    }
  };

  const currentPathname = usePathname()?.replace("/", "")?.split(" ")[0] || "dashboard";

  return (
    <Sider
      width={260}
      theme="light"
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        paddingInline: `${collapsed ? "4px" : "12px"}`,
        backgroundColor: "#FFFFFF",
        maxHeight: "100vh",
        overflow: "auto",
        borderRight: "1px solid #E2E8F0",
      }}
    >
      {/* Brand Header */}
      <div className="py-6 px-3 flex items-center justify-center gap-3 border-b border-gray-100 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1B8BCC] to-[#0A66C2] flex items-center justify-center text-white shadow-md shadow-blue-200 flex-shrink-0">
          <GraduationCap size={24} />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 text-base leading-tight tracking-tight">
              Onnorokom School
            </span>
            <span className="text-xs text-blue-600 font-medium">
              Admin Portal
            </span>
          </div>
        )}
      </div>

      <Menu
        onClick={onClick}
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu text-base space-y-2 !border-none"
        items={navLinks}
      />
    </Sider>
  );
};

export default SidebarContainer;
