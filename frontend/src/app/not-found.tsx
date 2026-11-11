import Link from "next/link";
import { Button } from "antd";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] text-center p-6">
      <h1 className="text-6xl font-black text-[#1B8BCC] mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button type="primary" size="large" className="rounded-xl font-bold bg-[#1B8BCC]">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
