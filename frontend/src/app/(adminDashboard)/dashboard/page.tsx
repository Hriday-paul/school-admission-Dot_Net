"use client";

import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Tag,
  Progress,
  Card,
  Row,
  Col,
  Empty,
  Spin,
} from "antd";
import {
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  BookOpen,
  Users,
  Clock,
  CheckCircle,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import {
  useGetClassesQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} from "@/redux/api/baseApi";
import { ClassItem } from "@/redux/types";
import { toast } from "sonner";
import type { ColumnsType } from "antd/es/table";

export default function AdminDashboardPage() {
  const { data: classes = [], isLoading, isFetching, refetch } = useGetClassesQuery();
  const [createClass, { isLoading: isCreating }] = useCreateClassMutation();
  const [updateClass, { isLoading: isUpdating }] = useUpdateClassMutation();
  const [deleteClass, { isLoading: isDeleting }] = useDeleteClassMutation();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);

  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // Aggregate stats
  const totalClasses = classes.length;
  const totalCapacity = classes.reduce((sum, c) => sum + (c.totalSeats || 0), 0);
  const totalAvailable = classes.reduce((sum, c) => sum + (c.availableSeats || 0), 0);
  const totalHeld = classes.reduce((sum, c) => sum + (c.heldSeats || 0), 0);
  const totalConfirmed = classes.reduce((sum, c) => sum + (c.confirmedSeats || 0), 0);

  const handleCreateSubmit = async (values: { name: string; totalSeats: number }) => {
    try {
      await createClass({
        name: values.name.trim(),
        totalSeats: Number(values.totalSeats),
      }).unwrap();
      toast.success(`Class "${values.name}" created successfully!`);
      createForm.resetFields();
      setIsCreateModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error || "Failed to create class");
    }
  };

  const handleOpenEditModal = (record: ClassItem) => {
    setEditingClass(record);
    editForm.setFieldsValue({
      name: record.name,
      totalSeats: record.totalSeats,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (values: { name: string; totalSeats: number }) => {
    if (!editingClass) return;
    try {
      await updateClass({
        id: editingClass.id,
        name: values.name.trim(),
        totalSeats: Number(values.totalSeats),
      }).unwrap();
      toast.success(`Class "${values.name}" updated successfully!`);
      setIsEditModalOpen(false);
      setEditingClass(null);
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error || "Failed to update class");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteClass(id).unwrap();
      toast.success(`Class "${name}" deleted.`);
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error || "Failed to delete class");
    }
  };

  const columns: ColumnsType<ClassItem> = [
    {
      title: "Class Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1B8BCC] flex items-center justify-center font-bold">
            <BookOpen size={18} />
          </div>
          <div>
            <span className="font-bold text-gray-900 text-sm">{name}</span>
            <span className="block text-[11px] text-gray-400">Section Active</span>
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
          className="px-2.5 py-0.5 rounded-full font-bold text-xs"
        >
          {available > 0 ? `${available} Left` : "Full"}
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
          {held} Held
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
          {confirmed} Enrolled
        </Tag>
      ),
    },
    {
      title: "Occupancy Rate",
      key: "occupancy",
      width: 170,
      render: (_: any, record: ClassItem) => {
        const total = record.totalSeats || 1;
        const occupied = (record.confirmedSeats || 0) + (record.heldSeats || 0);
        const percent = Math.min(100, Math.round((occupied / total) * 100));
        return (
          <div className="w-full">
            <Progress
              percent={percent}
              size="small"
              strokeColor={percent >= 100 ? "#ef4444" : percent > 75 ? "#f59e0b" : "#1B8BCC"}
              status={percent >= 100 ? "exception" : "normal"}
            />
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_: any, record: ClassItem) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            size="small"
            type="text"
            icon={<Edit2 size={16} className="text-blue-600" />}
            onClick={() => handleOpenEditModal(record)}
            className="hover:bg-blue-50"
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this class?"
            description={`Are you sure you want to remove "${record.name}"? Active holds and enrollments will be affected.`}
            onConfirm={() => handleDelete(record.id, record.name)}
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button
              size="small"
              type="text"
              danger
              icon={<Trash2 size={16} />}
              className="hover:bg-red-50"
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner & Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-2">
            <Sparkles size={14} /> Onnorokom School Admin Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Class &amp; Admission Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create classes, set seat capacities, and monitor real-time applicant holds.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            icon={<RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />}
            onClick={() => refetch()}
            className="rounded-xl font-medium"
          >
            Refresh
          </Button>

          <Button
            type="primary"
            icon={<Plus size={18} />}
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-xl font-bold bg-[#1B8BCC] hover:bg-[#1472a8] flex items-center gap-1 shadow-md shadow-blue-500/20"
          >
            Create New Class
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Total Classes
                </p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">
                  {totalClasses}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1B8BCC] flex items-center justify-center">
                <BookOpen size={24} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Total Capacity
                </p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">
                  {totalCapacity}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users size={24} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Available Seats
                </p>
                <h3 className="text-3xl font-black text-emerald-600 mt-1">
                  {totalAvailable}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle size={24} />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Held / Enrolled
                </p>
                <h3 className="text-3xl font-black text-amber-600 mt-1">
                  {totalHeld} <span className="text-sm font-normal text-gray-500">/ {totalConfirmed}</span>
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock size={24} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Classes Management Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Registered Classes</h2>
            <p className="text-xs text-gray-500">
              Real-time snapshot of all classrooms and seat allocations
            </p>
          </div>
          <Tag color="blue" className="rounded-full px-3 py-1 font-semibold text-xs">
            {classes.length} Classes Active
          </Tag>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Spin size="large" />
            <p className="text-sm text-gray-400">Loading school classes...</p>
          </div>
        ) : classes.length === 0 ? (
          <div className="py-16 text-center">
            <Empty
              description="No classes created yet. Get started by adding your first classroom."
            >
              <Button
                type="primary"
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-2 rounded-xl font-bold bg-[#1B8BCC]"
              >
                Create First Class
              </Button>
            </Empty>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={classes}
            rowKey="id"
            pagination={{ pageSize: 8, showSizeChanger: false }}
            className="rounded-2xl overflow-hidden"
          />
        )}
      </div>

      {/* CREATE CLASS MODAL */}
      <Modal
        open={isCreateModalOpen}
        onCancel={() => {
          setIsCreateModalOpen(false);
          createForm.resetFields();
        }}
        footer={null}
        centered
        width={460}
      >
        <div className="pt-2">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#1B8BCC] flex items-center justify-center mb-3">
            <Plus size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Create New Class</h3>
          <p className="text-xs text-gray-500 mb-6">
            Define the class title and the maximum seat capacity.
          </p>

          <Form
            form={createForm}
            layout="vertical"
            onFinish={handleCreateSubmit}
            requiredMark={false}
          >
            <Form.Item
              name="name"
              label={<span className="font-semibold text-gray-800 text-sm">Class Name</span>}
              rules={[
                { required: true, message: "Class name is required" },
                { max: 100, message: "Class name cannot exceed 100 characters" },
              ]}
            >
              <Input
                size="large"
                placeholder="e.g. Class 6 - Section A"
                className="rounded-xl font-medium"
              />
            </Form.Item>

            <Form.Item
              name="totalSeats"
              label={<span className="font-semibold text-gray-800 text-sm">Total Seats Capacity</span>}
              rules={[
                { required: true, message: "Please specify total seats" },
                { type: "number", min: 1, message: "Seats must be at least 1" },
              ]}
            >
              <InputNumber
                size="large"
                min={1}
                max={500}
                placeholder="e.g. 40"
                className="w-full rounded-xl"
              />
            </Form.Item>

            <div className="pt-3 flex items-center justify-end gap-3">
              <Button
                size="large"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  createForm.resetFields();
                }}
                className="rounded-xl font-medium"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isCreating}
                className="rounded-xl font-bold bg-[#1B8BCC] hover:bg-[#1472a8]"
              >
                Create Class
              </Button>
            </div>
          </Form>
        </div>
      </Modal>

      {/* EDIT CLASS MODAL */}
      <Modal
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingClass(null);
        }}
        footer={null}
        centered
        width={460}
      >
        <div className="pt-2">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Edit2 size={22} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Edit Class</h3>
          <p className="text-xs text-gray-500 mb-6">
            Modify class name or adjust total seats.
          </p>

          <Form
            form={editForm}
            layout="vertical"
            onFinish={handleEditSubmit}
            requiredMark={false}
          >
            <Form.Item
              name="name"
              label={<span className="font-semibold text-gray-800 text-sm">Class Name</span>}
              rules={[
                { required: true, message: "Class name is required" },
                { max: 100, message: "Class name cannot exceed 100 characters" },
              ]}
            >
              <Input size="large" className="rounded-xl font-medium" />
            </Form.Item>

            <Form.Item
              name="totalSeats"
              label={<span className="font-semibold text-gray-800 text-sm">Total Seats Capacity</span>}
              rules={[
                { required: true, message: "Total seats is required" },
                { type: "number", min: 1, message: "Total seats must be at least 1" },
              ]}
            >
              <InputNumber size="large" min={1} max={500} className="w-full rounded-xl" />
            </Form.Item>

            <div className="pt-3 flex items-center justify-end gap-3">
              <Button
                size="large"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingClass(null);
                }}
                className="rounded-xl font-medium"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isUpdating}
                className="rounded-xl font-bold bg-[#1B8BCC] hover:bg-[#1472a8]"
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
