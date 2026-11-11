import { Button } from "antd";
import { Plus, BookOpen } from "lucide-react";

interface ClassesEmptyStateProps {
  onOpenAddModal: () => void;
}

export default function ClassesEmptyState({
  onOpenAddModal,
}: ClassesEmptyStateProps) {
  return (
    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm">
      <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#1B8BCC] flex items-center justify-center mx-auto mb-4">
        <BookOpen size={32} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">
        {"No Classes Added Yet"}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        {"Get started by adding your first classroom to Onnorokom School."}
      </p>

      <Button
        type="primary"
        icon={<Plus size={16} />}
        onClick={onOpenAddModal}
        className="rounded-xl font-bold bg-[#1B8BCC] hover:bg-[#1472a8] shadow-md shadow-blue-500/20"
      >
        Add New Class
      </Button>
    </div>
  );
}
