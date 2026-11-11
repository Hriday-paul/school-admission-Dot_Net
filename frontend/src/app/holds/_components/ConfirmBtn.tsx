import { useConfirmHoldMutation } from '@/redux/api/baseApi';
import { HoldItem } from '@/redux/types';
import { Button } from 'antd'
import { Check } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

function ConfirmBtn({ holdItem }: { holdItem: HoldItem }) {
    const [confirmHold, { isLoading: isConfirming }] = useConfirmHoldMutation();

    const handleConfirm = async (hold: HoldItem) => {
        try {
            await confirmHold(hold.id).unwrap();
            toast.success(
                `Seat confirmed successfully for ${hold.class?.name || "your class"
                }! Admission finalized.`
            );
        } catch (err: any) {
            toast.error(
                err?.data?.message || err?.error || "Failed to confirm seat admission"
            );
        }
    };

    return (
        <Button
            type="primary"
            size="large"
            loading={isConfirming}
            onClick={() => handleConfirm(holdItem)}
            icon={<Check size={18} />}
            className="rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
        >
            Confirm Admission
        </Button>
    )
}

export default ConfirmBtn
