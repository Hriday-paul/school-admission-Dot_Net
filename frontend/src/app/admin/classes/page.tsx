"use client";

import { useState, } from "react";
import { Spin } from "antd";
import { useGetClassesQuery } from "@/redux/api/baseApi";
import ClassesHeader from "./_components/ClassesHeader";
import ClassesList from "./_components/ClassesList";
import ClassesEmptyState from "./_components/ClassesEmptyState";
import AddClassModal from "./_components/AddClassModal";

export default function AdminClassesPage() {
  const { data: classes = [], isLoading, isFetching, refetch } = useGetClassesQuery(
    undefined,
    { pollingInterval: 10000 }
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        <ClassesHeader
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onRefresh={() => refetch()}
          isFetching={isFetching}
        />

        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <Spin size="large" />
            <p className="text-sm text-gray-400 font-medium">
              Loading school classes...
            </p>
          </div>
        ) : classes.length === 0 ? (
          <ClassesEmptyState
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        ) : (
          <ClassesList classes={classes} />
        )}

        <AddClassModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </main>
    </div>
  );
}
