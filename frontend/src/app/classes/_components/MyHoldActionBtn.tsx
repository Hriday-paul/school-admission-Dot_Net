"use client"
import { RootState } from '@/redux/store';
import { Button } from 'antd';
import { Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

function MyHoldActionBtn() {
    const router = useRouter();
    const { birthCertificateId } = useSelector(
        (state: RootState) => state.userSlice
    );
    return (
        birthCertificateId ? <Button
            type="dashed"
            onClick={() => router.push("/holds")}
            className="rounded-xl font-bold text-[#1B8BCC] border-blue-300 flex items-center gap-2 self-start md:self-auto"
        >
            <Clock size={16} />
            <span>View My Hold Classes</span>
        </Button> : null
    )
}

export default MyHoldActionBtn
