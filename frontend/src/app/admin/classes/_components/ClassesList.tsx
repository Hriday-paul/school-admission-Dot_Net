"use client";

import { Table, Tag, Progress, Button } from "antd";
import { BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ClassItem } from "@/redux/types";
import type { ColumnsType } from "antd/es/table";
import DeleteClassBtn from "./DeleteClassBtn";

interface ClassesListProps {
  classes: ClassItem[];
}

export default function ClassesList({ classes }: ClassesListProps) {
  const columns: ColumnsType<ClassItem> = [
    {
      title: "Class Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: ClassItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1B8BCC] flex items-center justify-center font-bold flex-shrink-0">
            <BookOpen size={20} />
          </div>
          <div>
            <Link
              href={`/classes/${record.id}`}
              className="font-bold text-gray-900 text-sm hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <span>{name}</span>
              <ExternalLink size={12} className="text-gray-400" />
            </Link>
            <span className="block text-[11px] text-gray-400">
              ID: <span className="font-mono">{record.id.slice(0, 8)}...</span>
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Total Capacity",
      dataIndex: "totalSeats",
      key: "totalSeats",
      align: "center",
      render: (seats: number) => (
        <span className="font-semibold text-gray-800 text-sm">{seats}</span>
      ),
    },
    {
      title: "Available Seats",
      dataIndex: "availableSeats",
      key: "availableSeats",
      align: "center",
      render: (available: number) => (
        <Tag
          color={available > 0 ? "success" : "error"}
          className="px-3 py-0.5 rounded-full font-bold text-xs"
        >
          {available > 0 ? `${available} Left` : "Fully Booked"}
        </Tag>
      ),
    },
    {
      title: "Currently Held",
      dataIndex: "heldSeats",
      key: "heldSeats",
      align: "center",
      render: (held: number) => (
        <Tag color="warning" className="px-2.5 py-0.5 rounded-full font-bold text-xs">
          {held || 0} Held
        </Tag>
      ),
    },
    {
      title: "Confirmed Enrolled",
      dataIndex: "confirmedSeats",
      key: "confirmedSeats",
      align: "center",
      render: (confirmed: number) => (
        <Tag color="processing" className="px-2.5 py-0.5 rounded-full font-bold text-xs">
          {confirmed || 0} Enrolled
        </Tag>
      ),
    },
    {
      title: "Occupancy Rate",
      key: "occupancy",
      width: 180,
      render: (_: any, record: ClassItem) => {
        const total = record.totalSeats || 1;
        const occupied = (record.confirmedSeats || 0) + (record.heldSeats || 0);
        const percent = Math.min(100, Math.round((occupied / total) * 100));
        return (
          <div className="w-full">
            <Progress
              percent={percent}
              size="small"
              strokeColor={
                percent >= 100 ? "#ef4444" : percent > 75 ? "#f59e0b" : "#1B8BCC"
              }
              status={percent >= 100 ? "exception" : "normal"}
            />
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_: any, record: ClassItem) => (
        <div className="flex items-center justify-end gap-2">
          <Link href={`/classes/${record.id}`}>
            <Button size="small" type="default" className="text-xs font-semibold rounded-lg">
              Details
            </Button>
          </Link>

          <DeleteClassBtn classId={record.id} className={record.name} />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
      <Table
        columns={columns}
        dataSource={classes}
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: false }}
        className="rounded-2xl overflow-hidden"
      />
    </div>
  );
}
