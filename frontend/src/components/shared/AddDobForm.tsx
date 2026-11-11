import { setStudentDetails } from '@/redux/slices/userSlice';
import { Button, Form, Input } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';

function AddDobForm({ next }: { next: () => void }) {
    const [certForm] = Form.useForm();

    const dispatch = useDispatch();

    const handleCertSubmit = (values: {
        birthCertificateId: string;
    }) => {
        if (!values.birthCertificateId?.trim()) return;

        dispatch(
            setStudentDetails({
                birthCertificateId: values.birthCertificateId.trim(),
            })
        );
        next();
    };

    return (
        <div>
            <Form form={certForm} layout="vertical" onFinish={handleCertSubmit} requiredMark={false}>
                <Form.Item
                    name="birthCertificateId"
                    label={
                        <span className="font-semibold text-gray-800 text-sm">
                            Date of Birth Certificate ID <span className="text-red-500">*</span>
                        </span>
                    }
                    rules={[{ required: true, message: "Certificate ID is required" }]}
                >
                    <Input
                        size="large"
                        placeholder="e.g. 20148915678901234"
                        className="rounded-xl font-medium"
                    />
                </Form.Item>

                <div className="pt-2 flex justify-end gap-3">
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="rounded-xl font-bold bg-[#1B8BCC] hover:bg-[#1472a8]"
                    >
                        Save &amp; Proceed
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default AddDobForm
