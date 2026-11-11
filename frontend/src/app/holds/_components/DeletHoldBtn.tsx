import { useDeleteHoldMutation } from '@/redux/api/baseApi';
import { HoldItem } from '@/redux/types';
import { Button, Popconfirm } from 'antd'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

function DeletHoldBtn({ holdItem }: { holdItem: HoldItem }) {
    const [deleteHold, { isLoading: isDeleting }] = useDeleteHoldMutation();



    const handleDelete = async (hold: HoldItem) => {
        try {
            await deleteHold(hold.id).unwrap();
            toast.success("Hold released. The seat is now available for other students.");
        } catch (err: any) {
            toast.error(err?.data?.message || err?.error || "Failed to release hold");
        }
    };

    return (
        <Popconfirm
            title="Release this held seat?"
            description="Releasing this seat will return it to the available pool. You will lose your reservation."
            onConfirm={() => handleDelete(holdItem)}
            okText="Yes, Release"
            cancelText="Keep"
            okButtonProps={{ danger: true }}
        >
            <Button
                danger
                size="large"
                loading={isDeleting}
                icon={<Trash2 size={16} />}
                className="rounded-xl font-bold text-xs sm:text-sm hover:bg-red-50"
            >
                Release Hold
            </Button>
        </Popconfirm>
    )
}

export default DeletHoldBtn
