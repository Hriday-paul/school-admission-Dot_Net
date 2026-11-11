import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import antTheme from "@/theme/antTheme";
import { Toaster } from "sonner";
import NextJsTopLoader from "@/components/shared/NextTopLoader";
import ReduxProvider from "@/components/shared/ReduxProvider";

export const metadata: Metadata = {
  title: {
    default: "Onnorokom School | Admission System",
    template: "%s | Onnorokom School",
  },
  description: "Official Admission Portal for Onnorokom School - Class Enrollment & Seat Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F8F9FA] text-[#333333]">
        <ReduxProvider>
          <AntdRegistry>
            <ConfigProvider theme={antTheme}>
              <Toaster position="top-center" richColors />
              <NextJsTopLoader />
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
