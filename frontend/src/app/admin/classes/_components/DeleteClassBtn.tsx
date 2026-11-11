"use client";

import { Button, Popconfirm } from "antd";
import { Trash2 } from "lucide-react";
import { useDeleteClassMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";

interface DeleteClassBtnProps {
  classId: string;
  className: string;
}

export default function DeleteClassBtn({
  classId,
  className,
}: DeleteClassBtnProps) {
  const [deleteClass, { isLoading: isDeleting }] = useDeleteClassMutation();

  const handleDelete = async () => {
    try {
      await deleteClass(classId).unwrap();
      toast.success(`Class "${className}" deleted successfully.`);
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.error || `Failed to delete class "${className}".`
      );
    }
  };

  return (
    <Popconfirm
      title="Delete this class?"
      description={`Are you sure you want to delete class`}
      onConfirm={handleDelete}
      okText="Yes, Delete"
      cancelText="Cancel"
      okButtonProps={{ danger: true, loading: isDeleting }}
    >
      <Button
        danger
        size="small"
        type="text"
        loading={isDeleting}
        icon={<Trash2 size={15} />}
        className="hover:bg-red-50 flex items-center gap-1 font-semibold text-xs"
      >
        Delete
      </Button>
    </Popconfirm>
  );
}
