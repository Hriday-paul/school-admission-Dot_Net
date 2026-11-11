import Link from "next/link";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { BookOpen, GraduationCap, Home } from "lucide-react";

export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={22} />,
    label: <Link href="/dashboard">Classes & Overview</Link>,
  },
  {
    key: "classes",
    icon: <GraduationCap size={22} />,
    label: <Link href="/classes">Student Portal</Link>,
  },
  {
    key: "home",
    icon: <Home size={22} />,
    label: <Link href="/">Switch Role / Home</Link>,
  },
];
