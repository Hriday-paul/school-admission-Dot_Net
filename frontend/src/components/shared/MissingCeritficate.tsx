"use client"
import { RootState } from '@/redux/store';
import { Button, Modal } from 'antd';
import { IdCard } from 'lucide-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import AddDobForm from './AddDobForm';

function MissingCeritficate() {
    const [openAddCertificate, setOpenAdd] = useState(false);
    const { birthCertificateId } = useSelector((state: RootState) => state.userSlice);

    return (
        <div>
            {!birthCertificateId && (
                <div className="mb-8 bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1B8BCC] flex items-center justify-center flex-shrink-0">
                            <IdCard size={22} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">
                                Please Set Your Date of Birth Certificate ID
                            </h3>
                            <p className="text-xs text-gray-600">
                                A certificate ID is required to hold seats and submit your admission application.
                            </p>
                        </div>
                    </div>
                    <Button
                        type="primary"
                        onClick={() => setOpenAdd(true)}
                        className="bg-[#1B8BCC] rounded-xl font-bold text-xs"
                    >
                        Enter Certificate ID
                    </Button>
                </div>
            )}


            <Modal
                open={openAddCertificate}
                onCancel={() => {
                    setOpenAdd(false)
                }}
                footer={null}
                centered
                width={440}
            >
                <div className="pt-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1B8BCC] flex items-center justify-center mb-3">
                        <IdCard size={22} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                        Certificate ID Required
                    </h3>
                    <p className="text-xs text-gray-500 mb-5">
                        Please enter your Date of Birth Certificate ID before applying.
                    </p>

                    <AddDobForm next={() => { setOpenAdd(false) }} />

                </div>
            </Modal>

        </div>
    )
}

export default MissingCeritficate
