"use client";

import { Modal, Form, Input, InputNumber, Button } from "antd";
import { Plus, BookOpen } from "lucide-react";
import { useCreateClassMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";

interface AddClassModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddClassModal({ open, onClose }: AddClassModalProps) {
  const [form] = Form.useForm();
  const [createClass, { isLoading: isCreating }] = useCreateClassMutation();

  const handleFinish = async (values: { name: string; totalSeats: number }) => {
    try {
      await createClass({
        name: values.name.trim(),
        totalSeats: Number(values.totalSeats),
      }).unwrap();
      toast.success(`Class "${values.name}" created successfully!`);
      form.resetFields();
      onClose();
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.error || "Failed to create class. Please try again."
      );
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      centered
      width={460}
      className="rounded-3xl overflow-hidden"
    >
      <div className="pt-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1B8BCC] flex items-center justify-center mb-3">
          <BookOpen size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Add New Class</h3>
        <p className="text-xs text-gray-500 mb-6">
          Define the classroom title and the maximum student seat capacity.
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          requiredMark={false}
        >
          <Form.Item
            name="name"
            label={
              <span className="font-semibold text-gray-800 text-sm">
                Class Name <span className="text-red-500">*</span>
              </span>
            }
            rules={[
              { required: true, message: "Please enter class name" },
              { min: 1, max: 100, message: "Must be between 1 and 100 characters" },
            ]}
          >
            <Input
              size="large"
              placeholder="e.g. Class 7 - Morning Shift (Section A)"
              className="rounded-xl font-medium"
            />
          </Form.Item>

          <Form.Item
            name="totalSeats"
            label={
              <span className="font-semibold text-gray-800 text-sm">
                Total Seats Capacity <span className="text-red-500">*</span>
              </span>
            }
            rules={[
              { required: true, message: "Please enter total seat capacity" },
              { type: "number", min: 1, message: "Total seats must be at least 1" },
            ]}
          >
            <InputNumber
              size="large"
              min={1}
              max={1000}
              placeholder="e.g. 40"
              className="w-full rounded-xl"
            />
          </Form.Item>

          <div className="pt-3 flex items-center justify-end gap-3">
            <Button
              size="large"
              onClick={() => {
                form.resetFields();
                onClose();
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
              className="rounded-xl font-bold bg-[#1B8BCC] hover:bg-[#1472a8] flex items-center gap-1.5"
            >
              <Plus size={16} />
              <span>Create Class</span>
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
