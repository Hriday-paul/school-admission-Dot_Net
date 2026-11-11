"use client";

import { useParams } from "next/navigation";
import MissingCeritficate from "@/components/shared/MissingCeritficate";
import { useGetHoldByIdQuery } from "@/redux/api/baseApi";
import { Spin, Empty, Button } from "antd";
import Link from "next/link";
import HoldHeader from "./_components/HoldHeader";
import HoldTimerCard from "./_components/HoldTimerCard";
import HoldDetailsCard from "./_components/HoldDetailsCard";
import HoldActions from "./_components/HoldActions";

export default function HoldDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: holdItem, isLoading, isError, refetch } = useGetHoldByIdQuery(id, {
    skip: !id,
    pollingInterval: 10000,
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <MissingCeritficate />

        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <Spin size="large" />
            <p className="text-sm text-gray-400 font-medium">
              Loading reservation details...
            </p>
          </div>
        ) : isError || !holdItem ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-lg mx-auto">
            <Empty description="Seat hold reservation not found." />
            <Link href="/holds" className="mt-4 inline-block">
              <Button type="primary" className="rounded-xl font-bold bg-[#1B8BCC]">
                Back to My Holds
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <HoldHeader holdItem={holdItem} />

            <HoldTimerCard holdItem={holdItem} onExpire={() => refetch()} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <HoldDetailsCard holdItem={holdItem} />
              </div>

              <div className="lg:col-span-1">
                <HoldActions holdItem={holdItem} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
