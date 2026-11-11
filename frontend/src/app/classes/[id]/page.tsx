"use client";

import { useParams } from "next/navigation";
import MissingCeritficate from "@/components/shared/MissingCeritficate";
import { useGetClassByIdQuery } from "@/redux/api/baseApi";
import { Spin, Empty, Button } from "antd";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ClassHeader from "./_components/ClassHeader";
import SeatAvailabilityCard from "./_components/SeatAvailabilityCard";
import ClassInfoCard from "./_components/ClassInfoCard";
import ApplyHoldSection from "./_components/ApplyHoldSection";

export default function ClassDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: classItem, isLoading, isError } = useGetClassByIdQuery(id, {
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
              Loading class details...
            </p>
          </div>
        ) : isError || !classItem ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-lg mx-auto">
            <Empty description="Classroom not found or removed." />
            <Link href="/classes" className="mt-4 inline-block">
              <Button type="primary" className="rounded-xl font-bold bg-[#1B8BCC]">
                Back to Classes
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <ClassHeader classItem={classItem} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <SeatAvailabilityCard classItem={classItem} />
                <ClassInfoCard />
              </div>

              <div className="lg:col-span-1">
                <ApplyHoldSection classItem={classItem} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
